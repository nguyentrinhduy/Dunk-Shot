import { GameObjects, Scene } from 'phaser'

export class Hint extends GameObjects.Container {
    private dot: GameObjects.Sprite
    private text: GameObjects.Sprite
    private arrow: GameObjects.Sprite
    private finger: GameObjects.Sprite
    public constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y)
        scene.add.existing(this)
    }
    private addSprites(): void {}
    private addTweens(): void {}
}
