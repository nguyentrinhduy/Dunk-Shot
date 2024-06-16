import { Scene } from "phaser";
import { Obstacle } from "./Obstacle";
import { Ball } from "../Ball/Ball";

export class RoundObstacle extends Obstacle {
    private ObstacleType: number
    public constructor(scene: Scene, x: number = 0, y: number = 0, ball: Ball, type: number) {
        super(scene, x, y, ball)
        // this.type = type
        this.addSprite()
        this.addColliders()
    }
    private addSprite() {
        this.sprite = this.scene.add.sprite(0, 0, 'round_obstacle')
        this.add(this.sprite)
    }
    protected addColliders(): void {

    }
    public update(time: number, delta: number): void {

    }
}