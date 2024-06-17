import { Scene } from 'phaser'
import { SceneManager } from '../../managers/SceneManager'

export class MainGameScene extends Scene {
    private manager: SceneManager
    constructor() {
        super('MainGameScene')
    }
    create(data: SceneManager) {
        this.input.setTopOnly(true)
        this.manager = data
        this.manager.setStateScene(this)
        this.manager.transitionToNormalModeState()
    }
    update(time: number, delta: number) {
        this.manager.update(time, delta)
    }
}
