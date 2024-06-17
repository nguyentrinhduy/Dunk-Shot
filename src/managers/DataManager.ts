import { Data } from "phaser"
import { Basket } from "../game-objects/Basket/Basket"
import { Ball } from "../game-objects/Ball/Ball"

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
        this.currentBallType = 0
        this.score = 0
        this.highScore = 0
        this.stars = 0
    }
    private init() {

    }
    public reset() {
        this.score = 0
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