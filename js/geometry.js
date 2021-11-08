const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let geometry = new THREE.DodecahedronGeometry(1, 0);
let material = new THREE.MeshBasicMaterial({ color: 0xffffff });

let edges = new THREE.EdgesGeometry(geometry);
let line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x0000ff, linewidth: 5 }));

let cube = new THREE.Mesh(geometry, material);

scene.add(cube);
scene.add(line);

camera.position.z = 5;

//Create an render loop to allow animation
var render = function() {
    requestAnimationFrame(render);

    line.rotation.x += 0.01;
    line.rotation.y += 0.02;
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.02;

    renderer.render(scene, camera);
};

render();