

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
    var squareLetters = [];
    var particle = [];
    var notes = [];
    var ballsize;
    var notesize;
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
    camera.aspect = 10;
    scene = new THREE.Scene();
    var i = 0;
    while (i < 26)
    {
        material = new THREE.MeshPhongMaterial( { color: Math.random() * 20000000, specular: 0x555555, shininess: 30 } );
        geometry = new THREE.SphereGeometry(10, 32, 10 );
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = -height  / 2 + width * (i) / 48;
        mesh.position.z = 500;
        mesh.rotation.x = 0;
        mesh.rotation.y = 0;
        mesh.rotation.z = 0;
        letters[i] = mesh;
        i++;
    }
    i = 0;
    while (i < 26)
    {
        material = new THREE.MeshPhongMaterial( { color: Math.random() * 20000000, specular: 0xFFFFFF, shininess: 30 } );
        geometry = new THREE.BoxGeometry(20, 20, 20);
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.z = 500;
        mesh.rotation.x = 0;
        mesh.rotation.y = 0;
        mesh.rotation.z = 0;
        squareLetters[i] = mesh;
        i++;
    }
    renderer = new THREE.WebGLRenderer();
   // renderer.setSize(Window.innerWidth / 2, Window.innerWidht / 2 / 1.6);
    
    renderer.shadowMapEnabled = true;

    var dirLight = new THREE.DirectionalLight(0xfff000, 1);
    dirLight.position.set(-width / 2, 0, 600);
    scene.add(dirLight);

    dirLight = new THREE.DirectionalLight(0xfff, 1);
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
    get_file("/games/feverkey/letters/PNG-Blue-letter_A.png", receiveTextureFromServer)
}


function create_particle(side, n, ball)
{
    var i = 0;
    while (i < n)
    {
        var b = new THREE.Mesh(ball.geometry.clone(), ball.material.clone());
        b.position.x = ball.position.x;
        b.position.y = ball.position.y;
       /* if (side == 0)
            b.material.color.setHex(0);
        else
            b.material.color.setHex(0x0000FF);*/
        b.scale.x /= n;
        b.scale.y /= n;
        b.scale.z /= n;
        b.speedx = (Math.random() - 0.5) * 10;
        b.speedy = 5;
        b.accelx = (Math.random() - 0.5) / 800;
        b.accely = (Math.random()) / -4;
        particle.push(b);
        scene.add(b);
        i++;
    }
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
    b.burst = 0;
    balls.push(b);
    scene.add(b);
}

function update_particle(ball, i)
{
    ball.speedx += ball.accelx;
    ball.speedy += ball.accely;
    ball.position.x += ball.speedx;
    ball.position.y += ball.speedy;
    if (ball.position.y < -height)
    {
        particle.splice(i, 1);
        scene.remove(ball);
    }
}

function receiveTextureFromServer(file)
{
    alert(file);
}

function get_file(fileName, onFinishFunc)
{
    var xhr = new XMLHttpRequest();
    xhr.open('GET', "fileName", true);
    xhr.send();
    xhr.addEventListener("readystatechange", onFinishFunc, false);
}

function dist2d(m1, m2)
{
    return (Math.sqrt((m1.position.x - m2.position.x) * (m1.position.x - m2.position.x) + (m1.position.y - m2.position.y) * (m1.position.y - m2.position.y)));
}

function update_ball(ball, i)
{
    ball.speedx += ball.accelx;
    ball.speedy += ball.accely;
    notes.forEach(function (note, j)
    {
        if (dist2d(ball, note) < 30)
        {
            create_particle(0, 6, ball);
            //balls.splice(i, 1);
            scene.remove(ball);
            notes.splice(j, 1);
            scene.remove(note);
        }
    }, this);
    ball.position.x += ball.speedx;
    ball.position.y += ball.speedy;
}
function create_notes()
{
    if (Math.random() * 1000 < 50)
    {
        var b = new THREE.Mesh(squareLetters[0].geometry.clone(), squareLetters[0].material.clone());
        b.position.x = width / 2;
        b.position.z = 500;
        b.speedx = -5;
        b.speedy = 0;
        b.accelx = 0;
        b.accely = 0;
        b.position.y = height / 3;
        notes.push(b);
        scene.add(b);
    }
}

function update_note(note, i)
{
    note.speedx += note.accelx;
    note.speedy += note.accely;
    note.position.x += note.speedx;
    note.position.y += note.speedy;
    note.rotation.y += 0.05;
    note.rotation.x += 0.05;
}

function animate() 
{
    renderer.setSize( window.innerWidth / 1.5 , window.innerWidth / 1.5 / 1.6);
    requestAnimationFrame(animate);
    create_notes();
    balls.forEach(update_ball);
    particle.forEach(update_particle);
    notes.forEach(update_note);
    renderer.render(scene, camera);
}







