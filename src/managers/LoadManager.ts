import { Scene } from "phaser";
import { ProgressBar } from "../ui-game-objects/ProgressBar";
import { ball, basket, buttons, icons, sprite_path } from "../contstants/resources/Sprite";

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
        this.scene.load.image(basket.basket_effect.key, basket.basket_effect.path)
        // Effects
        // Components
        this.scene.load.image(icons.orange_ball_icon.key, icons.orange_ball_icon.path)
        this.scene.load.image(icons.stars.key, icons.stars.path)
        this.scene.load.image(icons.stars_ui.key, icons.stars_ui.path)

        this.scene.load.image(buttons.back_button.key, buttons.back_button.path)
        this.scene.load.image(buttons.ball_skins_button.key, buttons.ball_skins_button.path)
        this.scene.load.image(buttons.challenge_button.key, buttons.challenge_button.path)
        this.scene.load.image(buttons.orange_background.key, buttons.orange_background.path)
        this.scene.load.image(buttons.settings_button.key, buttons.settings_button.path)
        this.scene.load.image(buttons.pause_button.key, buttons.pause_button.path)
        this.scene.load.image()
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