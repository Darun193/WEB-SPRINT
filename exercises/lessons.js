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


// filter() создаёт новый массив только из незавершённых уроков.
// Функция (lesson) => {...} вызывается для каждого урока и возвращает true или false.
const notCompleted = lessons.filter((lesson) => {
    return lesson.completed === false
});
console.log(notCompleted);


// map() создаёт новый массив и преобразует каждый урок в его название.
// Функция получает один lesson и возвращает lesson.title.
const nameLessons = lessons.map((lesson) => {
    return lesson.title
});
console.log(nameLessons);


// find() ищет первый урок, который подходит под условие difficulty === "hard".
// Функция проверяет каждый урок и возвращает true или false.
const firstHardLesson = lessons.find((lesson) => {
    return lesson.difficulty === "hard"
});
console.log(firstHardLesson);


// reduce() превращает весь массив уроков в одно итоговое значение — сумму duration.
// result хранит накопленную сумму, lesson — текущий урок, 0 — начальное значение суммы.
const totalDuration = lessons.reduce((result, lesson) => {
    return result + lesson.duration
}, 0)
console.log(totalDuration);


// filter() сначала оставляет только завершённые уроки.
const completedDuration = lessons
    .filter((lesson) => {
        return lesson.completed === true
    })
    // reduce() складывает duration только тех уроков, которые остались после filter().
    .reduce((result, lesson) => {
        return result + lesson.duration
    }, 0)
console.log(completedDuration);


// reduce() собирает из массива один объект с количеством easy, medium и hard уроков.
// result — объект-счётчик, lesson — текущий урок.
const difficultyCount = lessons.reduce((result, lesson) => {
    if (result[lesson.difficulty] === undefined) {
        result[lesson.difficulty] = 1;
    } else {
        result[lesson.difficulty] = result[lesson.difficulty] + 1;
    }

    return result;
}, {});

console.log(difficultyCount);


// Средняя длительность = общая длительность всех уроков / количество уроков.
const averageDuration = totalDuration / lessons.length;

console.log(averageDuration);


// sort() сортирует уроки по duration от большего к меньшему.
// [...lessons] создаёт копию массива, чтобы sort() не изменил оригинальный lessons.
// Функция (a, b) сравнивает два урока между собой.
const sortedLessons = [...lessons].sort((a, b) => {
    return b.duration - a.duration
});
console.log(sortedLessons);


// some() проверяет, существует ли хотя бы один hard-урок.
// Функция возвращает true для hard-урока, и some() тогда возвращает true.
const hasDifficultLessons = lessons.some((lesson) => {
    return lesson.difficulty === "hard"
})
console.log(hasDifficultLessons);


// every() проверяет, выполняется ли условие для всех уроков.
// Здесь проверяем, завершены ли абсолютно все уроки.
const allLessonsCompleted = lessons.every((lesson) => {
    return lesson.completed === true
})
console.log(allLessonsCompleted)


// filter() оставляет только незавершённые уроки.
const notCompletedNames = lessons
    .filter((lesson) => {
        return lesson.completed === false
    })
    // map() преобразует оставшиеся объекты уроков в их названия.
    .map((lesson) => {
        return lesson.title
    });
console.log(notCompletedNames);


// filter() оставляет только уроки сложности hard.
const hardLessonNames = lessons
    .filter((lesson) => {
        return lesson.difficulty === "hard"
    })
    // map() берёт из каждого hard-урока только title.
    .map((lesson) => {
        return lesson.title
    })
console.log(hardLessonNames)


// filter() оставляет уроки, которые одновременно завершены и длятся больше 40 минут.
const completedLongLessonNames = lessons
    .filter((lesson) => {
        return lesson.completed === true && lesson.duration > 40
    })
    // map() превращает отфильтрованные уроки в массив их названий.
    .map((lesson => {
        return lesson.title
    }))
console.log(completedLongLessonNames);


