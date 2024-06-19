import { Data, GameObjects, Scene } from "phaser";
import { UI } from "./UI";
import { DataManager } from "../../managers/DataManager";
import { WINDOW_SIZE } from "../../contstants/WindowSize";
import { Button } from "../../ui-game-objects/button/Button";
import { ball } from "../../contstants/resources/Sprite";
import { BallType } from "../../ui-game-objects/BallType";

export class BallSkinsUI extends UI {
    private background: GameObjects.Rectangle
    private dataManager: DataManager
    private backButton: Button
    private line: GameObjects.Sprite
    private topPanel: GameObjects.Sprite
    private ballSkins: BallType[]
    private listBallSkin: GameObjects.Container
    private draggingZone: GameObjects.Zone
    private chosenRound: GameObjects.Sprite
    private dragStartY: number
    public constructor(scene: Scene) {
        super(scene)
        this.create()
    }
    public create(): void {
        this.scene.input.setTopOnly(false)
        this.dataManager = DataManager.getInstance()

        this.createBackgrounds()
        this.createBallSkins()
        this.createDraggingZone()

        this.add(this.draggingZone)
        this.add(this.background)
        this.add(this.topPanel)
        this.add(this.listBallSkin)
        this.add(this.backButton)
        this.add(this.line)
        this.setInteractive()
    }
    private createBackgrounds(): void {
        this.background = this.scene.add.rectangle(0, 0, WINDOW_SIZE.WIDTH, WINDOW_SIZE.HEIGHT).setOrigin(0, 0).setFillStyle(0xdbdbdb, 1)
        this.line = this.scene.add.sprite(WINDOW_SIZE.WIDTH/2, 300, 'line')
        this.line.scaleX = 6
        this.topPanel = this.scene.add.sprite(WINDOW_SIZE.WIDTH/2, 50, 'gray_top_panel').setScale(1.1)
        this.backButton = new Button(this.scene, 40, 40, () => {
            this.manager.transitionToMainMenuUI()
        })
        this.backButton.addBackground('white_back_button', 0, 0)
    }
    private createBallSkins(): void {
        this.ballSkins = []
        this.chosenRound = this.scene.add.sprite(0, 0, 'chosen_round').setScale(0.5)
        for (let ballType = 0; ballType < ball.number; ballType++) {
            const ballSkin = new BallType(this.scene, (ballType % 4) * 150, Math.floor(ballType / 4) * 150, ballType)
            ballSkin.setScale(0.5).setLocked(!this.dataManager.isBallUnlocked(ballType))
            ballSkin.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
                if (pointer.y < 300) return
                if (this.dataManager.isBallUnlocked(ballType)) {
                    this.chosenRound.x = (ballType % 4) * 150
                    this.chosenRound.y = Math.floor(ballType / 4) * 150
                    this.dataManager.setBallType(ballType)
                }
                else {
                    if (this.dataManager.getStars() >= 100) {
                        this.dataManager.addStars(-100)
                        this.dataManager.unlockBall(ballType)
                        ballSkin.setLocked(false)
                    }
                }
                
            })
            this.ballSkins.push(ballSkin)
        }
        
        this.listBallSkin = this.scene.add.container(160, 400, this.ballSkins)
        this.listBallSkin.add(this.chosenRound)
        const graphics = this.scene.add.graphics()
        graphics.fillRect(0, 300, WINDOW_SIZE.WIDTH, WINDOW_SIZE.HEIGHT - 300)
        this.listBallSkin.setMask(new Phaser.Display.Masks.GeometryMask(this.scene, graphics))
    }
    private createDraggingZone(): void {
        this.draggingZone = this.scene.add.zone(0, 300, WINDOW_SIZE.WIDTH, WINDOW_SIZE.HEIGHT).setOrigin(0).setInteractive({ draggable: true })
        this.scene.input.dragDistanceThreshold = 16
        this.draggingZone.on('dragstart', (pointer: Phaser.Input.Pointer) => {
            this.dragStartY = pointer.y
        })
        this.draggingZone.on('drag', (pointer: Phaser.Input.Pointer) => {
            this.listBallSkin.y += pointer.y - this.dragStartY
            this.listBallSkin.y = Math.min(this.listBallSkin.y, 400)
            this.listBallSkin.y = Math.max(this.listBallSkin.y, 400 - Math.floor(this.ballSkins.length/4) * 150)
            this.dragStartY = pointer.y
        })
        
    }
    public destroy(fromScene?: boolean | undefined): void {
        this.scene.input.setTopOnly(true)
        super.destroy()
    }
    public update(): void {
        
    }
}