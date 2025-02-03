document.addEventListener("DOMContentLoaded", function () { 
    const calendarDays = document.querySelector(".calendar-days");
    const currentMonthYear = document.querySelector(".month-year");
    const date = new Date();
    let currentMonth = date.getMonth();
    let currentYear = date.getFullYear();

    // Массив с датами мероприятий
    const eventDates = [5, 10, 15, 20]; // Пример

    // Данные для событий
    const eventsInfo = {
        5: { 
            title: "Семинар по кибербезопасности", 
            description: "Подробности семинара...", 
            image: "seminar.jpg" 
        },
        10: { 
            title: "Конференция по ИТ-технологиям", 
            description: "Описание конференции...", 
            image: "conference.jpg" 
        },
        15: { 
            title: "Воркшоп по веб-разработке", 
            description: "Описание воркшопа...", 
            image: "workshop.jpg" 
        },
        20: { 
            title: "Выставка инноваций", 
            description: "Описание выставки...", 
            image: "exhibition.jpg" 
        }
    };

    // Генерация календаря
    function generateCalendar(month, year) {
        const firstDay = new Date(year, month).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        calendarDays.innerHTML = "";

        for (let i = 0; i < firstDay; i++) {
            calendarDays.innerHTML += "<div class='calendar-day'></div>";
        }

        for (let i = 1; i <= lastDate; i++) {
            const dayDiv = document.createElement("div");
            dayDiv.classList.add("calendar-day");
            dayDiv.textContent = i;

            // Отметка текущего дня
            if (i === date.getDate() && month === date.getMonth() && year === date.getFullYear()) {
                dayDiv.classList.add("current-day");
            }

            // Проверка на наличие мероприятия
            if (eventDates.includes(i)) {
                const eventDot = document.createElement("span");
                eventDot.classList.add("event-dot");
                dayDiv.appendChild(eventDot);

                // Обработчик клика на день с событием
                dayDiv.addEventListener("click", function() {
                    const eventData = eventsInfo[i];
                    openModal(eventData);
                });
            }

            calendarDays.appendChild(dayDiv);
        }

        currentMonthYear.textContent = `${month + 1} / ${year}`;
    }

    // Функция открытия модального окна
    function openModal(eventData) {
        const modal = document.getElementById("eventsModal");
        const modalContent = document.querySelector(".modal-content");

        // Очистка старого контента и добавление нового
        modalContent.innerHTML = `
            <span class="close">&times;</span>
            <div class="modal-inner">
                <div class="modal-text">
                    <h2>${eventData.title}</h2>
                    <p class="event-details">${eventData.description}</p>
                </div>
                <div class="modal-image">
                    <img src="${eventData.image}" alt="${eventData.title}">
                </div>
            </div>
        `;
        
        modal.style.display = "flex"; // Показываем модальное окно

        // Закрытие модального окна при нажатии на крестик
        document.querySelector(".close").addEventListener("click", function() {
            modal.style.display = "none";
        });

        // Закрытие окна при клике вне модального окна
        window.addEventListener("click", function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    }

    // Переход по месяцам
    document.querySelector(".prev-month").addEventListener("click", function () {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        generateCalendar(currentMonth, currentYear);
    });

    document.querySelector(".next-month").addEventListener("click", function () {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateCalendar(currentMonth, currentYear);
    });

    // Инициализация календаря
    generateCalendar(currentMonth, currentYear);
});


    // Инициализация календаря
    generateCalendar(currentMonth, currentYear);

// Форма обратной связи
const form = document.getElementById("contact-form");
const responseMessage = document.getElementById("response-message");

form.addEventListener("submit", function(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение формы (перезагрузка)

    let isValid = true;
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    // Логирование значений
    console.log("Name:", name.value);
    console.log("Email:", email.value);
    console.log("Message:", message.value);

    // Очистка ошибок
    document.querySelectorAll(".error-message").forEach(error => error.style.display = "none");

    // Валидация name
    if (!name.value.trim()) {
        isValid = false;
        document.getElementById("name-error").style.display = "block";
    }

    // Валидация email
    if (!email.value.trim() || !validateEmail(email.value)) {
        isValid = false;
        document.getElementById("email-error").style.display = "block";
    }

    // Валидация сообщения
    if (!message.value.trim()) {
        isValid = false;
        document.getElementById("message-error").style.display = "block";
    }

    // Функция для валидации email
    function validateEmail(email) {
        let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        email = email.trim();
        return regex.test(email);
    }

    // Если форма прошла валидацию
    if (isValid) {
        fetch("https://getform.io/f/bzyyklda", {
            method: "POST",
            body: new FormData(form),
        })
        .then(response => {
            if (response.ok) {
                responseMessage.textContent = "Сообщение отправлено успешно!";
                responseMessage.style.color = "green";
                form.reset();
            } else {
                responseMessage.textContent = "Ошибка при отправке сообщения.";
                responseMessage.style.color = "red";
            }
        })
        .catch(() => {
            responseMessage.textContent = "Ошибка при отправке сообщения. Попробуйте позже.";
            responseMessage.style.color = "red";
        });
    } else {
        console.log("Форма не прошла валидацию.");
    }
});  // Закрывающая скобка для события submit
// qwertyuioP@1
