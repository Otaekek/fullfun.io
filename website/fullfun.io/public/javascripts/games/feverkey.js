

var camera, scene, renderer;
var geometry, material, mesh;
var keyMap;
var letters = [];
    var accel = [];
    var accel2 = [];
    var s1 = [];
    s2 = [];
    var width = 800;
    var height = 600;
    var balls = [];
    var count = 0;
init();
animate();

var azertyKeyMap  ={
    65: 0,
    81: 0,
    87: 1,
    90: 2,
    83: 2,
    88: 3,
    69: 3,
    68: 3,
    67: 4,
    82: 5,
    70: 5,
    86: 6,
    84: 6,
    71: 7,
    66: 8,
    89: 8,
    72: 9,
    78: 9,
    85: 10,
    74: 10,
    73: 11,
    75: 11,
    79: 12,
    76: 12,
    80: 13,
    77: 13
};

var qwertyKeyMap  ={
    65: 0,
    81: 0,
    87: 1,
    90: 2,
    83: 2,
    88: 3,
    69: 3,
    68: 3,
    67: 4,
    82: 5,
    70: 5,
    86: 6,
    84: 6,
    71: 7,
    66: 8,
    89: 8,
    72: 9,
    78: 9,
    85: 10,
    74: 10,
    73: 11,
    75: 11,
    79: 12,
    76: 12,
    80: 13,
    77: 13
};

function init() {
    camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2,1 , 1000 );
    camera.position.z = 1000;

    scene = new THREE.Scene();

    var i = 0;
    while (i < 26)
    {
        material = new THREE.MeshPhongMaterial( { color: Math.random() * 20000000, specular: 0x555555, shininess: 30 } );
        geometry = new THREE.SphereGeometry(20, 32, 10 );
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = -height  / 2 + width * (i) / 48;
        mesh.position.z = 500;
        mesh.rotation.x = 0;
        mesh.rotation.y = 0;
        mesh.rotation.z = 0;
        letters[i] = mesh;
        i++;
    }
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.shadowMapEnabled = true;

    var dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(-width / 2, 0, 600);
    //scene.add(dirLight);

    dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(width / 2, 0, 600);
    dirLight.castShadow = true;
    scene.add(dirLight);

    document.body.appendChild(renderer.domElement);

    var geometry = new THREE.PlaneGeometry(2000, 1000, 4 );
    var material = new THREE.MeshPhongMaterial( { color: Math.random() * 20000000, specular: 0x555555, shininess: 3000 } );
    var plane = new THREE.Mesh( geometry, material );
    plane.position.z = 0;
    scene.add( plane );

    document.addEventListener('keydown', function(event) {
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            create_ball(event.keyCode);
        }
    });
}

function create_ball(character)
{
    var b = new THREE.Mesh(letters[character- 65].geometry.clone(), letters[character - 65].material.clone());
    b.position.x = (azertyKeyMap[character] * (width) / 15) - width / 2 + width / 20;
    //b.material.color.setHex(Math.random() * 20000000);
    b.speedx = 0;
    b.speedy = 10;
    b.accelx = 0;
    b.accely = 0.2;
    b.position.y = -height / 2;
    balls.push(b);
    scene.add(b);
}

function update_ball(ball)
{
    ball.speedx += ball.accelx;
    ball.speedy += ball.accely;
    ball.position.x += ball.speedx;
    ball.position.y += ball.speedy;
}

function update_balls()
{
    balls.forEach(update_ball);
}



function animate() {

    requestAnimationFrame(animate);
    update_balls();
    renderer.render(scene, camera);
}
