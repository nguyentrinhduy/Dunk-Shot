import { GameObjects, Scene } from "phaser";
import { CONSTANT } from "../constants";
const { BALLS } = CONSTANT.SPRITES
export class Ball {
    private ballType: number
    private ball: Phaser.Types.Physics.Arcade.ImageWithDynamicBody
    private x: number
    private y: number
    public constructor(x: number, y: number, ballType = 0) {
        this.ballType = ballType
        this.x = x
        this.y = y
    }
    public setPhysics(currentScene: Scene) {
        
    }
    public setDepth(depth: number) {
        this.ball.setDepth(depth)
    }
    public setBallType(ballType: number) {
        this.ballType = ballType
    }
    public getBallObject(): Phaser.Types.Physics.Arcade.ImageWithDynamicBody {
        return this.ball
    }
    public draw(currentScene: Scene, scale: number = 1) {
        this.ball = currentScene.physics.add.image(this.x, this.y, this.getBallKey())
        this.ball.setScale(scale)
        this.ball.setCircle(BALLS.RADIUS_BOUND)
        this.ball.setCollideWorldBounds(true)
        this.ball.setBounce(1, 1)
    }
    private getBallKey(): string {
        console.log(BALLS.KEY + Math.floor(this.ballType/10).toString() + (this.ballType%10).toString())
        return BALLS.KEY + Math.floor(this.ballType/10).toString() + (this.ballType%10).toString()
    }
    public update() {
        this.ball.rotation += 0.0005*this.ball.body.velocity.x
    }
    public rotate() {

    }
}