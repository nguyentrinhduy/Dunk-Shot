import { Scene } from 'phaser'
import { icons, sprite_path } from '../../contstants/resources/Sprite'
export class BootScene extends Scene {
    constructor() {
        super('BootScene')
    }

    preload() {
        this.load.setPath(sprite_path)
        this.load.image(icons.logo.key, icons.logo.path)
    }

    create() {
        this.scene.start('PreloaderScene')
    }
}
