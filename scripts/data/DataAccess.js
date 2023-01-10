export const applicationState = {};
//export const transientItineraryObj = {}
const mainContainer = document.querySelector("#container");
import APIKeys from "../Settings.js";

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
        .then((weathers) => {
            applicationState.weather = weathers;    
        });
};

// const weatherKey = APIKeys.weatherKey
// export const weatherAPI = `https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${weatherKey}`
// export const fetchWeather = () => {
// 	return fetch(weatherAPI)
// 		.then((response) => response.json())
// 		.then((weather) => {
// 			applicationState.weathers = weather
// 		})
// }

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

export const sendItinerary = (info) => {
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
