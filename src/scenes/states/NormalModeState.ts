import { Scene } from 'phaser'
import { Ball } from '../../game-objects/Ball/Ball'
import { Basket } from '../../game-objects/Basket/Basket'
import { MapGenerator } from '../../helpers/MapGenerator'
import { State } from './State'
import { WINDOW_SIZE } from '../../contstants/WindowSize'
import { DataManager } from '../../managers/DataManager'

export class NormalModeState extends State {
    private camera: Phaser.Cameras.Scene2D.Camera
    private ball: Ball
    private baskets: Basket[]
    private mapGenerator: MapGenerator
    private draggingZone: Phaser.GameObjects.Zone
    private leftSideWall: Phaser.GameObjects.Rectangle
    private rightSideWall: Phaser.GameObjects.Rectangle
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
        this.createBall()
        this.mapGenerator.setBall(this.ball)
        this.baskets = this.mapGenerator.getFirstBaskets()
        this.scene.physics.world.gravity.y = 2000
        this.createCamera()
        this.createSideWalls()
        this.add(this.ball)
        this.add(this.baskets)
    }
    public update(time: number, delta: number): void {
        this.ball.update(time, delta)
        this.baskets.forEach((basket) => basket.update(time, delta))
        this.leftSideWall.y = this.camera.scrollY
        this.rightSideWall.y = this.camera.scrollY
        this.draggingZone.y = this.camera.scrollY
        // lose
        if (this.ball.y > this.baskets[0].y + 400) {
            if (DataManager.getInstance().getScore() == 0) {
                this.ball.x = 200
                this.ball.y = 500
                this.ball.setAlpha(0).setRotation(0)
                this.ball.body
                    .setVelocity(0, 0)
                    .setAllowGravity(false)
                this.scene.add.tween({
                    targets: this.ball,
                    alpha: 1,
                    duration: 500,
                    ease: 'Quad.easeIn',
                    onComplete: () => {
                        this.ball.body
                            .setAllowGravity(true)
                    }
                })
                this.baskets[0].resetRotation()
            }
            else {
                this.camera.stopFollow()
                this.manager.transitionToGameOverUI()
            }
        }
        this.mapGenerator.getNextState()
    }
    private createBall() {
        this.ball = new Ball(this.scene, 200, 500).setDepth(1).setScale(0.4)
        this.ball.body
            .setCircle(100)
            .setOffset(-100)
            .setBounce(0.8)
            .setAllowGravity(true)
            .setImmovable(false)
    }
    private createCamera() {
        this.camera = this.scene.cameras.main
        this.camera.startFollow(this.ball, true, 0, 0.02, 200 - WINDOW_SIZE.WIDTH / 2, 200)
    }
    private createSideWalls() {
        this.leftSideWall = this.scene.add
            .rectangle(-10, 0, 10, WINDOW_SIZE.HEIGHT, 0x000000)
            .setOrigin(0)
        this.scene.physics.add.existing(this.leftSideWall)
        ;(this.leftSideWall.body as Phaser.Physics.Arcade.Body)
            .setAllowGravity(false)
            .setImmovable(true)
        this.scene.physics.add.collider(this.ball, this.leftSideWall)
        this.rightSideWall = this.scene.add
            .rectangle(WINDOW_SIZE.WIDTH, 0, 10, WINDOW_SIZE.HEIGHT, 0x000000)
            .setOrigin(0)
        this.scene.physics.add.existing(this.rightSideWall)
        ;(this.rightSideWall.body as Phaser.Physics.Arcade.Body)
            .setAllowGravity(false)
            .setImmovable(true)
        this.scene.physics.add.collider(this.ball, this.rightSideWall)
    }
}
