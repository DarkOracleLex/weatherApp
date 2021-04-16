function getWeather() {
  //Получаем прогноз в массив data
  fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat=55.0&lon=73.400002&exclude=alerts,minutesly,hourly&lang=ru&appid=0dc8b590c550c2291b49cb1f99a2c58d"
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
          data.current.temp - 273
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
        +data.daily[0].pop * 100 + "%";
    })
    .catch(function () {
      //Обрабатываем ошибки
    });
}

getWeather();

function countRabbits(params) {
  document
    .querySelector(
      ".app-page__top-left-side-search"
    )
    .classList.toggle(
      "visually-hidden"
    );
}
