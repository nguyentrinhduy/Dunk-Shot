import { Game, Types } from "phaser";
import { MainMenuScene } from './scenes/MainMenuScene';
import { BootScene } from "./scenes/BootScene";
import { PreloaderScene } from "./scenes/PreloaderScene";
import { PlayingGameScene } from "./scenes/PlayingGameScene";
import { GameOverScene } from "./scenes/GameOverScene";
import { AccurateChallengeScene } from "./scenes/AccurateChallengeScene";

const config: Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 768,
    height: 1024,
    parent: 'game-container',
    backgroundColor: '#c0c0c0',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [
        BootScene,
        PreloaderScene,
        MainMenuScene,
        PlayingGameScene,
        GameOverScene,
        AccurateChallengeScene,
        
    ]
};

export default new Game(config);
