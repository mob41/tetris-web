var camera, scene, renderer;
var geometry, material, mesh, text;

var rectMaterial;
var mainRect, mainRectGeo;

var mainPlane, mainPlaneGeo, mainPlaneMaterial;

var bgm;

init();
animate();

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}

var bgmInit = false;
$("body,html").bind("touchstart touchmove scroll mousedown DOMMouseScroll mousewheel keyup", function (e) {
    if (!bgmInit){
        bgmInit = true;
        bgm.play();
    }
});  

function init() {

    bgm = new sound("assets/bgm.mp3");
    bgm.sound.addEventListener('ended', function () {
        console.log("repeat");
        bgm.play();
    }, false);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x737373);

    geometry = new THREE.BoxGeometry(5, 5, 5);
    material = new THREE.MeshNormalMaterial();

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    rectMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });

    mainRectGeo = new THREE.Geometry();
    mainRectGeo.vertices.push(new THREE.Vector3(-10, 0, 0));
    mainRectGeo.vertices.push(new THREE.Vector3(0, 10, 0));
    mainRectGeo.vertices.push(new THREE.Vector3(10, 0, 0));

    mainRect = new THREE.Line(mainRectGeo, rectMaterial);
    scene.add(mainRect);

    mainPlaneMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
    mainPlaneGeo = new THREE.PlaneGeometry(40, 60);
    mainPlane = new THREE.Mesh(mainPlaneGeo, mainPlaneMaterial);
    scene.add(mainPlane);

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

}

function animate() {

	requestAnimationFrame( animate );

	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.02;

	renderer.render( scene, camera );

}