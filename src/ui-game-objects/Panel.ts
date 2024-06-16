import { GameObjects, Scene } from "phaser";
import { Button } from "./button/Button";

export class Panel extends GameObjects.Container{
    private buttons: Button[]
    private closeButton: Button
    private text: GameObjects.Text
    public constructor(scene: Scene, x: number, y: number, buttons: Button[], text: GameObjects.Text) {
        super(scene, x, y)
    }
}