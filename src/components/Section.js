// Вывод элементов на страницу
export default class Section {
    constructor(cardContainer) {
        this._cardContainer = cardContainer;
    }

    // Добавление исходных элементов на страницу
    renderItems({ items, renderer }) {
        items.forEach(item => {
            renderer(item)
        })
    }

    // Добавление элемента на страницу
    addItem(element) {
        this._cardContainer.prepend(element)
    }
}