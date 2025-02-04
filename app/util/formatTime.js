function formatTime(date) {
    const seconds = Math.round((Date.now() - date.getTime()) / 1000)

    if (seconds < 60)
        return seconds + ' second' + (seconds === 1 ? '' : 's')

    const minutes = Math.round(seconds / 60)

    if (minutes < 60)
        return minutes + ' minute' + (minutes === 1 ? '' : 's')

    const hours = Math.round(minutes / 60)

    if (hours < 24)
        return hours + ' hour' + (hours === 1 ? '' : 's')

    const days = Math.round(hours / 24)

    if (days < 7)
        return days + ' day' + (days === 1 ? '' : 's')

    const weeks = Math.round(days / 7)

    if (weeks < 4)
        return weeks + ' week' + (weeks === 1 ? '' : 's')

    const months = Math.round(weeks / 4)

    if (months < 12)
        return months + ' month' + (months === 1 ? '' : 's')

    const years = Math.round(months / 12)

    return years + ' year' + (years === 1 ? '' : 's')
}

export default formatTime