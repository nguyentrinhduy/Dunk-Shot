import { Game, Types } from 'phaser'
import { GameOverScene } from './scenes/UIs/GameOverState'
import { AccurateChallengeScene } from './scenes/states/AccurateChallengeScene'
import { BootScene } from './scenes/preload/BootScene'
import { PreloaderScene } from './scenes/preload/PreloaderScene'
import { MainMenuScene } from './scenes/UIs/MainMenuState'
import { WINDOW_SIZE } from './contstants/WindowSize'
import { MainGameScene } from './scenes/main-game/MainGameScene'

const config: Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: WINDOW_SIZE.WIDTH,
    height: WINDOW_SIZE.HEIGHT,
    parent: 'game-container',
    backgroundColor: '#c0c0c0',
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
    scene: [BootScene, PreloaderScene, MainGameScene],
}

export default new Game(config)
