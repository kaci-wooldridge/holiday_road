import { getParks } from "../data/DataAccess.js";

export const ParkProvider = () => {
    const parks = getParks();
    return `<p>${parks}</p>`;
};
