import { getBizarres } from "../data/DataAccess.js";
import { DetailsButton, DisplayAmenities } from "../HolidayRoad.js";

export const BizarresDropdown = () => {
    const bizarres = getBizarres();

    return `
        <div class="dropdown">
            <select id="bizarres__dropdown">
                <option value="">Select a Bizarre Destination</option>
                ${bizarres
                    .map((bizarre) => {
                        return `<option value="${bizarre.id}">${bizarre.name}</option>`;
                    })
                    .join("")}
            </select>
        </div>
    `;
};

const mainContainer = document.querySelector("#container");

mainContainer.addEventListener("change", (event) => {
    if (event.target.id === "bizarres__dropdown") {
        // checking to see if the dropdown has a value, i.e. not the default ""
        const selectedBizarre = document.querySelector(
            "#bizarres__dropdown option:checked"
        );
        // this is the element that shows up in the itinerary
        const itineraryBizarre = document.querySelector(".chosenBizarre");

        // default value is blank string, check for truthy value
        if (selectedBizarre.value) {
            itineraryBizarre.innerHTML =
                selectedBizarre.text + DetailsButton("bizarres");
        } else {
            // this is what the itinerary bizarre should show on reset to "Select a Bizarre Destination"
            itineraryBizarre.innerHTML = "";
        }
    }
});

mainContainer.addEventListener("click", (clickEvent) => {
    if (clickEvent.target.id === "bizarres__details__button") {
        // find the bizarres object
        const bizarres = getBizarres();

        const selectedBizarre = document.querySelector(
            "#bizarres__dropdown option:checked"
        );

        const bizarreObj = bizarres.find(
            (bizarre) => bizarre.id === parseInt(selectedBizarre.value)
        );

        let alertText = `${bizarreObj.name}
${bizarreObj.city}, ${bizarreObj.state}

${bizarreObj.description}
        `;

        const amenitiesText = DisplayAmenities(bizarreObj);
        if (amenitiesText) {
            alertText += amenitiesText;
        }

        window.alert(alertText);
    }
});
