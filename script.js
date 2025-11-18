const apikey = "83ed041e1fb510b7f99e1999c05a417b";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city},eg&units=metric&appid=${apikey}`;


  const response = await fetch(apiurl);
  const data = await response.json();

  if (data.cod === "401") {
    alert("مفتاح API غير صحيح أو منتهي. تأكد من صحته.");
    return;
  } else if (data.cod === "404") {
    alert("لم يتم العثور على المدينة. تأكد من كتابة الاسم بالإنجليزية.");
    return;
  }

  console.log(data);

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

  const weatherCondition = data.weather[0].main.toLowerCase();

  if (weatherCondition === "clouds") {
    weatherIcon.src = "images/weather-app-img/images/clouds.png";
  } else if (weatherCondition === "clear") {
    weatherIcon.src = "images/weather-app-img/images/clear.png";
  } else if (weatherCondition === "drizzle") {
    weatherIcon.src = "images/weather-app-img/images/drizzle.png";
  } else if (weatherCondition === "rain") {
    weatherIcon.src = "images/weather-app-img/images/rain.png";
  } else if (weatherCondition === "mist") {
    weatherIcon.src = "images/weather-app-img/images/mist.png";
  } else {
    weatherIcon.src = "images/weather-app-img/images/default.png";
  }
}

searchBtn.addEventListener("click", () => {
  const cityInput = searchBox.value.trim();
  if (cityInput !== "") {
    checkWeather(cityInput);
  }
});
