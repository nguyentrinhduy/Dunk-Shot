import { GameObjects, Scene } from 'phaser'

export class TrackingButton extends GameObjects.Container {
    private background: GameObjects.Sprite
    private text: GameObjects.Text
    private sprite: GameObjects.Sprite
    private tracking: GameObjects.Sprite
    private progress_text: GameObjects.Text
    private onPointerUp: () => void
    public constructor(scene: Scene, x: number = 0, y: number = 0, onPointerClicked: () => void) {
        super(scene, x, y)
        scene.add.existing(this)
        this.x = x
        this.y = y
        this.onPointerUp = onPointerClicked
        this.addHover()
        this.setScale(0.6)
        this.on('pointerup', this.onPointerUp)
    }

    public addBackground(backgroundKey: string): void {
        this.background = this.scene.add.sprite(0, 0, backgroundKey)
        this.add(this.background)
        this.setSize(this.background.width, this.background.height)
        this.setInteractive()
    }
    public addTracking(progress: number) {}

    public addSprite(spriteKey: string, x: number, y: number, scale: number = 1): void {
        this.sprite = this.scene.add.sprite(x, y, spriteKey)
        this.sprite.setScale(scale)
        this.add(this.sprite)
    }

    public addText(
        text: string,
        x: number,
        y: number,
        style?: Phaser.Types.GameObjects.Text.TextStyle
    ) {
        this.text = this.scene.add.text(x, y, text, style)
        this.add(this.text)
    }

    private addHover() {
        this.on('pointerover', () => {
            if (this.scale === 0.8) return
            this.scene.add.tween({
                targets: this,
                scale: 0.8,
                duration: 50,
                ease: 'Linear',
            })
        })
        this.on('pointerout', () => {
            if (this.scale === 1) return
            this.scene.add.tween({
                targets: this,
                scale: 0.6,
                duration: 50,
                ease: 'Linear',
            })
        })
    }
}
