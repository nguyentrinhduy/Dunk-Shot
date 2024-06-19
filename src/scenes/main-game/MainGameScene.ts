import { Scene } from 'phaser'
import { SceneManager } from '../../managers/SceneManager'
import { AudioManager } from '../../managers/AudioManager'

export class MainGameScene extends Scene {
    private manager: SceneManager
    constructor() {
        super('MainGameScene')
    }
    init() {
        AudioManager.getInstance().init(this)
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
