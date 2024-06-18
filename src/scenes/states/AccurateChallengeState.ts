import { Scene } from "phaser";
import { State } from "./State";

export class AccurateChallengeState extends State {
    public constructor(scene: Phaser.Scene) {
        super(scene);
        this.create();
    }
    public create(): void {
        throw new Error("Method not implemented.");
    }
    public update(): void {
        throw new Error("Method not implemented.");
    }
}