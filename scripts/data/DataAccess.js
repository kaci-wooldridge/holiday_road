const applicationState = {};
const mainContainer = document.querySelector("#container");
import APIKeys from "../Settings.js";

const parkKey = APIKeys.npsKey;
const parkAPI = `https://developer.nps.gov/api/v1/parks?api_key=${parkKey}`;
export const fetchParks = () => {
    return fetch(`${parkAPI}/data`)
        .then((response) => response.json())
        .then((park) => {
            applicationState.parks = park;
        });
};

export const getParks = () => {
    return applicationState.parks.map((p) => ({ ...p }));
};

const weatherKey = APIKeys.weatherKey;
const weatherAPI = `https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${weatherKey}`;
export const fetchWeather = () => {
    return fetch(weatherAPI)
        .then((response) => response.json())
        .then((weather) => {
            applicationState.weathers = weather;
        });
};

export const getWeather = () => {
    return applicationState.weathers.map((w) => ({ ...w }));
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
