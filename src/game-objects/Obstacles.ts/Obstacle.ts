import { GameObjects, Scene } from "phaser";
import { Ball } from "../Ball/Ball";

export abstract class Obstacle extends GameObjects.Container{
    protected colliders: GameObjects.Arc[]
    protected sprite: GameObjects.Sprite
    protected ball: Ball
    public constructor(scene: Scene, x: number = 0, y: number = 0, ball: Ball) {
        super(scene, x, y)
        this.ball = ball
        scene.add.existing(this)
    } 
    public abstract setNotAllowPhysics(): void
    protected abstract addColliders(): void
    public abstract update(time: number, delta: number): void
}