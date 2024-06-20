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
        this.manager.setModeScene(this)
        this.manager.transitionToNormalMode()
    }
    update(time: number, delta: number) {
        this.manager.update(time, delta)
    }
}
