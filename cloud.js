// document.addEventListener("DOMContentLoaded", function() {
//     const vertexShaderSource = `
//     attribute vec4 a_position;
//     void main() {
//         gl_Position = a_position;
//     }
//     `;

//     // Define fragment shader
//     const fragmentShaderSource = `
//     precision mediump float;
//     uniform vec2 resolution;
//     uniform float time;
//     void main() {
//         vec2 uv = gl_FragCoord.xy / resolution.xy;

//         // Calculate sun's position using a sine function for a curved path
//         float t = mod(time, 1.0); // Ensure time repeats every 1 second
//         float sunPositionX = mix(1.0, 0.0, t); // Move from 1.0 (right) to 0.0 (left)
//         float sunPositionY = sin(t * 3.14) * 0.7 + 0.1; // Curved path with amplitude 0.4

//         // Calculate cloud's position using a sine function for a horizontal movement
//         float cloudPositionX = mod(time, 1.0); // Ensure clouds repeat every 1 second
//         float cloudPositionY = uv.y; // Clouds move vertically with the screen

//         // Calculate distance from the cloud center
//         float cloudDistanceX = abs(uv.x - cloudPositionX); // Horizontal distance from cloud center
//         float cloudDistanceY = abs(uv.y - 0.8); // Vertical distance from cloud center
//         float cloudDistance = sqrt(cloudDistanceX * cloudDistanceX + cloudDistanceY * cloudDistanceY);

//         // Check if the pixel is within the cloud area
//         if (cloudDistance < 0.05) {
//             gl_FragColor = vec4(0.7, 0.7, 0.7, 1.0); // Gray color for clouds
//         }
//         // If the pixel is within the sun's radius, color it yellow
//         else if (distance(vec2(sunPositionX, sunPositionY), uv) < 0.05) {
//             gl_FragColor = vec4(1.0, 0.85, 0.0, 1.0); // Yellow color for the sun
//         }
//         // Otherwise, color it sky-blue
//         else {
//             gl_FragColor = vec4(0.529, 0.808, 0.922, 1.0); // Sky-blue color for the background
//         }

//         // Add birds
// float birdPosX = mod(time, 1.0); // Ensure birds repeat every 1 second
// float birdPosY = uv.y; // Birds move vertically with the screen
// float birdDistanceX = abs(uv.x - birdPosX); // Horizontal distance from bird center
// float birdDistanceY = abs(uv.y - 0.6); // Vertical distance from bird center
// float birdDistance = sqrt(birdDistanceX * birdDistanceX + birdDistanceY * birdDistanceY);
// if (birdDistance < 0.02) {
//     gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); // Black color for birds
// }
//     }
//     `;

//     // Create WebGL context
//     const canvas = document.getElementById('webglCanvas');
//     const gl = canvas.getContext('webgl');

//     // Compile shaders
//     function createShader(gl, type, source) {
//         const shader = gl.createShader(type);
//         gl.shaderSource(shader, source);
//         gl.compileShader(shader);
//         const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
//         if (success) {
//             return shader;
//         }
//         console.error(gl.getShaderInfoLog(shader));
//         gl.deleteShader(shader);
//     }
//     const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
//     const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

//     // Create shader program
//     const shaderProgram = gl.createProgram();
//     gl.attachShader(shaderProgram, vertexShader);
//     gl.attachShader(shaderProgram, fragmentShader);
//     gl.linkProgram(shaderProgram);
//     gl.useProgram(shaderProgram);

//     // Create buffer
//     const positionBuffer = gl.createBuffer();
//     gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
//     const positions = [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1];
//     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

//     // Set position attribute
//     const positionAttributeLocation = gl.getAttribLocation(shaderProgram, 'a_position');
//     gl.enableVertexAttribArray(positionAttributeLocation);
//     gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

//     // Set resolution uniform
//     const resolutionUniformLocation = gl.getUniformLocation(shaderProgram, 'resolution');
//     gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);

//     // Set time uniform
//     let startTime = Date.now();

//     function updateTime() {
//         let currentTime = Date.now();
//         let elapsedTime = (currentTime - startTime) / 5000; // Convert to seconds
//         gl.uniform1f(gl.getUniformLocation(shaderProgram, 'time'), elapsedTime);
//     }

//     // Animation function
//     function animate() {
//         updateTime();

//         // Clear canvas
//         gl.clear(gl.COLOR_BUFFER_BIT);

