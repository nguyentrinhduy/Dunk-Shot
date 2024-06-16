import { Scene } from "phaser";
import { ToggleButton } from "../../ui-game-objects/button/ToggleButton";
import { UI } from "./UI";
import { Stars } from "../../ui-game-objects/Stars";
import { Button } from "../../ui-game-objects/button/Button";

export class SettingsUI extends UI {
    private soundsToggle: ToggleButton
    private MusicToggle: ToggleButton
    private soundsText: Phaser.GameObjects.Text
    private stars: Stars
    private musicText: Phaser.GameObjects.Text
    private backButton: Button
    
    public constructor(scene: Scene) {
        super(scene)
        this.create()
    }
    public create(): void {
        this.soundsToggle = new ToggleButton(this.scene, 0, 0)
        this.MusicToggle = new ToggleButton(this.scene, 0, 0)
        this.soundsText = this.scene.add.text(0, 0, 'Sounds', {fontSize: '32px', color: 'black'})
        this.musicText = this.scene.add.text(0, 0, 'Music', {fontSize: '32px', color: 'black'})
        this.stars = new Stars(this.scene, 0, 0)
        

        this.add(this.soundsToggle)
        this.add(this.MusicToggle)
        this.add(this.soundsText)
        this.add(this.musicText)
        this.add(this.stars)
        this.add(this.backButton)
        
    }
    public update(): void {
        
    }
}