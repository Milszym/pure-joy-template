// Utility to check if today is before a given date (YYYY-MM-DD)
export function isTodayBefore(dateString: string): boolean {
    const today = new Date();
    const target = new Date(dateString);
    // Set both to midnight for date-only comparison
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);
    return today < target;
} 