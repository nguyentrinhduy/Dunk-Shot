import { Scene } from "phaser";
import { ProgressBar } from "../ui-game-objects/ProgressBar";
import { ball, basket, buttons, icons, obstacle, panels, sprite_path, text } from "../contstants/resources/Sprite";
import { audio_path, collision, effect, max_streak, shooting } from "../contstants/resources/Audio";
import { accurate_challenge, challenge_levels_path, limit_time_challenge } from "../contstants/resources/ChallengeLevels";

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
        this.scene.load.image(ball.locked_ball.key, ball.locked_ball.path)
        this.scene.load.image(ball.chosen_round.key, ball.chosen_round.path)
        
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
        this.scene.load.image(icons.turn.key, icons.turn.path)

        this.scene.load.image(panels.gray_top_panel.key, panels.gray_top_panel.path)
        this.scene.load.image(panels.blue_top_panel.key, panels.blue_top_panel.path)
        this.scene.load.image(panels.accurate_banner.key, panels.accurate_banner.path)
        this.scene.load.image(panels.bounce_banner.key, panels.bounce_banner.path)
        this.scene.load.image(panels.limit_time_banner.key, panels.limit_time_banner.path)
        this.scene.load.image(panels.achievement_banner.key, panels.achievement_banner.path)
        this.scene.load.image(panels.line.key, panels.line.path)
        this.scene.load.image(panels.popup_panel.key, panels.popup_panel.path)

        this.scene.load.image(buttons.back_button.key, buttons.back_button.path)
        this.scene.load.image(buttons.white_back_button.key, buttons.white_back_button.path)
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
        this.scene.load.image(buttons.toggle_dot.key, buttons.toggle_dot.path)
        this.scene.load.image(buttons.toggle_space.key, buttons.toggle_space.path)
        this.scene.load.image(buttons.give_up_button.key, buttons.give_up_button.path)
        this.scene.load.image(buttons.accurate_start_button.key, buttons.accurate_start_button.path)
        this.scene.load.image(buttons.close_button.key, buttons.close_button.path)
        
        this.scene.load.image(text.toggle.on_text.key, text.toggle.on_text.path)
        this.scene.load.image(text.toggle.off_text.key, text.toggle.off_text.path)
        
        // obstacles
        this.scene.load.image(obstacle.straight_obstacle.key, obstacle.straight_obstacle.path)
        this.scene.load.image(obstacle.bouncer_obstacle.key, obstacle.bouncer_obstacle.path)
        obstacle.round_obstacle.forEach(element => {
            this.scene.load.image(element.key, element.path)
        });
    }
    public loadAudios(): void {
        this.scene.load.setPath(audio_path)
        // collision
        this.scene.load.audio(collision.collecting_star.key, collision.collecting_star.path)
        this.scene.load.audio(collision.collide_round_basket.key, collision.collide_round_basket.path)
        this.scene.load.audio(collision.collide_wall.key, collision.collide_wall.path)

        // effect
        this.scene.load.audio(effect.ball_enter.key, effect.ball_enter.path)
        this.scene.load.audio(effect.ball_recreate.key, effect.ball_recreate.path)
        
        // shooting
        this.scene.load.audio(shooting.shooting_weak.key, shooting.shooting_weak.path)
        this.scene.load.audio(shooting.shooting_medium.key, shooting.shooting_medium.path)
        this.scene.load.audio(shooting.shooting_strong.key, shooting.shooting_strong.path)

        // streak
        for (let i = 1; i <= max_streak; i++) {
            let key = 'streak' + i.toString()
            let path = 'streak/' + i.toString() + '.mp3'
            this.scene.load.audio(key, path)
        }
    }
    public loadDatas(): void {

    }
    public loadChallengeLevels(): void {
        this.scene.load.setPath(challenge_levels_path)
        for (let i = 1; i <= limit_time_challenge.levels; i ++) {
            this.scene.load.tilemapTiledJSON(limit_time_challenge.key + i.toString(), limit_time_challenge.path + i.toString() + '.tmj')
        }
        for (let i = 1; i <= accurate_challenge.levels; i ++) {
            this.scene.load.tilemapTiledJSON(accurate_challenge.key + i.toString(), accurate_challenge.path + i.toString() + '.tmj')
        }
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