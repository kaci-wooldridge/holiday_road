import { getParks } from "../data/DataAccess.js";
import { DetailsButton } from "../HolidayRoad.js";

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

document.addEventListener("change", (event) => {
    const parkContainer = document.querySelector(".chosenPark");
    const parks = getParks();

    const clicked = event.target;

    if (clicked.id === "parks__dropdown") {
        const parkKode = clicked.value;

        //pushParkObjToTransientItineraryObj(parkKode)

        parkContainer.innerHTML = parks
            .map((park) => {
                if (parkKode === park.parkCode) {
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
        parkContainer.innerHTML += DetailsButton("park");
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
            (park) => park.parkCode === selectedPark.value
        );

        let alertText = `${parkObj.fullName}
${parkObj.latLong} (${parkObj.states})

${parkObj.description}
        `;

        window.alert(alertText);
    }
});
