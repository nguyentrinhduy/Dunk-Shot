import { WINDOW_SIZE } from "../../contstants/WindowSize";
import { DataManager } from "../../managers/DataManager";
import { Stars } from "../../ui-game-objects/Stars";
import { Button } from "../../ui-game-objects/button/Button";
import { UI } from "./UI";

export class NormalModeUI extends UI{
    private pause_button: Button
    private score_text: Phaser.GameObjects.Text
    private stars: Stars
    private dataManager: DataManager
    public constructor(scene: Phaser.Scene) {
        super(scene)
        this.create()
    }
    public create(): void {
        this.stars = new Stars(this.scene, 700, 40)
        this.pause_button = new Button(this.scene, 40, 40, () => {
            this.scene.scene.pause('MainGameScene')
            this.manager.transitionToPauseUI()
        })
        this.score_text = this.scene.add.text(WINDOW_SIZE.WIDTH/2, 200, '0', {fontSize: '100px', color: 'black', fontStyle: 'bold'})
        this.pause_button.addBackground('pause_button', 0, 0)
        this.add(this.pause_button)
        this.add(this.stars)
        this.add(this.score_text)
        this.dataManager = DataManager.getInstance()
    }
    public update(): void {
        this.score_text.setText(this.dataManager.getScore().toString())
        this.stars.setStars(this.dataManager.getStars())
    }
}