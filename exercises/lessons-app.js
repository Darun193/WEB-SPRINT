// 1. ДАННЫЕ
// Здесь хранится список всех уроков.
// У каждого урока есть id, название, длительность,
// сложность и статус completed.
const lessons = [
    {
        id: 1,
        title: "Variables",
        duration: 35,
        difficulty: "easy",
        completed: true,
    },
    {
        id: 2,
        title: "Conditions",
        duration: 50,
        difficulty: "easy",
        completed: true,
    },
    {
        id: 3,
        title: "Loops",
        duration: 65,
        difficulty: "medium",
        completed: false,
    },
    {
        id: 4,
        title: "Functions",
        duration: 80,
        difficulty: "medium",
        completed: true,
    },
    {
        id: 5,
        title: "Arrays",
        duration: 55,
        difficulty: "medium",
        completed: false,
    },
    {
        id: 6,
        title: "Objects",
        duration: 70,
        difficulty: "hard",
        completed: false,
    },
    {
        id: 7,
        title: "DOM",
        duration: 95,
        difficulty: "hard",
        completed: false,
    },
];


// 2. ПОЛУЧАЕМ HTML-ЭЛЕМЕНТЫ
// JavaScript находит нужные элементы на странице,
// чтобы потом с ними работать.

// Контейнер, куда будут добавляться карточки уроков.
const lessonsContainer =
    document.querySelector("#lessons-container");

// Поле поиска.
const lessonFilter =
    document.querySelector("#lesson-filter");

// Элемент, где будет показываться прогресс.
const progress =
    document.querySelector("#progress");


// 3. ФУНКЦИЯ ДЛЯ ТЕКСТА СТАТУСА
// Получает один урок.
// Если урок завершён, возвращает "Done".
// Если нет — "Not done".
function getStatusText(lesson) {
    if (lesson.completed === true) {
        return "Done";
    } else {
        return "Not done";
    }
}


// 4. ФУНКЦИЯ ОТОБРАЖЕНИЯ УРОКОВ
// Получает массив уроков и показывает их на странице.
function renderLessons(lessonsArray) {

    // Сначала очищаем контейнер.
    // Это нужно, чтобы при повторной отрисовке
    // старые карточки не оставались на странице.
    lessonsContainer.innerHTML = "";

    // Проходим по каждому уроку,
    // который нужно показать.
    lessonsArray.forEach((lesson) => {

        // Создаём новый div для одного урока.
        const card = document.createElement("div");

        // Сохраняем id урока внутри HTML-карточки.
        // Это понадобится позже, чтобы понять,
        // по какому уроку пользователь кликнул.
        card.dataset.id = lesson.id;

        // Получаем текст статуса:
        // Done или Not done.
        const status = getStatusText(lesson);

        // Записываем текст внутрь карточки.
        card.textContent =
            `${lesson.title} — ${lesson.duration} min — ${status}`;

        // Добавляем готовую карточку на страницу.
        lessonsContainer.appendChild(card);
    });


    // 5. СЧИТАЕМ ЗАВЕРШЁННЫЕ УРОКИ
    // filter оставляет только уроки,
    // у которых completed === true.
    const completedLessons = lessons.filter((lesson) => {
        return lesson.completed === true;
    });


    // 6. СЧИТАЕМ ПРОЦЕНТ ПРОГРЕССА
    // Количество завершённых делим
    // на общее количество уроков и умножаем на 100.
    // Math.round округляет результат.
    const completedPercent =
        Math.round(
            (completedLessons.length / lessons.length) * 100
        );


    // 7. ПОКАЗЫВАЕМ ПРОГРЕСС НА СТРАНИЦЕ
    // Например:
    // 3 / 7 completed — 43%
    progress.textContent =
        `${completedLessons.length} / ${lessons.length} completed — ${completedPercent}%`;
}


// 8. ФУНКЦИЯ ПОИСКА
// Получает текст из input
// и возвращает только подходящие уроки.
function getFilteredLessons() {

    // Берём то, что написал пользователь.
    // trim убирает пробелы по краям.
    // toLowerCase переводит всё в нижний регистр,
    // чтобы поиск не зависел от больших и маленьких букв.
    const searchText =
        lessonFilter.value.trim().toLowerCase();


    // Фильтруем массив lessons.
    const filteredLessons = lessons.filter((lesson) => {

        // Название урока тоже переводим
        // в нижний регистр.
        // includes проверяет:
        // содержится ли текст поиска в названии урока.
        return lesson.title
            .toLowerCase()
            .includes(searchText);
    });


    // Возвращаем найденные уроки.
    return filteredLessons;
}


// 9. ОБНОВЛЕНИЕ СТРАНИЦЫ
// Эта функция соединяет поиск и отображение.
function updatePage() {

    // Сначала получаем уроки,
    // которые сейчас подходят под поиск.
    const filteredLessons = getFilteredLessons();

    // Потом показываем их на странице.
    renderLessons(filteredLessons);
}


// 10. СОБЫТИЕ ВВОДА В ПОИСК
// Когда пользователь что-то вводит,
// браузер вызывает эту функцию.
lessonFilter.addEventListener("input", () => {

    // Перерисовываем страницу
    // с учётом нового текста поиска.
    updatePage();
});


// 11. СОБЫТИЕ КЛИКА ПО УРОКАМ
// Слушаем клики внутри контейнера.
lessonsContainer.addEventListener("click", (event) => {

    // event.target — конкретный элемент,
    // по которому пользователь кликнул.
    const card = event.target;


    // Если у элемента нет data-id,
    // значит кликнули не по карточке урока.
    // Тогда прекращаем выполнение.
    if (card.dataset.id === undefined) {
        return;
    }


    // data-id приходит из HTML как строка.
    // Number превращает её в число.
    const lessonId = Number(card.dataset.id);


    // Ищем в массиве lessons урок
    // с таким же id.
    const clickedLesson = lessons.find((lesson) => {
        return lesson.id === lessonId;
    });


    // Если урок не найден,
    // ничего дальше не делаем.
    if (clickedLesson === undefined) {
        return;
    }


    // Переключаем completed.
    // false становится true,
    // true становится false.
    clickedLesson.completed =
        !clickedLesson.completed;


    // После изменения данных
    // заново обновляем страницу,
    // чтобы пользователь увидел новый статус и прогресс.
    updatePage();
});


// 12. ПЕРВАЯ ОТРИСОВКА
// Эта строка выполняется сразу после загрузки страницы.
// Без неё карточки изначально вообще не появились бы.
updatePage();