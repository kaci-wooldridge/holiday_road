import {
    getBizarres,
    getEateries,
    getItineraries,
    getParks,
} from "./data/DataAccess.js";
import { getCoords } from "./directions/DirectionProvider.js";

const foundItineraries = (itinerary) => {
    const parks = getParks();
    const bizarres = getBizarres();
    const eateries = getEateries();
    let parkName = "";
    let bizarreName = "";
    let eateryName = "";

    let html = `<div class="itinerary" id="itinerary--${itinerary.id}">`;

    parks.map((park) => {
        if (park.id === itinerary.parkCode) {
            return (parkName = park.fullName);
        }
    });

    bizarres.map((bizarre) => {
        if (bizarre.id === itinerary.bizarreId) {
            return (bizarreName = bizarre.name);
        }
    });

    eateries.map((eatery) => {
        if (eatery.id === itinerary.eateryId) {
            return (eateryName = eatery.businessName);
        }
    });

    return (html += `
            <div class="savedPark">${parkName}</div>
            <div class="savedBizarre">${bizarreName}</div> 
            <div class="savedEatery">${eateryName}</div>
            <button class="itinerary-directions__button" id="itinerary--${itinerary.id}--directions__button">Get Directions</button>
        </div>
        `);
};

export const itineraryList = () => {
    const itineraries = getItineraries();

    let html = `<ul class="itineraryContainer">
        ${itineraries.map(foundItineraries).join(`<br>`)}
        </ul>
        `;

    return html;
};

const mainContainer = document.querySelector("#container");

mainContainer.addEventListener("click", (clickEvent) => {
    if (clickEvent.target.className === "itinerary-directions__button") {
        // get the id of the itinerary
        const [, itineraryId] = clickEvent.target.id.split("--");
        // look up the itinerary with the itineraryId
        const itineraries = getItineraries();
        const itinerary = itineraries.find(
            (trip) => trip.id === parseInt(itineraryId)
        );
        // put all the coordinates from the geocaching API into the applicationState
        getCoords("Nashville", itinerary);
    }
});
