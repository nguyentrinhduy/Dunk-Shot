import { Scene } from 'phaser';

export class BootScene extends Scene
{
    constructor ()
    {
        super('BootScene');
    }

    preload ()
    {
        
        this.load.setPath(CONSTANT.SPRITES.PATH)
        this.load.image(CONSTANT.SPRITES.COMPONENTS.LOGO.KEY, CONSTANT.SPRITES.COMPONENTS.LOGO.PATH)
    }

    create ()
    {
        this.scene.start('PreloaderScene');
    }
}
