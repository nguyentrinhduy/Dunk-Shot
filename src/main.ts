import { Game, Types } from 'phaser'
import { BootScene } from './scenes/preload/BootScene'
import { PreloaderScene } from './scenes/preload/PreloaderScene'
import { WINDOW_SIZE } from './contstants/WindowSize'
import { MainGameScene } from './scenes/main-game/MainGameScene'
import { UIGameScene } from './scenes/main-game/UIGameScene'

const config: Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: WINDOW_SIZE.WIDTH,
    height: WINDOW_SIZE.HEIGHT,
    parent: 'game-container',
    backgroundColor: '#dbdbdb',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true
        },
    },
    scene: [BootScene, PreloaderScene, MainGameScene, UIGameScene],
}

export default new Game(config)
