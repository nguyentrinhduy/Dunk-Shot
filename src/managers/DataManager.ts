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
        let retrievedData = localStorage.getItem('ball_unlocked')
        if (retrievedData) {
            this.ballUnlocked = JSON.parse(retrievedData)
        }
        else {
            this.ballUnlocked = Array(78).fill(false)
            this.ballUnlocked[0] = true
        }

        retrievedData = localStorage.getItem('current_ball_type')
        if (retrievedData) {
            this.currentBallType = JSON.parse(retrievedData)
        }
        else {
            this.currentBallType = 0
        }

        retrievedData = localStorage.getItem('high_score')
        if (retrievedData) {
            this.highScore = JSON.parse(retrievedData)
        }
        else {
            this.highScore = 0
        }

        retrievedData = localStorage.getItem('stars')
        if (retrievedData) {
            this.stars = JSON.parse(retrievedData)
        }
        else {
            this.stars = 300
        }
    }
    private init() {}
    public reset() {
        this.score = 0
    }
    public setBallType(ballType: number) {
        this.currentBallType = ballType
        localStorage.setItem('current_ball_type', JSON.stringify(this.currentBallType))
    }
    public getBallType(): number {
        return this.currentBallType
    }
    public unlockBall(ballType: number) {
        this.ballUnlocked[ballType] = true
        localStorage.setItem('ball_unlocked', JSON.stringify(this.ballUnlocked))
    }
    public isBallUnlocked(ballType: number): boolean{
        return this.ballUnlocked[ballType]
    }
    public getScore(): number {
        return this.score
    }
    public addScore(score: number): void {
        this.score += score
        this.highScore = Math.max(this.score, this.highScore)
        localStorage.setItem('high_score', JSON.stringify(this.highScore))
    }
    public getHighScore(): number {
        return this.highScore
    }
    public getStars(): number {
        return this.stars
    }
    public addStars(stars: number) {
        this.stars += stars
        localStorage.setItem('stars', JSON.stringify(this.stars))
    }
}
