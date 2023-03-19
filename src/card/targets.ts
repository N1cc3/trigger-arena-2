import { Player } from '../game'

export const TARGET_LIST = [
	{
		id: 'self',
		text: 'Self',
		getTargets: (_all: Player[], self: Player) => [self],
	},
	{
		id: 'one-random',
		text: 'One random',
		getTargets: (all: Player[], _self: Player) => [all[Math.floor(Math.random() * all.length)]],
	},
	{
		id: 'two-random',
		text: 'Two random',
		getTargets: (all: Player[], _self: Player) => {
			const first = Math.floor(Math.random() * all.length)
			const second = Math.floor(Math.random() * all.length)
			if (first === second) return [all[first], all[(first + 1) % all.length]]
			return [all[first], all[second]]
		},
	},
	{
		id: 'one-random-enemy',
		text: 'One random enemy',
		getTargets: (all: Player[], self: Player) => [
			all.filter((p) => p.name === self.name)[Math.floor(Math.random() * (all.length - 1))],
		],
	},
] as const

export type TargetType = (typeof TARGET_LIST)[number]

export const TARGETS = TARGET_LIST.reduce(
	(acc, curr) => ({ ...acc, [curr.id]: curr }),
	{} as { [id in TargetType['id']]: TargetType }
)
