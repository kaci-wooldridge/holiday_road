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
    ).text;

    document.querySelector(".chosenBizarre").innerHTML = selectedBizarre;
});
