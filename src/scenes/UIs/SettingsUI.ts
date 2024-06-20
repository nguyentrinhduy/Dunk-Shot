import { Scene } from 'phaser'
import { ToggleButton } from '../../ui-game-objects/button/ToggleButton'
import { UI } from './UI'
import { Stars } from '../../ui-game-objects/Stars'
import { Button } from '../../ui-game-objects/button/Button'
import { SettingsManager } from '../../managers/SettingsManager'
import { WINDOW_SIZE } from '../../contstants/WindowSize'

export class SettingsUI extends UI {
    private background: Phaser.GameObjects.Rectangle
    private soundsToggle: ToggleButton
    private vibrationToggle: ToggleButton
    private nightModeToggle: ToggleButton
    private soundsText: Phaser.GameObjects.Text
    private vibrationText: Phaser.GameObjects.Text
    private nightModeText: Phaser.GameObjects.Text
    private stars: Stars
    private backButton: Button
    private settingsManager: SettingsManager

    public constructor(scene: Scene) {
        super(scene)
        this.create()
    }
    public create(): void {
        this.background = this.scene.add
            .rectangle(0, 0, WINDOW_SIZE.WIDTH, WINDOW_SIZE.HEIGHT)
            .setOrigin(0, 0)
            .setFillStyle(0xdbdbdb, 1)

        this.settingsManager = SettingsManager.getInstance()

        this.soundsToggle = new ToggleButton(
            this.scene,
            550,
            200,
            this.settingsManager.getSounds(),
            () => {
                this.settingsManager.toggleSounds()
            }
        )
        this.vibrationToggle = new ToggleButton(
            this.scene,
            550,
            400,
            this.settingsManager.getVibration(),
            () => {
                this.settingsManager.toggleVibration()
            }
        )
        this.nightModeToggle = new ToggleButton(
            this.scene,
            550,
            600,
            this.settingsManager.getNightMode(),
            () => {
                this.settingsManager.toggleNightMode()
            }
        )

        this.soundsText = this.scene.add.text(100, 190, 'SOUNDS', {
            fontSize: '40px',
            color: 'black',
            fontStyle: 'bold',
            fontFamily: 'Triomphe',
        })
        this.vibrationText = this.scene.add.text(100, 390, 'VIBRATION', {
            fontSize: '40px',
            color: 'black',
            fontStyle: 'bold',
            fontFamily: 'Triomphe',
        })
        this.nightModeText = this.scene.add.text(100, 590, 'NIGHT MODE', {
            fontSize: '40px',
            color: 'black',
            fontStyle: 'bold',
            fontFamily: 'Triomphe',
        })

        this.backButton = new Button(this.scene, 40, 40, () => {
            if (this.scene.scene.isPaused('MainGameScene')) {
                this.scene.scene.resume('MainGameScene')
            }
            this.manager.transitionToMainMenuUI()
        })
        this.backButton.addBackground('back_button', 0, 0)
        this.stars = new Stars(this.scene, 670, 40)

        this.add(this.background)
        this.add(this.soundsToggle)
        this.add(this.vibrationToggle)
        this.add(this.nightModeToggle)
        this.add(this.soundsText)
        this.add(this.vibrationText)
        this.add(this.nightModeText)
        this.add(this.stars)
        this.add(this.backButton)
    }
    public update(): void {}
}
