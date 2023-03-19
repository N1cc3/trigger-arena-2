import { Player } from '../game'

export const EFFECT_LIST = [
	{
		id: 'damage',
		text: (power: number) => `Damage ${power}`,
		applyEffect: (targets: Player[], power: number) => {
			targets.forEach((t) => (t.health -= power))
		},
	},
	{
		id: 'heal',
		text: (power: number) => `Heal ${power}`,
		applyEffect: (targets: Player[], power: number) => {
			targets.forEach((t) => (t.health -= power))
		},
	},
] as const

export type EffectType = (typeof EFFECT_LIST)[number]

export const EFFECTS = EFFECT_LIST.reduce(
	(acc, curr) => ({ ...acc, [curr.id]: curr }),
	{} as { [id in EffectType['id']]: EffectType }
)
