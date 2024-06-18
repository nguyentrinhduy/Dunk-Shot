import { AudioManager } from "./AudioManager"

export class SettingsManager {
    private vibration: boolean
    private sounds: boolean
    private nightMode: boolean
    private static instance: SettingsManager
    private constructor() {
        this.vibration = true
        this.sounds = true
    }
    public static getInstance(): SettingsManager {
        if (!SettingsManager.instance) {
            SettingsManager.instance = new SettingsManager()
        }
        return SettingsManager.instance
    }
    public toggleVibration(): void {
        this.vibration = !this.vibration
    }
    public toggleSounds(): void {
        this.sounds = !this.sounds
        AudioManager.getInstance().toggleSounds()
    }
    public toggleNightMode(): void {
        this.nightMode = !this.nightMode
    }
    public getSounds(): boolean {
        return this.sounds
    }
    public getVibration(): boolean {
        return this.vibration
    }
    public getNightMode(): boolean {
        return this.nightMode
    }
}