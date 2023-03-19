import { EffectId, EFFECTS, EffectType } from './card/effects'
import { Game, Player, simulate } from './game'
import { TargetId, TARGETS, TargetType } from './card/targets'
import { TriggerId, TRIGGERS, TriggerType } from './card/triggers'

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

const mapped = <T>(list: readonly T[], getKey: (element: T) => string) =>
	list.reduce((acc, curr) => ({ ...acc, [getKey(curr)]: curr }), {})

const triggers = mapped(TRIGGERS, (e) => e.id) as { [id in TriggerId]: TriggerType }
const targets = mapped(TARGETS, (e) => e.id) as { [id in TargetId]: TargetType }
const effects = mapped(EFFECTS, (e) => e.id) as { [id in EffectId]: EffectType }

test('game simulate', () => {
	const game: Game = {
		...createGame(),
		hands: [
			[
				{
					type: 'instant',
					target: { ...targets.self, power: 1 },
					effect: { ...effects.damage, power: 1 },
				},
			],
		],
		cards: [
			{
				type: 'trigger',
				trigger: { ...triggers['takes-damage'], power: 1 },
				target: { ...targets.self, power: 1 },
				effect: { ...effects.damage, power: 1 },
				health: 1,
				boosts: [],
				ownerIdx: 0,
			},
		],
	}

	simulate(game, { use: 0, discard: 1 })

	expect(game.events[0].effectId).toEqual('damage')
	expect(game.events[1].effectId).toEqual('damage')
	expect(game.players[0].health).toEqual(8)
})
