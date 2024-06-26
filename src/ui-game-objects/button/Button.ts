import { Game, GameObjects, Scene } from 'phaser'

export class Button extends GameObjects.Container {
    private background: GameObjects.Sprite
    private text: GameObjects.Text
    private sprite: GameObjects.Sprite
    private initialScale: number
    private onPointerUp: () => void
    public constructor(scene: Scene, x: number = 0, y: number = 0, onPointerClicked: () => void) {
        super(scene, x, y)
        scene.add.existing(this)
        this.x = x
        this.y = y
        this.initialScale = 1
        this.onPointerUp = onPointerClicked
        this.addHover()
        this.on('pointerup', this.onPointerUp)
    }

    public setScale(x?: number | undefined, y?: number | undefined): this {
        if (x) this.initialScale = x!
        return super.setScale(x, y)
    }
    public addBackground(backgroundKey: string, x: number, y: number): void {
        this.background = this.scene.add.sprite(x, y, backgroundKey)
        this.add(this.background)
        this.setSize(this.background.width, this.background.height)
        this.setInteractive()
    }

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
            if (this.scale === this.initialScale + 0.2) return
            this.scene.add.tween({
                targets: this,
                scale: this.initialScale + 0.2,
                duration: 50,
                ease: 'Linear',
            })
        })
        this.on('pointerout', () => {
            if (this.scale === this.initialScale) return
            this.scene.add.tween({
                targets: this,
                scale: this.initialScale,
                duration: 50,
                ease: 'Linear',
            })
        })
    }
}
