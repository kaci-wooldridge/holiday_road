import { BizarresDropdown } from "./bizarres/BizarresProvider.js";
import { ParkProvider } from "./parks/ParkProvider.js";
import { eateryDropdown } from "./eateries/EateryProvider.js";
import { sendItineraries } from "./data/DataAccess.js";
import { itineraryList } from "./Itinerary.js";

export const HolidayRoad = () => {
    return `
    <div class = "navBar">
        <ul class="navElements">
        <li><a href="default.asp">Home</a></li>
        <li><a href="news.asp">News</a></li>
        <li><a href="contact.asp">Contact</a></li>
        <li><a href="about.asp">About</a></li>
        </ul>
    </div>  

    <div class="header">
        <h1 class="headerText">Holiday Road</h1>
        <div class="dropdownBoxes">
            ${ParkProvider()}
            ${BizarresDropdown()}
            ${eateryDropdown()}
        </div>
    </div>

    <div class="mainContent">
        <div class="chosenOptions">

            <div class="optionsDisplay">
                <h1>Your Itinerary</h1>
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
                <div class="showWeather"></div>
            </div>
        </div>

        <div class="savedOptions">
            <h1>Saved Itinerary List</h1>
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
    `;
};

const toSentenceCase = (camelCase) => {
    /*
        Usage example:
            console.log( toSentenceCase(‘mySampleText’) ); // My sample text
            console.log( toSentenceCase(‘anotherText’)  ); // Another text
    */
    if (camelCase) {
        const result = camelCase.replace(/([A-Z])/g, " $1");
        return result[0].toUpperCase() + result.substring(1).toLowerCase();
    }
    return "";
};

export const displayAmenities = (attractionObj) => {
    // loop through all the amenities on the object, and only show ones with the value true
    const availableAmenities = [];
    for (const key of Object.keys(attractionObj.ameneties)) {
        // check for eval to true
        // NOTE: "ameneties" property is spelled wrong in the API
        if (attractionObj.ameneties[key]) {
            availableAmenities.push(toSentenceCase(key));
        }
    }
    // empty object will still eval to true, but length = 0 will be falsy
    if (availableAmenities.length) {
        return `
Amenities:
- ${availableAmenities.join("\n- ")}`;
    }
};

const mainContainer = document.querySelector("#container");

// this is a really good opportunity to implement applicationState
// should not have to run formItineraryObj twice
const formItineraryObj = () => {
    const selectedPark = document.querySelector(
        "#parks__dropdown option:checked"
    ).value;
    const selectedBizarre = document.querySelector(
        "#bizarres__dropdown option:checked"
    ).value;
    const selectedEatery = document.querySelector(
        "#eatery__dropdown option:checked"
    ).value;

    if (selectedPark && selectedBizarre && selectedEatery) {
        const itineraryObj = {
            parkCode: selectedPark,
            bizarreId: parseInt(selectedBizarre),
            eateryId: parseInt(selectedEatery),
        };
        return itineraryObj;
    } else {
        return null;
    }
};

// see if all selections are made
// if so, enable the save button
mainContainer.addEventListener("change", () => {
    const itineraryObj = formItineraryObj();

    const saveButton = document.querySelector(".saveButton");
    if (itineraryObj) {
        saveButton.disabled = false;
    } else {
        saveButton.disabled = true;
    }
});

// save button -> API
mainContainer.addEventListener("click", (clickEvent) => {
    if (clickEvent.target.className === "saveButton") {
        const itineraryObj = formItineraryObj();
        sendItineraries(itineraryObj);
    }
});

export const deleteButton = (resource) => {
    return `
        <button class="delete__button" id="${resource}__delete__button">x</button>
    `;
};