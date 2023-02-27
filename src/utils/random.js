export function randomInteger(min, max) {
    const rand = min - 0.5 + Math.random() * (max - min + 1);

    return Math.round(rand);
}

export function randomElementsFromArray(arr) {
    const result = []

    for (let index = 0; index < randomInteger(5, arr.length - 1); index++) {
        result.push(arr[randomInteger(0, arr.length - 1)])
    }

    return result;
}