import { getBizarres } from "../data/DataAccess.js";

export const BizarresDropdown = () => {
    const bizarres = getBizarres();

    return `
        <div class="dropdown" id="bizarres__dropdown">
            <select>
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

mainContainer.addEventListener("change", () => {
    const selectedBizarre = document.querySelector(
        "#bizarres__dropdown option:checked"
    );
    const itineraryBizarre = document.querySelector(".chosenBizarre");
    // default value is blank string, check for truthy value
    if (selectedBizarre.value) {
        itineraryBizarre.innerHTML = selectedBizarre.text;
    } else {
        // this is what the itinerary bizarre should show on reset to "Select a Bizarre Destination"
        itineraryBizarre.innerHTML = "Bizarre";
    }
});
