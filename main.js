/**
 * Случайным образом переупорядочивает переданый массив.
 * @param {Object} arr массив элементов
 * @return {Object} переупорядоченный массив
 */
export function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

/**
 * Сглаживает переданный массив. Массивы могут содержать - number, string, boolean.
 * @param {Object} arr массив с вложенными массивами
 * @return {Object} сглаженный массив
 */
export function flatten(arr) {
    return arr.reduce(function (acc, baz) {
        return acc.concat(Array.isArray(baz) ? flatten(baz) : baz);
    }, []);
}

/**
 * Рекурсивно принимает аргументы и записывает в массив. Для выхода нужно использовать пустые круглые скобки.
 * @param {number, string, boolean} args аргумент
 * @returns {function, Array} рекурсивная функция, закрывающий элемент вернёт массив переданных значений
 */
export function curry(...args) {
    return (num) => {
        if (num === undefined) {
            return args
        }
        return curry(...args, num)
    }
}

/**
 * Подсчитывает кол-во повторов элемента в массиве.
 * @param {Object} arr массив элементов (string, number, boolean)
 * @return {Object} key: элемент, value: кол-во повторений в массиве
 */
export function packer(arr) {
    let count = {}

    for (let item of arr) {
        if (!count[item]) count[item] = 0  // добавляет возникшую впервые переменную
        count[item] += 1
    }

    return count
}

/**
 * Создание массива ключей. Сортировка по значениям объекта.
 * @param {Object} obj словарь, где значения - number
 * @param {Boolean} reverse инвертировать результат
 * @return {Object} отсортированный массив
 */
export function regulate(obj, reverse = false) {
    if (reverse) {
        return Object.keys(obj).sort((a, b) => obj[b] - obj[a])
    }
    return Object.keys(obj).sort((a, b) => obj[a] - obj[b])
}

/**
 * Создание массива ключей. Фильтр по значению объекта.
 * @param {Object} obj словарь, где значения - number
 * @param {number} coerces значение для фильтра
 * @param {Boolean} match обратная фильтрация (не равно)
 * @return {Object} отфильрованный массив
 */
export function inclusive(obj, coerces, match = false) {
    if (match) {
        return Object.keys(obj).filter(item => obj[item] !== coerces)
    }
    return Object.keys(obj).filter(item => obj[item] === coerces)
}

// =========================================== //

window.onload = () => setTimeout(() => {
    // Предварителььная загрузка страницы.
    // После полной загрузки, выполняет функцию.
    // Минимальное время: 1000ms.
}, 1000)

