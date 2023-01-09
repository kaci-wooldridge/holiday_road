import { getBizarres } from "../data/DataAccess.js";

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
            itineraryBizarre.innerHTML = selectedBizarre.text;
        } else {
            // this is what the itinerary bizarre should show on reset to "Select a Bizarre Destination"
            itineraryBizarre.innerHTML = "Bizarre";
        }
    }
});
