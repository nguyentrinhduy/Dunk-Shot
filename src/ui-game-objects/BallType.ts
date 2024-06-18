import { Scene } from "phaser";
import { ball } from "../contstants/resources/Sprite";

export class BallType extends Phaser.GameObjects.Sprite {
    private ballType: number
    constructor(scene: Scene, x: number, y: number, ballType: number) {
        super(scene, x, y, ball.key + Math.floor(ballType / 10).toString() + (ballType % 10).toString())
        this.ballType = ballType
        this.scene.add.existing(this)
        this.setInteractive()
        this.on('pointerdown', () => {
            console.log('BallType', this.ballType)
        })
    }
    public setLocked(locked: boolean) {
        if (locked) {
            this.setTexture('locked_ball')
        }
        else {
            this.setTexture(ball.key + Math.floor(this.ballType / 10).toString() + (this.ballType % 10).toString())
        }
    }
    public getBallType(): number {
        return this.ballType
    }
}