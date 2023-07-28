const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

const APIKey = '[APIKey]';

search.addEventListener('click', () => {
    const city = document.querySelector('.search-box input').value.trim();
    if (city === '')
        return;

    getWeatherData(city)
        .then(weatherData => {
            if (weatherData.cod === '404') {
                showError();
            } else {
                updateWeatherUI(weatherData);
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            showError();
        });
});

async function getWeatherData(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`);
    const weatherData = await response.json();
    return weatherData;
}

function showError() {
    container.style.height = '400px';
    weatherBox.style.display = 'none';
    weatherDetails.style.display = 'none';
    error404.style.display = 'block';
    error404.classList.add('fadeIn');
}

function updateWeatherUI(weatherData) {
    error404.style.display = 'none';
    error404.classList.remove('fadeIn');

    const image = document.querySelector('.weather-icon');
    const temperature = document.querySelector('.temperature');
    const description = document.querySelector('.description');
    const humidity = document.querySelector('.humidity span');
    const wind = document.querySelector('.wind span');

    switch (weatherData.weather[0].main) {
        case 'Clear':
            image.src = 'images/clear.png';
            break;
        case 'Rain':
            image.src = 'images/rain.png';
            break;
        case 'Snow':
            image.src = 'images/snow.png';
            break;
        case 'Clouds':
            image.src = 'images/cloud.png';
            break;
        case 'Haze':
            image.src = 'images/mist.png';
            break;
        case 'Fog':
            image.src = 'images/fog.png';
            break;
        default:
            image.src = '';
    }

    temperature.innerHTML = `${parseInt(weatherData.main.temp)}<span>°C</span>`;
    description.innerHTML = `${weatherData.weather[0].description}`;
    humidity.innerHTML = `${weatherData.main.humidity}%`;
    wind.innerHTML = `${parseInt(weatherData.wind.speed)}`;

    weatherBox.style.display = '';
    weatherDetails.style.display = '';
    weatherBox.classList.add('fadeIn');
    weatherDetails.classList.add('fadeIn');
    container.style.height = '590px';
}
