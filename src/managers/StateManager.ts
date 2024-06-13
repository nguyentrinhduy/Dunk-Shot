import { Scene } from "phaser";
import { State } from "../scenes/states/State";
import { NormalModeState } from "../scenes/states/games/NormalModeState";

export class StateManager {
    public scene: Scene
    private currentState: State
    public constructor(scene: Scene) {
        this.scene = scene
        this.transitionTo(new NormalModeState(scene))
    }
    public transitionTo(state: State): void {
        if (this.currentState) this.currentState.destroy()
        this.currentState = state
        this.currentState.setManager(this)
    }
    public update(time: number, delta: number): void {
        this.currentState.update(time, delta)
    }
    public create(): void {
        this.currentState.create()
    }
}