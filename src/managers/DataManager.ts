import { Data } from "phaser"
import { Basket } from "../game-objects/Basket/Basket"
import { Ball } from "../game-objects/Ball/Ball"

export class DataManager {
    private currentBallType: number
    private ballUnlocked: boolean[]
    private highScore: number
    private score: number
    private basket: Basket
    private ball: Ball
    private static instance: DataManager
    public static getInstance(): DataManager {
        if (!DataManager.instance) {
            DataManager.instance = new DataManager()
        }
        return DataManager.instance
    }
    private constructor() {
        
    }
    private init() {

    }
}