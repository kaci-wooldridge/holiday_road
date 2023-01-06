import { getParks } from "../data/DataAccess.js";

export const ParkProvider = () => {
    const parks = getParks();

    return `<select class="dropdown" id="parks__dropdown">
            <option value="0">Select a Park</option>
            ${parks.map(
                (park) => {
                    return `<option value="${park.id}">${park.fullName}</option>`
            }
        )
    }
</select>`
}
