import { Scene } from 'phaser'

import { Ball } from '../../game-objects/Ball/Ball'
import { Basket } from '../../game-objects/Basket/Basket'
import { MapGenerator } from '../../helpers/MapGenerator'
import { SceneManager } from '../../managers/SceneManager'
import { NormalModeState } from '../states/NormalModeState'
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
        console.log(this.manager)
    }
    update(time: number, delta: number) {
        this.manager.update(time, delta)
    }
}
