import { Scene } from "phaser"
import { WINDOW_SIZE } from "../contstants/WindowSize"

export class PredictionLine {
    private dotsNumber: number
    private graphicalLine: Phaser.GameObjects.Graphics
    private scene: Scene

    public constructor(scene: Scene) {
        this.dotsNumber = 10
        this.scene = scene
        this.graphicalLine = this.scene.add.graphics()
    }

    public draw(scene: Scene, startX: number, startY: number, velocityX: number, velocityY: number, gravity: number): void {
        this.graphicalLine.clear()
        let radius = 5
        let currentX = startX
        let currentY = startY
        let deltaTime = 0.07
        for (let i = 0; i < this.dotsNumber; i ++) {
            currentX += velocityX * deltaTime
            currentY += velocityY * deltaTime + gravity*deltaTime*deltaTime/2
            velocityY += gravity * deltaTime
            if (currentX > WINDOW_SIZE.WIDTH) {
                currentX = WINDOW_SIZE.WIDTH - (currentX - WINDOW_SIZE.WIDTH)
                velocityX = - velocityX
            }
            else if (currentX < 0) {
                currentX = - currentX
                velocityX = - velocityX
            }
            this.graphicalLine
                .fillCircle(currentX, currentY, radius)
                .fillStyle(0xdb7d51)
        }
    }
    public clear() {
        this.graphicalLine.clear()
    }
}