import { Data, GameObjects, Scene } from "phaser";
import { UI } from "./UI";
import { DataManager } from "../../managers/DataManager";

export class BallSkinsUI extends UI {
    private dataManager: DataManager
    private topPanel: GameObjects.Sprite
    
    public constructor(scene: Scene) {
        super(scene)
        this.create()
    }
    public create(): void {
        this.dataManager = DataManager.getInstance()
        this.topPanel = this.scene.add.sprite(0, 0, 'ball_skins_top_panel')
    }
    public update(): void {
        
    }
}