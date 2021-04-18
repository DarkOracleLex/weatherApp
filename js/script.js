//Получаем и отображаем погоду
function getWeather(
  coordinates = "lat=55.0&lon=73.400002",
  num = 273
) {
  //Получаем прогноз в массив data
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?${coordinates}&exclude=alerts,minutesly,hourly&lang=ru&appid=0dc8b590c550c2291b49cb1f99a2c58d`
  )
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      console.log(data);

      //добавляем название города
      // document.querySelector(
      //   ".app-page__top-left-side-city"
      // ).textContent = data.name;

      //data.current.temp содержит значение в Кельвинах, отнимаем от  273, чтобы получить значение в градусах Цельсия
      document.querySelector(
        ".app-page__middle-temp-value"
      ).innerHTML =
        Math.round(
          data.current.temp - num
        ) + "&deg;";

      //data.current.weather[0]["description"] добавляем описание погоды
      document.querySelector(
        ".app-page__middle-temp-description"
      ).textContent =
        data.current.weather[0][
          "description"
        ];

      //data.current.weather[0]["icon"] добавляем иконку погоды
      document.querySelector(
        ".app-page__middle-temp-icon"
      ).innerHTML = `<img src="https://openweathermap.org/img/wn/${data.current.weather[0]["icon"]}@2x.png">`;

      //data.current.wind_speed добавляем скорость ветра
      document.querySelector(
        ".app-page__bottom-wind-value"
      ).textContent =
        data.current.wind_speed +
        " м/c";

      //data.current.pressure добавляем давление
      document.querySelector(
        ".app-page__bottom-pressure-value"
      ).textContent =
        data.current.pressure +
        " мм рт. ст.";

      //data.current.humidity добавляем влажность
      document.querySelector(
        ".app-page__bottom-humidity-value"
      ).textContent =
        data.current.humidity + "%";

      //data.daily[0].pop добавляем вероятность осадков сегодня
      document.querySelector(
        ".app-page__bottom-rain-chance-value"
      ).textContent =
        Math.round(
          +data.daily[0].pop * 100
        ) + "%";
    })
    .catch(function () {
      //Обрабатываем ошибки
    });
}

getWeather();

//Переключаем .visually-hidden
function toggleVisuallyHidden(elem) {
  elem.classList.toggle(
    "visually-hidden"
  );
}

//Скрываем поиск на ESC
function escClose(evt) {
  if (evt.keyCode == 27) {
    document
      .querySelector(
        ".app-page__top-left-side-search"
      )
      .classList.add("visually-hidden");
  }
}

//Умный поиск
document.querySelector(
  ".app-page__top-left-side-search-input"
).oninput = function () {
  let val = this.value
    .trim()
    .toLowerCase();
  let items = document.querySelectorAll(
    ".app-page__top-left-side-search-cities-list-item"
  );

  if (val !== "") {
    items.forEach((elem) => {
      if (
        elem.innerText
          .toLowerCase()
          .search(val) !== -1
      ) {
        elem.classList.add(
          "app-page__top-left-side-search-cities-list-item--show"
        );
      } else {
        elem.classList.remove(
          "app-page__top-left-side-search-cities-list-item--show"
        );
      }
    });
  } else {
    items.forEach((elem) => {
      elem.classList.remove(
        "app-page__top-left-side-search-cities-list-item--show"
      );
    });
  }
};

//Смена города при клике
let buttons = document.querySelectorAll(
  ".app-page__top-left-side-search-cities-list-item"
);

buttons.forEach((elem) => {
  elem.addEventListener("click", () => {
    document.querySelector(
      ".app-page__top-left-side-city"
    ).textContent = elem.innerText;

    document.querySelector(
      ".app-page__top-left-side-city"
    ).dataset.coordinates =
      elem.dataset.coordinates;

    getWeather(
      elem.dataset.coordinates
    );

    let buttonC = document.querySelectorAll(
      ".app-page__top-right-side-scale-change-btn"
    )[0];

    buttonC.classList.add(
      "app-page__top-right-side-scale-change-btn--active"
    );

    buttonC.nextElementSibling.classList.remove(
      "app-page__top-right-side-scale-change-btn--active"
    );

    //Скрываем поиск
    document
      .querySelector(
        ".app-page__top-left-side-search"
      )
      .classList.add("visually-hidden");

    //Очищаем строку поиска
    document.querySelector(
      ".app-page__top-left-side-search-input"
    ).value = "";

    //Скрываем все найденные элементы
    buttons.forEach((elem) => {
      elem.classList.remove(
        "app-page__top-left-side-search-cities-list-item--show"
      );
    });
  });
});

//Скрытие по нажатию вне области поиска
document.addEventListener(
  "mouseup",
  (e) => {
    let block = document.querySelector(
      ".app-page__top-left-side-search"
    ); // определяем элемент, к которому будем применять условия
    if (!block.contains(e.target)) {
      block.classList.add(
        "visually-hidden"
      ); // если условия выполняются - скрываем наш элемент
    }
  }
);

//переключатель C и F
let buttonsCAndF = document.querySelectorAll(
  ".app-page__top-right-side-scale-change-btn"
);

buttonsCAndF.forEach((el) => {
  el.addEventListener("click", () => {
    if (
      !el.classList.contains(
        "app-page__top-right-side-scale-change-btn--active"
      )
    ) {
      el.classList.toggle(
        "app-page__top-right-side-scale-change-btn--active"
      );
      if (el.nextElementSibling) {
        el.nextElementSibling.classList.toggle(
          "app-page__top-right-side-scale-change-btn--active"
        );

        let num = 273;

        getWeather(
          document.querySelector(
            ".app-page__top-left-side-city"
          ).dataset.coordinates,
          num
        );
      }
      if (el.previousElementSibling) {
        el.previousElementSibling.classList.toggle(
          "app-page__top-right-side-scale-change-btn--active"
        );

        let num = 0;

        getWeather(
          document.querySelector(
            ".app-page__top-left-side-city"
          ).dataset.coordinates,
          num
        );
      }
    }
  });
});
