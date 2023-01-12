import { getParks, fetchWeather, getWeather, applicationState } from "../data/DataAccess.js";

import { DetailsButton, deleteButton } from "../HolidayRoad.js";

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

document.addEventListener("change", (event) => {

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
                }
            }
        )
        parkContainer.innerHTML = parks
            .map((park) => {
                if (parkId === park.id) {
                    return park.fullName;
                }
            })
            .join("");
    }

    // only add a details button for the park if there ISN'T one
    const parkDetailsButton = mainContainer.querySelector(
        "#park__details__button"
    );

    if (parkContainer.innerHTML && !parkDetailsButton) {
        parkContainer.innerHTML += DetailsButton("park") + deleteButton("park");
    }

    const selectedPark = document.querySelector(
        "#parks__dropdown option:checked"
    );

    if (!selectedPark) {
        parkDetailsButton.hidden = true;
    } else {
        // TODO FIXME throwing an error sometimes but why?
        parkDetailsButton.hidden = false;
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
            (park) => park.id === selectedPark.value
        );

        let alertText = `${parkObj.fullName}
${parkObj.latLong} (${parkObj.states})

${parkObj.description}
        `;

        window.alert(alertText);
    }
});

mainContainer.addEventListener("click", (clickEvent) =>{
    const parkContainer = document.querySelector(".chosenPark")
    if (clickEvent.target.id === "park__delete__button"){
        parkContainer.innerHTML = ""
    }
})
