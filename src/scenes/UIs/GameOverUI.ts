import { Data, Scene, Scenes } from 'phaser'
import { Button } from '../../ui-game-objects/button/Button'
import { Stars } from '../../ui-game-objects/Stars'
import { UI } from './UI'
import { WINDOW_SIZE } from '../../contstants/WindowSize'
import { DataManager } from '../../managers/DataManager'

export class GameOverUI extends UI {
    private bestRecordsText: Phaser.GameObjects.Text
    private playAgainButton: Button
    private stars: Stars
    private scoreText: Phaser.GameObjects.Text
    public constructor(scene: Scene) {
        super(scene)
        this.create()
    }

    public update(): void {
        
    }
    public create(): void {
        this.playAgainButton = new Button(this.scene, WINDOW_SIZE.WIDTH/2, 800, () => {
            this.scene.scene.resume('MainGameScene')
            this.manager.transitionToNormalModeState()
            this.manager.transitionToMainMenuUI()
        })
        this.scoreText = this.scene.add.text(WINDOW_SIZE.WIDTH/2, 200, '0', {fontSize: '100px', color: 'black', fontStyle: 'bold', fontFamily: 'Triomphe'}).setOrigin(0.5)
        this.scoreText.setText(DataManager.getInstance().getScore().toString())
        const text = this.scene.add.text(WINDOW_SIZE.WIDTH/2, 50, 'BEST RECORD', {fontSize: '50px', color: '#ff7300', fontStyle: 'bold', fontFamily: 'Triomphe'}).setOrigin(0.5)
        this.bestRecordsText = this.scene.add.text(WINDOW_SIZE.WIDTH/2, 100, '0', {fontSize: '60px', color: '#ff7300', fontStyle: 'bold', fontFamily: 'Triomphe'}).setOrigin(0.5)
        this.bestRecordsText.setText(DataManager.getInstance().getHighScore().toString())
        this.playAgainButton.addBackground('play_again_button', 0, 0)
        this.playAgainButton.setScale(0)
        this.stars = new Stars(this.scene, 670, 40)
        this.stars.setStars(DataManager.getInstance().getStars())
        this.add(this.playAgainButton)
        this.add(this.stars)
        this.add(text)
        this.add(this.bestRecordsText)
        this.add(this.scoreText)
        this.scene.add.tween({
            targets: this.playAgainButton,
            scale: 1,
            duration: 200,
            ease: 'Linear'
        })

    }
}
