export class MathHelper {
    public static getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
    public static getRandomFloat(min: number, max: number): number {
        return Math.random() * (max - min) + min
    }
    public static getRandomElement<T>(array: T[]): T {
        return array[Math.floor(Math.random() * array.length)]
    }
    public static getRandomBoolean(): boolean {
        return Math.random() < 0.5
    }
    public static getDistance(x1: number, y1: number, x2: number, y2: number): number {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
    }
    public static getAngle(x1: number, y1: number, x2: number, y2: number): number {
        return Math.atan2(y2 - y1, x2 - x1)
    }
    public static getAngleDeg(x1: number, y1: number, x2: number, y2: number): number {
        return (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI
    }
    public static getAngle360(x1: number, y1: number, x2: number, y2: number): number {
        return ((Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI + 360) % 360
    }
    public static getAngleDeg360(x1: number, y1: number, x2: number, y2: number): number {
        return ((Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI + 360) % 360
    }
    public static getAngleDeg180(x1: number, y1: number, x2: number, y2: number): number {
        return ((Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI + 180) % 360
    }
}
