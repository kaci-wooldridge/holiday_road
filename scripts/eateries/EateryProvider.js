import { getEateries } from "../data/DataAccess.js";

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

mainContainer.addEventListener("change", (changeEvent) => {
    const eateryContainer = document.querySelector(".chosenEatery");
    const eateries = getEateries();
    let chosenEatery = "";
    if (changeEvent.target.id === "eatery__dropdown") {
        chosenEatery = parseInt(changeEvent.target.value);

        eateryContainer.innerHTML = eateries
            .map((eatery) => {
                if (chosenEatery === eatery.id) {
                    return eatery.businessName;
                }
            })
            .join("");
    }
});
