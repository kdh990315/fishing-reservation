import { allFish } from '@/data/data.js';

export function fishSearch(fishId) {
	const data = allFish;
	const foundFishName = [];
	console.log(fishId)
	fishId.forEach((id) => {
		for(let group of data) {
			for(let fish of group.fishName) {
				if(fish.id === id) {
					foundFishName.push(fish.name)
				}
			}
		}
	});

	return foundFishName;
}