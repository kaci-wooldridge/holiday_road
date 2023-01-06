import { getEateries } from '../data/DataAccess.js'

const mainContainer = document.querySelector('#container')

export const eateryDropdown = () => {
	const eateries = getEateries()

	return `
    <div class="dropdown" id="eatery__dropdown">
        <select>
            <option value="">Select an Eatery</option>
            ${eateries
				.map((eatery) => {
					return `<option value="${eatery.id}">${eatery.businessName}</option>`
				})
				.join('')}
        </select>
    </div>   
    `
}
