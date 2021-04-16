function getWeather() {
  //Получаем прогноз в массив data
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?id=1496153&lang=ru&appid=0dc8b590c550c2291b49cb1f99a2c58d"
  )
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      console.log(data);

      //добавляем название города
      document.querySelector(
        ".app-page__top-left-side-city"
      ).textContent = data.name;

      //data.main.temp содержит значение в Кельвинах, отнимаем от  273, чтобы получить значение в градусах Цельсия
      document.querySelector(
        ".app-page__middle-temp-value"
      ).innerHTML =
        Math.round(
          data.main.temp - 273
        ) + "&deg;";

      //data.weather[0]["description"] добавляем описание погоды
      document.querySelector(
        ".app-page__middle-temp-description"
      ).textContent =
        data.weather[0]["description"];

      //Добавляем иконку погоды
      document.querySelector(
        ".app-page__middle-temp-icon"
      ).innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]["icon"]}@2x.png">`;

      //data.wind.speed добавляем скорость ветра
      document.querySelector(
        ".app-page__bottom-wind-value"
      ).textContent =
        data.wind.speed + " м/c";

      //data.main.pressure добавляем давление
      document.querySelector(
        ".app-page__bottom-pressure-value"
      ).textContent =
        data.main.pressure +
        " мм рт. ст.";

      //data.main.humidity добавляем давление
      document.querySelector(
        ".app-page__bottom-humidity-value"
      ).textContent =
        data.main.humidity + "%";
    })
    .catch(function () {
      //Обрабатываем ошибки
    });

  //Получаем прогноз в массив data
  fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat=55.0&lon=73.400002&exclude=alerts,current,minutesly,hourly&appid=0dc8b590c550c2291b49cb1f99a2c58d"
  )
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      console.log(data);

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
