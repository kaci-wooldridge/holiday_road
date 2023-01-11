import { BizarresDropdown } from "./bizarres/BizarresProvider.js";
import { ParkProvider } from "./parks/ParkProvider.js";
import { eateryDropdown } from "./eateries/EateryProvider.js";
import { sendItineraries } from "./data/DataAccess.js";
import { itineraryList } from "./Itinerary.js";

export const HolidayRoad = () => {
	return `
    <div class="header">
        <h2 class="headerText">Holiday Road</h2>
        <div class="dropdownBoxes">
            ${ParkProvider()}
            ${BizarresDropdown()}
            ${eateryDropdown()}
        </div>
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

            <div class="buttonContainer">
                <button class="saveButton" disabled>Save Trip</button>
            </div>

            <div class="weatherDisplay">
                <h3>Weather</h3>
                <div class="showWeather"></div>       
            </div>
        </div>

        <div class="savedOptions">
            <h3>Saved Itinerary List</h3>
            <div class="savedItineraryList">${itineraryList()}</div>
        </div>
    </div>`;
};

export const DetailsButton = (resource) => {
	/*
        Returns a "details" button for a given resource

            params:
                resource (string): ex. "eateries", "parks", or "bizarres"
    */
	return `
        <button class="details__button" id="${resource}__details__button">Details</button>
    `
}

// export const Weather = (weatherString) => {
//     return weatherString
// }

const mainContainer = document.querySelector('#container')

mainContainer.addEventListener('change', (clickEvent) => {
	const selectedPark = document.querySelector(
		'#parks__dropdown option:checked'
	).value
	const selectedBizarre = document.querySelector(
		'#bizarres__dropdown option:checked'
	).value
	const selectedEatery = document.querySelector(
		'#eatery__dropdown option:checked'
	).value

    const saveButton = document.querySelector(".saveButton");
    if (selectedPark && selectedBizarre && selectedEatery) {
        saveButton.disabled = false;
    } else {
        saveButton.disabled = true;
    }

    // hide/show the details buttons if a selection is not made for that attraction
    const parkDetailsButton = mainContainer.querySelector(".chosenPark");
    const bizarreDetailsButton = mainContainer.querySelector(".chosenBizarre");
    const eateryDetailsButton = mainContainer.querySelector(".chosenEatery");

    if (!selectedPark) {
        parkDetailsButton.hidden = true;
    } else {
        parkDetailsButton.hidden = false;
    }

    if (!selectedBizarre) {
        bizarreDetailsButton.hidden = true;
    } else {
        bizarreDetailsButton.hidden = false;
    }

    if (!selectedEatery) {
        eateryDetailsButton.hidden = true;
    } else {
        eateryDetailsButton.hidden = false;
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
