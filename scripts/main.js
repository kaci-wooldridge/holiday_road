import {
	fetchBizarres,
	fetchEateries,
	fetchParks,
} from './data/DataAccess.js'
import { HolidayRoad } from './HolidayRoad.js'


const mainContainer = document.querySelector('#container')

const render = () => {
	fetchParks()
		.then(() => fetchBizarres())
		.then(() => fetchEateries())
		.then(() => {
			mainContainer.innerHTML = HolidayRoad()
		})
}

render()

mainContainer.addEventListener('stateChanged', (customEvent) => {
	render()
})

