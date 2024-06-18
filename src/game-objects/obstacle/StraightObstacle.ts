import { Scene } from 'phaser'
import { Obstacle } from './Obstacle'
import { Ball } from '../ball/Ball'
import { straight_obstacle } from '../../contstants/Obstacle'
import { AudioManager } from '../../managers/AudioManager'

export class StraightObstacle extends Obstacle {
    public constructor(scene: Scene, x: number = 0, y: number = 0, ball: Ball) {
        super(scene, x, y, ball)
        this.addSprite()
        this.addColliders()
    }
    private addSprite() {
        this.sprite = this.scene.add.sprite(0, 0, straight_obstacle.key)
        this.add(this.sprite)
    }
    protected addColliders(): void {
        this.colliders = []
        straight_obstacle.points.forEach((point) => {
            const collider = this.scene.add.circle(point.x, point.y, 12)
            this.scene.physics.add.existing(collider)
            ;(collider.body as Phaser.Physics.Arcade.Body)
                .setCircle(12)
                .setAllowGravity(false)
                .setBounce(0)
                .setImmovable(true)

            // set debug circle to green

            this.scene.physics.add.collider(this.ball, collider, () => {
                AudioManager.getInstance().getCollideWallSound()
            })
            this.colliders.push(collider)
        })
        this.add(this.colliders)
    }
    public setNotAllowPhysics(): void {
        for (const collider of this.colliders) {
            ;(collider.body as Phaser.Physics.Arcade.Body).setEnable(false)
        }
    }
    public update(time: number, delta: number): void {}
}
