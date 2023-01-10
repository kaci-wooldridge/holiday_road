import { BizarresDropdown } from "./bizarres/BizarresProvider.js";
import { ParkProvider } from "./parks/ParkProvider.js";
import { eateryDropdown } from "./eateries/EateryProvider.js";
import { sendItineraries } from "./data/DataAccess.js";
import { itineraryList } from "./Itinerary.js";

export const HolidayRoad = () => {
    return `
    <h2>Holiday Road</h2>

    <div class="dropdownBoxes">
        ${ParkProvider()}
        ${BizarresDropdown()}
        ${eateryDropdown()}
    </div>
    
    <div class="mainContent">

        <div class="chosenOptions">
            <div class="optionsDisplay">
                <h3>Your Itinerary</h3>
                
                <div class="chosenPark"></div>
                <div class="parkWeather"></div>
                <div class="chosenBizarre"></div>
                <div class="chosenEatery"></div>
            </div>

            <div class="detailsDisplay"></div>
                <button class="saveButton" disabled>Save Trip</button>
            </div>

            <div class="weatherDisplay">
                <h3>Weather</h3>
            </div>

        </div>

        <div class="savedOptions">
          <h3>Saved Itinerary List</h3>
          <div class="savedItineraryList">${itineraryList()}</div>
        </div>

    </div>
    `;
};

export const DetailsButton = (resource) => {
    /*
        Returns a "details" button for a given resource

            params:
                resource (string): ex. "eateries", "parks", or "bizarres"
    */
    return `
        <button class="details__button" id="${resource}__details__button">Details</button>
    `;
};

// NOTE: "ameneties" property is spelled wrong in the API
// export const DisplayAmenities = (attractionObj) => {
//     /*
//         loop through all of the ameneties on the object
//         and get a list of the ones that are available (i.e "key": true)
//     */
//     const availableAmenities = [];
//     for (const key of Object.keys(attractionObj.ameneties)) {
//         if (attractionObj.ameneties[key]) {
//             availableAmenities.push(key);
//         }
//     }
//     /*
//         blank array is actually a truthy value
//         however, if length = 0 would be falsy
//     */
//     if (availableAmenities.length) {
//         return `
// Amenities:
//     ${availableAmenities.join("\n")}
// `;
//     }
// };

const mainContainer = document.querySelector("#container");

mainContainer.addEventListener("change", (clickEvent) => {
    const selectedPark = document.querySelector(
        "#parks__dropdown option:checked"
    ).value;
    const selectedBizarre = document.querySelector(
        "#bizarres__dropdown option:checked"
    ).value;
    const selectedEatery = document.querySelector(
        "#eatery__dropdown option:checked"
    ).value;

    const saveButton = document.querySelector(".saveButton");
    if (selectedPark && selectedBizarre && selectedEatery) {
        saveButton.disabled = false;
    } else {
        saveButton.disabled = true;
    }

    if (clickEvent.target.className === "saveButton") {
        const tripObj = {
            parkCode: selectedPark,
            bizarreId: parseInt(selectedBizarre),
            eateryId: parseInt(selectedEatery),
        };
        sendItineraries(tripObj);
    }
});
