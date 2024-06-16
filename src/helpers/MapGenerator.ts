import { Scene } from "phaser";
import { Ball } from "../game-objects/Ball/Ball";
import { Basket } from "../game-objects/Basket/Basket";
import { WINDOW_SIZE } from "../contstants/WindowSize";
import { Obstacle } from "../game-objects/Obstacles.ts/Obstacle";
import { MathHelper } from "./Math";

export class MapGenerator {
    private baskets: Basket[]
    private obstacle: Obstacle
    private ball: Ball
    private scene: Scene
    public constructor(scene: Scene) {
        this.scene = scene
        this.baskets = []
    }
    public getNewBasket(): void {
        let basket = this.baskets.shift()
        if (basket) {
            basket!.destroy()
        }
        // generate moving or still basket?
        let random = MathHelper.getRandomInt(0, 1)
        switch (random) {
            case 0:
                this.getStillBasket()
                break
            case 1:
                this.getMovingBasket()
                break
        }
        
    }
    private getStillBasket(): void {
        if (this.baskets[0].x < WINDOW_SIZE.WIDTH/2) {
            let newX = MathHelper.getRandomFloat(WINDOW_SIZE.WIDTH/2 + 100, WINDOW_SIZE.WIDTH - 100)
            let newY = MathHelper.getRandomFloat(this.baskets[0].y - 100, this.baskets[0].y - 300)
            let rotation = MathHelper.getRandomFloat(- Math.PI/4, 0)
            this.baskets.push(new Basket(this.scene, newX, newY, this.ball, rotation))
        }
        else {
            let newX = MathHelper.getRandomFloat(100, WINDOW_SIZE.WIDTH/2 - 100)
            let newY = MathHelper.getRandomFloat(this.baskets[0].y - 100, this.baskets[0].y - 300)
            let rotation = MathHelper.getRandomFloat(0, Math.PI/4)
            this.baskets.push(new Basket(this.scene, newX, newY, this.ball, rotation))
        }
    }
    private getMovingBasket(): void {
        if (this.baskets[0].x < WINDOW_SIZE.WIDTH/2) {
            let newX = MathHelper.getRandomFloat(WINDOW_SIZE.WIDTH/2 + 100, WINDOW_SIZE.WIDTH - 100)
            let newY = MathHelper.getRandomFloat(this.baskets[0].y - 100, this.baskets[0].y - 300)
            let rotation = MathHelper.getRandomFloat(- Math.PI/4, 0)
            this.baskets.push(new Basket(this.scene, newX, newY, this.ball, rotation))
        }
        else {
            let newX = MathHelper.getRandomFloat(100, WINDOW_SIZE.WIDTH/2 - 100)
            let newY = MathHelper.getRandomFloat(this.baskets[0].y - 100, this.baskets[0].y - 300)
            let rotation = MathHelper.getRandomFloat(0, Math.PI/4)
            this.baskets.push(new Basket(this.scene, newX, newY, this.ball, rotation))
        }
    }
    public getNextState(): void {
        if (this.baskets[1].containedBall) {
            this.getNewBasket()
        }
    }
    public setBall(ball: Ball): void {
        this.ball = ball
    }
    public getFirstBaskets(): Basket[] {
        this.baskets.push(new Basket(this.scene, 200, 700, this.ball))
        this.baskets.push(new Basket(this.scene, 500, 500, this.ball))
        this.baskets[0].setFirstTurn()
        return this.baskets
    }
}