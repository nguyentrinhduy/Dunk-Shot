import { Scene, GameObjects, Game } from 'phaser'
// import { Button } from '../ui-game-objects/Button';
import { CONSTANT } from '../constants'
import { Button } from '../ui-game-objects/button/Button'
const { BUTTONS, ICONS, TEXT } = CONSTANT.MAIN_MENU_SCENE;

// Use BUTTONS directly in the code

export class MainMenuScene extends Scene {
    private background: GameObjects.Image
    private logo: GameObjects.Image
    private starIcon: GameObjects.Image
    private starsObject: GameObjects.Text
    private stars: number

    private challengeButton: Button
    private ballSkinsButton: Button
    private settingsButton: Button
    constructor() {
        super('MainMenuScene')
        this.challengeButton = new Button(
            BUTTONS.CHALLENGE.POSITION.X,
            BUTTONS.CHALLENGE.POSITION.Y
        )
        this.ballSkinsButton = new Button(
            BUTTONS.BALL_SKINS.POSITION.X,
            BUTTONS.BALL_SKINS.POSITION.Y
        )
        this.settingsButton = new Button(
            BUTTONS.SETTINGS.POSITION.X,
            BUTTONS.SETTINGS.POSITION.Y
        )
    }
    init(data: object | undefined) {
        if (data == undefined) return
    }
    create() {
        // this.input.once('pointerup', this.onMainScreenClicked)
        this.logo = this.add.image(
            ICONS.LOGO.POSITION.X,
            ICONS.LOGO.POSITION.Y,
            ICONS.LOGO.KEY
        )
        this.logo.setScale(ICONS.LOGO.SCALE)

        // add ball skins button
        this.ballSkinsButton.addBackground(
            this, 
            BUTTONS.BALL_SKINS.BACKGROUND.KEY,
            BUTTONS.BALL_SKINS.BACKGROUND.POSITION.X,
            BUTTONS.BALL_SKINS.BACKGROUND.POSITION.Y
        );
        this.ballSkinsButton.addImage(
            this,
            BUTTONS.BALL_SKINS.IMAGE.KEY,
            BUTTONS.BALL_SKINS.IMAGE.POSITION.X,
            BUTTONS.BALL_SKINS.IMAGE.POSITION.Y,
            BUTTONS.BALL_SKINS.IMAGE.SCALE
        )
        this.ballSkinsButton.addText(
            this,
            BUTTONS.BALL_SKINS.TEXT.CONTENT,
            BUTTONS.BALL_SKINS.TEXT.POSITION.X,
            BUTTONS.BALL_SKINS.TEXT.POSITION.Y
        )
        this.ballSkinsButton.draw(this)

        // add settings button
        this.settingsButton.addBackground(this, BUTTONS.SETTINGS.BACKGROUND_KEY);
        this.settingsButton.draw(this)

        // add challenge button
        this.challengeButton.addBackground(this, BUTTONS.CHALLENGE.BACKGROUND_KEY);
        this.challengeButton.addText(
            this,
            BUTTONS.CHALLENGE.TEXT.CONTENT,
            BUTTONS.CHALLENGE.TEXT.POSITION.X,
            BUTTONS.CHALLENGE.TEXT.POSITION.Y
        )
        this.challengeButton.draw(this)

        // set on click listener
        this.setOnClickListener()
    }
    private setOnClickListener() {
        
        this.ballSkinsButton.addOnClickListener(this.onBallSkinsButtonClicked)
        this.settingsButton.addOnClickListener(this.onSettingsButtonClicked)
        this.challengeButton.addOnClickListener(this.onChallengeButtonClicked)
        
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
    private onMainScreenClicked = () => {
        this.scene.start('PlayingGameScene')
    }
}
