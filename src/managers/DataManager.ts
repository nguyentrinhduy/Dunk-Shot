import { Data } from 'phaser'
import { Basket } from '../game-objects/basket/Basket'
import { Ball } from '../game-objects/ball/Ball'

export class DataManager {
    private currentBallType: number
    private ballUnlocked: boolean[]
    private highScore: number
    private score: number
    private stars: number
    private static instance: DataManager
    public static getInstance(): DataManager {
        if (!DataManager.instance) {
            DataManager.instance = new DataManager()
        }
        return DataManager.instance
    }
    private constructor() {
        this.ballUnlocked = Array(78).fill(false)
        this.ballUnlocked[0] = true
        this.currentBallType = 0
        this.score = 0
        this.highScore = 0
        this.stars = 300
    }
    private init() {}
    public reset() {
        this.score = 0
    }
    public setBallType(ballType: number) {
        this.currentBallType = ballType
    }
    public getBallType(): number {
        return this.currentBallType
    }
    public unlockBall(ballType: number) {
        this.ballUnlocked[ballType] = true
    }
    public isBallUnlocked(ballType: number): boolean{
        return this.ballUnlocked[ballType]
    }
    public getScore(): number {
        return this.score
    }
    public addScore(score: number): void {
        this.score += score
    }
    public getHighScore(): number {
        return this.highScore
    }
    public getStars(): number {
        return this.stars
    }
    public addStars(stars: number) {
        this.stars += stars
    }
}
