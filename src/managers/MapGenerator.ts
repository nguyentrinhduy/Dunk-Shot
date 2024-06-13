import { Scene } from "phaser";
import { Ball } from "../game-objects/Ball/Ball";
import { Basket } from "../game-objects/Basket/Basket";

export class MapGenerator {
    private currentBasket: Basket
    private ball: Ball
    private scene: Scene
    public constructor(scene: Scene) {
        this.scene = scene
    }
    public getNewBasket() {
        
    }
    public getNewWalls() {

    }
    public setBall(ball: Ball): void {
        this.ball = ball
    }
    public getFirstBaskets(): Basket[] {
        let baskets: Basket[] = []
        baskets.push(new Basket(this.scene, 300, 700, this.ball))
        baskets.push(new Basket(this.scene, 600, 500, this.ball))
        return baskets
    }
}