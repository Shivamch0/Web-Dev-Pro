document.addEventListener('DOMContentLoaded' , function(){
    const cityInput = document.getElementById('city-input');
    const weatherBtn = document.getElementById('weather-btn');
    const weatherInfo = document.getElementById('weather-info');
    const cityName = document.getElementById('city-name');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const errorMessage = document.getElementById('error-message');

    const API_KEY = "cc401eeeed87242ffb6a8a767b66a36f";

    // let weatherData = [];

    weatherBtn.addEventListener(
        'click', async function(){
            let city = cityInput.value.trim();
            if(city === ''){
                return;
            }

            // It may throw an error  || server/database is always in another continent
            try {
              const weatherData = await fetchWeatherData(city);
              displayWeatherData(weatherData);
            } catch (error) {
                showError();
            }
        }
    )

    async function fetchWeatherData(city){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);
        console.log(typeof response);
        console.log("Response" , response);
        if(!response.ok){
            throw new Error(`City not found...`);
        }
        const data = await response.json();
        return data;
    }

    function displayWeatherData(data){
        console.log(data);
        const {name , main , weather} = data;
        cityName.textContent = name;
        temperature.textContent = `Temperature : ${main.temp}`;
        description.textContent = `Weather : ${weather[0].description}`;

        // Unlock the display //
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    }

    function showError(){
        weatherInfo.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }


});// DOM End