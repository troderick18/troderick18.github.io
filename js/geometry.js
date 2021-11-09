function drawShape() {
    geometry_color = parseInt(document.getElementById("colorpick_shape").value.slice(1), 16);
}

function spinSpeed(fast) {
    if (fast === true) {
        x_rot_speed = 0.05;
        y_rot_speed = 0.03;
    }
    else {
        x_rot_speed = 0.02;
        y_rot_speed = 0.01;
    }
}

var x_rot_speed = 0.02;
var y_rot_speed = 0.01;
var geometry_color = 0x000000;
var outline_color = 0xffffff;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let geometry = new THREE.DodecahedronGeometry(1, 0);
var material = new THREE.MeshBasicMaterial({ color: geometry_color });

let edges = new THREE.EdgesGeometry(geometry);
let line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 5 }));

let cube = new THREE.Mesh(geometry, material);

scene.add(cube);
scene.add(line);

camera.position.z = 4;

//Create an render loop to allow animation
var render = function() {
    requestAnimationFrame(render);

    line.rotation.x += x_rot_speed;
    line.rotation.y += y_rot_speed;
    cube.rotation.x += x_rot_speed;
    cube.rotation.y += y_rot_speed;

    material.color.setHex(geometry_color);
    
    renderer.render(scene, camera);
};

render();