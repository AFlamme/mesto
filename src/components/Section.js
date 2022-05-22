// Вывод элементов на страницу
export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = containerSelector;
    }

    // Добавление исходных элементов на страницу
    renderItems() {
        this._items.forEach(item => {
            const element = this._renderer(item);
            this.addItem(element);
        })
    }

    // Добавление элемента на страницу
    addItem(item, isInversed = false) {
        if (isInversed) {
            this._container.prepend(item);
        } else {
            this._container.append(item);
        }
    }
}