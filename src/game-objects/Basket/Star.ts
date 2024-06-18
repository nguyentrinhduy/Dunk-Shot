import { GameObjects, Scene } from "phaser";
import { Ball } from "../Ball/Ball";
import { DataManager } from "../../managers/DataManager";
import { Path } from "../../helpers/Path";
import { AudioManager } from "../../managers/AudioManager";

export class Star extends GameObjects.Sprite{
    declare body: Phaser.Physics.Arcade.Body
    private ball: Ball
    private path: Path
    public constructor(scene: Scene, ball: Ball) {
        super(scene, 0, 0, 'stars')
        this.setScale(0.6)
        scene.add.existing(this)
        this.ball = ball
        scene.physics.add.existing(this)
        this.setPath(
            new Phaser.Math.Vector2(0, -40),
            new Phaser.Math.Vector2(0, -70)
        )
        this.addCollider()
    }
    public setPath(startPoint: Phaser.Math.Vector2 = new Phaser.Math.Vector2(this.x, this.y), endPoint: Phaser.Math.Vector2 = new Phaser.Math.Vector2(this.x, this.y)) {
        this.path = new Path(startPoint, endPoint)
    }
    private addCollider(): void {
        this.scene.physics.add.overlap(this.ball ,this, () => {
            DataManager.getInstance().addStars(1)
            this.setVisible(false)
            this.body.setEnable(false)
            this.path = new Path(new Phaser.Math.Vector2(this.x, this.y), new Phaser.Math.Vector2(this.x, this.y))
            AudioManager.getInstance().getCollectingStarSound()
        })
        this.body
            .setAllowGravity(false)
            .setBounce(0)
    }
    public update(time: number, delta: number): void {
        const point = this.path.getNewPosition(time, delta)
        this.x = point.x
        this.y = point.y
    }
}