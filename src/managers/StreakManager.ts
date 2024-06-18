export class StreakManager{
    private static instance: StreakManager
    private streak: number
    private constructor() {
        this.streak = 1
    }
    public static getInstance(): StreakManager {
        if (!StreakManager.instance) {
            StreakManager.instance = new StreakManager()
        }
        return StreakManager.instance
    }
    public getStreak(): number {
        return this.streak
    }
    public addStreak(): void {
        this.streak += 1
    }
    public reset(): void {
        this.streak = 1
    }

}