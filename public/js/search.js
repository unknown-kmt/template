import { fetchSearch } from './dataFetchers.js';

const foundItemsRoot = document.getElementById('found_items');
const searchButton = document.getElementById('search_button');
const searchField = document.getElementById('search_input');

window.onload = bindSearchFields;

/**
 * Биндинг элементов страницы поиска
 */
function bindSearchFields() {
    searchButton.addEventListener('click', onSearchClickHandler);
    searchField.addEventListener('keydown', onSearchButtonPressHandler)
}

/**
 * Хэндлер нажатия на кнопку поиска
 */
function onSearchClickHandler() {

    handleSearch(searchField.value);
}

/**
 * Хэндлер нажатия энтера в строке поиска
 * @param {Event} event событие нажатия 
 */
function onSearchButtonPressHandler(event) {
    if (event.key === "Enter")
        handleSearch()
}

/**
 * Обработчик нового найденного по запросу элемента
 * @param {Object} item найденный элемент
 * @param {String} itemType Тип элемента
 */
function handleFoundItem(item, itemType) {
    foundItemsRoot.insertAdjacentHTML('beforeend',
        `<div class="search_item">
            <a href="${item.url}">
                ${itemType} - ${item.name}
            </a>
        </div>`
    );
}

/**
 * Обработчик поиска
 * @param {String} request запрос
 */
function handleSearch(request) {
    if (searchField.value != "") {
        if (!foundItemsRoot.getAttribute("searchActive")) {
            const foundItems = [];
            fetchSearch(searchField.value, foundItems);

            foundItemsRoot.setAttribute("searchActive", "true");
            foundItemsRoot.innerHTML = "";

            fetchSearch(request).finally(() => {
                foundItemsRoot.removeAttribute("searchActive");
                foundItems.forEach((item) => handleFoundItem(item.content, item.description));
            });
        }
    }
}