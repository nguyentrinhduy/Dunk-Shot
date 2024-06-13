import { Basket } from "../game-objects/Basket/Basket";

export class MapGenerator {
    private currentBasket: Basket
    private static instance: MapGenerator
    private constructor() {

    }
    public static getInstance(): MapGenerator {
        if (!MapGenerator.instance) {
            MapGenerator.instance = new MapGenerator()
        }
        return MapGenerator.instance

    }
    public getNewBasket() {
        
    }
    public getNewWalls() {

    }
    public getFirstBall() {

    }
    public getFirstBasket() {
        
    }
}