// find() ищет первый незавершённый урок длительностью больше 60 минут.
// Функция проверяет сразу два условия через &&.
const firstLongUncompletedLesson = lessons.find((lesson) => {
    return lesson.completed === false && lesson.duration > 60
});
console.log(firstLongUncompletedLesson)


// filter() сначала оставляет только незавершённые уроки.
const hasHardUncompletedLesson = lessons
    .filter((lesson) => {
        return lesson.completed === false
    })
    // some() проверяет, есть ли среди них хотя бы один hard-урок.
    .some((lesson) => {
        return lesson.difficulty === "hard"
    })
console.log(hasHardUncompletedLesson)


// filter() сначала оставляет только завершённые уроки.
const allCompletedUnder90 = lessons
    .filter((lesson) => {
        return lesson.completed === true
    })
    // every() проверяет, каждый ли завершённый урок длится меньше 90 минут.
    .every((lesson) => {
        return lesson.duration < 90
    });
console.log(allCompletedUnder90)




// filter() создаёт отдельный массив только из незавершённых уроков.
const uncompletedLessons = lessons.filter((lesson) => {
    return lesson.completed === false;
});

// reduce() складывает duration всех незавершённых уроков в одно число.
const totalUncompletedDuration = uncompletedLessons.reduce((result, lesson) => {
    return result + lesson.duration;
}, 0);

// Вычисляем среднюю длительность только незавершённых уроков.
const averageUncompletedDuration =
    totalUncompletedDuration / uncompletedLessons.length;

console.log(averageUncompletedDuration);



// Функция getCompletedLessons принимает массив уроков и возвращает новый массив только с завершёнными уроками.
function getCompletedLessons(lessonsArray) {
    // filter() оставляет элементы, у которых completed === true.
    const completedLessons = lessonsArray.filter((lesson) => {
        return lesson.completed === true;
    });
    // return отдаёт готовый массив из функции наружу.
    return completedLessons;
}
console.log(getCompletedLessons(lessons));


// Функция getUncompletedLessons принимает массив уроков и возвращает только незавершённые уроки.
function getUncompletedLessons(lessonsArray) {
    // filter() оставляет элементы, у которых completed === false.
    const notCompletedlessons = lessonsArray.filter((lesson) => {
        return lesson.completed === false;
    });
    // return отдаёт отфильтрованный массив из функции.
    return notCompletedlessons;
}
console.log(getUncompletedLessons(lessons));


// Функция getTotalDuration принимает массив уроков и возвращает сумму их длительности.
function getTotalDuration(lessonsArray) {
    // reduce() складывает duration каждого урока в одно итоговое число.
    const totalDuration = lessonsArray.reduce((result, lesson) => {
        return result + lesson.duration;
    }, 0);

    // return возвращает общую длительность из функции.
    return totalDuration;
}

console.log(getTotalDuration(lessons));



// Функция getAverageDuration принимает массив и возвращает среднюю длительность одного урока.
function getAverageDuration(lessonsArray) {
    // reduce() сначала считает общую длительность всех уроков.
    const totalLessons = lessonsArray.reduce((result, lesson) => {
        return result + lesson.duration
    }, 0)
    // Делим общую длительность на количество уроков.
    const averageDuration = totalLessons / lessonsArray.length;
    // return возвращает вычисленное среднее значение.
    return averageDuration;
}

console.log(getAverageDuration(lessons));


// Функция findLongestLesson принимает массив и возвращает самый длинный урок.
function findLongestLesson(lessonsArray) {
    // reduce() здесь не складывает числа, а сравнивает уроки и сохраняет самый длинный.
    // longest — самый длинный найденный урок, lesson — текущий проверяемый урок.
    const longestLesson = lessonsArray.reduce((longest, lesson) => {
        if (lesson.duration > longest.duration) {
            return lesson;
        } else {
            return longest;
        }
    });
    // return возвращает найденный самый длинный урок.
    return longestLesson;
}
console.log(findLongestLesson(lessons));


