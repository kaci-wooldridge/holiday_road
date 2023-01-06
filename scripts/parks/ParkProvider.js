import { getParks } from '../data/DataAccess.js'

export const ParkProvider = () => {
	const parks = getParks()

	return `
    <div class="dropdown" id="parks__dropdown">
        <select>
            <option value="">Select a Park</option>
            ${parks
				.map((park) => {
					return `<option value="${park.id}">${park.fullName}</option>`
				})
				.join(``)}
        </select>
    </div>
    `
}
