import { Scene } from "phaser";
import { UI } from "../UIs/UI";
import { SceneManager } from "../../managers/SceneManager";
import { MainMenuUI } from "../UIs/MainMenuUI";

export class UIGameScene extends Scene {
    private manager: SceneManager
    public constructor() {
        super('UIGameScene')
        
    }

    init() {

    }
    create(data: SceneManager) {
        this.input.setTopOnly(true)
        this.manager = data
        this.manager.setUIScene(this)
        this.manager.transitionToMainMenuUI()
    }
    update(time: number, delta: number) {
        this.manager.updateUI(time, delta)
    }
}