import { Scene } from 'phaser'

import { Ball } from '../../game-objects/Ball/Ball'
import { Basket } from '../../game-objects/Basket/Basket'
import { MapGenerator } from '../../managers/MapGenerator'
import { StateManager } from '../../managers/StateManager'
export class MainGameScene extends Scene {
    private stateManager: StateManager
    constructor() {
        super('MainGameScene')
    }
    create() {
        this.input.setTopOnly(true)
        this.stateManager = new StateManager(this)
        this.stateManager.create()
    }
    update(time: number, delta: number) {
        this.stateManager.update(time, delta)
    }
}
