import { Scene, GameObjects } from 'phaser'
// import { Button } from '../ui-game-objects/Button';
import { CONSTANT } from '../constants'
import { Button } from '../ui-game-objects/button/Button'
const { BUTTONS } = CONSTANT.MAIN_MENU_SCENE;

// Use BUTTONS directly in the code

export class MainMenuScene extends Scene {
    private background: GameObjects.Image
    private logo: GameObjects.Image
    private challengeButton: Button
    private ballSkinsButton: Button
    private settingsButton: Button
    constructor() {
        super('MainMenuScene')
        this.challengeButton = new Button()
        this.ballSkinsButton = new Button()
        this.settingsButton = new Button()
    }
    init(data: object | undefined) {
        if (data == undefined) return
    }
    create() {
        this.logo = this.add.image(400, 300, CONSTANT.SPRITES.COMPONENTS.LOGO.KEY)
        this.logo.setScale(0.7)
        this.ballSkinsButton.addBackground(this, BUTTONS.BALL_SKINS.BACKGROUND_KEY);
        this.settingsButton.addBackground(this, BUTTONS.SETTINGS);
        this.challengeButton.addBackground(this, BUTTONS.CHALLENGE);
        this.setOnClickListener()
    }
    private setOnClickListener() {
        this.ballSkinsButton.addOnClickListener(this.onBallSkinsButtonClicked)
        this.settingsButton.addOnClickListener(this.onSettingsButtonClicked)
    }
    private onBallSkinsButtonClicked = () => {
        this.scene.start('BallSkinsScene')
    }
    private onSettingsButtonClicked = () => {
        this.scene.start('SettingsScene')
    }
    private onChallengeButtonClicked = () => {
        this.scene.start('ChallengeMenuScene')
    }
}
