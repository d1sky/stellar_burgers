export const getCirilicStatus = (status: string): string => {
    switch (status) {
        case 'done':
            return 'Выполнен';
        case 'create':
            return 'Создан';
        default:
            return ''
    }
}