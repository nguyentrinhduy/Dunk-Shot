import { Game, GameObjects, Scene } from 'phaser'
import { Ball } from '../Ball/Ball'
import { BasketState } from './BasketState'
import { basket } from '../../contstants/Basket'
export class Basket extends GameObjects.Container {
    private roundUp: GameObjects.Sprite
    private roundUpContainer: GameObjects.Container
    private roundDown: GameObjects.Sprite
    private roundDownContainer: GameObjects.Container
    private net: GameObjects.Sprite

    private leftCollider: Phaser.GameObjects.Arc
    private rightCollider: Phaser.GameObjects.Arc
    private netColliders: Phaser.GameObjects.Arc[]
    public netOverlapper: Phaser.GameObjects.Arc

    public containedBall: boolean
    public checkOverlap: boolean
    private draggingAvailable: boolean
    private ball: Ball

    public constructor(scene: Scene, x: number = 0, y: number = 0, ball: Ball) {
        super(scene, x, y)
        this.netColliders = []
        this.state = BasketState.notContainBall
        this.ball = ball
        this.scene.add.existing(this)
        this.roundDownContainer = this.scene.add.container(x, y)
        this.roundUpContainer = this.scene.add.container(x, y)
        this.draggingAvailable = false
        this.containedBall = false
        this.checkOverlap = true
        this.addSprites()
        this.createColliders()
        this.registerDragging()
    }
    private addSprites(): void {
        this.roundUp = this.scene.add.sprite(0, 0, 'round_up').setTint(0xff0000)
        this.roundUpContainer.add(this.roundUp).setDepth(0)
        this.roundDown = this.scene.add.sprite(0, 0, 'round_down').setTint(0xff0000)
        this.roundDownContainer.add(this.roundDown).setDepth(3)
        this.setDepth(2)
        this.net = this.scene.add.sprite(0, 47, 'net').setDepth(0)
        this.net.scaleY = 1
        this.add(this.net)
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
            this.netColliders.push(collider)
        })
        this.add(this.netColliders)
        // create overlapper
        this.netOverlapper = this.scene.add.circle(0, 50, 15)
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
        if (this.checkOverlap && !this.containedBall) {
            this.checkOverlap = false
            this.containedBall = true
            this.ball.body
                .setBounce(0)
                .setAllowGravity(false)
                .setEnable(false)
            this.callElasticAnimation()
            this.draggingAvailable = true
        }
    }
    private callElasticAnimation() {
        this.scene.add.tween({
            targets: this,
            rotation: { value: 0, this: 100 },
            ease: 'linear'
        })
        this.scene.add.tween({
            targets: this.roundDownContainer,
            rotation: { value: 0, this: 100 },
            ease: 'linear'
        })
        this.scene.add.tween({
            targets: this.roundUpContainer,
            rotation: { value: 0, this: 100 },
            ease: 'linear'
        })
        this.scene.add.tween({
            targets: this.ball,
            x: { value: this.x },
            y: { value: this.y + 31},
            ease: 'linear',
            duration: 100,
            onComplete: () => {
                this.scene.add.tween({
                    targets: this.ball,
                    y: { value: this.y + 41 },
                    ease: 'linear',
                    yoyo: true,
                    duration: 50
                })
                this.scene.add.tween({
                    targets: this,
                    scaleY: 1.1,
                    duration: 50,
                    yoyo: true,
                    ease: 'Back.out'
                })
            }
        })
        

    }
    private registerDragging() {
        this.scene.input.dragDistanceThreshold = 10
        this.scene.input.on(
            'drag',
            (
                pointer: Phaser.Input.Pointer,
                gameObject: GameObjects.GameObject,
                dragX: number,
                dragY: number
            ) => {
                if (!this.draggingAvailable) return
                const angle = -Phaser.Math.Angle.BetweenY(
                    pointer.downX,
                    pointer.downY,
                    pointer.x,
                    pointer.y
                )
                const length = Math.min(
                    Phaser.Math.Distance.Between(
                        pointer.downX,
                        pointer.downY,
                        pointer.x,
                        pointer.y
                    ),
                    200
                )
                // max 27
                this.setRotation(angle)
                this.roundDown.setRotation(angle)
                this.roundUp.setRotation(angle)
                this.ball.x = this.x - ((length + 500) * Math.sin(angle)) / 15
                this.ball.y = this.y + ((length + 500) * Math.cos(angle)) / 15
                this.ball.shootX = length * Math.sin(angle) * 8
                this.ball.shootY = -length * Math.cos(angle) * 8
                this.scaleY = 1 + length/1000
                this.ball.drawPredictionLine()
            }
        )
        this.scene.input.on('dragend', () => {
            if (!this.draggingAvailable) return
            this.draggingAvailable = false
            this.ball.body
                .setAllowGravity(true)
                .setImmovable(false)
                .setEnable(true)
                .setBounce(1)
            this.ball.clearPredictionLine()
            this.ball.shoot()
            this.scene.tweens.chain({
                targets: this,
                tweens: [
                    {
                        scaleY: { value: 1, duration: 50 },
                        ease: 'Back.out'
                    },
                    {
                        scaleY: { value: 1.1, duration: 50},
                        ease: 'Back.out',
                        yoyo: true
                    }
                ]
                
            })
        })
    }
    public update(time: number, delta: number) {
        this.roundDownContainer.x = this.x
        this.roundDownContainer.y = this.y
        this.roundUpContainer.x = this.x
        this.roundUpContainer.y = this.y
        
    }
}