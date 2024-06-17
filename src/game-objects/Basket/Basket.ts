import { Game, GameObjects, Scene } from 'phaser'
import { Ball } from '../Ball/Ball'
import { BasketState } from './BasketState'
import { basket } from '../../contstants/Basket'
import { Star } from './Star'
import { Obstacle } from '../Obstacles.ts/Obstacle'
import { StraightObstacle } from '../Obstacles.ts/StraightObstacle'
import { PredictionLine } from '../../helpers/PredictionLine'
import { DataManager } from '../../managers/DataManager'
import { Path } from '../../helpers/Path'
export class Basket extends GameObjects.Container {
    private roundUp: GameObjects.Sprite
    private roundUpContainer: GameObjects.Container
    private roundDown: GameObjects.Sprite
    private roundDownContainer: GameObjects.Container
    private effect: GameObjects.Sprite
    private net: GameObjects.Sprite

    private leftCollider: Phaser.GameObjects.Arc
    private rightCollider: Phaser.GameObjects.Arc
    private netColliders: Phaser.GameObjects.Arc[]
    public netOverlapper: Phaser.GameObjects.Arc

    public checkOverlap: boolean
    public containedBall: boolean
    public containingBall: boolean
    private firstTurn: boolean
    private ball: Ball
    private star: Star
    private obstacle: Obstacle
    private line: PredictionLine
    private path: Path
    
    public constructor(
        scene: Scene,
        x: number = 0,
        y: number = 0,
        ball: Ball,
        rotation: number = 0
    ) {
        super(scene, x, y)
        this.netColliders = []
        this.state = BasketState.notContainBall
        this.ball = ball
        this.scene.add.existing(this)
        this.roundDownContainer = this.scene.add.container(x, y)
        this.roundUpContainer = this.scene.add.container(x, y)
        this.containingBall = false
        this.containedBall = false
        this.checkOverlap = true
        this.addSprites(rotation)
        this.createColliders()
        this.registerDragging()
        this.createLine()
        this.setPath()
    }

