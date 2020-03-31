import {
    Scene,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    DoubleSide,
    BoxBufferGeometry,
    CircleGeometry,
    CircleBufferGeometry,
    SphereGeometry,
    PlaneGeometry,
    PlaneBufferGeometry,
    SphereBufferGeometry,
    CylinderGeometry,
    CylinderBufferGeometry,
    TextureLoader
} from "three";
import { Functions } from "modules/interfaces";

class GenerateGeometry {
    private data: any;
    private scene: any;

    constructor(data: any, scene: Scene) {
        this.data = data;
        this.scene = scene;

        for (let key in this.data) {
            if (!this.generate[data[key].type]) break;
            const geometry = this.generate[data[key].type](data[key]);
            const material = data[key].texture
                ? this.setTexture(data[key])
                : this.setMaterial(data[key]);

            const mesh = this.setMesh(geometry, material);
            mesh.name = key;
            this.setPosition(mesh, data[key].position);
            this.setChild(this.scene, mesh);
        }
    }

    private setMesh(geometry: any, material: any) {
        return new Mesh(geometry, material);
    }

    private setTexture(data: any) {
        return data.texture.map(e => {
            const texture = new TextureLoader().load(e);
            const material = new MeshBasicMaterial({ map: texture });
            material.side = DoubleSide;
            return material;
        });
    }

    private setMaterial(data: any) {
        const material = new MeshBasicMaterial({
            color: Number(data.color),
            opacity: 1,
            transparent: true
        });
        material.side = DoubleSide;
        return material;
    }

    private setChild(parent: any, child: any) {
        return parent.add(child);
    }

    private setPosition(mesh: any, position: any): void {
        for (const axis in position) mesh.position[axis] = position[axis];
    }

    private setPlane(data: any) {
        return new PlaneGeometry(
            data.width,
            data.height,
            data.widthSegments,
            data.heightSegments
        );
    }

    private setBufferPlane(data: any) {
        return new PlaneBufferGeometry(
            data.width,
            data.height,
            data.widthSegments,
            data.heightSegments
        );
    }

    private setBox(data: any) {
        return new BoxGeometry();
    }

    private setBufferBox(data: any) {
        return new BoxBufferGeometry();
    }

    private setCircle(data: any) {
        return new CircleGeometry();
    }

    private setBufferCircle(data: any) {
        return new CircleBufferGeometry();
    }

    private setSphere(data: any) {
        return new SphereGeometry();
    }

    private setBufferSphere(data: any) {
        return new SphereBufferGeometry();
    }

    private setCylinder(data: any) {
        return new CylinderGeometry(
            data.radiusTop,
            data.radiusBottom,
            data.height,
            data.radialSegments,
            data.heightSegments,
            data.openEnded,
            data.thetaStart,
            data.thetaLength
        );
    }

    private setBufferCylinder(data: any) {
        return new CylinderBufferGeometry(
            data.radiusTop,
            data.radiusBottom,
            data.height,
            data.radialSegments,
            data.heightSegments,
            data.openEnded,
            data.thetaStart,
            data.thetaLength
        );
    }

    private generate: Functions = {
        box: this.setBox,
        boxbuffer: this.setBufferBox,
        circle: this.setCircle,
        circlebuffer: this.setBufferCircle,
        sphere: this.setSphere,
        spherebuffer: this.setBufferSphere,
        plane: this.setPlane,
        planebuffer: this.setBufferPlane,
        cylinder: this.setCylinder,
        cylinderbuffer: this.setBufferCylinder
    };
}

export { GenerateGeometry };
