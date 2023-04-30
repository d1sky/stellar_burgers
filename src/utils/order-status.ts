export const getCirilicStatus = (status: string): string => {
    switch (status) {
        case 'done':
            return 'Выполнен';
        case 'pending':
            return 'Готовиться';
        default:
            return 'Создан'
    }
}