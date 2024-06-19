import { CANVAS, GameObjects, Scene } from "phaser"
import { SceneManager } from "../../managers/SceneManager"
import { WINDOW_SIZE } from "../../contstants/WindowSize"

export abstract class UI extends GameObjects.Container{
    protected manager: SceneManager
    public constructor(scene: Scene, x: number = 0, y: number = 0) {
        super(scene, x, y)
        this.setSize(WINDOW_SIZE.WIDTH * 2, WINDOW_SIZE.HEIGHT * 2)
        // this.setDepth(1)
        scene.add.existing(this)
    } 
    public setManager(manager: SceneManager): void {
        this.manager = manager
    }
    protected abstract create(): void
    public abstract update(time: number, delta: number): void
}