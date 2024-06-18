import { Scene } from "phaser";
import { SceneManager } from "../../managers/SceneManager";

export class UIGameScene extends Scene {
    private manager: SceneManager
    public constructor() {
        super('UIGameScene')
        
    }
    create(data: SceneManager) {
        this.input.setTopOnly(true)
        this.manager = data
        this.manager.setUIScene(this)
        this.manager.transitionToBallSkinsUI()
    }
    update(time: number, delta: number) {
        this.manager.updateUI(time, delta)
    }
}