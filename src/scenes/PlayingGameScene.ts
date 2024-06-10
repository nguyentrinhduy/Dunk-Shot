import { Scene } from 'phaser'
import { Ball } from '../game-objects/Ball'
import { CONSTANT } from '../constants'
import { Basket } from '../game-objects/Basket'
const { BALL, BASKET, GRAVITY } = CONSTANT.PLAYING_GAME_SCENE
export class PlayingGameScene extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera
    private ball: Ball
    private basket: Basket
    constructor() {
        super('PlayingGameScene')
        this.ball = new Ball(BALL.START_POSITION.X, BALL.START_POSITION.Y)
        this.basket = new Basket(300, 700)
    }

    create() {
        this.physics.world.gravity.y = GRAVITY
        // this.ball.draw(this, BALL.SCALE)
        // this.ball.setDepth(3)

        this.basket.draw(this)
        // this.basket.collidesWithBall(this, this.ball)
        this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
            if (pointer.isDown)
            this.basket.drag(pointer)
        })
        // this.input.once('pointerdown', () => {

        //     this.scene.start('GameOverScene');

        // });
    }
    update() {
        // this.ball.update()
    }
}