// Функция getLessonStatus принимает один урок и возвращает его статус строкой.
function getLessonStatus(lesson) {
    // Если урок завершён — функция возвращает "Done".
    if (lesson.completed === true) {
        return "Done";
    } else {
        // Если урок не завершён — функция возвращает "Not done".
        return "Not done";
    }
}

console.log(getLessonStatus(lessons[0]));
console.log(getLessonStatus(lessons[2]));


// Функция printLessonDuration принимает один урок и выводит его duration в консоль.
function printLessonDuration(lesson) {
    console.log(lesson.duration);
}
// forEach() проходит по каждому уроку и для каждого вызывает функцию printLessonDuration.
// printLessonDuration передаётся как callback — без (), потому что её должен вызвать сам forEach().
lessons.forEach(printLessonDuration);



// Функция getLessonTitle принимает один урок и возвращает его title.
function getLessonTitle(lesson) {
    return lesson.title;
}
// map() вызывает getLessonTitle для каждого урока и собирает возвращённые title в новый массив.
// getLessonTitle здесь передана в map() как callback-функция.
const lessonTitles = lessons.map(getLessonTitle);
console.log(lessonTitles);


// Функция isHardLesson принимает один урок и возвращает true, если difficulty === "hard".
function isHardLesson(lesson) {
    return lesson.difficulty === "hard";
}
// filter() вызывает isHardLesson для каждого урока.
// Если функция возвращает true, урок попадает в новый массив hardLessons.
const hardLessons = lessons.filter(isHardLesson);
console.log(hardLessons);



// Стрелочная функция isHardLesson2 делает то же самое, что обычная функция isHardLesson.
// Она принимает lesson и возвращает true или false в зависимости от difficulty.
const isHardLesson2 = (lesson) => {
    return lesson.difficulty === "hard"
};
// filter() использует стрелочную функцию isHardLesson2 как callback и оставляет только hard-уроки.
const hardLessons2 = lessons.filter(isHardLesson2);
console.log(hardLessons2);



// 1. ПРОВЕРЯЕМ, ЯВЛЯЕТСЯ ЛИ УРОК ДЛИННЫМ
// Функция получает один lesson
// и возвращает true, если его длительность больше 60 минут.
const isLongLesson = (lesson) => {
    return lesson.duration > 60;
};

// filter проходит по массиву lessons
// и оставляет только те уроки,
// для которых isLongLesson вернул true.
const longLessons = lessons.filter(isLongLesson);

// Выводим найденные длинные уроки в консоль.
console.log(longLessons);




// 2. ПОЛУЧАЕМ ТОЛЬКО НАЗВАНИЯ УРОКОВ
// Функция получает один lesson
// и возвращает только его title.
const getLessonName = (lesson) => {
    return lesson.title;
};

// map проходит по каждому уроку
// и создаёт новый массив из того,
// что возвращает getLessonName.
// В итоге получаем массив названий уроков.
const names = lessons.map(getLessonName);

// Выводим массив названий в консоль.
console.log(names);




// 3. ПРОВЕРЯЕМ, ЕСТЬ ЛИ ХОТЯ БЫ ОДИН НЕЗАВЕРШЁННЫЙ УРОК
// Функция возвращает true,
// если completed у урока равен false.
const isUncompletedLesson = (lesson) => {
    return lesson.completed === false;
};

// some проверяет:
// есть ли в массиве ХОТЯ БЫ ОДИН элемент,
// для которого функция возвращает true.
//
// Если хотя бы один незавершённый урок есть,
// результат будет true.
const hasUncompletedLessons = lessons.some(isUncompletedLesson);

// Выводим true или false.
console.log(hasUncompletedLessons);




