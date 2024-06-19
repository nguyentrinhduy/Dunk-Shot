import { Data } from 'phaser'
import { Basket } from '../game-objects/basket/Basket'
import { Ball } from '../game-objects/ball/Ball'
import { LoadManager } from './LoadManager'

export enum Challenge {
    LIMIT_TIME = 0,
    ACHIEVEMENT = 1,
    BOUNCE = 2,
    ACCURATE = 3
}
export enum PlayerState {
    READY,
    PLAYING,
    WIN,
    LOSE,
    PAUSE,
    PAUSE_LOSE
}
export class DataManager {
    private currentBallType: number
    private ballUnlocked: boolean[]
    private highScore: number
    private score: number
    private stars: number

    // challenge
    private challengeLevel: number[]
    private turns: number
    private basketsJumped: number
    private totalBasket: number


    private static instance: DataManager
    private state: PlayerState
    public static getInstance(): DataManager {
        if (!DataManager.instance) {
            DataManager.instance = new DataManager()
        }
        return DataManager.instance
    }
    private constructor() {
        // localStorage.clear()
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
        
        retrievedData = localStorage.getItem('challenge_level')
        if (retrievedData) {
            this.challengeLevel = JSON.parse(retrievedData)
        }
        else {
            this.challengeLevel = Array(4).fill(1)
        }
        this.reset()
    }
    public updateTurns(): void {
        this.turns--
    }
    public getTurns(): number {
        return this.turns
    }
    public updateBasketsJumped(): void {
        this.basketsJumped++
    }
    public getBasketsJumped(): number {
        return this.basketsJumped
    }
    public setState(state: PlayerState): void {
        this.state = state
    }
    public getState(): PlayerState {
        return this.state
    }
    public getChallengeLevel(challengeType: Challenge): number {
        return this.challengeLevel[challengeType]
    }
    public reset(): void {
        this.score = 0
        this.state = PlayerState.READY
        this.turns = 3
        this.basketsJumped = 0
    }
    public setTotalBasket(totalBasket: number) {
        this.totalBasket = totalBasket
    }
    public setBallType(ballType: number): void {
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
    public updateChallengeLevel(challengeType: Challenge): void {
        if (this.challengeLevel[challengeType] < 3) {
            this.challengeLevel[challengeType]++
            localStorage.setItem('challenge_level', JSON.stringify(this.challengeLevel))
        }
        else {
            this.challengeLevel[challengeType] = 1
        }
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
