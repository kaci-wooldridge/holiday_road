import { getParks } from "../data/DataAccess.js";
import { detailsButton, deleteButton } from "../HolidayRoad.js";

export const ParkProvider = () => {
    const parks = getParks();

    return `<div class="dropdown">
            <select class="dropdown" id="parks__dropdown">
                <option value="">Select a Park</option>
                ${parks.map((park) => {
                    return `<option value="${park.parkCode}">${park.fullName}</option>`;
                })}
            </select>
        </div>
    `;
};

// const pushParkObjToTransientItineraryObj = (parkKode) => {
//     transientItineraryObj.parkId = parkKode

//     const parks = getParks()

//     parks.map(
//         (park) => {
//             if (parkKode === park.parkCode) {
//                 transientItineraryObj.lat = park.latitude,
//                 transientItineraryObj.lon = park.longitude
//             }
//         }
//     )

//     const lattitude = transientItineraryObj.lat
//     const longitude = transientItineraryObj.lon

//     fetchWeather(lattitude, longitude)
// }

// export const DisplayPark = () => {
//     const parks = getParks()
//     return parks.map(
//         (park) => {
//             if (park.parkCode === transientItineraryObj.parkId) {
//                 return `${park.fullName}`
//             }
//         }
//     ).join("")
// }

export const DisplayWeather = () => {};

document.addEventListener("change", () => {
    // checking to see if the dropdown has a value, i.e. not the default ""
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

        const parkObj = parks.find(
            (park) => park.parkCode === selectedPark.value
        );

        let alertText = `${parkObj.fullName}
${parkObj.latLong} (${parkObj.states})

${parkObj.description}
        `;

        window.alert(alertText);
    }
});

mainContainer.addEventListener("click", (clickEvent) => {
    const parkContainer = document.querySelector(".chosenPark");
    if (clickEvent.target.id === "park__delete__button") {
        parkContainer.innerHTML = "";
    }
});
