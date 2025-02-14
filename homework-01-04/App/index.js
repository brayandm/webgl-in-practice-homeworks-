import {
    WebGLRenderer,
    Scene,
    PerspectiveCamera,
    BoxGeometry,
    Mesh,
    MeshStandardMaterial,
    DirectionalLight,
    AmbientLight,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "stats.js";

export default class App {
    constructor() {
        this._renderer = undefined;
        this._camera = undefined;
        this._scene = undefined;
        this._controls = undefined;
        this._raf = undefined;
        this._stats = new Stats();
        document.body.appendChild(this._stats.dom);

        this._init();
    }

    _init() {
        // RENDERER
        this._renderer = new WebGLRenderer({
            canvas: document.querySelector("#canvas"),
        });
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        this._renderer.shadowMap.enabled = true;

        // CAMERA
        const aspect = window.innerWidth / window.innerHeight;
        this._camera = new PerspectiveCamera(75, aspect, 0.1, 1000);
        this._camera.position.z = 4;
        this._camera.position.y = 2;
        this._camera.position.x = 2;

        // SCENE
        this._scene = new Scene();

        // CONTROLS
        this._controls = new OrbitControls(
            this._camera,
            this._renderer.domElement
        );

        // LIGHT
        const light = new DirectionalLight(0xffffff, 1);
        light.position.set(0, 2, 2);
        light.castShadow = true;
        light.shadow.mapSize.width = 1024;
        light.shadow.mapSize.height = 1024;
        this._scene.add(light);

        // AMBIENT LIGHT
        const ambientLight = new AmbientLight(0xffffff, 0.1);
        this._scene.add(ambientLight);

        // MESH
        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshStandardMaterial({ color: 0xff0000 });
        const mesh = new Mesh(geometry, material);
        mesh.castShadow = true;
        this._mesh = mesh;
        this._scene.add(this._mesh);

        // PLANE
        const planeGeometry = new BoxGeometry(10, 0.1, 10);
        const planeMaterial = new MeshStandardMaterial({ color: 0x00ff00 });
        const plane = new Mesh(planeGeometry, planeMaterial);
        plane.position.y = -2;
        plane.receiveShadow = true;
        this._scene.add(plane);

        // START
        this._initEvents();
        this._start();
    }

    _rotateMesh() {
        this._mesh.rotation.x += 0.01;
        this._mesh.rotation.y += 0.01;
    }

    _initEvents() {
        window.addEventListener("resize", this._onResize.bind(this));
    }

    _onResize() {
        const aspect = window.innerWidth / window.innerHeight;
        this._camera.aspect = aspect;
        this._camera.updateProjectionMatrix();
        this._renderer.setSize(window.innerWidth, window.innerHeight);
    }

    _start() {
        this._raf = window.requestAnimationFrame(this._animate.bind(this));
    }

    _pause() {
        window.cancelAnimationFrame(this._raf);
    }

    _animate() {
        this._stats.begin();
        this._raf = window.requestAnimationFrame(this._animate.bind(this));
        this._rotateMesh();
        this._renderer.render(this._scene, this._camera);
        this._stats.end();
    }
}
