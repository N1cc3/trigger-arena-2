import { EffectType } from './card/effects'
import { TargetType } from './card/targets'
import { TriggerType } from './card/triggers'

export type Game = {
	id: string
	players: Player[]
	cards: OwnedCard[]
	hands: { [playerIdx: number]: Card[] }
	turn: number
	events: Event[]
}

export type Player = {
	name: string
	health: number
	dead?: boolean
}

export type Event = {
	card: Card
	targetIdxs: number[]
}

export type Card = {
	trigger: TriggerType
	target: TargetType
	effect: EffectType & Powered
}

export type OwnedCard = Card & { ownerIdx: number }
export type Powered = { power: number }
export type Action = { use: number; discard: number; target?: number }

export const simulate = (game: Game, action: Action) => {
	game.events = []
	const triggered: Card[] = []
	const currentPlayerIdx = game.turn % game.players.length
	const currentPlayer = game.players[currentPlayerIdx]
	const usedCard = game.hands[currentPlayerIdx][action.use]

	if (usedCard.trigger.id === 'instant') triggered.push(usedCard)

	let triggeredIdx = 0
	while (triggeredIdx < triggered.length) {
		const card = triggered[triggeredIdx]
		const targets = card.target.getTargets(game.players, currentPlayer)
		card.effect.applyEffect(targets, card.effect.power)

		game.events.push({
			card,
			targetIdxs: targets.map((t) => game.players.indexOf(t)),
		})

		game.cards.forEach((c) => {
			if (!triggered.includes(c) && c.trigger.isTriggered(game, currentPlayer)) triggered.push(c)
		})

		triggeredIdx++
	}
}
