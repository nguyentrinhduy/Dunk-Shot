import { Game, Scene } from 'phaser'
import { UI } from '../scenes/UIs/UI'
import { MainMenuUI } from '../scenes/UIs/MainMenuUI'
import { GameOverUI } from '../scenes/UIs/GameOverUI'
import { PauseUI } from '../scenes/UIs/PauseUI'
import { SettingsUI } from '../scenes/UIs/SettingsUI'
import { NormalModeUI } from '../scenes/UIs/NormalModeUI'
import { BallSkinsUI } from '../scenes/UIs/BallSkinsUI'
import { ChallengeMenuUI } from '../scenes/UIs/ChallengeMenuUI'
import { AccurateChallengeUI } from '../scenes/UIs/AccurateChallengeUI'
import { Mode } from '../scenes/modes/Mode'
import { NormalMode } from '../scenes/modes/NormalMode'
import { LimitTimeChallengeMode } from '../scenes/modes/LimitTimeChallengeMode'
import { AccurateChallengeMode } from '../scenes/modes/AccurateChallengeMode'

export class SceneManager {
    private uiScene: Scene
    private ui: UI
    private modeScene: Scene
    private mode: Mode
    
    public setUIScene(scene: Scene): void {
        this.uiScene = scene
    }
    public setModeScene(scene: Scene): void {
        this.modeScene = scene
    }

    // game mode transitions
    public transitionToNormalMode(): void {
        this.transitionToMode(new NormalMode(this.modeScene))
    }
    public transitionToLimitTimeChallengeMode(): void {
        this.transitionToMode(new LimitTimeChallengeMode(this.modeScene))
    }
    public transitionToAccurateChallengeMode(): void {
        this.transitionToMode(new AccurateChallengeMode(this.modeScene))
    }

    // UI transitions
    public transitionToMainMenuUI(): void {
        this.transitionToUI(new MainMenuUI(this.uiScene))
    }
    public transitionToGameOverUI(): void {
        this.transitionToUI(new GameOverUI(this.uiScene))
    }
    public transitionToPauseUI(): void {
        this.transitionToUI(new PauseUI(this.uiScene))
    }
    public transitionToSettingsUI(): void {
        this.transitionToUI(new SettingsUI(this.uiScene))
    }
    public transitionToNormalModeUI(): void {
        this.transitionToUI(new NormalModeUI(this.uiScene))
    }
    public transitionToBallSkinsUI(): void {
        this.transitionToUI(new BallSkinsUI(this.uiScene))
    }
    public transitionToChallengeMenuUI(): void {
        this.transitionToUI(new ChallengeMenuUI(this.uiScene))
    }
    public transitionToAccurateChallengeUI(): void {
        this.transitionToUI(new AccurateChallengeUI(this.uiScene))
    }

    public update(time: number, delta: number): void {
        this.mode.update(time, delta)
    }
    public updateUI(time: number, delta: number): void {
        this.ui.update(time, delta)
    }
    private transitionToUI(ui: UI): void {
        if (this.ui) this.ui.destroy()
        this.ui = ui
        this.ui.setManager(this)
    }
    private transitionToMode(mode: Mode): void {
        if (this.mode) this.mode.destroy()
        this.mode = mode
        this.mode.setManager(this)
    }
    public killAllTweens(): void {
        this.modeScene.tweens.killAll()
    }
}
