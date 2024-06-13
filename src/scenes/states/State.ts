import { GameObjects, Scene } from "phaser";
import { StateManager } from "../../managers/StateManager";
import { WINDOW_SIZE } from "../../contstants/WindowSize";

export abstract class State extends GameObjects.Container {
    private manager: StateManager
    public constructor(scene: Scene) {
        super(scene)
        this.setSize(WINDOW_SIZE.WIDTH, WINDOW_SIZE.HEIGHT)
        scene.add.existing(this)
    }
    public setManager(manager: StateManager) {
        this.manager = manager
    }
    public abstract update(time: number, delta: number): void
    public abstract create(): void
}