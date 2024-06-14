import { GameObjects, Scene } from "phaser";
import { StateManager } from "../../managers/StateManager";
import { WINDOW_SIZE } from "../../contstants/WindowSize";

export abstract class State extends GameObjects.Container {
    private stateManager: StateManager
    public constructor(scene: Scene) {
        super(scene)
        this.setSize(WINDOW_SIZE.WIDTH, WINDOW_SIZE.HEIGHT)
        this.setDepth(0)
        scene.add.existing(this)
    }
    public setManager(stateManager: StateManager, uiManager: UIManager) {
        this.stateManager = stateManager
        this.uiManager = uiManager
    }
    public abstract update(time: number, delta: number): void
    public abstract create(): void
}