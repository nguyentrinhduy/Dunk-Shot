import { GameObjects, Scene } from 'phaser'
import { SceneManager } from '../../managers/SceneManager'
import { WINDOW_SIZE } from '../../contstants/WindowSize'

export abstract class State extends GameObjects.Container {
    protected manager: SceneManager
    public constructor(scene: Scene) {
        super(scene)
        this.setSize(WINDOW_SIZE.WIDTH * 2, WINDOW_SIZE.HEIGHT * 2)
        // this.setDepth(0)
        scene.add.existing(this)
    }
    public setManager(manager: SceneManager) {
        this.manager = manager
    }
    public abstract update(time: number, delta: number): void
    protected abstract create(): void
}
