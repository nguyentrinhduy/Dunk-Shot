import { GameObjects, Scene } from 'phaser'
import { CONSTANT } from '../constants'

export class PreloaderScene extends Scene {
    private logo: GameObjects.Image

    public constructor() {
        super('PreloaderScene')
    }

    init() {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.logo = this.add.image(
            CONSTANT.PRELOAD_SCENE.LOGO.POSITION.X, 
            CONSTANT.PRELOAD_SCENE.LOGO.POSITION.Y,
            CONSTANT.SPRITES.COMPONENTS.LOGO.KEY
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
        
        // Load the sounds
    }

    create() {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainMenuScene')
    }
}
