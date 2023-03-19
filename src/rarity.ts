import { EFFECT_LIST } from './card/effects'
import { TARGET_LIST } from './card/targets'
import { TRIGGER_LIST } from './card/triggers'
import { Card } from './game'

/**
 * Chance Power
 * 50%    1
 * 25%    2
 * 12.5%  3
 * ...
 */
export const randomDiminishing = () => Math.floor(Math.log2(1 / Math.random()) + 1)

export const weightedSelect = <T extends { weight: number }>(list: readonly T[]) => {
	const triggerWeightTotal = list.reduce((acc, curr) => acc + curr.weight, 0)
	const selectedWeight = Math.random() * triggerWeightTotal
	let idx = -1
	let currentWeight = 0
	while (currentWeight < selectedWeight) currentWeight += list[++idx].weight
	return list[idx]
}

export const generateCard = (): Card => {
	const trigger = weightedSelect(TRIGGER_LIST)
	const effect = weightedSelect(EFFECT_LIST)
	const target = weightedSelect(TARGET_LIST)
	return {
		trigger,
		effect: { ...effect, power: randomDiminishing() },
		target,
	}
}
