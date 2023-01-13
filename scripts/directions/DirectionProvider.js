import { getParks, getEateries, getBizarres } from "../data/DataAccess.js";
import APIkeys from "../Settings.js";

let geoData = [];
let routeInstructions = "";

const graphhopperAPIKey = APIkeys.graphhopperKey;

const fetchLatLong = (city) => {
    const geocachingAPI = `https://graphhopper.com/api/1/geocode?q=${city}&locale=us&key=${graphhopperAPIKey}`;
    return fetch(geocachingAPI)
        .then((res) => res.json())
        .then((data) =>
            // format each lat long pair in the format "lat,lng"
            geoData.push(`${data.hits[0].point.lat},${data.hits[0].point.lng}`)
        );
};

export const getCoords = (startingPoint, itineraryObj) => {
    const parks = getParks();
    const bizarres = getBizarres();
    const eateries = getEateries();

    // look up each item in the itinerary
    let park = parks.find((park) => park.id === itineraryObj.parkCode);

    let bizarre = bizarres.find(
        (bizarre) => bizarre.id === itineraryObj.bizarreId
    );
    let eatery = eateries.find((eatery) => eatery.id === itineraryObj.eateryId);

    document.querySelector(
        "#directions__header"
    ).innerHTML = `${startingPoint} -> ${park.fullName} -> ${bizarre.name} -> ${eatery.businessName}`;

    // use the geocaching API to convert all of locations to lat/long
    // lat long is already in the park object
    // build an array of Promise objects
    const promises = [
        fetchLatLong(startingPoint),
        fetchLatLong(bizarre.city),
        fetchLatLong(eatery.city),
    ];

    Promise.all(promises)
        .then(() => {
            // put the coords in the geoData array in the order of Nashville -> park -> bizarre -> eatery
            // so we need to insert the park coordinates at index 1
            // relevant SO answer here: https://stackoverflow.com/a/586189/13615436
            geoData.splice(
                1,
                0,
                `${parseFloat(park.latitude)},${parseFloat(park.longitude)}`
            );
        })
        .then(() =>
            document.dispatchEvent(new CustomEvent("coordinatesLoaded"))
        );
};

export const getRoutingData = (coordinateArray) => {
    const [startingPoint, parkPoint, bizarrePoint, eateryPoint] =
        coordinateArray;
    // pass all the lat/long pairs to the routing API
    const routingAPI = `https://graphhopper.com/api/1/route?point=${startingPoint}&point=${parkPoint}&point=${bizarrePoint}&point=${eateryPoint}&key=${graphhopperAPIKey}`;
    // get all the directions
    return fetch(routingAPI)
        .then((res) => res.json())
        .then((data) => (routeInstructions = data.paths[0].instructions))
        .then(() => document.dispatchEvent(new CustomEvent("routingLoaded")));
};

export const generateRouteInstructions = (routeData) => {
    // clear routeInstructions
    routeInstructions = "";
    // map the text of all the turns
    return routeData.map((turn) => turn.text);
};

export const displayDirections = (directions) => {
    let html = `<div id="tripDirections">\n`;
    let i = 1;
    for (const turn of directions) {
        html += `<p class="turn--${i}">${i}. ${turn}</p>\n\t`;
        i++;
    }
    html += `</div>`;
    return html;
};

document.addEventListener("coordinatesLoaded", () => {
    // get the turn-by-turn instructions
    getRoutingData(geoData);
    // empty geoData
    geoData = [];
});

document.addEventListener("routingLoaded", () => {
    const directions = generateRouteInstructions(routeInstructions);
    const formattedDirections = displayDirections(directions);
    document.querySelector("#turn-by-turn__container").innerHTML =
        formattedDirections;
});
