/**
 * Случайным образом переупорядочивает переданый массив.
 * @param {Object} arr массив элементов
 * @return {Object} переупорядоченный массив
 */
function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

/**
 * Возвращает случайное число в занном диапазоне (от и до).
 * По умолчанию диапазон - от 0 до 10.
 * @param {number} min минимальное значение
 * @param {number} max максимальное значение
 * @return {number} случайное число
 */
function randomInRange(min = 0, max = 10) {
  return Math.round(Math.random() * (max - min) + min);
}

/**
 * Сглаживает переданный массив. Массивы могут содержать - number, string, boolean.
 * @param {Object} arr массив с вложенными массивами
 * @return {Object} сглаженный массив
 */
function flatten(arr) {
    return arr.reduce(function (acc, baz) {
        return acc.concat(Array.isArray(baz) ? flatten(baz) : baz);
    }, []);
}

/**
 * Возвращает индекс первого уникального символа в строке или элемента в массиве.
 * В случае отсутствия такого символа вернёт -1.
 * При передаче не корректных данных вернёт -1.
 * @param {string, Object} s строка в нижнем регистре или массив.
 * @return {number} индекс искомого символа
 */
let firstUniqChar = function (s) {
    let map = new Map();
    for (let i = 0; i < s.length; i++) {
        let current = s[i];

        if (map.has(current)) {
            map.set(current, map.get(current) + 1);
        } else {
            map.set(current, 1);
        }
    }

    for (let i = 0; i < s.length; i++) {
        if (map.get(s[i]) === 1) {
            return i;
        }
    }
    return -1;
};

/**
 * Рекурсивно принимает аргументы и записывает в массив. Для выхода нужно использовать пустые круглые скобки.
 * @param {number, string, boolean} args аргумент
 * @returns {function, Array} рекурсивная функция, закрывающий элемент вернёт массив переданных значений
 */
function curry(...args) {
    return (num) => {
        if (num === undefined) {
            return args
        }
        return curry(...args, num)
    }
}

/**
 * Создаёт список повторяющихся элементов между двумя массивами.
 * Учитывает повторное вхождение элементов.
 * @param {Object} nums1 список элементов
 * @param {Object} nums2 список элементов
 * @return {Object} список пересечений между элементами
 */
function intersect(nums1, nums2) {
    let result = [];

    let map = nums1.reduce((acc, i) => {
        acc[i] = acc[i] ? acc[i] + 1 : 1;
        return acc;
    }, {});

    for (let i = 0; i < nums2.length; i++) {
        let current = nums2[i];
        let currentMapItem = map[current];

        if (currentMapItem && currentMapItem > 0) {
            result.push(current);
            map[current] = currentMapItem - 1;
        }
    }

    return result;
}

/**
 * Подсчитывает кол-во повторов элемента в массиве.
 * @param {Object} arr массив элементов (string, number, boolean)
 * @return {Object} key: элемент, value: кол-во повторений в массиве
 */
function packer(arr) {
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
function regulate(obj, reverse = false) {
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
function inclusive(obj, coerces, match = false) {
    if (match) {
        return Object.keys(obj).filter(item => obj[item] !== coerces)
    }
    return Object.keys(obj).filter(item => obj[item] === coerces)
}

/**
 * Выворачивает объкт. Вернёт объкт, где ключ - значение переданного объкта, а значение - ключ.
 * @param {Object} obj объект типа ключ/значение
 * @return {Object} вывернутый объект
 */
function remap(obj) {
    if (obj.length === 0) return obj;
    return  Object.keys(obj)
        .reduce( (acc, i) => {
            acc[obj[i]] = [...(acc[obj[i]] || []), i];
            return acc;
        }, {} );
}

// =========================================== //

/**
 * Создаёт задержку на переданное время и возвращает пустой Promise.
 * @param {number} ms время в милисекудах
 * @return {Promise} пустой Promise
 */
function delay(ms){
    return new Promise( res => setTimeout(() => res(), ms))
}

/**
 * Выполнение асинхронного запроса. Вернёт Promise для получения data.
 * Для получения data, использовать then(data => variable = data).
 * @param {String} method метод запроса
 * @param {String} url ссылка
 * @param {Object} content передаваемое значение
 * @return {Promise} выполненный запрос
 */
function sendRequestXHR(method, url, content = null) {
    return new Promise(function (resolve, reject) {
        const XHR = new XMLHttpRequest();

        XHR.open(method, url);
        XHR.responseType = 'json';
        XHR.setRequestHeader('Content-Type', 'application/json')

        XHR.onload = () => {
            if (XHR.status >= 404) {
                reject(XHR.response);
            } else {
                resolve(XHR.response);
            }
        };
        XHR.onerror = () => reject(XHR.response);

        XHR.send(JSON.stringify(content));
    })
}

// =========================================== //

window.onload = () => setTimeout(() => {
    // Предварителььная загрузка страницы.
    // После полной загрузки, выполняет функцию.
    // Минимальное время: 1000ms.
}, 1000)

/**
 * Меняет содержимое вкладки (текст и иконку)
 * @param {String} icon путь к иконке
 * @param {String} text текст заголовка
 */
function changeTabContent(icon, text) {
  document.querySelector('head title').innerHTML = text;
  document.querySelector('link[rel="icon"]').setAttribute('href', icon);
}
window.onblur = () => {changeTabContent(icon, text)}; // при переключения на другую вкладку
window.onfocus = () => {changeTabContent(icon, text)}; // при фокусе на текущую вкладку
