import { WINDOW_SIZE } from "../../contstants/WindowSize";
import { DataManager, PlayerState } from "../../managers/DataManager";
import { Panel } from "../../ui-game-objects/Panel";
import { Button } from "../../ui-game-objects/button/Button";
import { UI } from "./UI";

export class AccurateChallengeUI extends UI {
    private background: Phaser.GameObjects.Rectangle
    private readyPanel: Panel
    private pausePanel: Panel
    private topBar: Phaser.GameObjects.Sprite
    private dataManager: DataManager
    private playingUI: Phaser.GameObjects.Container
    private pauseButton: Button
    private turns: Phaser.GameObjects.Sprite[]
    private basketJumpsText: Phaser.GameObjects.Text
    
    public constructor(scene: Phaser.Scene) {
        super(scene);
        this.create();
    }
    public create(): void {
        this.dataManager = DataManager.getInstance();
        this.createBackground()
        this.createReadyPanel()
        this.createPlayingUI()
        this.createPausePanel()
    }
    private createBackground(): void {
        this.background = this.scene.add.rectangle(WINDOW_SIZE.WIDTH / 2, WINDOW_SIZE.HEIGHT / 2, WINDOW_SIZE.WIDTH, WINDOW_SIZE.HEIGHT)
            .setOrigin(0.5, 0.5)
            .setFillStyle(0xdbdbdb, 0.7)
            .setInteractive()
        this.add(this.background)
    }
    private createReadyPanel(): void {
        this.readyPanel = new Panel(this.scene, WINDOW_SIZE.WIDTH / 2, WINDOW_SIZE.HEIGHT / 2, () => {
            this.manager.transitionToChallengeMenuUI();
        });
        this.readyPanel.addBanner('accurate_banner')
        this.readyPanel.addText('Accomplish all the baskets!');
        const startButton = new Button(this.scene, 0, 130, () => {
            this.scene.add.tween({
                targets: [this.readyPanel, this.background],
                duration: 100,
                scale: 0,
                ease: 'linear',
                onComplete: () => {
                    this.playingUI.setScale(1),
                    this.dataManager.setState(PlayerState.PLAYING)
                }
            })
        })
        startButton.addBackground('accurate_start_button', 0, 0)
        startButton.addText('START', -50, -20, { fontFamily: 'Triomphe', fontSize: '35px', color: 'white'})
        this.readyPanel.addButton(startButton)
        this.readyPanel.setScale(0)
        this.background.setScale(0)
        this.scene.add.tween({
            targets: [this.background, this.readyPanel],
            scale: 1,
            duration: 100,
            ease: 'linear'
        })
        
        this.add(this.readyPanel)
    }
    private createPausePanel(): void {
        this.pausePanel = new Panel(this.scene, WINDOW_SIZE.WIDTH / 2, WINDOW_SIZE.HEIGHT / 2, () => {
            this.scene.scene.resume('MainGameScene')
            this.manager.transitionToChallengeMenuUI()
        });
        this.pausePanel.addBanner('accurate_banner');
        this.pausePanel.addText('Continue?');
        const continueButton = new Button(this.scene, 100, 130, () => {
            if (this.dataManager.getState() == PlayerState.PAUSE) {
                this.scene.add.tween({
                    targets: [this.pausePanel, this.background],
                    duration: 100,
                    scale: 0,
                    ease: 'linear',
                    onComplete: () => {
                        this.playingUI.setScale(1),
                        this.dataManager.setState(PlayerState.PLAYING)
                        this.scene.scene.resume('MainGameScene')
                    }
                })
            }
            else {
                this.manager.transitionToAccurateChallengeState()
                this.scene.add.tween({
                    targets: [this.pausePanel, this.background],
                    duration: 100,
                    scale: 0,
                    ease: 'linear',
                    onComplete: () => {
                        this.dataManager.setState(PlayerState.READY)
                        this.scene.add.tween({
                            targets: [this.background, this.readyPanel],
                            scale: 1,
                            duration: 100,
                            ease: 'linear'
                        })
                        this.scene.scene.resume('MainGameScene')
                    }
                })
                this.pausePanel.addText('Continue?')
            }
            
        }).setScale(0.7)
        continueButton.addBackground('accurate_start_button', 0, 0)
        continueButton.addText('CONTINUE', -60, -20, { fontFamily: 'Triomphe', fontSize: '25px', color: 'white'})
        const giveUpButton = new Button(this.scene, -100, 130, () => {
            this.scene.scene.resume('MainGameScene')
            this.manager.transitionToChallengeMenuUI()
        }).setScale(0.7)
        giveUpButton.addBackground('give_up_button', 0, 0)
        giveUpButton.addText('GIVE UP', -45, -20, { fontFamily: 'Triomphe', fontSize: '25px', color: 'white'})
        this.pausePanel.addButton(continueButton)
        this.pausePanel.addButton(giveUpButton)
        this.pausePanel.setScale(0)
        this.add(this.pausePanel)
    }
    private createPlayingUI(): void {
        this.playingUI = this.scene.add.container(0, 0)
        this.topBar = this.scene.add.sprite(WINDOW_SIZE.WIDTH/2, 50, 'blue_top_panel').setScale(1.1)
        this.pauseButton = new Button(this.scene, 40, 40, () => {
            this.playingUI.setScale(0)
            this.scene.add.tween({
                targets: [this.background, this.pausePanel],
                duration: 100,
                scale: 1,
                ease: 'Linear'
            })
            this.dataManager.setState(PlayerState.PAUSE)
            this.scene.scene.pause('MainGameScene')
        })
        this.pauseButton.addBackground('pause_button', 0, 0)
        this.basketJumpsText = this.scene.add.text(650, 20, '0/0', { fontFamily: 'Triomphe', fontSize: '35px', color: 'white'})
        this.playingUI.add(this.topBar)
        this.playingUI.add(this.pauseButton)
        this.playingUI.add(this.basketJumpsText)
        this.playingUI.setScale(0)
        this.add(this.playingUI)
    }
    public update(): void {
        // throw new Error("Method not implemented.");
        if (this.dataManager.getState() == PlayerState.WIN) {
            this.dataManager.setState(PlayerState.PAUSE)
            this.manager.transitionToAccurateChallengeState()
            this.playingUI.setScale(0)
            this.scene.add.tween({
                targets: [this.background, this.readyPanel],
                scale: 1,
                duration: 100,
                ease: 'linear',
                onComplete: () => {
                    this.scene.scene.resume('MainGameScene')
                }
            })
        }
        else if (this.dataManager.getState() == PlayerState.LOSE){
            this.dataManager.setState(PlayerState.PAUSE_LOSE)
            this.playingUI.setScale(0)
            this.scene.add.tween({
                targets: [this.background, this.pausePanel],
                duration: 100,
                scale: 1,
                ease: 'Linear',
                onComplete: () => {
                    this.scene.scene.pause('MainGameScene')
                }
            })
            this.pausePanel.addText('Try again?')
            
        }
    }
}