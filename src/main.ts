import { Game, Types } from 'phaser'
import { GameOverScene } from './scenes/menu/GameOverScene'
import { AccurateChallengeScene } from './scenes/challenges/AccurateChallengeScene'
import { BootScene } from './scenes/preload/BootScene'
import { PreloaderScene } from './scenes/preload/PreloaderScene'
import { MainMenuScene } from './scenes/menu/MainMenuScene'
import { PlayingGameScene } from './scenes/mainGame/PlayingGameScene'

const config: Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 768,
    height: 1024,
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
    scene: [
        BootScene,
        PreloaderScene,
        MainMenuScene,
        PlayingGameScene,
        GameOverScene,
        AccurateChallengeScene,
    ],
}

export default new Game(config)
