import { Scene } from 'phaser'
import { WINDOW_SIZE } from '../contstants/WindowSize'

export class PredictionLine {
    private dotsNumber: number
    private graphicalLine: Phaser.GameObjects.Graphics
    private scene: Scene

    public constructor(scene: Scene) {
        this.dotsNumber = 10
        this.scene = scene
        this.graphicalLine = this.scene.add.graphics().setDepth(0)
    }

    public draw(
        startX: number,
        startY: number,
        velocityX: number,
        velocityY: number,
        gravity: number
    ): void {
        this.graphicalLine.clear()
        let radius = 5
        let currentX = startX
        let currentY = startY
        let deltaTime = 0.07
        this.graphicalLine.save()
        this.graphicalLine.fillStyle(0xdb7d51)
        for (let i = 0; i < this.dotsNumber; i++) {
            currentX += velocityX * deltaTime
            currentY += velocityY * deltaTime + (gravity * deltaTime * deltaTime) / 2
            velocityY += gravity * deltaTime
            if (currentX > WINDOW_SIZE.WIDTH) {
                currentX = WINDOW_SIZE.WIDTH - (currentX - WINDOW_SIZE.WIDTH)
                velocityX = -velocityX
            } else if (currentX < 0) {
                currentX = -currentX
                velocityX = -velocityX
            }
            this.graphicalLine.fillCircle(currentX, currentY, radius)
        }
        this.graphicalLine.restore()
    }
    public drawLinePath(startX: number, startY: number, endX: number, endY: number) {
        this.graphicalLine.clear()
        if (startX == endX && startY == endY) {
            return
        }
        let dx = (endX - startX) / (this.dotsNumber - 1)
        let dy = (endY - startY) / (this.dotsNumber - 1)
        let currentX = startX
        let currentY = startY
        this.graphicalLine.save()
        this.graphicalLine.fillStyle(0xa1a1a1)
        for (let i = 0; i < this.dotsNumber; i++) {
            this.graphicalLine.fillCircle(currentX, currentY, 10)
            currentX += dx
            currentY += dy
        }
        this.graphicalLine.restore()
    }
    public destroy() {
        this.graphicalLine.destroy()
    }
    public clear() {
        this.graphicalLine.clear()
    }
}
