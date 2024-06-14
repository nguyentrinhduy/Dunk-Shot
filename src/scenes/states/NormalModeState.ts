import { Scene } from 'phaser'
import { Ball } from '../../game-objects/Ball/Ball'
import { Basket } from '../../game-objects/Basket/Basket'
import { MapGenerator } from '../../managers/MapGenerator'
import { State } from './State'

export class NormalModeState extends State {
    camera: Phaser.Cameras.Scene2D.Camera
    private ball: Ball
    private basket: Basket[]
    private mapGenerator: MapGenerator
    private draggingZone: Phaser.GameObjects.Zone
    constructor(scene: Scene) {
        super(scene)
        this.mapGenerator = new MapGenerator(scene)
    }

    public create(): void {
        this.draggingZone = this.scene.add
            .zone(0, 0, 1000, 1000)
            .setOrigin(0)
            .setInteractive({ draggable: true })
        this.createBall()
        this.mapGenerator.setBall(this.ball)
        this.basket = this.mapGenerator.getFirstBaskets()
        this.scene.physics.world.gravity.y = 2000
        this.createCamera()
        this.add(this.ball)
        this.add(this.basket)
    }
    public update(time: number, delta: number): void {
        this.ball.update(time, delta)
    }
    private createBall() {
        this.ball = new Ball(this.scene, 300, 500).setDepth(1).setScale(0.4)
        this.ball.body
            .setCircle(100)
            .setOffset(-100)
            .setBounce(1)
            .setAllowGravity(true)
            .setImmovable(false)
            .setCollideWorldBounds(true)
    }
    private createCamera() {
        this.camera = this.scene.cameras.main
        this.camera.startFollow(this.ball, true, 0, 0.02, -100, 200)
    }
}
