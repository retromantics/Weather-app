
const input = document.getElementById('city-input');
const form = document.getElementById('weather-form');


const infoDiv = document.getElementById('weather-result');
const errDiv = document.getElementById('error-message');

const city = document.getElementById('city-name');
const temp = document.getElementById('temperature');
const desc = document.getElementById('description');
const icon = document.getElementById('weather-icon');

const apiKey = '901bfaa7f568fa422e4cd87fd58b3b67';

form.addEventListener('submit', function (event) {
    event.preventDefault();
    resetInfo();

    let cityInput = input.value.trim();

    if (cityInput !== '') {
        getWeather(cityInput);
    }
});

let getWeather = async (cityInput) => {

    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric&lang=es`;

    try {

        let response = await fetch(apiURL);

        if (!response.ok) {
            throw new Error("Ciudad no encontrada");
        }

        let data = await response.json();
        showData(data);

    } catch (error) {
        console.log(error);
        showError(error);
    }

}

let showData = (data) => {

    errDiv.classList.add('hidden');

    city.textContent = data.name;
    temp.textContent = `${data.main.temp} °C`;
    desc.textContent = data.weather[0].description;
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    icon.alt = data.weather[0].description;

    infoDiv.classList.remove('hidden');

}

let showError = (error) => {

    infoDiv.classList.add('hidden');

    errDiv.textContent = 'Error al intentar obtener datos';
    errDiv.classList.remove('hidden');
}

let resetInfo = () => {
    infoDiv.classList.add('hidden');
    errDiv.classList.add('hidden');
    icon.src = '';
    temp.textContent = '';
    desc.textContent = '';
    city.textContent = '';
}