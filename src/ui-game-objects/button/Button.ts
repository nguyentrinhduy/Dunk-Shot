import { Game, GameObjects, Scene } from 'phaser'
import { Ball } from '../../game-objects/Ball'

export class Button {
    private container: GameObjects.Container
    private background: GameObjects.Image
    private text: GameObjects.Text
    private image: GameObjects.Image
    private gameObjects: GameObjects.GameObject[]
    private scene: Phaser.Scene
    private x: number
    private y: number
    private imageX: number
    private imageY: number
    private backgroundX: number
    private backgroundY: number
    private textX: number
    private textY: number
    public constructor(x: number = 0, y: number = 0) {
        this.x = x
        this.y = y
        this.imageX = 0
        this.imageY = 0
        this.backgroundX = 0
        this.backgroundY = 0
        this.textX = 0
        this.textY = 0
        this.gameObjects = []
    }

    public getTextX(): number {
        return this.textX
    }

    public setTextX(x: number): void {
        this.textX = x
    }

    public getTextY(): number {
        return this.textY
    }

    public setTextY(y: number): void {
        this.textY = y
    }

    public setTextPosition(x: number, y: number) {
        this.textX = x
        this.textY = y
    }

    public getBackgroundX(): number {
        return this.backgroundX
    }

    public setBackgroundX(x: number): void {
        this.backgroundX = x
    }

    public getBackgroundY(): number {
        return this.backgroundY
    }

    public setBackgroundY(y: number): void {
        this.backgroundY = y
    }

    public setBackgroundPosition(x: number, y: number) {
        this.backgroundX = x
        this.backgroundY = y
    }
    public setX(x: number): void {
        this.x = x
    }

    public setY(y: number): void {
        this.y = y
    }
    
    public setPosition(x: number, y: number) {
        this.x = x
        this.y = y
    }

    public setScale(scale: number): void {
        this.container.setScale(scale)
    }

    public draw(currentScene: Scene) {
        if (this.background != undefined) {
            this.gameObjects.push(this.background)
        }
        if (this.image != undefined) {
            this.gameObjects.push(this.image)
        }
        if (this.text != undefined) {
            this.gameObjects.push(this.text)
        }
        this.container = currentScene.add.container(this.x, this.y, this.gameObjects)
        this.container.setSize(this.background.width, this.background.height)
        this.container.setInteractive()
        this.scene = currentScene
    }

    public addBackground(currentScene: Scene, backgroundKey: string, x: number = this.backgroundX, y: number = this.backgroundY): void {
        this.background = currentScene.add.image(x, y, backgroundKey)
        this.backgroundX = x
        this.backgroundY = y
    }

    public addImage(currentScene: Scene, imageKey: string, x: number = this.imageX, y: number = this.imageY, scale: number = 1): void {
        this.image = currentScene.add.image(x, y, imageKey)
        this.image.setScale(scale)
        this.imageX = x
        this.imageY = y
    }

    public addText(currentScene: Scene, text: string, x: number = this.textX, y: number = this.textY, style?: GameObjects.TextStyle) {
        this.text = currentScene.add.text(x, y, text)
        if (style) {
            this.text.setStyle(style)
        }
        this.textX = x
        this.textY = y
    }
    public addOnClickListener(callback: (event: Phaser.Types.Input.EventData) => void, fn: Function = () => {}) {
        this.container.on('pointerdown', (event: Phaser.Types.Input.EventData) => {
            event.stopPropagation = fn
            callback(event)
        });
        this.addEventHoverListener()
    }

    private addEventHoverListener() {
        this.container.on('pointerover', () => {
            this.scene.add.tween({
                targets: this.container,
                scale: {
                    value: 1.2,
                    duration: 100
                }
            })
        })
        this.container.on('pointerout', () => {
            this.scene.add.tween({
                targets: this.container,
                scale: {
                    value: 1,
                    duration: 100
                }
            })
        })
    }
}