    private addSprites(rotation: number): void {
        this.roundUp = this.scene.add.sprite(0, 0, 'round_up').setTint(0xff0000)
        this.roundUpContainer.add(this.roundUp).setDepth(1).setRotation(rotation)
        this.roundDown = this.scene.add.sprite(0, 0, 'round_down').setTint(0xff0000)
        this.roundDownContainer.add(this.roundDown).setDepth(4).setRotation(rotation)
        this.effect = this.scene.add.sprite(0, 0, 'basket_effect').setTint(0xa80707).setDepth(4).setAlpha(0)
        this.roundDownContainer.add(this.effect)
        this.setDepth(3).setRotation(rotation)
        this.net = this.scene.add.sprite(0, 47, 'net').setDepth(0)
        this.net.scaleY = 1
        this.add(this.net)
    }
    public setPath(startPoint: Phaser.Math.Vector2 = new Phaser.Math.Vector2(this.x, this.y), endPoint: Phaser.Math.Vector2 = new Phaser.Math.Vector2(this.x, this.y)) {
        this.path = new Path(startPoint, endPoint)
        this.line.drawLinePath(startPoint.x, startPoint.y, endPoint.x, endPoint.y)
    }
    public setFirstTurn() {
        this.firstTurn = true
    }
    private createLine() {
        this.line = new PredictionLine(this.scene)
    }
    public addStar(star: Star): void {
        this.star = star
        this.add(this.star)
    }
    public addObstacle(obstacle: Obstacle): void {
        this.obstacle = obstacle
    }
    private createColliders(): void {
        // add left collider
        this.leftCollider = this.scene.add.circle(-82, 0, 10)
        this.scene.physics.add.existing(this.leftCollider)
        ;(this.leftCollider.body as Phaser.Physics.Arcade.Body)
            .setAllowGravity(false)
            .setImmovable(true)
            .setBounce(0)
            .setCircle(10)
        this.add(this.leftCollider)
        this.scene.physics.add.collider(this.ball, this.leftCollider)

        // add right collider
        this.rightCollider = this.scene.add.circle(82, 0, 10)
        this.scene.physics.add.existing(this.rightCollider)
        ;(this.rightCollider.body as Phaser.Physics.Arcade.Body)
            .setAllowGravity(false)
            .setImmovable(true)
            .setBounce(0)
            .setCircle(10)
        this.add(this.rightCollider)
        this.scene.physics.add.collider(this.ball, this.rightCollider)

        // add net colliders
        const startPoint = new Phaser.Math.Vector2(-70, 25)
        const controlPoint1 = new Phaser.Math.Vector2(-25, 100)
        const controlPoint2 = new Phaser.Math.Vector2(45, 95)
        const endPoint = new Phaser.Math.Vector2(80, 10)

        const curve = new Phaser.Curves.CubicBezier(
            startPoint,
            controlPoint1,
            controlPoint2,
            endPoint
        )
        const points = curve.getPoints(basket.net_colliders_number)

        points.forEach((point) => {
            const collider = this.scene.add.circle(point.x, point.y, 5)
            this.scene.physics.add.existing(collider)
            ;(collider.body as Phaser.Physics.Arcade.Body)
                .setAllowGravity(false)
                .setImmovable(true)
                .setBounce(0)
                .setCircle(5)
            this.scene.physics.add.collider(this.ball, collider)
            this.add(collider)
            this.netColliders.push(collider)
        })
        // create overlapper
        this.netOverlapper = this.scene.add.circle(0, 60, 15)
        this.scene.physics.add.existing(this.netOverlapper)
        ;(this.netOverlapper.body as Phaser.Physics.Arcade.Body)
            .setAllowGravity(false)
            .setImmovable(true)
            .setBounce(0)
            .setCircle(15)
        this.add(this.netOverlapper)
        this.scene.physics.add.overlap(this.ball, this.netOverlapper, this.handleNetOverlapped)
    }
    private handleNetOverlapped = () => {
        if (!this.containingBall && this.checkOverlap) {
            this.containingBall = true
            this.checkOverlap = false
            if (!this.containedBall) {
                this.containedBall = true
                this.setPath(new Phaser.Math.Vector2(this.x, this.y), new Phaser.Math.Vector2(this.x, this.y))
                if (this.star) {
                    this.star.setVisible(false)
                    this.star.body.setEnable(false)
                }
                if (this.obstacle) {
                    this.obstacle.setVisible(false)
                    this.obstacle.setNotAllowPhysics()
                }
                if (!this.firstTurn) {
                    this.roundDown.setTint(0x636363)
                    this.roundUp.setTint(0x636363)
                    DataManager.getInstance().addScore(1)
                }
            }
            this.ball.body.setBounce(0).setAllowGravity(false).setEnable(false).setVelocity(0)
            this.callElasticAnimation()
        }
    }
    private callElasticAnimation() {
        this.effect.setAlpha(1).setScale(0.4)
        this.scene.add.tween({
            targets: this.effect,
            duration: 100,
            alpha: 0,
            scale: 0.8,
            ease: 'linear',
        })
        this.scene.add.tween({
            targets: this,
            duration: 100,
            rotation: 0,
            ease: 'linear',
        })
        this.scene.add.tween({
            targets: this.roundDownContainer,
            duration: 100,
            rotation: 0,
            ease: 'linear',
        })
        this.scene.add.tween({
            targets: this.roundUpContainer,
            duration: 100,
            rotation: 0,
            ease: 'linear',
        })
        
        this.scene.add.tween({
            targets: this.ball,
            x: { value: this.x },
            y: { value: this.y + 31 },
            ease: 'Back.out',
            duration: 30,
            onComplete: () => {
                this.scene.add.tween({
                    targets: this.ball,
                    y: { value: this.y + 41 },
                    ease: 'linear',
                    yoyo: true,
                    duration: 50,
                })
                this.scene.add.tween({
                    targets: this,
                    scaleY: 1.1,
                    duration: 50,
                    yoyo: true,
                    ease: 'linear',
                })
            },
        })
    }
    private registerDragging() {
        this.scene.input.dragTimeThreshold = 30
        this.scene.input.on(
            'drag',
            (
                pointer: Phaser.Input.Pointer,
                gameObject: GameObjects.GameObject,
                dragX: number,
                dragY: number
            ) => {
                const length = Math.min(
                    Phaser.Math.Distance.Between(
                        pointer.downX,
                        pointer.downY,
                        pointer.x,
                        pointer.y
                    ),
                    200
                )
                if (!this.containingBall) return
                const rotation = -Phaser.Math.Angle.BetweenY(
                    pointer.downX,
                    pointer.downY,
                    pointer.x,
                    pointer.y
                )
                this.setRotation(rotation)
                this.roundDownContainer.setRotation(rotation)
                this.roundUpContainer.setRotation(rotation)
                this.ball.x = this.x - ((length + 500) * Math.sin(rotation)) / 15
                this.ball.y = this.y + ((length + 500) * Math.cos(rotation)) / 15
                this.ball.shootX = length * Math.sin(rotation) * 8
                this.ball.shootY = -length * Math.cos(rotation) * 8
                this.scaleY = 1 + length / 1000
                this.ball.drawPredictionLine()
            }
        )
        this.scene.input.on('dragend', () => {
            if (!this.containingBall) return
            this.containingBall = false
            this.ball.body.setAllowGravity(true).setImmovable(false).setEnable(true).setBounce(0.9)
            this.ball.clearPredictionLine()
            this.ball.shoot()
            this.scene.tweens.chain({
                targets: this,
                tweens: [
                    {
                        scaleY: 1,
                        duration: 50,
                        ease: 'linear',
                    },
                    {
                        scaleY: 1.1,
                        duration: 50,
                        ease: 'linear',
                        yoyo: true,
                    },
                ],
            })
            this.scene.time.delayedCall(100, () => {
                this.checkOverlap = true
            })
        })
    }
    public resetRotation() : void {
        this.scene.add.tween({
            targets: this,
            duration: 100,
            rotation: 0,
            ease: 'linear',
        })
        this.scene.add.tween({
            targets: this.roundDownContainer,
            duration: 100,
            rotation: 0,
            ease: 'linear',
        })
        this.scene.add.tween({
            targets: this.roundUpContainer,
            duration: 100,
            rotation: 0,
            ease: 'linear',
        })
    }
    public update(time: number, delta: number) {
        if (this.star) this.star.update(time, delta)
        if (this.obstacle) this.obstacle.update(time, delta)
        const point = this.path.getNewPosition(time, delta)
        this.x = point.x
        this.y = point.y
        this.roundDownContainer.x = this.x
        this.roundDownContainer.y = this.y
        this.roundUpContainer.x = this.x
        this.roundUpContainer.y = this.y
    }

    public destroy() {
        this.roundDownContainer.destroy()
        this.roundUpContainer.destroy()
        this.line.destroy()
        if (this.star) this.star.destroy()
        if (this.obstacle) this.obstacle.destroy()
        super.destroy()
    }
}
