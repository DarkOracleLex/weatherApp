//Получаем и отображаем погоду
function getWeather(
  coordinates,
  num = 273
) {
  //Получаем прогноз в массив data
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?${coordinates}&exclude=alerts,minutely,hourly&lang=ru&appid=0dc8b590c550c2291b49cb1f99a2c58d`
  )
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      console.log(data);

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

      //сначала иконка с сервиса
      document.querySelector(
        ".app-page__middle-temp-icon"
      ).innerHTML = `<img src="https://openweathermap.org/img/wn/${data.current.weather[0]["icon"]}@2x.png">`;

      //если можно, меняем красивой
      switch (
        data.current.weather[0]["id"]
      ) {
        case 200:
        case 201:
        case 202:
        case 210:
        case 211:
        case 212:
        case 221:
        case 230:
        case 231:
        case 232:
          document.querySelector(
            ".app-page__middle-temp-icon"
          ).innerHTML = `<img src="../img/strom.svg">`;
          break;

        case 300:
        case 301:
        case 302:
        case 310:
        case 311:
        case 312:
        case 313:
        case 314:
        case 321:
        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
        case 511:
        case 520:
        case 521:
        case 522:
        case 531:
          document.querySelector(
            ".app-page__middle-temp-icon"
          ).innerHTML = `<img src="../img/rain.svg">`;
          break;

        case 800:
          document.querySelector(
            ".app-page__middle-temp-icon"
          ).innerHTML = `<img src="../img/sun.svg">`;
          break;

        case 801:
        case 802:
          document.querySelector(
            ".app-page__middle-temp-icon"
          ).innerHTML = `<img src="../img/partly-cloudy.svg">`;
          break;

        case 803:
        case 804:
          document.querySelector(
            ".app-page__middle-temp-icon"
          ).innerHTML = `<img src="../img/cloud.svg">`;
          break;

        default:
          break;
      }

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

//Определяем позицию на старте

window.onload = function () {
  let startPos;
  let geoSuccess = function (position) {
    startPos = position;

    let posObj = {
      lat: startPos.coords.latitude,
      lon: startPos.coords.longitude,
    };

    // console.log(posObj);

    //вызываем и меняем город по координатам
    getAndChangeCityName(
      posObj.lat,
      posObj.lon
    );

    //меняем датасет по координатам
    document.querySelector(
      ".app-page__top-left-side-city"
    ).dataset.coordinates = `lat=${posObj.lat}&lon=${posObj.lon}`;

    //вызываем и меняем погоду по координатам
    getWeather(
      (coordinates = `lat=${posObj.lat}&lon=${posObj.lon}`)
    );
  };
  navigator.geolocation.getCurrentPosition(
    geoSuccess
  );
};

//добавляем определение позиции по клику на кнопку "моё местоположение"

document
  .querySelector(
    ".app-page__top-left-side-btn-find-location"
  )
  .addEventListener("click", () => {
    let startPos;
    let geoSuccess = function (
      position
    ) {
      startPos = position;

      let posObj = {
        lat: startPos.coords.latitude,
        lon: startPos.coords.longitude,
      };

      //вызываем и меняем город по координатам
      getAndChangeCityName(
        posObj.lat,
        posObj.lon
      );

      //меняем датасет по координатам
      document.querySelector(
        ".app-page__top-left-side-city"
      ).dataset.coordinates = `lat=${posObj.lat}&lon=${posObj.lon}`;

      //вызываем и меняем погоду по координатам
      getWeather(
        (coordinates = `lat=${posObj.lat}&lon=${posObj.lon}`)
      );
    };

    navigator.geolocation.getCurrentPosition(
      geoSuccess
    );
  });

//Определение города

async function getAndChangeCityName(
  lat = 55.0,
  lon = 73.400002
) {
  let url =
    "https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address";
  let token =
    "37ebe8c03977cdf30cb3e90dc56bd6bfb1005238";
  let query = {
    lat: lat,
    lon: lon,
    count: 1,
    radius_meters: 1000,
    language: "ru",
  };

  let options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type":
        "application/json",
      Accept: "application/json",
      Authorization: "Token " + token,
    },
    body: JSON.stringify(query),
  };

  let response = await fetch(
    url,
    options,
    {}
  );

  //запрашиваем json о местонахождении
  let json = await response.json();

  // console.log(json);

  //если определило город - пишем его, если нет - пишем регион
  if (json.suggestions[0].data.city) {
    document.querySelector(
      ".app-page__top-left-side-city"
    ).innerHTML =
      json.suggestions[0].data.city;
  } else {
    document.querySelector(
      ".app-page__top-left-side-city"
    ).innerHTML =
      json.suggestions[0].data.region_with_type;
  }
}
