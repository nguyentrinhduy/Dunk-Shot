import { Game, GameObjects, Scene } from 'phaser'

export class Button {
    private container: GameObjects.Container
    private background: GameObjects.Image
    private text: GameObjects.Text
    private image: GameObjects.Image
    private gameObjects: GameObjects.GameObject[]
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
        this.addEventHoverListener()
        this.gameObjects.push(this.background)
        this.gameObjects.push(this.image)
        this.gameObjects.push(this.text)
    }
    
    public getTextX(): number {
        return this.textX;
    }

    public setTextX(x: number): void {
        this.textX = x;
    }

    public getTextY(): number {
        return this.textY;
    }

    public setTextY(y: number): void {
        this.textY = y;
    }

    public getBackgroundX(): number {
        return this.backgroundX;
    }

    public setBackgroundX(x: number): void {
        this.backgroundX = x;
    }

    public getBackgroundY(): number {
        return this.backgroundY;
    }

    public setBackgroundY(y: number): void {
        this.backgroundY = y;
    }
    
    public setX(x: number): void {
        this.x = x
    }

    public setY(y: number): void {
        this.y = y
    }

    public setScale(scale: number): void {
        this.container.setScale(scale)
    }
    public draw(currentScene: Scene) {
        this.container = currentScene.add.container(this.x, this.y, this.gameObjects)
    }
    public addBackground(currentScene: Scene, backgroundKey: string): void {
        this.background = currentScene.add.image(this.x, this.y, backgroundKey)
    }

    public addImage(currentScene: Scene, imageKey: string): void {
        this.image = currentScene.add.image(this.x, this.y, imageKey)
    }

    public addOnClickListener(fn: Function) {
        this.background.on('pointerup', fn)
    }

    private addEventHoverListener() {
        this.container.on('pointerover', () => {
            this.container.setScale(1.2)
        })
        this.container.on('pointerout', () => {
            this.container.setScale()
        })
    }
} 
