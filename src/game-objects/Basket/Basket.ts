import { Game, GameObjects, Scene } from "phaser";
import { Ball } from "../Ball/Ball";
import { BasketState } from "./BasketState";
const { BASKETS } = CONSTANT.SPRITES
export class Basket {
    private round_up: GameObjects.Image
    private round_down: GameObjects.Image
    private net: GameObjects.Image
    private netContainer: GameObjects.Container
    private roundUpContainer: GameObjects.Container
    private roundDownContainer: GameObjects.Container
    private leftCollider: Phaser.Types.Physics.Arcade.ImageWithDynamicBody
    private rightCollider: Phaser.Types.Physics.Arcade.ImageWithDynamicBody
    private netCollider: Phaser.Types.Physics.Arcade.ImageWithDynamicBody[]
    private state: BasketState
    private scene: Phaser.Scene
    private ball: Ball
    private x: number
    private y: number
    public constructor(x: number = 0, y: number = 0) {
        this.x = x
        this.y = y
        this.netCollider = []
    }
    public draw(currentScene: Scene, scale: number = 1) {
        this.scene = currentScene
        this.leftCollider = currentScene.physics.add.image(
            BASKETS.COLLIDER.LEFT.POSITION.X, 
            BASKETS.COLLIDER.LEFT.POSITION.Y,
            ''
        )
        this.leftCollider.setCircle(BASKETS.COLLIDER.LEFT.RADIUS_BOUND)
        this.leftCollider.body.setAllowGravity(false)
        this.leftCollider.body.setImmovable(true)
        this.leftCollider.setVisible(false)
        this.rightCollider = currentScene.physics.add.image(
            BASKETS.COLLIDER.RIGHT.POSITION.X,
            BASKETS.COLLIDER.RIGHT.POSITION.Y,
            ''
        )
        this.rightCollider.setCircle(BASKETS.COLLIDER.RIGHT.RADIUS_BOUND)
        this.rightCollider.body.setAllowGravity(false)
        this.rightCollider.body.setImmovable(true)
        this.rightCollider.setVisible(false)

        const startPoint = new Phaser.Math.Vector2(-60, -10);
        const controlPoint1 = new Phaser.Math.Vector2(-30, 60);
        const controlPoint2 = new Phaser.Math.Vector2(55, 60);
        const endPoint = new Phaser.Math.Vector2(85, -10);

        const curve = new Phaser.Curves.CubicBezier(startPoint, controlPoint1, controlPoint2, endPoint);
        const points = curve.getPoints(16);

        points.forEach(point => {
            const collider = currentScene.physics.add.image(point.x, point.y, '');
            collider.setCircle(5); // Change this to the radius of the collider
            collider.body.setAllowGravity(false);
            collider.body.setImmovable(true);
            collider.setVisible(false);
            this.netCollider.push(collider);
        });
        
        this.round_up = currentScene.add.image(
            BASKETS.ROUND_UP.POSITION.X,
            BASKETS.ROUND_UP.POSITION.Y,
            BASKETS.ROUND_UP.KEY
        )
        this.round_up.setTint(BASKETS.ROUND_UP.TINT)
        
        this.round_down = currentScene.add.image(
            BASKETS.ROUND_DOWN.POSITION.X,
            BASKETS.ROUND_DOWN.POSITION.Y,
            BASKETS.ROUND_DOWN.KEY
        )
        this.round_down.setTint(BASKETS.ROUND_DOWN.TINT)
        
        this.net = currentScene.add.image(
            BASKETS.NET.POSITION.X,
            BASKETS.NET.POSITION.Y,
            BASKETS.NET.KEY
        )
        this.netContainer = currentScene.add.container(this.x, this.y, [this.net, this.leftCollider, this.rightCollider])
        this.netCollider.forEach(element => {
            this.netContainer.add(element)
        });
        this.roundDownContainer = currentScene.add.container(this.x, this.y, [this.round_down])
        this.roundDownContainer.setDepth(7)
        this.roundUpContainer = currentScene.add.container(this.x, this.y, [this.round_up])
        this.roundUpContainer.setDepth(1)
        this.netContainer.setDepth(6)
    }
    public getContainer() {

    }
    public collidesWithBall(currentScene: Scene, ball: Ball) {
        this.ball = ball
        let ballObject = ball.getBallObject()
        currentScene.physics.add.collider(ballObject, this.leftCollider)
        currentScene.physics.add.collider(ballObject, this.rightCollider)
        for (let i = 0; i <= 16; i ++) {
            if (i == 9) {
                currentScene.physics.add.collider(ballObject, this.netCollider[i], this.onBallCollider)
            }
            else{
                currentScene.physics.add.collider(ballObject, this.netCollider[i])
            }
        }
    }
    public drag(pointer: Phaser.Input.Pointer) {
        // if (this.state == BasketState.notContainBall) return
        let direction = new Phaser.Math.Vector2(pointer.downX - pointer.x, pointer.downY - pointer.y)
        let straignDirection = new Phaser.Math.Vector2(0, 1)
        let angle = Phaser.Math.RadToDeg(Phaser.Math.Angle.BetweenPoints(
            new Phaser.Math.Vector2(pointer.downX, pointer.downY),
            new Phaser.Math.Vector2(pointer.x, pointer.y)
        )) - 90
        this.netContainer.setAngle(angle)
        this.roundDownContainer.setAngle(angle)
        this.roundUpContainer.setAngle(angle)
        let length = Phaser.Math.Distance.Between(pointer.downX, pointer.downY, pointer.x, pointer.y)
        this.net.scaleY = 1 + 0.5*Math.min(length, 300)/300
    }
    public undrag() {
        
    }
    private onBallCollider = () => {
        let ballObject = this.ball.getBallObject()
        
        console.log(ballObject.x, this.netCollider[8].x)
        this.onBallentered()
    }
    private onBallentered() {
        let ballObject = this.ball.getBallObject()
        ballObject.setVelocity(0, 0)
        let positionY = ballObject.y
        ballObject.body.setAllowGravity(false)
        ballObject.body.setImmovable(true)
        ballObject.body.setEnable(false)
        this.scene.tweens.chain({
            targets: this.netContainer,
            tweens: [
                {
                    angle: 0,
                    duration: 20,
                    ease: 'linear'
                },
                {
                    scaleY: {
                        value: 1.3,
                        duration: 50
                    },
                    ease: 'linear'
                },
                {
                    scaleY: {
                        value: 1,
                        duration: 50
                    },
                    ease: 'linear'
                }
            ]
        })
        this.scene.tweens.chain({
            targets: ballObject,
            tweens: [
                {
                    y: { value: this.netContainer.y + this.netCollider[9].y - ballObject.body.width + 35, duration: 50, ease: 'linear'},
                    // x: { value: this.container.x + this.netCollider[8].x}
                },
                {
                    y: { value: this.netContainer.y + this.netCollider[9].y - ballObject.body.width + 23, duration: 50, ease: 'linear'},
                }
            ],
            onComplete: () => {
                ballObject.body.setEnable(true)
                
            }
        })
    }
    public setX(x: number) {
        this.netContainer.setX(x)
        this.x = x
    }
    public setY(y: number) {
        this.netContainer.setY(y)
        this.y = y
    }
}