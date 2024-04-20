document.addEventListener("DOMContentLoaded", function() {
    const vertexShaderSource = `
    attribute vec4 a_position;
    void main() {
        gl_Position = a_position;
    }
    `;

    // Define fragment shader
    const fragmentShaderSource = `
precision mediump float;
uniform vec2 resolution;
uniform float time;

const float BIRD_SIZE = 0.01; // Size of the bird
const float SUN_RADIUS = 0.08; // Adjust size of the sun
const float GLOW_RADIUS = 100.0; // Adjust size of the glow effect
const float SHINE_INTENSITY = 100.0;
const float SHINE_SPEED = 100.0;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;

    // Calculate sun's position using a sine function for a curved path
    float t = mod(time, 1.03); // Ensure time repeats every 1 second
    float sunPositionX = mix(1.0, 0.0, t); // Move from 1.0 (right) to 0.0 (left)
    float sunPositionY = sin(t * 3.14) * 0.6 + 0.1;

    // Calculate distance to the sun
    float distanceToSun = distance(uv, vec2(sunPositionX, sunPositionY));

    // Create gradient for the sun
    float sunGradient = smoothstep(SUN_RADIUS, SUN_RADIUS + 0.02, SUN_RADIUS - distanceToSun);

    // Add glow effect around the sun
    float glowGradient = smoothstep(GLOW_RADIUS, GLOW_RADIUS + 0.02, GLOW_RADIUS - distanceToSun);

    // Calculate shining effect
    float shineFactor = abs(sin(time * SHINE_SPEED) * 0.5 + 0.5); // Simulate light reflections
    float shiningIntensity = smoothstep(SUN_RADIUS - 0.02, SUN_RADIUS, distanceToSun) * shineFactor * SHINE_INTENSITY;

    // Combine gradients for sun, glow, and shining effect
    vec3 sunColor = vec3(1.0, 0.85, 0.0); // Base color for the sun
    vec3 glowColor = vec3(1.0, 0.85, 0.0) * 0.5; // Adjust glow color
    vec3 finalColor = mix(sunColor, glowColor, glowGradient) + shiningIntensity;

    // Render the sun with gradient, glow, and shining effect
    if (distanceToSun < SUN_RADIUS) {
        gl_FragColor = vec4(finalColor * sunGradient, 1.0);
    } else {
        gl_FragColor = vec4(0.0); // Transparent for pixels outside sun area
    }

    // Check if the sun is overlapping with the mountains
    bool overlappingMountains = (uv.y < 0.2 * uv.x + 0.3 && uv.y < 0.2 * (1.0 - uv.x) + 0.3) ||
                                 (uv.y < 0.2 * (uv.x - 0.5) + 0.3 && uv.y < 0.2 * (0.5 - uv.x) + 0.3) ||
                                 (uv.y < 0.2 * (uv.x + 0.5) + 0.3 && uv.y < 0.2 * (-0.5 - uv.x) + 0.3);

    // If the sun is not overlapping with the mountains, color it yellow
    if (!overlappingMountains) {
        // Render the sun instantly when it's not overlapping
        if (distance(vec2(sunPositionX, sunPositionY), uv) < 0.05) {
            gl_FragColor = vec4(1.0, 0.85, 0.0, 1.0); 
            return;
        }
    }

    // Color the mountains
    if (overlappingMountains) {
        gl_FragColor = vec4(0.0, 0.5, 0.0, 1.0); 
        return;
    }

    // Adjust color based on the sun's position
    float sunsetColorFactor = clamp(1.0 - sunPositionX * 4.0, 0.0, 4.0);
    vec3 skyColor;

    if (sunsetColorFactor < 1.0) {
        // Daytime colors
        skyColor = mix(vec3(0.529, 0.808, 0.922), vec3(0.8, 0.63, 0.5), sunsetColorFactor);
    } else {
        // Evening colors
        float eveningFactor = (sunsetColorFactor - 1.0) * 2.0; // Scale factor for evening colors
        vec3 eveningSkyColor = mix(vec3(0.8, 0.63, 0.5), vec3(0.545, 0.27, 0.074), eveningFactor); // Blend between orange and dark orange
        skyColor = mix(vec3(0.8, 0.63, 0.5), eveningSkyColor, glowGradient); // Transition from daytime to evening
    }

    gl_FragColor = vec4(skyColor, 1.0);

    // Calculate bird's position and draw the bird
    float birdPosX = mod(time * 3.0, 2.0); 
    float birdPosY = 0.6 + sin(time * 6.0) * 0.05; 
    float birdDistanceX = abs(uv.x - birdPosX); 
    float birdDistanceY = abs(uv.y - birdPosY); 
    float birdDistance = sqrt(birdDistanceX * birdDistanceX + birdDistanceY * birdDistanceY);

    // Check if the pixel is within the bird area
    for (int i = 0; i < 6; i++) {
        float birdPosX = mod(time * 2.0 + float(i) * 0.5, 1.0);
        float birdPosY = 0.6 + sin(time * 6.0 + float(i)) * 0.05; 
        birdPosX += float(i) * 0.3; 
        birdPosX = mod(birdPosX, 1.0); 
        float birdDistanceX = abs(uv.x - birdPosX); 
        float birdDistanceY = abs(uv.y - birdPosY); 
        float birdDistance = sqrt(birdDistanceX * birdDistanceX + birdDistanceY * birdDistanceY);

        if (birdDistance < BIRD_SIZE) {
            // Draw bird shape using a combination of conditions
            if (uv.y > birdPosY && uv.y < birdPosY + BIRD_SIZE) {
                // Body
                gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); // Black color for bird body
            } else if (uv.x > birdPosX && uv.x < birdPosX + BIRD_SIZE * 2.0 && uv.y > birdPosY - BIRD_SIZE * 0.5 && uv.y < birdPosY + BIRD_SIZE * 1.5) {
                // Wings
                gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); // Black color for bird wings
            } else if (uv.x > birdPosX + BIRD_SIZE * 2.0 && uv.x < birdPosX + BIRD_SIZE * 2.5 && uv.y > birdPosY - BIRD_SIZE * 0.2 && uv.y < birdPosY + BIRD_SIZE * 1.2) {
                // Head
                gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); // Black color for bird head
            } else if (uv.x > birdPosX - BIRD_SIZE * 0.2 && uv.x < birdPosX + BIRD_SIZE * 0.2 && uv.y > birdPosY - BIRD_SIZE * 0.5 && uv.y < birdPosY + BIRD_SIZE * 0.5) {
                // Tail
                gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); // Black color for bird tail
            } else {
                discard; // Discard pixels outside of bird shape
            }
        }
    }
}
`;

    // Create WebGL context
    const canvas = document.getElementById('webglCanvas');

    const gl = canvas.getContext('webgl', { antialias: true });

    // Compile shaders
    function createShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (success) {
            return shader;
        }
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
    }
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    // Create shader program
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    // Create buffer for positions
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [-1, -1,
        1, -1, -1, 1, -1, 1,
        1, -1,
        1, 1,

        -1, -1, // Bottom-left (Mountain 1)
        -0.5, -2.0, // Peak (Mountain 1)
        0, -1, // Bottom-right (Mountain 1)

        -0.5, -1, // Bottom-left (Mountain 2)
        0, -2.0, // Peak (Mountain 2)
        0.5, -1, // Bottom-right (Mountain 2)

        0, -1, // Bottom-left (Mountain 3)
        0.5, -2.0, // Peak (Mountain 3)
        1, -1, // Bottom-right (Mountain 3)

        -1, -1, // Bottom-left (Mountain 4)
        -1.5, -2.0, // Peak (Mountain 4)
        -0.5, -1, // Bottom-right (Mountain 4)
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // Set position attribute
    const positionAttributeLocation = gl.getAttribLocation(shaderProgram, 'a_position');
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    // Set resolution uniform
    const resolutionUniformLocation = gl.getUniformLocation(shaderProgram, 'resolution');
    gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);

    // Set time uniform
    let startTime = Date.now();

    function updateTime() {
        let currentTime = Date.now();
        let elapsedTime = (currentTime - startTime) / 5000; // Convert to seconds
        gl.uniform1f(gl.getUniformLocation(shaderProgram, 'time'), elapsedTime);
    }

    // Animation function
    function animate() {
        updateTime();

        // Clear canvas
        gl.clear(gl.COLOR_BUFFER_BIT);

        // Draw the rectangle, sun, and birds
        gl.drawArrays(gl.TRIANGLES, 0, 9);

        // Continue animation
        requestAnimationFrame(animate);
    }

    // Start animation
    animate();
});