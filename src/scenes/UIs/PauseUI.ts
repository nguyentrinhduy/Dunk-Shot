import { WINDOW_SIZE } from "../../contstants/WindowSize";
import { Button } from "../../ui-game-objects/button/Button";
import { UI } from "./UI";

export class PauseUI extends UI {
    private resume_button: Button
    private main_menu_button: Button
    private ball_skins_button: Button
    private settings_button: Button
    private background: Phaser.GameObjects.Rectangle
    public constructor(scene: Phaser.Scene) {
        super(scene)
        this.create()
    }
    public create(): void {
        this.background = this.scene.add.rectangle(0, 0, WINDOW_SIZE.WIDTH, WINDOW_SIZE.HEIGHT).setOrigin(0, 0).setFillStyle(0xffffff, 0.5)
        this.resume_button = new Button(this.scene, 0, 0, () => {
            this.manager.transitionToNormalModeUI()
            this.scene.scene.resume('MainGameScene')
        })
        this.resume_button.addBackground('resume_button', 0, 0)

        this.main_menu_button = new Button(this.scene, 0, 0, () => {
            this.scene.scene.resume('MainGameScene')
            this.manager.transitionToNormalModeState()
            this.manager.transitionToMainMenuUI()
        })
        this.main_menu_button.addBackground('main_menu_button', 0, 0)

        this.ball_skins_button = new Button(this.scene, 0, 0, () => {
            this.manager.transitionToBallSkinsUI()
        })
        this.ball_skins_button
        this.settings_button = new Button(this.scene, 0, 0, () => {
            this.manager.transitionToSettingsUI()
        })
        this.settings_button.addBackground('settings_button', 0, 0)
        this.add(this.background)
        this.add(this.resume_button)
        this.add(this.main_menu_button)
        this.add(this.settings_button)
        
    }
    public update(): void {
        
    }
}