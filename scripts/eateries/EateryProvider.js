import { getEateries } from "../data/DataAccess.js";
import {
    deleteButton,
    detailsButton,
    displayAmenities,
} from "../HolidayRoad.js";

const mainContainer = document.querySelector("#container");

export const eateryDropdown = () => {
    const eateries = getEateries();
    return `
    <div class="dropdown">
        <select id="eatery__dropdown" onchange="">
            <option value="">Select an Eatery</option>
            ${eateries
                .map((eatery) => {
                    return `<option value="${eatery.id}">${eatery.businessName}</option>`;
                })
                .join("")}
        </select>
    </div>   
    `;
};

mainContainer.addEventListener("change", () => {
    // checking to see if the dropdown has a value, i.e. not the default ""
    const selectedEatery = document.querySelector(
        "#eatery__dropdown option:checked"
    );
    // this is the element that shows up in the itinerary
    const itineraryEatery = document.querySelector(".chosenEatery");

    // default value is blank string, check for truthy value
    if (selectedEatery.value) {
        itineraryEatery.innerHTML =
            selectedEatery.text +
            detailsButton("eatery") +
            deleteButton("eatery");
    } else {
        // this is what the itinerary eatery should show on reset to "Select an Eatery"
        itineraryEatery.innerHTML = "";
    }

    // hide/show the details button if a selection is made
    const eateryDetailsButton = mainContainer.querySelector(".chosenEatery");
    if (!selectedEatery) {
        eateryDetailsButton.hidden = true;
    } else {
        eateryDetailsButton.hidden = false;
    }
});

mainContainer.addEventListener("click", (clickEvent) => {
    if (clickEvent.target.id === "eatery__details__button") {
        // find the eatery object
        const eateries = getEateries();

        const selectedEatery = document.querySelector(
            "#eatery__dropdown option:checked"
        );

        const eateryObj = eateries.find(
            (eatery) => eatery.id === parseInt(selectedEatery.value)
        );

        let alertText = `${eateryObj.businessName}
${eateryObj.city}, ${eateryObj.state}

${eateryObj.description}
        `;

        const amenitiesText = displayAmenities(eateryObj);
        if (amenitiesText) {
            alertText += amenitiesText;
        }

        window.alert(alertText);
    }
});

mainContainer.addEventListener("click", (clickEvent) => {
    const eateryContainer = document.querySelector(".chosenEatery");
    if (clickEvent.target.id === "eatery__delete__button") {
        eateryContainer.innerHTML = "";
        resetDropdown()
    }
    
});


const resetDropdown = () =>{
    document.getElementById('eatery__dropdown').value = ""
}