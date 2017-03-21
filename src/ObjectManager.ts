/// <reference path="./Player"/>
/// <reference path="./Transformation"/>
/// <reference path="./Appearance"/>
/// <reference path="./SpriteAppearance"/>
/// <reference path="./Helpers/Picture"/>
/// <reference path="./Sprite"/>
/// <reference path="./Physics"/>
/// <reference path="./Vector"/>
/// <reference path="./CollisionHelper"/>
/// <reference path="./SceneObject"/>
/// <reference path="Object/Models/SpriteData.ts"/>

let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');

class ObjectManager {
    private entities: Entity[] = Array();

    constructor() {
        let spriteData: SpriteData = {
            picture: new Picture("./assets/sampleAsset.png"),
            height: 65,
            width: 65,
            direction: 0,
            animationCycle: 1,
            frameCount: 8
        };

        this.entities.push(new Player(new Transformation(new Physics(), new Vector(100, 100), 1), new SpriteAppearance(new Sprite(spriteData), 50, 50)));
        this.entities.push(new SceneObject(new Transformation(new Physics(), new Vector(canvas.width / 2, canvas.height - 150), 100), new Appearance(150, 150)));
        this.entities.push(new SceneObject(new Transformation(new Physics(), new Vector(canvas.width / 2 - 50, canvas.height - 450), 10), new Appearance(150, 150)));
    }

    update(delta: number) {
        for (let key in this.entities) {
            for (let i = 0; i < this.entities.length; i++) {
                if (i === parseInt(key))
                    continue;

                CollisionHelper.collide(this.entities[key], this.entities[i]);
            }

            CollisionHelper.collideWithCanvasBoundaries(this.entities[key], canvas);
            this.entities[key].update(delta);
        }
    }

    draw() {
        for (let key in this.entities) {
            this.entities[key].draw();
        }
    }
}