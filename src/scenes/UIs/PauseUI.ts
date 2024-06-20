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
        this.background = this.scene.add.rectangle(0, 0, WINDOW_SIZE.WIDTH, WINDOW_SIZE.HEIGHT).setOrigin(0, 0).setFillStyle(0xdbdbdb, 0.8)
        this.resume_button = new Button(this.scene, WINDOW_SIZE.WIDTH/2, 200, () => {
            this.scene.scene.resume('MainGameScene')
            this.manager.transitionToNormalModeUI()
        })
        this.resume_button.addBackground('resume_button', 0, 0)
        this.resume_button.addText('RESUME', -55, -25, { fontSize: '40px', fontStyle: 'bold', color: 'white', fontFamily: 'Triomphe'})
        this.main_menu_button = new Button(this.scene, WINDOW_SIZE.WIDTH/2, 400, () => {
            this.scene.scene.resume('MainGameScene')
            this.manager.killAllTweens()
            this.manager.transitionToNormalModeState()
            this.manager.transitionToMainMenuUI()
        })
        this.main_menu_button.addBackground('main_menu_button', 0, 0)
        this.main_menu_button.addText('MAIN MENU', -55, -25, { fontSize: '40px', fontStyle: 'bold', color: 'white', fontFamily: 'Triomphe'})
        this.ball_skins_button = new Button(this.scene, WINDOW_SIZE.WIDTH/2, 600, () => {
            this.manager.transitionToBallSkinsUI()
        })
        this.ball_skins_button.addBackground('ball_skins_button', 0, 0)
        this.ball_skins_button.addText('CUSTOMIZE', -55, -25, { fontSize: '40px', fontStyle: 'bold', color: 'white', fontFamily: 'Triomphe'})
        this.settings_button = new Button(this.scene, 40, 40, () => {
            this.manager.transitionToSettingsUI()
        })
        this.settings_button.addBackground('settings_button', 0, 0)
        this.add(this.background)
        this.add(this.resume_button)
        this.add(this.main_menu_button)
        this.add(this.settings_button)
        this.add(this.ball_skins_button)
        
    }
    public update(): void {
        
    }
}