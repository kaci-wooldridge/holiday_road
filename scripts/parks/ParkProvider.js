import { getParks, fetchWeather } from "../data/DataAccess.js";

import { detailsButton, deleteButton } from "../HolidayRoad.js";

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

        parks.map((park) => {
            if (parkId === park.id) {
                const lat = park.latitude;
                const long = park.longitude;

                fetchWeather(lat, long);
            }
        });
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
        parkContainer.innerHTML += detailsButton("park") + deleteButton("park");
    }

    const selectedPark = document.querySelector(
        "#parks__dropdown option:checked"
    );
    // this is the element that shows up in the itinerary
    const itineraryPark = document.querySelector(".chosenPark");

    // default value is blank string, check for truthy value
    if (selectedPark.value) {
        itineraryPark.innerHTML =
            selectedPark.text + detailsButton("park") + deleteButton("park");
    } else {
        // this is what the itinerary park should show on reset to "Select a park"
        itineraryPark.innerHTML = "";
    }

    // hide/show the details button if a selection is made
    const bizarreDetailsButton = mainContainer.querySelector(".chosenPark");
    if (!selectedPark) {
        bizarreDetailsButton.hidden = true;
    } else {
        bizarreDetailsButton.hidden = false;
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

        const parkObj = parks.find((park) => park.id === selectedPark.value);

        let alertText = `${parkObj.fullName}
${parkObj.latLong} (${parkObj.states})

${parkObj.description}
        `;

        window.alert(alertText);
    }
});

mainContainer.addEventListener("click", (clickEvent) => {
    const parkContainer = document.querySelector(".chosenPark");
    const weatherContainer = document.querySelector(".showWeather");
    if (clickEvent.target.id === "park__delete__button") {
        parkContainer.innerHTML = "";
        resetDropdown();
        weatherContainer.innerHTML = "";
    }
});

const resetDropdown = () => {
    document.getElementById("parks__dropdown").value = "";
};
