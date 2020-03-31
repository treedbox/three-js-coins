import {
    PerspectiveCamera,
    Scene,
    Camera,
    WebGLRenderer,
    Clock,
    SphereGeometry,
    Bone,
    Mesh,
    Color,
    Skeleton,
    SkinnedMesh,
    SkeletonHelper,
    PointLight,
    Vector2,
    LatheGeometry,
    CylinderGeometry,
    MeshPhongMaterial,
    Vector4,
    DoubleSide,
    HemisphereLight,
    AmbientLight
} from "three";
import { loadFileAsync } from "../modules/three/loaders";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GenerateGeometry } from "../modules/three/geometries";

// utils
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// scene
const scene: Scene = new Scene();
scene.background = new Color(0x000000);

//render
const renderer: WebGLRenderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// camera
const cameraData = {
    type: "perspective",
    fov: 75,
    aspect: "auto",
    near: 0.1,
    far: 1000,
    position: {
        x: 0,
        y: 0,
        z: 10
    }
};

const camera: PerspectiveCamera = new PerspectiveCamera(
    cameraData.fov,
    window.innerWidth / window.innerHeight,
    cameraData.near,
    cameraData.far
);

camera.position.x = cameraData.position.x;
camera.position.y = cameraData.position.y;
camera.position.z = cameraData.position.z;

const orbit = new OrbitControls(camera, renderer.domElement);
// orbit.enableZoom = true;

// lights
// const lights = [];
// lights[0] = new PointLight(0xffffff, 1, 0);
// lights[1] = new PointLight(0xffffff, 1, 0);
// lights[2] = new PointLight(0xffffff, 1, 0);

// lights[0].position.set(0, 200, 0);
// lights[1].position.set(100, 200, 100);
// lights[2].position.set(-100, -200, -100);

// scene.add(lights[0]);
// scene.add(lights[1]);
// scene.add(lights[2]);

const light = new AmbientLight(0x404040); // soft white light
scene.add(light);

const hemisphereLight = new HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(hemisphereLight);
// -----------------------------------------

const data: any = {
    // box1: {
    //     type: "box",
    //     edges: true,
    //     wireframes: true,
    //     color: "0xffdd00",
    //     position: {
    //         x: 0,
    //         y: 0,
    //         z: 0
    //     }
    // },
    // boxbuffer2: {
    //     type: "boxbuffer",
    //     color: "0xff0000",
    //     position: {
    //         x: 0,
    //         y: 2,
    //         z: 0
    //     }
    // },
    // circle3: {
    //     type: "circle",
    //     color: "0xff00ff",
    //     position: {
    //         x: 0,
    //         y: -2,
    //         z: 0
    //     }
    // },
    // circlebuffer4: {
    //     type: "circlebuffer",
    //     color: "0xff00ff",
    //     position: {
    //         x: 2,
    //         y: 0,
    //         z: 0
    //     }
    // },
    // sphere5: {
    //     type: "sphere",
    //     color: "0x3300ff",
    //     position: {
    //         x: -2,
    //         y: 0,
    //         z: 0
    //     }
    // },
    // plane1: {
    //     type: "plane",
    //     color: "0x000033",
    //     position: {
    //         x: -4,
    //         y: 0,
    //         z: 0
    //     }
    // },
    // planebuffer1: {
    //     type: "planebuffer",
    //     color: "0x0033ff",
    //     position: {
    //         x: 4,
    //         y: 0,
    //         z: 0
    //     }
    // },
    cylinder1: {
        type: "cylinder",
        color: "0x330033",
        position: {
            x: 0,
            y: 0,
            z: -10
        },
        texture: [
            "./assets/images/coins/golden-edge.png",
            "./assets/images/coins/coin-1-euro-front.jpg",
            "./assets/images/coins/coin-1-euro-back.jpg"
        ],
        radiusTop: 1,
        radiusBottom: 1,
        height: 0.17,
        radialSegments: 32,
        heightSegments: 1,
        openEnded: false,
        thetaStart: 0,
        thetaLength: 6.3
    },
    cylinderbuffer1: {
        type: "cylinderbuffer",
        color: "0x003333",
        position: {
            x: 2,
            y: 2,
            z: 0
        },
        texture: [
            "./assets/images/coins/coin-1-euro-edge.png",
            "./assets/images/coins/coin-1-euro-front.jpg",
            "./assets/images/coins/coin-1-euro-back.jpg"
        ],
        radiusTop: 1,
        radiusBottom: 1,
        height: 0.17,
        radialSegments: 32,
        heightSegments: 1,
        openEnded: false,
        thetaStart: 0,
        thetaLength: 6.3
    }
};

const foo = new GenerateGeometry(data, scene);

const cylinder1 = scene.children.find(e => e.name === "cylinder1");

// -----------------------------------------

const setAttr = index => ({
    index,
    speed: Math.random() * 0.005,
    distance: random(0, 6),
    rotation: random(0, 1),
    position: {
        x: random(0, 1),
        y: random(0, 1),
        z: random(0, 1)
    }
});

const coins = [];
const coinsAttr = [];
for (let index = 0; index < 10; index++) {
    const mesh = cylinder1.clone();
    mesh.name = `coin${index}`;
    coins.push(mesh);
    const attr = setAttr(index);
    coinsAttr.push(attr);
    scene.add(mesh);
}

const anime = (mesh, attr) => {
    const time = Date.now() * attr.speed;
    const list = [Math.sin, Math.cos];
    //position
    mesh.position.x = list[attr.position.x](time) * attr.distance;
    mesh.position.y = list[attr.position.x ? 0 : 1](time) * attr.distance;

    if (mesh.position.z > 9) {
        mesh.position.x = 0;
        mesh.position.y = 0;
        mesh.position.z = 0;
        coinsAttr[attr.index] = setAttr(attr.index);
    } else {
        mesh.position.z = mesh.position.z + attr.speed + 0.1;
    }

    //rotation
    if (attr.rotation) {
        mesh.rotation.x = mesh.rotation.x > 6 ? 0 : mesh.rotation.x + 0.15;
    } else {
        mesh.rotation.z = mesh.rotation.z > 6 ? 0 : mesh.rotation.z + 0.15;
    }

    // for (let e of mesh.material) {
    //     if (mesh.position.z > 4 || mesh.position.y < 0) {
    //         e.transparent = true;
    //         e.opacity = 0;
    //     } else {
    //         e.transparent = false;
    //         e.opacity = 1;
    //     }
    // }
};

const srKData = {
    type: "plane",
    color: "0x000033",
    width: 10,
    widthSegments: 1,
    height: 10,
    heightSegments: 1,
    position: {
        x: 0,
        y: 0,
        z: 0
    },
    texture: ["./assets/images/camiseta-verde-sr-k-milhoes.jpg"]
};
const srK = new GenerateGeometry([srKData], scene);

const animate = () => {
    renderer.render(scene, camera);
    for (const key in coins) {
        anime(coins[key], coinsAttr[key]);
    }

    requestAnimationFrame(animate);
};
animate();

const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener("resize", onWindowResize, false);
