import { Scene, GameObjects, Game, Data } from 'phaser'
import { Button } from '../../ui-game-objects/button/Button'
import { Stars } from '../../ui-game-objects/Stars'
import { UI } from './UI'
import { DataManager } from '../../managers/DataManager'

export class MainMenuUI extends UI {
    private logo: GameObjects.Sprite
    private stars: Stars

    private challengeButton: Button
    private ballSkinsButton: Button
    private settingsButton: Button

    public constructor(scene: Scene) {
        super(scene)
        this.create()
    }

    public create(): void {
        this.addLogo()
        this.addButtons()
        this.addStars()
    }

    private addLogo(): void {
        this.logo = this.scene.add.sprite(380, 450, 'logo').setScale(0.7)
        this.add(this.logo)
        this.scene.add.tween({
            targets: this.logo,
            y: 300,
            duration: 1000,
            ease: 'Bounce.easeOut',
        })
    }

    private addButtons(): void {
        // challenge button
        this.challengeButton = new Button(this.scene, 600, 800, this.onChallengeButtonClicked)
        this.challengeButton.addBackground('challenge_button', 0, 0)
        this.challengeButton.addText('CHALLENGE', -55, 20, { fontSize: '20px' })

        // ball skins button
        this.ballSkinsButton = new Button(this.scene, 400, 800, this.onBallSkinsButtonClicked)
        this.ballSkinsButton.addBackground('orange_background', 0, 0)
        this.ballSkinsButton.addSprite('orange_ball_icon', 0, -30)
        this.ballSkinsButton.addText('CUSTOMIZE', -55, 20, { fontSize: '20px' })

        // settings button
        this.settingsButton = new Button(this.scene, 40, 40, this.onSettingsButtonClicked)
        this.settingsButton.addBackground('settings_button', 0, 0)

        this.add(this.challengeButton)
        this.add(this.ballSkinsButton)
        this.add(this.settingsButton)
        this.scene.physics.add.existing(this)
        this.setInteractive()
        this.on('pointerdown', this.onMainScreenClicked)
    }

    private addStars(): void {
        this.stars = new Stars(this.scene, 670, 40)
        this.stars.setStars(DataManager.getInstance().getStars())
        this.add(this.stars)
    }

    public update(): void {}

    private onChallengeButtonClicked = () => {
        this.manager.transitionToChallengeMenuUI()
    }
    private onBallSkinsButtonClicked = () => {
        this.manager.transitionToBallSkinsUI()
    }
    private onSettingsButtonClicked = () => {
        this.manager.transitionToSettingsUI()
    }
    private onMainScreenClicked = () => {
        this.scene.add.tween({
            targets: [this.challengeButton, this.ballSkinsButton, this.settingsButton, this.logo],
            alpha: 0,
            duration: 500,
            ease: 'Linear',
            onComplete: () => {
                this.manager.transitionToNormalModeUI()
            },
        })
    }
}