//         // Draw the rectangle, sun, and birds
//         gl.drawArrays(gl.TRIANGLES, 0, 6);

//         // Continue animation
//         requestAnimationFrame(animate);
//     }

//     // Start animation
//     animate();
// });

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
    void main() {
        vec2 uv = gl_FragCoord.xy / resolution.xy;

        // Calculate sun's position using a sine function for a curved path
        float t = mod(time, 1.0); // Ensure time repeats every 1 second
        float sunPositionX = mix(1.0, 0.0, t); // Move from 1.0 (right) to 0.0 (left)
        float sunPositionY = sin(t * 3.14) * 0.7 + 0.1; // Curved path with amplitude 0.4

        // Calculate cloud's position using a sine function for a horizontal movement
        float cloudPositionX = mod(time, 1.0); // Ensure clouds repeat every 1 second
        float cloudPositionY = uv.y; // Clouds move vertically with the screen

        // Calculate distance from the cloud center
        float cloudDistanceX = abs(uv.x - cloudPositionX); // Horizontal distance from cloud center
        float cloudDistanceY = abs(uv.y - 0.8); // Vertical distance from cloud center
        float cloudDistance = sqrt(cloudDistanceX * cloudDistanceX + cloudDistanceY * cloudDistanceY);

        // Check if the pixel is within the cloud area
        if (cloudDistance < 0.05) {
            gl_FragColor = vec4(0.7, 0.7, 0.7, 1.0); // Gray color for clouds
        }
        // If the pixel is within the sun's radius, color it yellow
        else if (distance(vec2(sunPositionX, sunPositionY), uv) < 0.05) {
            gl_FragColor = vec4(1.0, 0.85, 0.0, 1.0); // Yellow color for the sun
        }
        // Color the mountains
        else if ((uv.y < 0.2 * uv.x + 0.3 && uv.y < 0.2 * (1.0 - uv.x) + 0.3) ||
                 (uv.y < 0.2 * (uv.x - 0.5) + 0.3 && uv.y < 0.2 * (0.5 - uv.x) + 0.3) ||
                 (uv.y < 0.2 * (uv.x - 1.0) + 0.3 && uv.y < 0.2 * (1.5 - uv.x) + 0.3) ||
                 (uv.y < 0.2 * (uv.x + 0.5) + 0.3 && uv.y < 0.2 * (-0.5 - uv.x) + 0.3)) {
            gl_FragColor = vec4(0.0, 0.5, 0.0, 1.0); // Green color for mountains
        }
        // Otherwise, color it sky-blue
        else {
            gl_FragColor = vec4(0.529, 0.808, 0.922, 1.0); // Sky-blue color for the background
        }

        float birdPosX = mod(time, 1.0); // Ensure birds repeat every 1 second
        float birdPosY = uv.y; // Birds move vertically with the screen
        float birdDistanceX = abs(uv.x - birdPosX); // Horizontal distance from bird center
        float birdDistanceY = abs(uv.y - 0.6); // Vertical distance from bird center
        float birdDistance = sqrt(birdDistanceX * birdDistanceX + birdDistanceY * birdDistanceY);
        if (birdDistance < 0.02) {
            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); // Black color for birds
        }
        
    }
    `;

    // Create WebGL context
    const canvas = document.getElementById('webglCanvas');
    const gl = canvas.getContext('webgl');

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
    const positions = [-1, -1, // Bottom-left
        1, -1, // Bottom-right
        -1, 1, // Top-left
        -1, 1, // Top-left
        1, -1, // Bottom-right
        1, 1, // Top-right
        -1, -1, // Bottom-left (Mountain 1)
        -0.5, 0.5, // Peak (Mountain 1)
        0, -1, // Bottom-right (Mountain 1)
        -0.5, -1, // Bottom-left (Mountain 2)
        0, 0, // Peak (Mountain 2)
        0.5, -1, // Bottom-right (Mountain 2)
        0, -1, // Bottom-left (Mountain 3)
        0.5, 0.5, // Peak (Mountain 3)
        1, -1, // Bottom-right (Mountain 3)
        -1, -1, // Bottom-left (Mountain 4)
        -1.5, 0.5, // Peak (Mountain 4)
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
        gl.drawArrays(gl.TRIANGLES, 0, 6);

        // Continue animation
        requestAnimationFrame(animate);
    }

    // Start animation
    animate();
});