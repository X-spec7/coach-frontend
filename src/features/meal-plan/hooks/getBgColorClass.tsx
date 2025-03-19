export const getBgColorClass = (mealTime: string) => {
    switch (mealTime.toLowerCase()) {
        case "breakfast":
            return "bg-blue-light"
        case "lunch":
            return "bg-yellow-light"
        case "dinner":
            return "bg-green-light"
        case "snack":
            return "bg-purple-light"
        default:
            return "bg-green-light"
    }
}