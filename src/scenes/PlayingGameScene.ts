import { Scene } from 'phaser';
import { Ball } from '../game-objects/Ball';
import { CONSTANT } from '../constants';
const { BALL, BASKET, GRAVITY } = CONSTANT.PLAYING_GAME_SCENE
export class PlayingGameScene extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    private ball: Ball

    constructor ()
    {
        super('PlayingGameScene');
        this.ball = new Ball(
            BALL.START_POSITION.X,
            BALL.START_POSITION.Y
        )
    }

    create ()
    {
        this.physics.world.gravity.y = GRAVITY
        this.ball.draw(this, BALL.SCALE)
        // this.input.once('pointerdown', () => {

        //     this.scene.start('GameOverScene');

        // });
    }
}
