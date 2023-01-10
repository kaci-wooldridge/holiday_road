import { getBizarres, getEateries, getItineraries, getParks } from "./data/DataAccess.js"

const foundItineraries= (itinerary) =>{
    const parks = getParks()
    const bizarres = getBizarres()
    const eateries = getEateries()
    let parkName = ''
    let bizarreName = ''
    let eateryName = ''

    let html='<div class="itinerary">'

    parks.map((park) =>{
        if(park.parkCode === itinerary.parkCode){
            return parkName = park.fullName
        }
    })

    bizarres.map((bizarre) =>{
        if(bizarre.id === itinerary.bizarreId){
            return bizarreName = bizarre.name
        }
    })

    eateries.map((eatery) =>{
        if(eatery.id === itinerary.eateryId){
            return eateryName = eatery.businessName
        }
    })

        return (html +=`
            <div class="savedPark">${parkName}</div>
            <div class="savedBizarre">${bizarreName}</div>
            <div class="savedEatery">${eateryName}</div>
        </div>
        `)
}

export const itineraryList = () =>{
    const itineraries = getItineraries()

    let html =`<ul class="itineraryContainer">
        ${itineraries.map(foundItineraries).join(`<br>`)}
        </ul>
        `
    
    return html
}