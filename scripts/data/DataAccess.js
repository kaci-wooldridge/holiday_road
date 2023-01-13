import APIKeys from "../Settings.js";

const applicationState = {};
const mainContainer = document.querySelector("#container");

const API = "http://localhost:8088";

const parkKey = APIKeys.npsKey;
const parkAPI = `https://developer.nps.gov/api/v1/parks?api_key=${parkKey}`;
export const fetchParks = () => {
    return fetch(`${parkAPI}`)
        .then((response) => response.json())
        .then((park) => {
            applicationState.parks = park.data;
        });
};

export const getParks = () => {
    return applicationState.parks.map((p) => ({ ...p }));
};

export const fetchWeather = (lat, lon) => {
    const weatherKey = APIKeys.weatherKey;
    const weatherAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherKey}`;
    return fetch(weatherAPI)
        .then((response) => response.json())
        .then((weatherData) => {
            const forecast = weatherData;
            //const cityName = `<ul class="weather">${forecast.city.name}</ul>`
            let html = `<h2 class="weatherCity">5 Day Forecast for ${forecast.city.name}</h2>
                <ul class="weather">`;

            for (let i = 4; i < 40; i += 8) {
                let date = new Date(
                    forecast.list[i].dt * 1000
                ).toLocaleDateString("en-US");
                let tempMax = forecast.list[i].main.temp_max;
                let tempMin = forecast.list[i].main.temp_min;
                let farenheitMax = (tempMax - 273.15) * 1.8 + 32;
                let farenheitMin = (tempMin - 273.15) * 1.8 + 32;
                let conditions = forecast.list[i].weather[0].description;
                html += `<div class="weatherItem">\n\n${date}- High: ${Math.round(
                    farenheitMax
                )}, Low: ${Math.round(farenheitMin)}, ${conditions}\n</div>\n`;
            }

            html += `</ul>`;

            const weatherContainer = document.querySelector(".showWeather");
            weatherContainer.innerHTML = html;
        });
};

export const getWeather = () => {
    return applicationState.weather.map((w) => ({ ...w }));
};

const bizarresAPI = `http://holidayroad.nss.team/bizarreries`;
export const fetchBizarres = () => {
    return fetch(`${bizarresAPI}`)
        .then((response) => response.json())
        .then((bizarre) => {
            applicationState.bizarres = bizarre;
        });
};

export const getBizarres = () => {
    return applicationState.bizarres.map((b) => ({ ...b }));
};

const eateriesAPI = `http://holidayroad.nss.team/eateries`;
export const fetchEateries = () => {
    return fetch(`${eateriesAPI}`)
        .then((response) => response.json())
        .then((eatery) => {
            applicationState.eateries = eatery;
        });
};

export const getEateries = () => {
    return applicationState.eateries.map((e) => ({ ...e }));
};

export const sendItineraries = (info) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
    };

    return fetch(`${API}/itineraries`, fetchOptions)
        .then((response) => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
        });
};

export const fetchItineraries = () => {
    return fetch(`${API}/itineraries`)
        .then((response) => response.json())
        .then((itinerary) => {
            applicationState.itineraries = itinerary;
        });
};

export const getItineraries = () => {
    return applicationState.itineraries.map((i) => ({ ...i }));
};
