import {
    fetchBizarres,
    fetchEateries,
    fetchParks,
    fetchWeather,
} from "./data/DataAccess.js";

const mainContainer = document.querySelector("#container");

const render = () => {
    fetchParks()
        .then(() => fetchWeather())
        .then(() => fetchBizarres())
        .then(() => fetchEateries());
};

render();

mainContainer.addEventListener("stateChanged", (customEvent) => {
    render();
});
