import { Scene } from "phaser";
import { ProgressBar } from "../ui-game-objects/ProgressBar";
import { ball, basket, sprite_path } from "../contstants/resources/Sprite";

export class LoadManager {
    private progressBar: ProgressBar
    private scene: Scene
    constructor(scene: Scene) {
        this.progressBar = new ProgressBar()
        this.scene = scene
    }

    public loadSprites(): void {
        // Balls
        this.scene.load.setPath(sprite_path)
        for (let ballType = 0; ballType < ball.number; ballType++) {
            this.scene.load.image(this.getBallKey(ballType), this.getBallPath(ballType))
        }

        // Baskets
        this.scene.load.image(basket.round_up.key, basket.round_up.path)
        this.scene.load.image(basket.round_down.key, basket.round_down.path)
        this.scene.load.image(basket.net.key, basket.net.path)

        // Effects
        // Components
        
    }
    public loadAudios(): void {

    }
    public loadDatas(): void {

    }
    private getBallPath(ballType: number): string {
        if (ballType < 0 || ballType > ball.number) {
            throw new Error('ball not found')
        }
        console.log(
            ball.path + Math.floor(ballType / 10).toString() + (ballType % 10).toString() + '.png'
        )
        return (
            ball.path + Math.floor(ballType / 10).toString() + (ballType % 10).toString() + '.png'
        )
    }
    private getBallKey(ballType: number): string {
        if (ballType < 0 || ballType > ball.number) {
            throw new Error('ball not found')
        }
        return ball.key + Math.floor(ballType / 10).toString() + (ballType % 10).toString()
    }
}