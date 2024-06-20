import { GameObjects, Scene } from 'phaser'
import { Background } from '../../ui-game-objects/background'
import { sprite_path } from '../../contstants/resources/Sprite'
import { LoadManager } from '../../managers/LoadManager'
import { SceneManager } from '../../managers/SceneManager'
export class PreloaderScene extends Scene {
    private logo: GameObjects.Sprite
    private background: Background
    private percentText: GameObjects.Text
    private loadManager: LoadManager
    public constructor() {
        super('PreloaderScene')
    }

    init() {
        this.loadManager = new LoadManager(this)
        //  We loaded this sprite in our Boot Scene, so we can display it here
        this.logo = this.add.sprite(380, 450, 'logo').setScale(0.7)

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(400, 750, 468, 32).setStrokeStyle(1, 0xff7300)
        this.percentText = this.add.text(370, 700, '', {
            fontSize: '25px',
            color: '#ff7300',
            fontStyle: 'bold',
            fontFamily: 'Triomphe',
        })
        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(400 - 230, 750, 4, 28, 0xff7300)

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress: number) => {
            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + 460 * progress
            this.percentText.setText(Math.round(progress * 100).toString() + '%')
        })
    }

    preload() {
        this.loadManager.loadSprites()
        this.loadManager.loadAudios()
        this.loadManager.loadDatas()
        this.loadManager.loadChallengeLevels()
    }

    create() {
        const sceneManager = new SceneManager()
        this.scene.start('MainGameScene', sceneManager).start('UIGameScene', sceneManager)
    }
}
