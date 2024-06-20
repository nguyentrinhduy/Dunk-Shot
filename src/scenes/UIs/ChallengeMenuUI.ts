import { Data, Scene } from 'phaser'
import { UI } from './UI'
import { Button } from '../../ui-game-objects/button/Button'
import { Stars } from '../../ui-game-objects/Stars'
import { TrackingButton } from '../../ui-game-objects/button/TrackingButton'
import { DataManager } from '../../managers/DataManager'
import { WINDOW_SIZE } from '../../contstants/WindowSize'

export class ChallengeMenuUI extends UI {
    private backButton: Button
    private stars: Stars
    private limitTimeButton: TrackingButton
    private achievementButton: TrackingButton
    private bounceButton: TrackingButton
    private accurateButton: TrackingButton
    private topBar: Phaser.GameObjects.Sprite
    private background: Phaser.GameObjects.Rectangle
    public constructor(scene: Scene) {
        super(scene)
        this.create()
    }
    protected create(): void {
        this.createBackground()
        this.createButtons()
        this.createStars()
    }
    private createBackground() {
        this.background = this.scene.add
            .rectangle(0, 0, WINDOW_SIZE.WIDTH, WINDOW_SIZE.HEIGHT)
            .setOrigin(0, 0)
            .setFillStyle(0xdbdbdb, 1)
        this.add(this.background)
    }
    private createButtons(): void {
        this.backButton = new Button(this.scene, 40, 40, () => {
            if (this.scene.scene.isPaused('MainGameScene')){
                this.scene.scene.resume('MainGameScene')
            }
            this.manager.transitionToMainMenuUI()
            this.manager.transitionToNormalModeState()
        })
        this.backButton.addBackground('back_button', 0, 0)
        this.add(this.backButton)

        this.limitTimeButton = new TrackingButton(this.scene, WINDOW_SIZE.WIDTH / 2, 200, () => {
            // this.manager.transitionToChallengeModeUI()
        })
        this.limitTimeButton.addBackground('limit_time_button')
        this.limitTimeButton.addSprite('limit_time_icon', -150, 0)
        this.limitTimeButton.addText('LIMIT TIME', -70, -20, {
            fontSize: '45px',
            fontStyle: 'bold',
            color: 'white',
            fontFamily: 'Triomphe'
        })
        this.add(this.limitTimeButton)

        this.achievementButton = new TrackingButton(this.scene, WINDOW_SIZE.WIDTH / 2, 400, () => {
            // this.manager.transitionToChallengeModeUI()
        })
        this.achievementButton.addBackground('achievement_button')
        this.achievementButton.addSprite('achievement_icon', -150, 0)
        this.achievementButton.addText('ACHIEVEMENT', -70, -20, {
            fontSize: '45px',
            fontStyle: 'bold',
            color: 'white',
            fontFamily: 'Triomphe'
        })
        this.add(this.achievementButton)

        this.bounceButton = new TrackingButton(this.scene, WINDOW_SIZE.WIDTH / 2, 600, () => {
            // this.manager.transitionToChallengeModeUI()
        })
        this.bounceButton.addBackground('bounce_button')
        this.bounceButton.addSprite('bounce_icon', -150, 0)
        this.bounceButton.addText('BOUNCE', -70, -20, {
            fontSize: '45px',
            fontStyle: 'bold',
            color: 'white',
            fontFamily: 'Triomphe'
        })
        this.add(this.bounceButton)

        this.accurateButton = new TrackingButton(this.scene, WINDOW_SIZE.WIDTH / 2, 800, () => {
            this.manager.transitionToAccurateChallengeState()
            this.manager.transitionToAccurateChallengeUI()
        })
        this.accurateButton.addBackground('accurate_button')
        this.accurateButton.addSprite('accurate_icon', -150, 0)
        this.accurateButton.addText('ACCURATE', -70, -20, {
            fontSize: '45px',
            fontStyle: 'bold',
            color: 'white',
            fontFamily: 'Triomphe'
        })
        this.add(this.accurateButton)
    }
    private createStars(): void {
        this.stars = new Stars(this.scene, 670, 40)
        this.stars.setStars(DataManager.getInstance().getStars())
        this.add(this.stars)
    }
    public update(time: number, delta: number): void {}
}
