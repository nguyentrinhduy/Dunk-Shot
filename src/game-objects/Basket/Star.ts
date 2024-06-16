import { GameObjects, Scene } from "phaser";
import { Ball } from "../Ball/Ball";
import { DataManager } from "../../managers/DataManager";

export class Star extends GameObjects.Sprite{
    declare body: Phaser.Physics.Arcade.Body
    private ball: Ball
    public constructor(scene: Scene, x: number, y: number, ball: Ball) {
        super(scene, x, y, 'stars')
        scene.add.existing(this)
        this.ball = ball
        scene.physics.add.existing(this)
        this.addMovement()
        this.addCollider()
    }
    private addMovement(): void {
        this.x = 0
        this.y = 0
        
        this.scene.add.tween({
            targets: this,
            x: 0,
            y: 0,
            yoyo: true,
            repeat: -1,
            duration: 20,
            ease: 'quad.out'
        })
    }
    private addCollider(): void {
        this.scene.physics.add.collider(this.ball ,this, () => {
            DataManager.getInstance().addStars(1)
            this.setVisible(false)
            this.body.setEnable(false)
        })
        this.body
            .setAllowGravity(false)
            .setBounce(0)
    }
}