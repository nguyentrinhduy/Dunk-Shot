import { Scene } from 'phaser'

export class Stars extends Phaser.GameObjects.Container {
    private numberOfStars: number
    private icon: Phaser.GameObjects.Sprite
    private starObject: Phaser.GameObjects.Text

    public constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y)
        this.numberOfStars = 0
        this.icon = scene.add.sprite(0, 0, 'stars_ui')
        this.starObject = new Phaser.GameObjects.Text(scene, 30, -10, '0', {
            color: 'white',
            fontSize: '32px',
            fontFamily: 'Triomphe',
        })
        this.add(this.icon)
        this.add(this.starObject)
        scene.add.existing(this)
    }
    public render(currentScene: Scene): void {}
    public setStars(stars: number) {
        this.numberOfStars = stars
        this.starObject.setText(stars.toString())
    }
}
