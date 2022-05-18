export default class Section {
    constructor(cardContainer) {
        this._cardContainer = cardContainer;
    }

    renderItems({ items, renderer }) {
        items.forEach(item => {
            renderer(item)
        })
    }

    addItem(element) {
        this._cardContainer.prepend(element)
    }
}