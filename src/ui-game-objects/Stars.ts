import { Scene } from "phaser"

export class Stars {
    private numberOfStars: number
    private icon: Phaser.GameObjects.Image
    private starObject: Phaser.GameObjects.Text

    public render(currentScene: Scene): void {
        
    }
    public setStars(stars: number) {
        this.numberOfStars = stars
        this.starObject.setText(stars.toString())
    }
}