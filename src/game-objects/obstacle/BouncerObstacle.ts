import { AudioManager } from '../../managers/AudioManager'
import { Ball } from '../ball/Ball'
import { Obstacle } from './Obstacle'

export class BouncerObstacle extends Obstacle {
    declare body: Phaser.Physics.Arcade.Body
    public constructor(scene: Phaser.Scene, x: number = 0, y: number = 0, ball: Ball) {
        super(scene, x, y, ball)
        this.addSprite()
        this.addColliders()
    }
    private addSprite() {
        this.sprite = this.scene.add.sprite(0, 0, 'bouncer_obstacle').setScale(0.4)
        this.add(this.sprite)
    }
    protected addColliders(): void {
        this.scene.physics.add.existing(this)
        this.body
            .setCircle(40)
            .setAllowGravity(false)
            .setBounce(0)
            .setImmovable(true)
            .setOffset(-40)

        this.scene.physics.add.collider(this.ball, this, () => {
            AudioManager.getInstance().getCollideWallSound()
        })
    }
    public setNotAllowPhysics(): void {
        this.body.setEnable(false)
    }
    public update(time: number, delta: number): void {}
}
