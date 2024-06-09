import { Game, GameObjects, Scene } from "phaser";
import { CONSTANT } from "../constants";
import { Ball } from "./Ball";
const { BASKETS } = CONSTANT.SPRITES
export class Basket {
    private round_up: GameObjects.Image
    private round_down: GameObjects.Image
    private net: GameObjects.Image
    private container: GameObjects.Container
    private leftCollider: Phaser.Types.Physics.Arcade.ImageWithDynamicBody
    private rightCollider: Phaser.Types.Physics.Arcade.ImageWithDynamicBody
    private netCollider: Phaser.Types.Physics.Arcade.ImageWithDynamicBody[]
    private scene: Phaser.Scene
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
            this.x + BASKETS.ROUND_UP.POSITION.X,
            this.y + BASKETS.ROUND_UP.POSITION.Y,
            BASKETS.ROUND_UP.KEY
        )
        this.round_up.setTint(BASKETS.ROUND_UP.TINT)
        this.round_up.setDepth(1)
        this.round_down = currentScene.add.image(
            this.x + BASKETS.ROUND_DOWN.POSITION.X,
            this.y + BASKETS.ROUND_DOWN.POSITION.Y,
            BASKETS.ROUND_DOWN.KEY
        )
        this.round_down.setTint(BASKETS.ROUND_DOWN.TINT)
        this.round_down.setDepth(7)
        this.net = currentScene.add.image(
            BASKETS.NET.POSITION.X,
            BASKETS.NET.POSITION.Y,
            BASKETS.NET.KEY
        )
        this.container = currentScene.add.container(this.x, this.y, [this.net, this.leftCollider, this.rightCollider])
        this.netCollider.forEach(element => {
            this.container.add(element)
        });
        this.container.setDepth(6)
    }
    public getContainer() {

    }
    public collidesWithBall(currentScene: Scene, ball: Ball) {
        let ballObject = ball.getBallObject()
        currentScene.physics.add.collider(ballObject, this.leftCollider)
        currentScene.physics.add.collider(ballObject, this.rightCollider)
        this.netCollider.forEach(collider => {
            const netCollider = currentScene.physics.add.collider(ballObject, collider, this.onNetElastic);
            // netCollider.collideCallback = this.onNetElastic
        });
    }
    private onNetElastic = (ballObject: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile, collider: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile) => {
        const ball = ballObject as Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
        ball.setVelocity(0, 0)
        this.container.y += 10
        this.scene.tweens.add({
            targets: this.container,
            y: '-=10',
            duration: 200,
            ease: 'Bounce',
            // onComplete: () => {
            //     if (ball.body.velocity.x === 0 && ball.body.velocity.y === 0) {
            //         this.scene.physics.world.colliders.remove(collider);
            //     }
            // }
        })
    }
    public setX(x: number) {
        this.container.setX(x)
        this.x = x
    }
    public setY(y: number) {
        this.container.setY(y)
        this.y = y
    }
}