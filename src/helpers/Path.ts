export class Path {
    private startPoint: Phaser.Math.Vector2
    private endPoint: Phaser.Math.Vector2
    private midPoint: Phaser.Math.Vector2
    private radius: Phaser.Math.Vector2
    private currentAngle: number = 0
    public constructor(startPoint: Phaser.Math.Vector2, endPoint: Phaser.Math.Vector2) {
        this.startPoint = startPoint
        this.endPoint = endPoint
        this.midPoint = new Phaser.Math.Vector2(
            (startPoint.x + endPoint.x) / 2,
            (startPoint.y + endPoint.y) / 2
        )
        this.radius = new Phaser.Math.Vector2(
            -(endPoint.x - startPoint.x) / 2,
            (endPoint.y - startPoint.y) / 2
        )
    }
    public getNewPosition(time: number, delta: number): Phaser.Math.Vector2 {
        this.currentAngle += 0.001 * delta
        if (this.currentAngle > Math.PI * 2) {
            this.currentAngle -= Math.PI * 2
        }
        return new Phaser.Math.Vector2(
            this.midPoint.x + this.radius.x * Math.cos(this.currentAngle),
            this.midPoint.y + this.radius.y * Math.cos(this.currentAngle)
        )
    }
}
