import { Scene } from 'phaser'
import { SettingsManager } from './SettingsManager'
import { collision, effect, max_streak, shooting } from '../contstants/resources/Audio'

export class AudioManager {
    private scene: Scene
    private settingsManager: SettingsManager
    private turnOn: boolean
    private static instance: AudioManager

    // collsion
    private collectingStarSound: Phaser.Sound.WebAudioSound
    private collideRoundBasketSound: Phaser.Sound.WebAudioSound
    private collideWallSound: Phaser.Sound.WebAudioSound

    // streak
    private streakSound: Phaser.Sound.WebAudioSound[]

    // effect
    private ballEnterSound: Phaser.Sound.WebAudioSound
    private ballRecreateSound: Phaser.Sound.WebAudioSound

    // shooting
    private shootingWeakSound: Phaser.Sound.WebAudioSound
    private shootingMediumSound: Phaser.Sound.WebAudioSound
    private shootingStrongSound: Phaser.Sound.WebAudioSound
    private constructor() {
        this.settingsManager = SettingsManager.getInstance()
        this.streakSound = []
        this.turnOn = this.settingsManager.getSounds()
    }
    public init(scene: Scene): void {
        this.scene = scene
        // streak
        for (let i = 1; i <= max_streak; i++) {
            let key = 'streak' + i.toString()
            this.streakSound.push(this.scene.sound.add(key) as Phaser.Sound.WebAudioSound)
        }

        // collision
        this.collectingStarSound = this.scene.sound.add(
            collision.collecting_star.key
        ) as Phaser.Sound.WebAudioSound
        this.collideRoundBasketSound = this.scene.sound.add(
            collision.collide_round_basket.key
        ) as Phaser.Sound.WebAudioSound
        this.collideWallSound = this.scene.sound.add(
            collision.collide_wall.key
        ) as Phaser.Sound.WebAudioSound

        // effect
        this.ballEnterSound = this.scene.sound.add(
            effect.ball_enter.key
        ) as Phaser.Sound.WebAudioSound
        this.ballRecreateSound = this.scene.sound.add(
            effect.ball_recreate.key
        ) as Phaser.Sound.WebAudioSound

        // shooting
        this.shootingWeakSound = this.scene.sound.add(
            shooting.shooting_weak.key
        ) as Phaser.Sound.WebAudioSound
        this.shootingMediumSound = this.scene.sound.add(
            shooting.shooting_medium.key
        ) as Phaser.Sound.WebAudioSound
        this.shootingStrongSound = this.scene.sound.add(
            shooting.shooting_strong.key
        ) as Phaser.Sound.WebAudioSound
    }
    public toggleSounds(): void {
        this.turnOn = !this.turnOn
    }
    public static getInstance(): AudioManager {
        if (!AudioManager.instance) {
            AudioManager.instance = new AudioManager()
        }
        return this.instance
    }
    public setScene(scene: Scene): void {
        this.scene = scene
    }
    public getBallRecreationSound(): void {
        if (!this.turnOn) return
        this.ballRecreateSound.play()
    }
    public getStreakSounds(streak: number): void {
        if (!this.turnOn) return
        if (streak > max_streak) {
            this.streakSound[this.streakSound.length - 1].play()
            return
        }
        this.streakSound[streak - 1].play()
    }
    public getBallEnterSound(): void {
        if (!this.turnOn) return
        this.ballEnterSound.play()
    }
    public getShootingWeakSound(): void {
        if (!this.turnOn) return
        this.shootingWeakSound.play()
    }
    public getShootingMediumSound(): void {
        if (!this.turnOn) return
        this.shootingMediumSound.play()
    }
    public getShootingStrongSound(): void {
        if (!this.turnOn) return
        this.shootingStrongSound.play()
    }
    public getCollectingStarSound(): void {
        if (!this.turnOn) return
        this.collectingStarSound.play()
    }
    public getCollideWallSound(): void {
        if (!this.turnOn) return
        this.collideWallSound.play()
    }
    public getCollideRoundBasketSound(): void {
        if (!this.turnOn) return
        this.collideRoundBasketSound.play()
    }
}
