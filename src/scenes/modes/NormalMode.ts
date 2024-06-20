import { Scene } from 'phaser'
import { Ball } from '../../game-objects/ball/Ball'
import { MapGenerator } from '../../helpers/MapGenerator'
import { Mode } from './Mode'
import { WINDOW_SIZE } from '../../contstants/WindowSize'
import { DataManager } from '../../managers/DataManager'
import { AudioManager } from '../../managers/AudioManager'
import { StreakManager } from '../../managers/StreakManager'
import { Basket } from '../../game-objects/baskets/Basket'

export class NormalMode extends Mode {
    private camera: Phaser.Cameras.Scene2D.Camera
    private ball: Ball
    private baskets: Basket[]
    private mapGenerator: MapGenerator
    private draggingZone: Phaser.GameObjects.Zone
    private leftSideWall: Phaser.GameObjects.Rectangle
    private rightSideWall: Phaser.GameObjects.Rectangle
    private leftCollisionEffect: Phaser.GameObjects.Sprite
    private rightCollisionEffect: Phaser.GameObjects.Sprite
    public constructor(scene: Scene) {
        super(scene)
        this.create()
    }
    protected create(): void {
        this.mapGenerator = new MapGenerator(this.scene)
        this.draggingZone = this.scene.add
            .zone(0, 0, WINDOW_SIZE.WIDTH, WINDOW_SIZE.HEIGHT)
            .setOrigin(0)
            .setInteractive({ draggable: true })
        this.add(this.draggingZone)
        this.createBall()
        this.mapGenerator.setBall(this.ball)
        this.baskets = this.mapGenerator.getFirstBaskets()
        this.scene.physics.world.gravity.y = 2000
        DataManager.getInstance().reset()
        StreakManager.getInstance().reset()
        this.createCamera()
        this.createSideWalls()
    }
    public update(time: number, delta: number): void {
        this.ball.update(time, delta)
        if (DataManager.getInstance().getBallType() != this.ball.getBallType()) {
            this.ball.setBallType(DataManager.getInstance().getBallType())
        }
        this.baskets.forEach((basket) => basket.update(time, delta))
        this.leftSideWall.y = this.camera.scrollY
        this.rightSideWall.y = this.camera.scrollY
        this.draggingZone.y = this.camera.scrollY
        // lose
        if (this.ball.y > this.baskets[0].y + 600) {
            if (DataManager.getInstance().getScore() == 0) {
                this.ball.x = 200
                this.ball.y = 500
                this.ball.setAlpha(0).setRotation(0)
                this.ball.body.setVelocity(0, 0).setAllowGravity(false)
                this.scene.add.tween({
                    targets: this.ball,
                    alpha: 1,
                    duration: 500,
                    ease: 'Quad.easeIn',
                    onComplete: () => {
                        this.ball.body.setAllowGravity(true)
                    },
                })
                AudioManager.getInstance().getBallRecreationSound()
                this.baskets[0].resetRotation()
            } else {
                this.camera.stopFollow()
                this.manager.transitionToGameOverUI()
                this.scene.scene.pause('MainGameScene')
            }
        }
        if (this.baskets[1].containedBall) {
            DataManager.getInstance().addScore(StreakManager.getInstance().getStreak() - 1)
            this.mapGenerator.getNewBasket()
        }
    }
    private createBall() {
        this.ball = new Ball(this.scene, 200, 500)
            .setDepth(2)
            .setScale(0.4)
            .setAlpha(0)
            .setRotation(0)
        this.ball.body
            .setCircle(100)
            .setOffset(-100)
            .setBounce(0.8)
            .setAllowGravity(false)
            .setImmovable(false)
            .setVelocity(0, 0)
        this.scene.add.tween({
            targets: this.ball,
            alpha: 1,
            duration: 500,
            ease: 'Quad.easeIn',
            onComplete: () => {
                this.ball.body.setAllowGravity(true)
                AudioManager.getInstance().getBallRecreationSound()
            },
        })
    }
    private createCamera() {
        this.camera = this.scene.cameras.main
        this.camera.scrollY = 300
        this.camera.startFollow(this.ball, true, 0, 0.02, 200 - WINDOW_SIZE.WIDTH / 2, 200)
    }
    private createSideWalls() {
        this.leftCollisionEffect = this.scene.add
            .sprite(0, 0, 'left_collision_effect')
            .setOrigin(0, 0.5)
            .setAlpha(0)
            .setTint(0xf2b60f)
        this.leftCollisionEffect.scaleX = 0.4
        this.rightCollisionEffect = this.scene.add
            .sprite(0, 0, 'right_collision_effect')
            .setOrigin(1, 0.5)
            .setAlpha(0)
            .setTint(0xf2b60f)
        this.rightCollisionEffect.scaleX = 0.4
        this.add(this.leftCollisionEffect)
        this.add(this.rightCollisionEffect)
        this.leftSideWall = this.scene.add.rectangle(-10, 0, 10, WINDOW_SIZE.HEIGHT).setOrigin(0)
        this.scene.physics.add.existing(this.leftSideWall)
        ;(this.leftSideWall.body as Phaser.Physics.Arcade.Body)
            .setAllowGravity(false)
            .setImmovable(true)
        this.scene.physics.add.collider(this.ball, this.leftSideWall, () => {
            this.leftCollisionEffect.scaleY = 1
            this.leftCollisionEffect.setAlpha(1)
            ;(this.leftCollisionEffect.x = 0),
                (this.leftCollisionEffect.y = this.ball.y - this.ball.width / 2)
            this.scene.add.tween({
                targets: this.leftCollisionEffect,
                alpha: 0,
                scaleY: 2,
                duration: 200,
            })
            AudioManager.getInstance().getCollideWallSound()
        })
        this.add(this.leftSideWall)

        this.rightSideWall = this.scene.add
            .rectangle(WINDOW_SIZE.WIDTH, 0, 10, WINDOW_SIZE.HEIGHT)
            .setOrigin(0)
        this.scene.physics.add.existing(this.rightSideWall)
        ;(this.rightSideWall.body as Phaser.Physics.Arcade.Body)
            .setAllowGravity(false)
            .setImmovable(true)
        this.scene.physics.add.collider(this.ball, this.rightSideWall, () => {
            this.rightCollisionEffect.scaleY = 1
            this.rightCollisionEffect.setAlpha(1)
            ;(this.rightCollisionEffect.x = WINDOW_SIZE.WIDTH),
                (this.rightCollisionEffect.y = this.ball.y + this.ball.width / 2)
            this.scene.add.tween({
                targets: this.rightCollisionEffect,
                alpha: 0,
                scaleY: 2,
                duration: 200,
            })
            AudioManager.getInstance().getCollideWallSound()
        })
        this.add(this.rightSideWall)
    }
    public destroy(fromScene?: boolean | undefined): void {
        this.ball.destroy()
        this.baskets.forEach((basket) => basket.destroy())
        super.destroy()
    }
}
