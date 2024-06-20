import { Scene } from 'phaser'
import { Ball } from '../game-objects/ball/Ball'
import { WINDOW_SIZE } from '../contstants/WindowSize'
import { Obstacle } from '../game-objects/obstacle/Obstacle'
import { MathHelper } from './Math'
import { StraightObstacle } from '../game-objects/obstacle/StraightObstacle'
import { BouncerObstacle } from '../game-objects/obstacle/BouncerObstacle'
import { RoundObstacle } from '../game-objects/obstacle/RoundObstacle'
import { Star } from '../game-objects/baskets/Star'
import { Basket } from '../game-objects/baskets/Basket'

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
        let random = MathHelper.getRandomInt(1, 100)
        if (random <= 80) {
            this.getStillBasket()
        } else {
            this.getMovingBasket()
        }
    }
    private getStillBasket(): void {
        if (this.baskets[0].x < WINDOW_SIZE.WIDTH / 2) {
            let newX = MathHelper.getRandomFloat(
                WINDOW_SIZE.WIDTH / 2 + 100,
                WINDOW_SIZE.WIDTH - 100
            )
            let newY = MathHelper.getRandomFloat(this.baskets[0].y - 100, this.baskets[0].y - 300)
            let rotation = MathHelper.getRandomFloat(-Math.PI / 4, 0)
            this.baskets.push(new Basket(this.scene, newX, newY, this.ball, rotation))
        } else {
            let newX = MathHelper.getRandomFloat(100, WINDOW_SIZE.WIDTH / 2 - 100)
            let newY = MathHelper.getRandomFloat(this.baskets[0].y - 100, this.baskets[0].y - 300)
            let rotation = MathHelper.getRandomFloat(0, Math.PI / 4)
            this.baskets.push(new Basket(this.scene, newX, newY, this.ball, rotation))
        }

        // random star
        let random = MathHelper.getRandomInt(1, 100)
        if (random <= 40) {
            this.getStar()
            return
        }

        // random obstacle
        random = MathHelper.getRandomInt(1, 100)
        if (random <= 70) return
        this.getObstacle()
    }
    private getMovingBasket(): void {
        if (this.baskets[0].x < WINDOW_SIZE.WIDTH / 2) {
            let range = 0
            let newX = MathHelper.getRandomFloat(
                WINDOW_SIZE.WIDTH / 2 + 100,
                WINDOW_SIZE.WIDTH - 100
            )
            let newY = MathHelper.getRandomFloat(this.baskets[0].y - 100, this.baskets[0].y - 300)
            let rotation = MathHelper.getRandomFloat(-Math.PI / 4, 0)
            this.baskets.push(new Basket(this.scene, newX, newY, this.ball, rotation))
            let random = MathHelper.getRandomInt(0, 1)
            switch (random) {
                case 0: // horizontal
                    newX = MathHelper.getRandomFloat(
                        WINDOW_SIZE.WIDTH / 2 + 20,
                        WINDOW_SIZE.WIDTH / 2 + 150
                    )
                    range = MathHelper.getRandomFloat(200, 300)
                    this.baskets[1].setPath(
                        new Phaser.Math.Vector2(newX, newY),
                        new Phaser.Math.Vector2(newX + range, newY)
                    )
                    break
                case 1: // vertical
                    newY = this.baskets[0].y - MathHelper.getRandomFloat(20, 150)
                    range = MathHelper.getRandomFloat(200, 300)
                    this.baskets[1].setPath(
                        new Phaser.Math.Vector2(newX, newY - range),
                        new Phaser.Math.Vector2(newX, newY)
                    )
                    break
            }
        } else {
            let range = 0
            let newX = MathHelper.getRandomFloat(100, WINDOW_SIZE.WIDTH / 2 - 100)
            let newY = MathHelper.getRandomFloat(this.baskets[0].y - 100, this.baskets[0].y - 300)
            let rotation = MathHelper.getRandomFloat(0, Math.PI / 4)
            this.baskets.push(new Basket(this.scene, newX, newY, this.ball, rotation))
            let random = MathHelper.getRandomInt(0, 1)
            switch (random) {
                case 0: // horizontal
                    newX = MathHelper.getRandomFloat(20, 150)
                    range = MathHelper.getRandomFloat(200, 300)
                    this.baskets[1].setPath(
                        new Phaser.Math.Vector2(newX, newY),
                        new Phaser.Math.Vector2(newX + range, newY)
                    )
                    break
                case 1: // vertical
                    newY = this.baskets[0].y - MathHelper.getRandomFloat(20, 150)
                    range = MathHelper.getRandomFloat(200, 300)
                    this.baskets[1].setPath(
                        new Phaser.Math.Vector2(newX, newY - range),
                        new Phaser.Math.Vector2(newX, newY)
                    )
                    break
            }
        }
    }
    private getObstacle(): void {
        let random = MathHelper.getRandomInt(1, 100)
        if (random <= 40) {
            this.baskets[1].addObstacle(
                new RoundObstacle(
                    this.scene,
                    this.baskets[1].x,
                    this.baskets[1].y,
                    this.ball,
                    MathHelper.getRandomInt(0, 3)
                )
            )
        } else if (random <= 80) {
            random = MathHelper.getRandomInt(0, 1)
            switch (random) {
                case 0:
                    this.baskets[1].addObstacle(
                        new StraightObstacle(
                            this.scene,
                            this.baskets[1].x - 120,
                            this.baskets[1].y,
                            this.ball
                        )
                    )
                    break
                case 1:
                    this.baskets[1].addObstacle(
                        new StraightObstacle(
                            this.scene,
                            this.baskets[1].x + 120,
                            this.baskets[1].y,
                            this.ball
                        )
                    )
                    break
            }
        } else {
            this.baskets[1].addObstacle(
                new BouncerObstacle(
                    this.scene,
                    this.baskets[1].x + 40,
                    this.baskets[1].y - 150,
                    this.ball
                )
            )
        }
    }
    private getStar(): void {
        this.baskets[1].addStar(new Star(this.scene, this.ball))
    }
    public setBall(ball: Ball): void {
        this.ball = ball
    }
    public getFirstBaskets(): Basket[] {
        while (this.baskets.length > 0) {
            const basket = this.baskets.shift()
            if (basket) {
                basket!.destroy()
            }
        }
        this.baskets.push(new Basket(this.scene, 200, 700, this.ball))
        this.baskets.push(new Basket(this.scene, 500, 500, this.ball))

        this.baskets[0].setFirstTurn()
        return this.baskets
    }
}
