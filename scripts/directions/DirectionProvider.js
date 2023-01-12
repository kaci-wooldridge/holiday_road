import { getParks, getEateries, getBizarres } from "../data/DataAccess.js";
import APIkeys from "../Settings.js";

const graphhopperAPIKey = APIkeys.graphhopperKey;

const getLatLong = (city) => {
    const geocachingAPI = `https://graphhopper.com/api/1/geocode?q=${city}&locale=us&key=${graphhopperAPIKey}`;
    let latLong = "";
    fetch(geocachingAPI)
        .then((res) => res.json())
        .then((data) => (latLong = data.hits));
    return latLong;
};

export const getDirections = (startingPoint, itineraryObj) => {
    const parks = getParks();
    const bizarres = getBizarres();
    const eateries = getEateries();

    // look up each item in the itinerary
    let park = parks.find((park) => park.parkCode === itineraryObj.parkCode);

    let bizarre = bizarres.find(
        (bizarre) => bizarre.id === itineraryObj.bizarreId
    );
    let eatery = eateries.find((eatery) => eatery.id === itineraryObj.eateryId);

    // use the geocaching API to convert all of locations to lat/long
    // lat long is already in the park object
    startingPoint = getLatLong(startingPoint);
    bizarre = getLatLong(bizarre.city);
    eatery = getLatLong(eatery.city);
    // nashville -> park -> bizarre -> eatery
};

// send all 4 lat/long pairs to the URL for the routing API
// display the directions from the routing api
