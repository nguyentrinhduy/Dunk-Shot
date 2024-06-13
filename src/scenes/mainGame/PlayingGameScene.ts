import { Scene } from 'phaser'

import { Ball } from '../../game-objects/Ball/Ball'
import { Basket } from '../../game-objects/Basket/Basket'
import { MapGenerator } from '../../managers/MapGenerator'
export class PlayingGameScene extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera
    private ball: Ball
    private basket: Basket
    private mapGenerator: MapGenerator
    private draggingZone: Phaser.GameObjects.Zone
    constructor() {
        super('PlayingGameScene')
    }
    init() {
        this.mapGenerator = MapGenerator.getInstance()
        this.draggingZone = this.add.zone(0, 0, 1000, 1000).setOrigin(0).setInteractive({ draggable: true })
        this.createBall()
        this.createBasket()
        this.physics.world.gravity.y = 2000
    }
    private createBall() {
        this.ball = new Ball(this, 300, 500).setDepth(1).setScale(0.4)
        this.ball.body
            .setCircle(100)
            .setOffset(-100)
            .setBounce(1)
            .setAllowGravity(true)
            .setImmovable(false)
    }
    private createBasket() {
        this.basket = new Basket(this, 300, 700, this.ball)
    }
    create() {
        
    }
    update(time: number, delta: number) {
        // this.ball.update()
    }
}
