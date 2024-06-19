import { Game, GameObjects, Scene } from "phaser";
import { Button } from "./Button";

export class ToggleButton extends GameObjects.Container {
    private space: GameObjects.Sprite
    private color: GameObjects.Sprite
    private dot: GameObjects.Sprite
    private isOn: boolean
    private onText: GameObjects.Sprite
    private offText: GameObjects.Sprite
    private onPointerUp: () => void
    public constructor(scene: Scene, x: number, y: number, isOn: boolean = true, onPointerUp: () => void) {
        super(scene, x, y)
        this.isOn = isOn
        this.setScale(0.8)
        this.onPointerUp = onPointerUp
        this.addSprites()
        this.addHover()
        this.addToggle()
    }
    private addSprites() {
        this.space = this.scene.add.sprite(0, 0, 'toggle_space')
        this.color = this.scene.add.sprite(0, 0, 'toggle_space').setTint(0x00ff00).setScale(0.95)
        this.dot = this.scene.add.sprite(90, 0, 'toggle_dot')
        this.onText = this.scene.add.sprite(-80, 0, 'on_text')
        this.offText = this.scene.add.sprite(60, 0, 'off_text').setVisible(false)

        if (!this.isOn) {
            // set color to orange
            this.color.setTint(0xffa500)
            this.dot.setX(-90)
            this.offText.setVisible(true)
            this.onText.setVisible(false)
        }
        this.add(this.space)
        this.add(this.color)
        this.add(this.onText)
        this.add(this.offText)
        this.add(this.dot)
        this.setSize(this.space.width, this.space.height)
        this.setInteractive()
    }
    private addHover() {
        this.on('pointerover', () => {
            this.setScale(1)
        })
        this.on('pointerout', () => {
            this.setScale(0.8)
        })
    }
    private addToggle() {
        this.on('pointerup', () => {
            this.isOn = !this.isOn
            if (this.isOn) {
                this.offText.setVisible(false)
                this.onText.setVisible(true)
                this.color.setTint(0x00ff00)
                this.dot.setX(90)
            }
            else {
                this.offText.setVisible(true)
                this.onText.setVisible(false)
                this.color.setTint(0xffa500)
                this.dot.setX(-90)
            }
        })
        this.on('pointerup', this.onPointerUp)
    }
}