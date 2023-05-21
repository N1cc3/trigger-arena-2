import { createServer } from './server'

type MsgIn = {}
type MsgOut = {}

createServer<MsgIn, MsgOut>({
	onGameMsg(game, player, msg) {},
	onHost(game) {},
	onJoin(game, player, isRejoin) {},
})
