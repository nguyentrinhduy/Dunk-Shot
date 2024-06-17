import { Scene } from "phaser";
import { ProgressBar } from "../ui-game-objects/ProgressBar";
import { ball, basket, buttons, icons, obstacle, sprite_path } from "../contstants/resources/Sprite";
import { audio_path } from "../contstants/resources/Audio";

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
        this.scene.load.image(icons.limit_time_icon.key, icons.limit_time_icon.path)
        this.scene.load.image(icons.bounce_icon.key, icons.bounce_icon.path)
        this.scene.load.image(icons.accurate_icon.key, icons.accurate_icon.path)
        this.scene.load.image(icons.achievement_icon.key, icons.achievement_icon.path)

        this.scene.load.image(buttons.back_button.key, buttons.back_button.path)
        this.scene.load.image(buttons.ball_skins_button.key, buttons.ball_skins_button.path)
        this.scene.load.image(buttons.challenge_button.key, buttons.challenge_button.path)
        this.scene.load.image(buttons.orange_background.key, buttons.orange_background.path)
        this.scene.load.image(buttons.settings_button.key, buttons.settings_button.path)
        this.scene.load.image(buttons.pause_button.key, buttons.pause_button.path)
        this.scene.load.image(buttons.main_menu_button.key, buttons.main_menu_button.path)
        this.scene.load.image(buttons.resume_button.key, buttons.resume_button.path)
        this.scene.load.image(buttons.play_again_button.key, buttons.play_again_button.path)
        this.scene.load.image(buttons.bounce_button.key, buttons.bounce_button.path)
        this.scene.load.image(buttons.achievement_button.key, buttons.achievement_button.path)
        this.scene.load.image(buttons.limit_time_button.key, buttons.limit_time_button.path)
        this.scene.load.image(buttons.accurate_button.key, buttons.accurate_button.path)

        // obstacles
        this.scene.load.image(obstacle.straight_obstacle.key, obstacle.straight_obstacle.path)
        this.scene.load.image(obstacle.bouncer_obstacle.key, obstacle.bouncer_obstacle.path)
        obstacle.round_obstacle.forEach(element => {
            this.scene.load.image(element.key, element.path)
        });
    }
    public loadAudios(): void {
        this.scene.load.setPath(audio_path)
    }
    public loadDatas(): void {

    }
    private getBallPath(ballType: number): string {
        if (ballType < 0 || ballType > ball.number) {
            throw new Error('ball not found')
        }
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