import { GameObjects, Scene } from 'phaser'
import { CONSTANT } from '../constants'
const { PRELOAD_SCENE, SPRITES } = CONSTANT
const { BALLS, COMPONENTS, BASKETS } = SPRITES
const { BUTTONS, SPINS, TEXTS, ICONS, PANELS } = COMPONENTS
const { LOGO, PROGRESS_BAR, BACKGROUND } = PRELOAD_SCENE
export class PreloaderScene extends Scene {
    private logo: GameObjects.Image
    
    public constructor() {
        super('PreloaderScene')
    }

    init() {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.logo = this.add.image(
            LOGO.POSITION.X, 
            LOGO.POSITION.Y,
            LOGO.KEY
        )

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff)
        
        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff)

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress: number) => {
            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + 460 * progress
        })
    }

    preload() {
        // Load the images
        this.load.setPath(CONSTANT.SPRITES.PATH)
        // Balls
        for (let ballType = 0; ballType < BALLS.NUMBER; ballType ++) {
            this.load.image(this.getBallKey(ballType), this.getBallPath(ballType))
        }
        // Baskets
        // Effects
        // Components
        this.load.image(BUTTONS.CHALLENGES.KEY, BUTTONS.CHALLENGES.PATH)
        this.load.image(TEXTS.DRAG_IT.KEY, TEXTS.DRAG_IT.PATH)
        this.load.image(BUTTONS.ORANGE_BACKGROUND.KEY, BUTTONS.ORANGE_BACKGROUND.PATH)
        this.load.image(BUTTONS.SETTINGS.KEY, BUTTONS.SETTINGS.PATH)
        this.load.image(ICONS.ORANGE_BALL_ICON.KEY, ICONS.ORANGE_BALL_ICON.PATH)
        this.load.image(PANELS.BLUE_TOP_PANEL.KEY, PANELS.BLUE_TOP_PANEL.PATH)
        this.load.image(PANELS.GRAY_TOP_PANEL.KEY, PANELS.GRAY_TOP_PANEL.PATH)
        this.load.image(ICONS.CHOSEN_ROUND.KEY, ICONS.CHOSEN_ROUND.PATH)
        // Load the sounds
    }

    create() {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainMenuScene')
    }
    private getBallPath(ballType: number): string {
        if (ballType < 0 || ballType > BALLS.NUMBER) {
            throw new Error("ball not found")
        }
        console.log(BALLS.PATH + Math.floor(ballType/10).toString() + (ballType%10).toString() + '.png')
        return BALLS.PATH + Math.floor(ballType/10).toString() + (ballType%10).toString() + '.png'
    }
    private getBallKey(ballType: number): string {
        if (ballType < 0 || ballType > BALLS.NUMBER) {
            throw new Error("ball not found")
        }
        return BALLS.KEY + Math.floor(ballType/10).toString() + (ballType%10).toString()
    }
}
