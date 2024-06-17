import { Scene, Scenes } from 'phaser'
import { Button } from '../../ui-game-objects/button/Button'
import { Stars } from '../../ui-game-objects/Stars'
import { UI } from './UI'
import { WINDOW_SIZE } from '../../contstants/WindowSize'

export class GameOverUI extends UI {
    private best_records_text: Phaser.GameObjects.Text
    private play_again_button: Button
    private stars: Stars
    private scoreText: Phaser.GameObjects.Text
    public constructor(scene: Scene) {
        super(scene)
        this.create()
    }

    public update(): void {
        
    }
    public create(): void {
        this.play_again_button = new Button(this.scene, WINDOW_SIZE.WIDTH/2, 800, () => {
            this.scene.scene.resume('MainGameScene')
            this.manager.transitionToNormalModeState()
            this.manager.transitionToMainMenuUI()
        })
        this.play_again_button.addBackground('play_again_button', 0, 0)
        this.play_again_button.setScale(0)
        this.stars = new Stars(this.scene, 700, 40)
        this.add(this.play_again_button)
        this.add(this.stars)
        this.scene.add.tween({
            targets: this.play_again_button,
            scale: 1,
            duration: 200,
            ease: 'Linear'
        })

    }
}
