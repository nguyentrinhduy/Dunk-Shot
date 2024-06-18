import { WINDOW_SIZE } from '../../contstants/WindowSize'
import { DataManager } from '../../managers/DataManager'
import { Stars } from '../../ui-game-objects/Stars'
import { Button } from '../../ui-game-objects/button/Button'
import { UI } from './UI'

export class NormalModeUI extends UI {
    private pauseButton: Button
    private scoreText: Phaser.GameObjects.Text
    private stars: Stars
    private dataManager: DataManager
    public constructor(scene: Phaser.Scene) {
        super(scene)
        this.create()
    }
    public create(): void {
        this.dataManager = DataManager.getInstance()
        this.stars = new Stars(this.scene, 670, 40)
        this.stars.setStars(this.dataManager.getStars())
        this.pauseButton = new Button(this.scene, 40, 40, () => {
            this.scene.scene.pause('MainGameScene')
            this.manager.transitionToPauseUI()
        })
        this.scoreText = this.scene.add
            .text(WINDOW_SIZE.WIDTH / 2, 200, '0', {
                fontSize: '100px',
                color: 'black',
                fontStyle: 'bold',
            })
            .setOrigin(0.5)
        this.scoreText.setText(this.dataManager.getScore().toString())
        this.pauseButton.addBackground('pause_button', 0, 0)
        this.add(this.pauseButton)
        this.add(this.stars)
        this.add(this.scoreText)
    }
    public update(): void {
        this.scoreText.setText(this.dataManager.getScore().toString())
        this.stars.setStars(this.dataManager.getStars())
    }
}
