import { GameObjects, Scene } from "phaser";

export class Ball extends Phaser.GameObjects.Container{
    private ballType: number
    private ball: Phaser.Types.Physics.Arcade.ImageWithDynamicBody
    
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