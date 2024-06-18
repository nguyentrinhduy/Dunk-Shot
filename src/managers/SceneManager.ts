import { Game, Scene } from "phaser";
import { State } from "../scenes/states/State";
import { NormalModeState } from "../scenes/states/NormalModeState";
import { UI } from "../scenes/UIs/UI";
import { MainMenuUI } from "../scenes/UIs/MainMenuUI";
import { GameOverUI } from "../scenes/UIs/GameOverUI";
import { PauseUI } from "../scenes/UIs/PauseUI";
import { SettingsUI } from "../scenes/UIs/SettingsUI";
import { NormalModeUI } from "../scenes/UIs/NormalModeUI";
import { BallSkinsUI } from "../scenes/UIs/BallSkinsUI";
import { ChallengeMenuUI } from "../scenes/UIs/ChallengeMenuUI";

export class SceneManager {
    private uiScene: Scene
    private ui: UI
    private stateScene: Scene
    private state: State
    
    public setUIScene(scene: Scene): void {
        this.uiScene = scene
    }
    public setStateScene(scene: Scene): void {
        this.stateScene = scene
    }

    // game state transitions
    public transitionToNormalModeState(): void {
        this.transitionToState(new NormalModeState(this.stateScene))
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

    
    public update(time: number, delta: number): void {
        this.state.update(time, delta)
    }
    public updateUI(time: number, delta: number): void {
        this.ui.update(time, delta)
    }
    private transitionToUI(ui: UI): void {
        if (this.ui) this.ui.destroy()
        this.ui = ui
        this.ui.setManager(this)
    }
    private transitionToState(state: State): void {
        if (this.state) this.state.destroy()
        this.state = state
        this.state.setManager(this)
    }
}