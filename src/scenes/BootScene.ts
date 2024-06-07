import { Scene } from 'phaser';
import { CONSTANT } from '../constants';

export class BootScene extends Scene
{
    constructor ()
    {
        super('BootScene');
    }

    preload ()
    {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

        // this.load.image('background', 'assets/bg.png');
        this.load.setPath(CONSTANT.SPRITES.PATH)
        this.load.image(CONSTANT.SPRITES.COMPONENTS.LOGO.KEY, CONSTANT.SPRITES.COMPONENTS.LOGO.PATH)
    }

    create ()
    {
        this.scene.start('PreloaderScene');
    }
}
