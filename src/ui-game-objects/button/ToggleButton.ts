import { GameObjects, Scene } from "phaser";
import { Button } from "./Button";

export class ToggleButton extends GameObjects.Container {
    private space: GameObjects.Sprite
    private dot: GameObjects.Sprite
    private text: GameObjects.Sprite
    private isOn: boolean
    private onText: GameObjects.Sprite
    private offText: GameObjects.Sprite
    public constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y)
        this.isOn = true
        this.addSprites()
        this.addHover()
    }
    private addSprites() {
        
    }
    private addHover() {
        this.on('pointerover', () => {
            this.setScale(1.2)
        })
        this.on('pointerout', () => {
            this.setScale()
        })
    }
}