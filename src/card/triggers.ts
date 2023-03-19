import { Game, Player } from '../game'

export const TRIGGER_LIST = [
	{
		id: 'instant',
		text: 'When you play this card',
		weight: 5,
		isTriggered: (_game: Game, _self: Player) => true,
	},
	{
		id: 'takes-damage',
		text: 'When you take damage',
		weight: 1,
		isTriggered: (game: Game, self: Player) =>
			game.events.some((e) => e.card.effect.id === 'damage' && e.targetIdxs.includes(game.players.indexOf(self))),
	},
	{
		id: 'healed',
		text: 'When you are healed',
		weight: 1,
		isTriggered: (game: Game, self: Player) =>
			game.events.some((e) => e.card.effect.id === 'heal' && e.targetIdxs.includes(game.players.indexOf(self))),
	},
] as const

export type TriggerType = (typeof TRIGGER_LIST)[number]

export const TRIGGERS = TRIGGER_LIST.reduce(
	(acc, curr) => ({ ...acc, [curr.id]: curr }),
	{} as { [id in TriggerType['id']]: TriggerType }
)
