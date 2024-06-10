import { Scene } from "phaser";
import { CONSTANT } from "../constants";
const { BALL_SKINS_MENU_SCENE } = CONSTANT
const { TOP_PANEL, STAR_ICON, STAR_OBJECT, BALLS, BACK_BUTTON, LIST_REGION, CHOSEN_ROUND } = BALL_SKINS_MENU_SCENE
export class BallSkinsScene extends Scene {
    private skinsContainer: Phaser.GameObjects.Container
    private scrollFactor: number
    private starObject: Phaser.GameObjects.Text
    private chosenRound: Phaser.GameObjects.Image
    private ballTypeChosen: number
    public constructor() {
        super('BallSkinsScene')
        this.scrollFactor = 0
    }
    preload() {
        
    }
    create() {
        let topPanel = this.add.image(
            TOP_PANEL.POSITION.X,
            TOP_PANEL.POSITION.Y,
            TOP_PANEL.KEY
        )
        topPanel.setScale(1.1)
        this.skinsContainer = this.add.container(LIST_REGION.POSIITON.X, LIST_REGION.POSIITON.Y);

        this.chosenRound = this.add.image(
            0,
            0,
            CHOSEN_ROUND.KEY
        )
        this.chosenRound.setScale(0.5)
        // Add ball skins to the container
        for (let ballType = 0; ballType < BALLS.NUMBER; ballType++) {
            let ballSkin = this.add.image(ballType%4*150, Math.floor(ballType/4) * 150, this.getBallKey(ballType));
            ballSkin.setScale(0.5)
            this.skinsContainer.add(ballSkin);
        }
        
        
        this.skinsContainer.add(this.chosenRound)
        let mask = this.make.graphics();
        mask.fillRect(
            LIST_REGION.POSIITON.X - 200,
            LIST_REGION.POSIITON.Y - 100,
            LIST_REGION.SIZE.WIDTH,
            LIST_REGION.SIZE.HEIGHT
        )
        this.skinsContainer.setMask(mask.createGeometryMask())
        this.skinsContainer.once('pointerdown', (pointer: Phaser.Input.Pointer) => {
            this.chosenRound.setX(Math.floor(pointer.x/150)*150)
            this.chosenRound.setY(Math.floor(pointer.y/150)*150)
        })
        // Add a pointer down event to start scrolling
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            this.scrollFactor = pointer.y;
        }, this);
        // Add a pointer move event to update the scroll
        this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
            if (pointer.isDown) {
                this.skinsContainer.y += pointer.y - this.scrollFactor;
                this.skinsContainer.y = Math.min(LIST_REGION.POSIITON.Y, this.skinsContainer.y)
                this.skinsContainer.y = Math.max(LIST_REGION.POSIITON.Y - 2500, this.skinsContainer.y)
                this.scrollFactor = pointer.y;
            }
        }, this);

        // Add a pointer up event to stop scrolling
        this.input.on('pointerup', () => {
            this.scrollFactor = 0;
        }, this);
    }
    private getBallKey(ballType: number): string {
        if (ballType < 0 || ballType > BALLS.NUMBER) {
            throw new Error("ball not found")
        }
        return BALLS.KEY + Math.floor(ballType/10).toString() + (ballType%10).toString()
    }
}