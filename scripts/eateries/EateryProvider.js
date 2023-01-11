import { getEateries } from "../data/DataAccess.js";
import { deleteButton, DetailsButton, displayAmenities } from "../HolidayRoad.js";

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

    const eateryDetailsButton = mainContainer.querySelector(
        "#eatery__details__button"
    );

    if (eateryContainer.innerHTML && !eateryDetailsButton) {
        eateryContainer.innerHTML += DetailsButton("eatery") + deleteButton("eatery");
    }

    const selectedEatery = document.querySelector(
        "#eatery__dropdown option:checked"
    );

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

mainContainer.addEventListener("click", (clickEvent) =>{
    const eateryContainer = document.querySelector(".chosenEatery")
    if (clickEvent.target.id === "eatery__delete__button"){
        eateryContainer.innerHTML = ""
    }
})
