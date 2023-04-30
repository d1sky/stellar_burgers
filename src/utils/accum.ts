export const accumIngredients = (ingredients: string[]) => {
    let arr: { _id: string, count: number }[] = []

    ingredients.forEach(ingredient => {
        let element = arr.find(it => it._id === ingredient)

        if (element) {
            arr.map(it => it._id === ingredient ? { ...it, count: it.count++ } : it)
        } else {
            arr.push({ _id: ingredient, count: 1 })
        }
    })

    return arr
}