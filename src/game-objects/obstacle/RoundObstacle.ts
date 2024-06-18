import { Scene } from 'phaser'
import { Obstacle } from './Obstacle'
import { Ball } from '../ball/Ball'
import { obstacle } from '../../contstants/resources/Sprite'
import { round_obstacle } from '../../contstants/Obstacle'
import { MathHelper } from '../../helpers/Math'
import { AudioManager } from '../../managers/AudioManager'

export class RoundObstacle extends Obstacle {
    private obstacleType: number
    private rotationVelocity: number
    public constructor(scene: Scene, x: number = 0, y: number = 0, ball: Ball, type: number) {
        super(scene, x, y, ball)
        this.obstacleType = type
        this.rotationVelocity = MathHelper.getRandomFloat(0.4, 0.5)
        this.addSprite()
        this.addColliders()
    }
    private addSprite() {
        this.sprite = this.scene.add
            .sprite(0, 0, round_obstacle[this.obstacleType].key)
            .setScale(0.7)
        this.add(this.sprite)
    }
    protected addColliders(): void {
        this.colliders = []
        // create circle
        round_obstacle[this.obstacleType].points.forEach((point) => {
            const collider = this.scene.add.circle(point.x, point.y, 8)
            this.scene.physics.add.existing(collider)
            ;(collider.body as Phaser.Physics.Arcade.Body)
                .setCircle(8)
                .setAllowGravity(false)
                .setBounce(0)
                .setImmovable(true)
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
    public update(time: number, delta: number): void {
        this.rotation += this.rotationVelocity * delta * 0.001
    }
}
