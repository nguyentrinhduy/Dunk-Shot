import { Scene } from "phaser";
import { Obstacle } from "./Obstacle";
import { Ball } from "../Ball/Ball";

export class StraightObstacle extends Obstacle {
    public constructor(scene: Scene, x: number = 0, y: number = 0, ball: Ball) {
        super(scene, x, y, ball)
        this.addSprite()
        this.addColliders()
    }
    private addSprite() {
        this.sprite = this.scene.add.sprite(0, 0, 'straight_obstacle')
        this.add(this.sprite)
    }
    protected addColliders(): void {
        
        this.add(this.colliders)
    }
    public update(time: number, delta: number): void {
        
    }
}