import { getParks } from "../data/DataAccess.js";

export const ParkProvider = () => {
    const parks = getParks();

    return `<div class="parkDropdown">
            <select class="dropdown" id="parks__dropdown">
            <option value="">Select a Park</option>
            ${parks.map((park) => {
                return `<option value="${park.parkCode}">${park.fullName}</option>`;
            })}
</select>
</div>`;
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
});