// 4. ПРОВЕРЯЕМ, ВСЕ ЛИ УРОКИ КОРОЧЕ 100 МИНУТ
// Функция возвращает true,
// если длительность одного урока меньше 100 минут.
const isShortLesson = (lesson) => {
    return lesson.duration < 100;
};

// every проверяет:
// подходят ли ВСЕ элементы массива под условие.
//
// Если каждый урок короче 100 минут,
// результат будет true.
//
// Если хотя бы один урок длится 100 минут или больше,
// результат будет false.
const allLessonsAreShort = lessons.every(isShortLesson);

// Выводим результат проверки.
console.log(allLessonsAreShort);




// 5. КОПИРОВАНИЕ ОБЪЕКТА ЧЕРЕЗ ОБЫЧНОЕ ПРИСВАИВАНИЕ
const student = {
    name: "Darya",
    level: "beginner",
    progress: 30
};

// Здесь мы НЕ создаём новый независимый объект.
//
// secondStudent и student теперь
// указывают на один и тот же объект в памяти.
const secondStudent = student;

// Меняем progress через secondStudent.
secondStudent.progress = 50;

// Но так как student и secondStudent
// связаны с одним объектом,
// progress изменится у обоих.
console.log(student);
console.log(secondStudent);




// 6. ПОВЕРХНОСТНАЯ КОПИЯ ОБЪЕКТА ЧЕРЕЗ SPREAD
const thirdStudent = {
    ...student
};

// ...student копирует свойства student
// в НОВЫЙ объект.
//
// Теперь thirdStudent — отдельный объект.

// Меняем progress только у копии.
thirdStudent.progress = 80;

// student не изменится,
// потому что progress — простое значение,
// а сам объект thirdStudent уже независимый.
console.log(student);
console.log(thirdStudent);




// 7. ПОВЕРХНОСТНОЕ КОПИРОВАНИЕ ВЛОЖЕННОГО ОБЪЕКТА
const studentWithSettings = {
    name: "Darya",
    level: "beginner",

    // settings — это объект внутри другого объекта.
    settings: {
        theme: "light",
        notifications: true
    }
};


// Создаём новый внешний объект.
const copiedStudent = {
    ...studentWithSettings
};

// Но spread здесь скопировал только верхний уровень.
//
// copiedStudent — новый объект,
// но copiedStudent.settings и studentWithSettings.settings
// всё ещё указывают на один и тот же вложенный объект.

// Поэтому изменение theme через copiedStudent...
copiedStudent.settings.theme = "dark";

// ...изменит settings и у исходного объекта.
console.log(studentWithSettings);
console.log(copiedStudent);




// 8. СОЗДАЁМ НЕЗАВИСИМУЮ КОПИЮ ВЛОЖЕННОГО ОБЪЕКТА
const independentStudent = {

    // Сначала копируем внешний объект.
    ...studentWithSettings,

    // Потом отдельно создаём новую копию settings.
    settings: {
        ...studentWithSettings.settings
    }
};

// Теперь settings тоже отдельный объект.
//
// Поэтому меняем theme только у independentStudent.
independentStudent.settings.theme = "blue";

// Исходный studentWithSettings.settings
// больше не зависит от этой копии.
console.log(studentWithSettings);
console.log(independentStudent);




// 9. ЕЩЁ ОДИН ПРИМЕР С ВЛОЖЕННЫМ ОБЪЕКТОМ
const course = {
    title: "JS",
    completed: true,

    // meta — вложенный объект.
    meta: {
        level: 5,
        hours: 25
    }
};


// Создаём независимую копию course.
//
// ...course копирует внешний объект,
// а ...course.meta отдельно копирует вложенный meta.
const courseCopy = {
    ...course,
    meta: {
        ...course.meta
    }
};

// Меняем hours только внутри копии.
courseCopy.meta.hours = 50;

// У исходного course останется hours: 25.
//
// У courseCopy будет hours: 50.
console.log(course);
console.log(courseCopy);


