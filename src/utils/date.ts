const datediff = (first: Date, second: Date): number => {
    return Math.round((dateToTimeshtamp(first.toDateString()) - dateToTimeshtamp(second.toDateString())) / (60 * 60 * 24));
}

const dateToTimeshtamp = (date: string): number => Math.floor(new Date(date).getTime() / 1000)

export const getDate = (dateString: string): string => {
    let date: Date = new Date(dateString)
    let today: Date = new Date()
    let prefix: string = ''
    let diff: number = datediff(today, date)

    switch (true) {
        case diff === 0:
            prefix = 'Сегодня,'
            break;

        case diff === 1:
            prefix = 'Вчера,'
            break;

        case diff % 10 === 1:
            prefix = diff + ' день назад,'
            break;

        case diff % 10 === 2:
        case diff % 10 === 3:
        case diff % 10 === 4:
            prefix = diff + ' дня назад,'
            break;

        case diff % 10 === 5:
        case diff % 10 === 6:
        case diff % 10 === 7:
        case diff % 10 === 8:
        case diff % 10 === 9:
        case diff % 10 === 0:
            prefix = diff + ' дней назад,'
            break;

        default:
            prefix = diff + '';
            break;
    }

    return prefix + ' ' + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
}