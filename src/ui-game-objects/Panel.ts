import { GameObjects, Scene } from "phaser";
import { Button } from "./button/Button";

export class Panel extends GameObjects.Container{
    private buttons: Button[]
    private closeButton: Button
    private text: GameObjects.Text
    private panel: GameObjects.Sprite
    private banner: GameObjects.Sprite
    public constructor(scene: Scene, x: number, y: number, onCloseButtonClicked: () => void) {
        super(scene, x, y)
        this.scene.add.existing(this)
        this.panel = this.scene.add.sprite(0, 0, 'popup_panel').setScale(0.8)
        this.closeButton = new Button(scene, 200, -220, onCloseButtonClicked)
        this.closeButton.addBackground('close_button', 0, 0)
        this.buttons = []
        this.add(this.panel)
        this.add(this.closeButton)
        this.add(this.scene.add.text(0, -150, 'CHALLENGES', { fontFamily: 'Triomphe', fontSize: '35px', color: 'black'}).setOrigin(0.5))
        // this.setScale(0)
        // this.scene.add.tween({
        //     targets: this,
        //     duration: 100,
        //     scale: 1,
        //     ease: 'Bounce.easeOut'
        // })
    }
    public addBanner(bannerKey: string): void {
        this.banner = this.scene.add.sprite(0, 0, bannerKey).setScale(0.625)
        this.add(this.banner)
    }
    public addButton(button: Button): void {
        this.buttons.push(button)
        this.add(button)
    }
    public addText(text: string): void {
        if (!this.text) {
            this.text = this.scene.add.text(0, 0, text, { fontFamily: 'Triomphe', fontSize: '20px', color: 'white'}).setOrigin(0.5)
            this.add(this.text)
        }
        else {
            this.text.setText(text)
        }
    }
}