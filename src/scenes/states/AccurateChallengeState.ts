import { Data, Scene } from "phaser";
import { Ball } from "../../game-objects/ball/Ball";
import { Basket } from "../../game-objects/basket/Basket";
import { MapGenerator } from "../../helpers/MapGenerator";
import { State } from "./State";
import { WINDOW_SIZE } from "../../contstants/WindowSize";
import { StreakManager } from "../../managers/StreakManager";
import { Challenge, DataManager, PlayerState } from "../../managers/DataManager";
import { AudioManager } from "../../managers/AudioManager";
import { StraightObstacle } from "../../game-objects/obstacle/StraightObstacle";
import { RoundObstacle } from "../../game-objects/obstacle/RoundObstacle";
import { BouncerObstacle } from "../../game-objects/obstacle/BouncerObstacle";

export class AccurateChallengeState extends State {
    private camera: Phaser.Cameras.Scene2D.Camera
    private ball: Ball
    private baskets: Basket[]
    private level: number
    private mapGenerator: MapGenerator
    private draggingZone: Phaser.GameObjects.Zone
    private leftSideWall: Phaser.GameObjects.Rectangle
    private rightSideWall: Phaser.GameObjects.Rectangle
    private dataManager: DataManager
    public constructor(scene: Scene) {
        super(scene)
        this.create()
    }
    protected create(): void {
        this.mapGenerator = new MapGenerator(this.scene)
        this.draggingZone = this.scene.add
            .zone(0, 0, WINDOW_SIZE.WIDTH, WINDOW_SIZE.HEIGHT)
            .setOrigin(0)
            .setInteractive({ draggable: true })
        this.add(this.draggingZone)
        this.dataManager = DataManager.getInstance()
        this.dataManager.reset()
        this.level = this.dataManager.getChallengeLevel(Challenge.ACCURATE)
        this.loadMap()
        this.scene.physics.world.gravity.y = 2000
        
        StreakManager.getInstance().reset()
        this.createCamera()
        this.createSideWalls()
    }
    private loadMap() {
        this.baskets = []
        const map = this.scene.add.tilemap('accurate_challenge_level_' + this.level.toString())
        const objectLayer = map.getObjectLayer('Object Layer 1')
        if (!objectLayer) {
            throw new Error('load failed')
        }
        let dy = 1300
        objectLayer.objects.forEach(object => {
            switch (object.type) {
                case 'ball' : {
                    this.createBall()
                    this.ball.setPosition(object.x, object.y! - dy)
                    this.ball.setAllowPrediction(false)
                    break
                }
                case 'basket' : {
                    let basket = new Basket(this.scene, object.x, object.y! - dy, this.ball, object.rotation!/180 * Math.PI)
                    if (object.name == 'first_basket') {
                        basket.setFirstTurn()
                    }
                    this.baskets.push(basket)
                    break
                }
                case 'straight_obstacle': {
                    let obstacle = new StraightObstacle(this.scene, object.x, object.y! - dy, this.ball)
                    this.baskets[this.baskets.length - 1].addObstacle(obstacle)
                    break
                }
                case 'round_obstacle': {
                    let x = this.baskets[this.baskets.length - 1].x
                    let y = this.baskets[this.baskets.length - 1].y
                    let type = parseInt(object.name) - 1
                    let obstacle = new RoundObstacle(this.scene, x, y, this.ball, type)
                    this.baskets[this.baskets.length - 1].addObstacle(obstacle)
                    break
                }
                case 'bouncer': {
                    let obstacle = new BouncerObstacle(this.scene, object.x, object.y! - dy, this.ball)
                    this.baskets[this.baskets.length - 1].addObstacle(obstacle)
                    break
                }
            }
        })
        this.dataManager.setTotalBasket(this.baskets.length - 1)
    }
    public update(time: number, delta: number): void {
        this.ball.update(time, delta)
        if (this.dataManager.getBallType() != this.ball.getBallType()) {
            this.ball.setBallType(this.dataManager.getBallType())
        }
        this.baskets.forEach((basket) => basket.update(time, delta))
        this.leftSideWall.y = this.camera.scrollY
        this.rightSideWall.y = this.camera.scrollY
        this.draggingZone.y = this.camera.scrollY
        // lose
        if (this.ball.y > this.baskets[0].y + 400) {
            if (this.dataManager.getTurns() > 0) {
                if (this.dataManager.getBasketsJumped() != 0){
                    this.dataManager.updateTurns()
                }
                this.ball.x = this.baskets[0].x
                this.ball.y = this.baskets[0].y - 200

                this.ball.setAlpha(0).setRotation(0)
                this.ball.body.setVelocity(0, 0).setAllowGravity(false)
                this.scene.add.tween({
                    targets: this.ball,
                    alpha: 1,
                    duration: 400,
                    ease: 'Quad.easeIn',
                    onComplete: () => {
                        this.ball.body.setAllowGravity(true)
                    },
                })
                AudioManager.getInstance().getBallRecreationSound()
                this.baskets[0].resetRotation()
            } else {
                this.camera.stopFollow()
                this.dataManager.setState(PlayerState.LOSE)
            }
        }
        if (this.baskets.length > 1 && this.baskets[1].containedBall) {
            const basket = this.baskets.shift()
            if (basket) basket.destroy()
            this.dataManager.updateBasketsJumped()
        }
        if (this.baskets.length == 1) {
            this.dataManager.setState(PlayerState.WIN)
            this.dataManager.updateChallengeLevel(Challenge.ACCURATE)
        }
    }
    private createBall() {
        this.ball = new Ball(this.scene, 200, 500)
            .setDepth(2)
            .setScale(0.4)
            .setAlpha(0)
            .setRotation(0)
        this.ball.body
            .setCircle(100)
            .setOffset(-100)
            .setBounce(0.8)
            .setAllowGravity(false)
            .setImmovable(false)
            .setVelocity(0, 0)
        this.scene.add.tween({
            targets: this.ball,
            alpha: 1,
            duration: 500,
            ease: 'Quad.easeIn',
            onComplete: () => {
                this.ball.body.setAllowGravity(true)
                AudioManager.getInstance().getBallRecreationSound()
            },
        })
    }
    private createCamera() {
        this.camera = this.scene.cameras.main
        this.camera.scrollY = 300
        this.camera.startFollow(this.ball, true, 0, 0.02, this.ball.x - WINDOW_SIZE.WIDTH / 2, 200)
    }
    private createSideWalls() {
        this.leftSideWall = this.scene.add.rectangle(-10, 0, 10, WINDOW_SIZE.HEIGHT).setOrigin(0)
        this.scene.physics.add.existing(this.leftSideWall)
        ;(this.leftSideWall.body as Phaser.Physics.Arcade.Body)
            .setAllowGravity(false)
            .setImmovable(true)
        this.scene.physics.add.collider(this.ball, this.leftSideWall, () => {
            AudioManager.getInstance().getCollideWallSound()
        })
        this.add(this.leftSideWall)

        this.rightSideWall = this.scene.add
            .rectangle(WINDOW_SIZE.WIDTH, 0, 10, WINDOW_SIZE.HEIGHT)
            .setOrigin(0)
        this.scene.physics.add.existing(this.rightSideWall)
        ;(this.rightSideWall.body as Phaser.Physics.Arcade.Body)
            .setAllowGravity(false)
            .setImmovable(true)
        this.scene.physics.add.collider(this.ball, this.rightSideWall, () => {
            AudioManager.getInstance().getCollideWallSound()
        })
        this.add(this.rightSideWall)
    }
    public destroy(fromScene?: boolean | undefined): void {
        this.ball.destroy()
        this.baskets.forEach((basket) => basket.destroy())
        super.destroy()
    }
}