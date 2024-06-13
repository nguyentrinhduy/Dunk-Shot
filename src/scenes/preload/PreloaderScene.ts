import { GameObjects, Scene } from 'phaser'
import { Background } from '../../ui-game-objects/background'
import { sprite_path } from '../../contstants/resources/Sprite'
import { LoadManager } from '../../managers/LoadManager'
export class PreloaderScene extends Scene {
    private logo: GameObjects.Sprite
    private background: Background
    private loadManager: LoadManager
    public constructor() {
        super('PreloaderScene')
    }

    init() {
        this.loadManager = LoadManager.getInstance(this)
        //  We loaded this sprite in our Boot Scene, so we can display it here
        this.logo = this.add.sprite(0, 0, 'logo')

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
        this.loadManager.loadSprites()
        this.loadManager.loadAudios()
        this.loadManager.loadDatas()
    }

    create() {
        this.scene.start('PlayingGameScene')
    }
    
}
