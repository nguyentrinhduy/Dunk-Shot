import { GameObjects, Scene } from 'phaser'
import { FlameEffect } from './FlameEffect'
import { ball } from '../../contstants/resources/Sprite'
import { PredictionLine } from '../../helpers/PredictionLine'
export class Ball extends GameObjects.Container {
    declare body: Phaser.Physics.Arcade.Body
    private ballType: number
    private ballSprite: GameObjects.Sprite
    private flameEffect: FlameEffect
    private predictionLineHelper: PredictionLine
    public shootX: number
    public shootY: number
    public constructor(scene: Scene, x: number = 0, y: number = 0) {
        super(scene, x, y)
        this.x = x
        this.y = y
        this.flameEffect = new FlameEffect()
        this.predictionLineHelper = new PredictionLine(scene)
        this.ballSprite = scene.add.sprite(0, 0, 'balls00')
        this.add(this.ballSprite)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        console.log('already created ball')
        // this.setBallType(0)
    }
    public setBallType(ballType: number = 0) {
        this.ballType = ballType
        console.log(this.getBallKey())
        this.ballSprite.setTexture(this.getBallKey())
    }
    private getBallKey(): string {
        return (
            ball.key + Math.floor(this.ballType / 10).toString() + (this.ballType % 10).toString()
        )
    }
    public drawPredictionLine() {
        this.predictionLineHelper.draw(
            this.scene,
            this.x,
            this.y,
            this.shootX,
            this.shootY,
            this.scene.physics.world.gravity.y
        )
    }
    public clearPredictionLine(): void {
        this.predictionLineHelper.clear()
    }
    public shoot() {
        this.body.velocity.x = this.shootX
        this.body.velocity.y = this.shootY
        this.shootX = 0
        this.shootY = 0
    }
    public update(time: number, delta: number) {
        this.rotation += delta * this.body.velocity.x * 0.00005
    }
}
