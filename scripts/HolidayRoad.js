import { BizarresDropdown } from "./bizarres/BizarresProvider.js";
import { ParkProvider } from "./parks/ParkProvider.js";
import { eateryDropdown } from './eateries/EateryProvider.js'


export const HolidayRoad = () => {
	return `
      <h2>Holiday Road</h2>
    
      <div class="dropdownBoxes">
        <div class="parkDropdown dropdown">
          ${ParkProvider()}
        </div>
  
        ${BizarresDropdown()}
        ${eateryDropdown()}
      
      <div class="mainContent">
        <div class="chosenOptions">
          <div class="optionsDisplay">
            <h3>Your Itinerary</h3>
            
            <div class="chosenPark chosen">Park</div>
            <div class="chosenBizarre chosen">Bizarre </div>
            <div class="chosenEatery chosen">Eatery</div>
        <div class="detailsDisplay"></div>
  
          <button style="width:100px" class="saveButton">SAV3</button>
          </div>
  
          <div class="weatherDisplay">
          <h3>Weather</h3>
          </div>
        </div>
  
        <div class="savedOptions">
          <h3>Saved Itinerary List</h3>
          
        </div>
  
  
      </div>
      `
}
