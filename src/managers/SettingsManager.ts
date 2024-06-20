import { AudioManager } from './AudioManager'

export class SettingsManager {
    private vibration: boolean
    private sounds: boolean
    private nightMode: boolean
    private static instance: SettingsManager
    private constructor() {
        let retrievedData = localStorage.getItem('sounds')
        if (retrievedData) {
            this.sounds = JSON.parse(retrievedData)
        } else {
            this.sounds = true
        }

        retrievedData = localStorage.getItem('vibration')
        if (retrievedData) {
            this.vibration = JSON.parse(retrievedData)
        } else {
            this.vibration = true
        }

        retrievedData = localStorage.getItem('night_mode')
        if (retrievedData) {
            this.nightMode = JSON.parse(retrievedData)
        } else {
            this.nightMode = true
        }
    }
    public static getInstance(): SettingsManager {
        if (!SettingsManager.instance) {
            SettingsManager.instance = new SettingsManager()
        }
        return SettingsManager.instance
    }
    public toggleVibration(): void {
        this.vibration = !this.vibration
        localStorage.setItem('vibration', JSON.stringify(this.vibration))
    }
    public toggleSounds(): void {
        this.sounds = !this.sounds
        AudioManager.getInstance().toggleSounds()
        localStorage.setItem('sounds', JSON.stringify(this.sounds))
    }
    public toggleNightMode(): void {
        this.nightMode = !this.nightMode
        localStorage.setItem('night_mode', JSON.stringify(this.nightMode))
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
