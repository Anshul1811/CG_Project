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

document.addEventListener("DOMContentLoaded", function () {
  const vertexShaderSource = `
    attribute vec4 a_position;
    void main() {
        gl_Position = a_position;
    }
    `;

  // Define fragment shader
  //     const fragmentShaderSource = `
  // precision mediump float;
  // uniform vec2 resolution;
  // uniform float time;
  // void main() {
  //     vec2 uv = gl_FragCoord.xy / resolution.xy;

  //     // Calculate sun's position using a sine function for a curved path
  //     float t = mod(time, 1.0); // Ensure time repeats every 1 second
  //     float sunPositionX = mix(1.0, 0.0, t); // Move from 1.0 (right) to 0.0 (left)
  //     float sunPositionY = sin(t * 3.14) * 0.7 + 0.1; // Curved path with amplitude 0.4

  //     // Calculate cloud's position using a sine function for a horizontal movement
  //     float cloudPositionX = mod(time, 1.0); // Ensure clouds repeat every 1 second
  //     float cloudPositionY = uv.y; // Clouds move vertically with the screen

  //     // Calculate distance from the cloud center
  //     float cloudDistanceX = abs(uv.x - cloudPositionX); // Horizontal distance from cloud center
  //     float cloudDistanceY = abs(uv.y - 0.8); // Vertical distance from cloud center
  //     float cloudDistance = sqrt(cloudDistanceX * cloudDistanceX + cloudDistanceY * cloudDistanceY);

  //     // Check if the pixel is within the cloud area
  //     if (cloudDistance < 0.05) {
  //         gl_FragColor = vec4(0.7, 0.7, 0.7, 1.0); // Gray color for clouds
  //     }
  //     // If the pixel is within the sun's radius, color it yellow
  //     else if (distance(vec2(sunPositionX, sunPositionY), uv) < 0.05) {
  //         gl_FragColor = vec4(1.0, 0.85, 0.0, 1.0); // Yellow color for the sun
  //     }
  //     // Color the mountains
  //     else if ((uv.y < 0.2 * uv.x + 0.3 && uv.y < 0.2 * (1.0 - uv.x) + 0.3) ||
  //              (uv.y < 0.2 * (uv.x - 0.5) + 0.3 && uv.y < 0.2 * (0.5 - uv.x) + 0.3) ||
  //              (uv.y < 0.2 * (uv.x - 1.0) + 0.3 && uv.y < 0.2 * (1.5 - uv.x) + 0.3) ||
  //              (uv.y < 0.2 * (uv.x + 0.5) + 0.3 && uv.y < 0.2 * (-0.5 - uv.x) + 0.3)) {
  //         gl_FragColor = vec4(0.0, 0.5, 0.0, 1.0); // Green color for mountains
  //     }
  //     // Otherwise, color it dark blue during nighttime
  //     else if (sunPositionX < 0.2) {
  //         // Simulate twinkling stars
  //         float stars = fract(sin(dot(gl_FragCoord.xy ,vec2(12.9898,78.233))) * 43758.5453);
  //         if (stars > 0.998) {
  //             gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0); // White color for stars
  //         } else {
  //             gl_FragColor = vec4(0.0, 0.0, 0.2, 1.0); // Dark blue color for night sky
  //         }
  //     }
  //     // Otherwise, color it sky-blue during daytime
  //     else {
  //         gl_FragColor = vec4(0.529, 0.808, 0.922, 1.0); // Sky-blue color for the background
  //     }

  //     float birdPosX = mod(time, 1.0); // Ensure birds repeat every 1 second
  //     float birdPosY = uv.y; // Birds move vertically with the screen
  //     float birdDistanceX = abs(uv.x - birdPosX); // Horizontal distance from bird center
  //     float birdDistanceY = abs(uv.y - 0.6); // Vertical distance from bird center
  //     float birdDistance = sqrt(birdDistanceX * birdDistanceX + birdDistanceY * birdDistanceY);
  //     if (birdDistance < 0.02) {
  //         gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); // Black color for birds
  //     }
  // }
  // `;
  //     const fragmentShaderSource = `
  // precision mediump float;
  // uniform vec2 resolution;
  // uniform float time;
  // void main() {
  //     vec2 uv = gl_FragCoord.xy / resolution.xy;

  //     // Calculate sun's position using a sine function for a curved path
  //     float t = mod(time, 1.0); // Ensure time repeats every 1 second
  //     float sunPositionX = mix(1.0, 0.0, t); // Move from 1.0 (right) to 0.0 (left)
  //     float sunPositionY = sin(t * 3.14) * 0.7 + 0.1; // Curved path with amplitude 0.4

  //     // Calculate cloud's position using a sine function for a horizontal movement
  //     float cloudPositionX = mod(time, 1.0); // Ensure clouds repeat every 1 second
  //     float cloudPositionY = uv.y; // Clouds move vertically with the screen

  //     // Calculate distance from the cloud center
  //     float cloudDistanceX = abs(uv.x - cloudPositionX); // Horizontal distance from cloud center
  //     float cloudDistanceY = abs(uv.y - 0.8); // Vertical distance from cloud center
  //     float cloudDistance = sqrt(cloudDistanceX * cloudDistanceX + cloudDistanceY * cloudDistanceY);

  //     // Check if the pixel is within the cloud area
  //     if (cloudDistance < 0.05) {
  //         gl_FragColor = vec4(0.7, 0.7, 0.7, 1.0); // Gray color for clouds
  //     }
  //     // If the pixel is within the sun's radius, color it yellow
  //     else if (distance(vec2(sunPositionX, sunPositionY), uv) < 0.05) {
  //         gl_FragColor = vec4(1.0, 0.85, 0.0, 1.0); // Yellow color for the sun
  //     }
  //     // Color the mountains
  //     else if ((uv.y < 0.2 * uv.x + 0.3 && uv.y < 0.2 * (1.0 - uv.x) + 0.3) ||
  //              (uv.y < 0.2 * (uv.x - 0.5) + 0.3 && uv.y < 0.2 * (0.5 - uv.x) + 0.3) ||
  //              (uv.y < 0.2 * (uv.x - 1.0) + 0.3 && uv.y < 0.2 * (1.5 - uv.x) + 0.3) ||
  //              (uv.y < 0.2 * (uv.x + 0.5) + 0.3 && uv.y < 0.2 * (-0.5 - uv.x) + 0.3)) {
  //         gl_FragColor = vec4(0.0, 0.5, 0.0, 1.0); // Green color for mountains
  //     }
  //     // Color it dark blue during nighttime
  //     else if (sunPositionX < 0.07) {
  //         // Simulate twinkling stars
  //         float stars = fract(sin(dot(gl_FragCoord.xy ,vec2(12.9898,78.233))) * 43758.5453);
  //         if (stars > 0.998) {
  //             gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0); // White color for stars
  //         } else {
  //             gl_FragColor = vec4(0.0, 0.0, 0.2, 1.0); // Dark blue color for night sky
  //         }
  //     }
  //     // Otherwise, color it sky-blue during daytime
  //     else {
  //         gl_FragColor = vec4(0.529, 0.808, 0.922, 1.0); // Sky-blue color for the background
  //     }

  //     // Birds
  //     float birdPosX = mod(time, 1.0); // Ensure birds repeat every 1 second
  //     float birdPosY = uv.y; // Birds move vertically with the screen
  //     float birdDistanceX = abs(uv.x - birdPosX); // Horizontal distance from bird center
  //     float birdDistanceY = abs(uv.y - 0.6); // Vertical distance from bird center
  //     float birdDistance = sqrt(birdDistanceX * birdDistanceX + birdDistanceY * birdDistanceY);
  //     if (birdDistance < 0.02) {
  //         gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); // Black color for birds
  //     }
  // }
  // `;
  // Define fragment shader
  /*
  const fragmentShaderSource = `
precision mediump float;
uniform vec2 resolution;
uniform float time;

const float BIRD_SIZE = 0.01; // Size of the bird
const float CLOUD_RADIUS= 0.1;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;

    // Calculate sun's position using a sine function for a curved path
    float t = mod(time, 1.0); // Ensure time repeats every 1 second
    float sunPositionX = mix(1.0, 0.0, t); // Move from 1.0 (right) to 0.0 (left)
    float sunPositionY = sin(t * 3.14) * 0.7 + 0.1; // Curved path with amplitude 0.4

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
        // Adjust color based on the sun's position
        float sunsetColorFactor = clamp(1.0 - sunPositionX * 2.0, 0.0, 1.0);
        vec3 skyColor = mix(vec3(0.529, 0.808, 0.922), vec3(0.9, 0.6, 0.4), sunsetColorFactor);
        gl_FragColor = vec4(skyColor, 1.0); // Sky-blue color for the background
    }


    // Calculate bird's position
    float birdPosX = mod(time * 2.0, 1.0); // Ensure bird repeats every 0.5 seconds
    float birdPosY = 0.6 + sin(time * 6.0) * 0.05; // Oscillating vertical position for the bird

    // Calculate distance from the bird center
    float birdDistanceX = abs(uv.x - birdPosX); // Horizontal distance from bird center
    float birdDistanceY = abs(uv.y - birdPosY); // Vertical distance from bird center
    float birdDistance = sqrt(birdDistanceX * birdDistanceX + birdDistanceY * birdDistanceY);

    // Check if the pixel is within the bird area
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
        // Adjust color based on the sun's position
        float sunsetColorFactor = clamp(1.0 - sunPositionX * 2.0, 0.0, 1.0);
        vec3 skyColor = mix(vec3(0.529, 0.808, 0.922), vec3(0.9, 0.6, 0.4), sunsetColorFactor);
        gl_FragColor = vec4(skyColor, 1.0); // Sky-blue color for the background
    }
}
`;*/

// const fragmentShaderSource = `
// precision mediump float;
// uniform vec2 resolution;
// uniform float time;

// const float BIRD_SIZE = 0.01; // Size of the bird

// void main() {
//     vec2 uv = gl_FragCoord.xy / resolution.xy;

//     // Calculate sun's position using a sine function for a curved path
//     float t = mod(time, 1.0); // Ensure time repeats every 1 second
//     float sunPositionX = mix(1.0, 0.0, t); // Move from 1.0 (right) to 0.0 (left)
//     float sunPositionY = sin(t * 3.14) * 0.7 + 0.1; // Curved path with amplitude 0.4

//     // Check if the sun is overlapping with the mountains
//     bool overlappingMountains = (uv.y < 0.2 * uv.x + 0.3 && uv.y < 0.2 * (1.0 - uv.x) + 0.3) ||
//                                  (uv.y < 0.2 * (uv.x - 0.5) + 0.3 && uv.y < 0.2 * (0.5 - uv.x) + 0.3) ||
//                                  (uv.y < 0.2 * (uv.x + 0.5) + 0.3 && uv.y < 0.2 * (-0.5 - uv.x) + 0.3);

//     // If the sun is not overlapping with the mountains, color it yellow
//     if (!overlappingMountains) {
//         // Render the sun instantly when it's not overlapping
//         if (distance(vec2(sunPositionX, sunPositionY), uv) < 0.05) {
//             gl_FragColor = vec4(1.0, 0.85, 0.0, 1.0); // Yellow color for the sun
//             return;
//         }
//     }

//     // Color the mountains
//     if (overlappingMountains) {
//         gl_FragColor = vec4(0.0, 0.5, 0.0, 1.0); // Green color for mountains
//         return;
//     }

//     // Adjust color based on the sun's position
//     float sunsetColorFactor = clamp(1.0 - sunPositionX * 2.0, 0.0, 1.0);
//     vec3 skyColor = mix(vec3(0.529, 0.808, 0.922), vec3(0.9, 0.6, 0.4), sunsetColorFactor);
//     gl_FragColor = vec4(skyColor, 1.0); // Sky-blue color for the background

//     // Calculate bird's position
//     float birdPosX = mod(time * 2.0, 1.0); // Ensure bird repeats every 0.5 seconds
//     float birdPosY = 0.6 + sin(time * 6.0) * 0.05; // Oscillating vertical position for the bird

//     // Calculate distance from the bird center
//     float birdDistanceX = abs(uv.x - birdPosX); // Horizontal distance from bird center
//     float birdDistanceY = abs(uv.y - birdPosY); // Vertical distance from bird center
//     float birdDistance = sqrt(birdDistanceX * birdDistanceX + birdDistanceY * birdDistanceY);

//     // Check if the pixel is within the bird area
//     if (birdDistance < BIRD_SIZE) {
//         // Draw bird shape using a combination of conditions
//         if (uv.y > birdPosY && uv.y < birdPosY + BIRD_SIZE) {
//             // Body
//             gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); // Black color for bird body
//         } else if (uv.x > birdPosX && uv.x < birdPosX + BIRD_SIZE * 2.0 && uv.y > birdPosY - BIRD_SIZE * 0.5 && uv.y < birdPosY + BIRD_SIZE * 1.5) {
//             // Wings
//             gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); // Black color for bird wings
//         } else if (uv.x > birdPosX + BIRD_SIZE * 2.0 && uv.x < birdPosX + BIRD_SIZE * 2.5 && uv.y > birdPosY - BIRD_SIZE * 0.2 && uv.y < birdPosY + BIRD_SIZE * 1.2) {
//             // Head
//             gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); // Black color for bird head
//         } else if (uv.x > birdPosX - BIRD_SIZE * 0.2 && uv.x < birdPosX + BIRD_SIZE * 0.2 && uv.y > birdPosY - BIRD_SIZE * 0.5 && uv.y < birdPosY + BIRD_SIZE * 0.5) {
//             // Tail
//             gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); // Black color for bird tail
//         } else {
//             discard; // Discard pixels outside of bird shape
//         }
//     }
// }
// `;




  // Create WebGL context
  
const fragmentShaderSource = `
precision mediump float;
uniform vec2 resolution;
uniform float time;

const float BIRD_SIZE = 0.01; // Size of the bird
const float CLOUD_AMPLITUDE = 0.15; // Amplitude of the cloud's vertical movement
const float CLOUD_SIZE = 0.1; // Size of the cloud

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;

    // Calculate sun's position using a sine function for a curved path
    float t = mod(time, 1.0); // Ensure time repeats every 1 second
    float sunPositionX = mix(1.0, 0.0, t); // Move from 1.0 (right) to 0.0 (left)
    float sunPositionY = sin(t * 3.14) * 0.7 + 0.1; // Curved path with amplitude 0.4

    // Calculate cloud's position using a sine function for horizontal movement
    float cloudPositionX = mod(time, 1.0); // Ensure clouds repeat every 1 second
    float cloudPositionY = sin(time * 2.0) * CLOUD_AMPLITUDE + 0.6; // Vertical movement with amplitude CLOUD_AMPLITUDE, centered at 0.6

    // Calculate distance from the cloud center
    float cloudDistanceX = abs(uv.x - cloudPositionX); // Horizontal distance from cloud center
    float cloudDistanceY = abs(uv.y - cloudPositionY); // Vertical distance from cloud center
    float cloudDistance = sqrt(cloudDistanceX * cloudDistanceX + cloudDistanceY * cloudDistanceY);

    // Check if the pixel is within the cloud area
    if (cloudDistance < CLOUD_SIZE) { // Adjust cloud size here
        gl_FragColor = vec4(0.7, 0.7, 0.7, 1.0); // Gray color for clouds
        return;
    }

    // Check if the sun is overlapping with the mountains
    bool overlappingMountains = (uv.y < 0.2 * uv.x + 0.3 && uv.y < 0.2 * (1.0 - uv.x) + 0.3) ||
                                 (uv.y < 0.2 * (uv.x - 0.5) + 0.3 && uv.y < 0.2 * (0.5 - uv.x) + 0.3) ||
                                 (uv.y < 0.2 * (uv.x + 0.5) + 0.3 && uv.y < 0.2 * (-0.5 - uv.x) + 0.3);

    // If the sun is not overlapping with the mountains, color it yellow
    if (!overlappingMountains) {
        // Render the sun instantly when it's not overlapping
        if (distance(vec2(sunPositionX, sunPositionY), uv) < 0.05) {
            gl_FragColor = vec4(1.0, 0.85, 0.0, 1.0); // Yellow color for the sun
            return;
        }
    }

    // Color the mountains
    if (overlappingMountains) {
        gl_FragColor = vec4(0.0, 0.5, 0.0, 1.0); // Green color for mountains
        return;
    }

    // Adjust color based on the sun's position
    float sunsetColorFactor = clamp(1.0 - sunPositionX * 2.0, 0.0, 1.0);
    vec3 skyColor = mix(vec3(0.529, 0.808, 0.922), vec3(0.9, 0.6, 0.4), sunsetColorFactor);
    gl_FragColor = vec4(skyColor, 1.0);

    // Calculate bird's position and draw the bird
    float birdPosX = mod(time * 2.0, 1.0); // Ensure bird repeats every 0.5 seconds
    float birdPosY = 0.6 + sin(time * 6.0) * 0.05; // Oscillating vertical position for the bird
    float birdDistanceX = abs(uv.x - birdPosX); // Horizontal distance from bird center
    float birdDistanceY = abs(uv.y - birdPosY); // Vertical distance from bird center
    float birdDistance = sqrt(birdDistanceX * birdDistanceX + birdDistanceY * birdDistanceY);

    // Check if the pixel is within the bird area
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
`;


  
  const canvas = document.getElementById("webglCanvas");
  const gl = canvas.getContext("webgl");

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
  const fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource
  );

  // Create shader program
  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);

  // Create buffer for positions
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  const positions = [
    -1,
    -1, // Bottom-left
    1,
    -1, // Bottom-right
    -1,
    1, // Top-left
    -1,
    1, // Top-left
    1,
    -1, // Bottom-right
    1,
    1, // Top-right
    -1,
    -1, // Bottom-left
    -0.5,
    0.5, // Peak
    0,
    -1, // Bottom-right
    

    // Define vertices for Mountain 2 (counterclockwise winding order)
    -0.5,
    -1, // Bottom-left
    0,
    0, // Peak
    0.5,
    -1, // Bottom-right

    // Define vertices for Mountain 3 (counterclockwise winding order)
    0,
    -1, // Bottom-left
    0.5,
    0.5, // Peak
    1,
    -1, // Bottom-right
  ];

   
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  // Set position attribute
  const positionAttributeLocation = gl.getAttribLocation(
    shaderProgram,
    "a_position"
  );
  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

  // Set resolution uniform
  const resolutionUniformLocation = gl.getUniformLocation(
    shaderProgram,
    "resolution"
  );
  gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);

  // Set time uniform
  let startTime = Date.now();

  function updateTime() {
    let currentTime = Date.now();
    let elapsedTime = (currentTime - startTime) / 8000; // Convert to seconds
    gl.uniform1f(gl.getUniformLocation(shaderProgram, "time"), elapsedTime);
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
