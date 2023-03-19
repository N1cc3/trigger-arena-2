import { Game, Player, simulate } from './game'
import { TARGETS } from './card/targets'
import { TRIGGERS } from './card/triggers'
import { EFFECTS } from './card/effects'

const createPlayer = (): Player => ({
	name: 'player',
	health: 10,
})

const createGame = (): Game => ({
	id: 'g1',
	players: [
		{ ...createPlayer(), name: 'p1' },
		{ ...createPlayer(), name: 'p2' },
	],
	cards: [],
	events: [],
	hands: [],
	turn: 0,
})

test('game simulate', () => {
	const game: Game = {
		...createGame(),
		hands: [
			[
				{
					trigger: TRIGGERS['instant'],
					target: TARGETS.self,
					effect: { ...EFFECTS.damage, power: 1 },
				},
			],
		],
		cards: [
			{
				trigger: TRIGGERS['takes-damage'],
				target: TARGETS.self,
				effect: { ...EFFECTS.damage, power: 1 },
				ownerIdx: 0,
			},
		],
	}

	simulate(game, { use: 0, discard: 1 })

	expect(game.events[0].card.effect.id).toEqual('damage')
	expect(game.events[1].card.effect.id).toEqual('damage')
	expect(game.players[0].health).toEqual(8)
})
