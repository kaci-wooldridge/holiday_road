import { getParks, fetchWeather, getWeather, applicationState } from "../data/DataAccess.js";

import { DetailsButton } from "../HolidayRoad.js";

export const ParkProvider = () => {
    const parks = getParks();

    return `<div class="dropdown">
            <select class="dropdown" id="parks__dropdown">
                <option value="">Select a Park</option>
                ${parks.map((park) => {
        return `<option value="${park.id}">${park.fullName}</option>`;
    })}
            </select>
        </div>
    `;
};

export const Weather = () => {
    const CURRENT_LOCATION = document.getElementsByClassName('weather-content__overview')[0];
    const CURRENT_TEMP = document.getElementsByClassName('weather-content__temp')[0];
    const FORECAST = document.getElementsByClassName('component__forecast-box')[0];

    
}

document.addEventListener("change", (event) => {

    const weatherContainer = document.querySelector(".parkWeather")
    const parkContainer = document.querySelector(".chosenPark");
    const parks = getParks();

    const clicked = event.target;

    if (clicked.id === "parks__dropdown") {
        const parkId = clicked.value;

        parkContainer.innerHTML = parks
            .map((park) => {
                if (parkId === park.id) {
                    return park.fullName;
                }
            })
            .join("");

        parks.map(
            (park) => {
                if (parkId === park.id) {

                    const lat = park.latitude
                    const long = park.longitude

                    fetchWeather(lat, long)
                    .then(() => )
                }
            }
        )
        parkContainer.innerHTML =
            parks
                .map((park) => {
                    if (parkId === park.id) {
                        return park.fullName;
                    }
                })
                .join("") + DetailsButton("park");
    }
});

const mainContainer = document.querySelector("#container");

mainContainer.addEventListener("click", (clickEvent) => {
    if (clickEvent.target.id === "park__details__button") {
        // find the parks object
        const parks = getParks();

        const selectedPark = document.querySelector(
            "#parks__dropdown option:checked"
        );

        const parkObj = parks.find(
            (park) => park.parkCode === selectedPark.value
        );

        let alertText = `${parkObj.fullName}
${parkObj.latLong} (${parkObj.states})

${parkObj.description}
        `;

        // const amenitiesText = DisplayAmenities(parkObj);
        // if (amenitiesText) {
        //     alertText += amenitiesText;
        // }

        window.alert(alertText);
    }
});
