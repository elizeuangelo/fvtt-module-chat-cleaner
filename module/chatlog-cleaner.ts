import { getSetting } from './settings.js';

const INTERVAL = 10000;
const DELETE_MESSAGES = [foundry.CONST.CHAT_MESSAGE_TYPES.ROLL, foundry.CONST.CHAT_MESSAGE_TYPES.OTHER];

function messageTypesToDelete() {
	if (getSetting('sensitiveMessages')) return Object.values(foundry.CONST.CHAT_MESSAGE_TYPES);
	return DELETE_MESSAGES;
}

function deleteMessages() {
	const types = messageTypesToDelete(),
		maxMessages = getSetting('maxMessages');

	const messages = game.messages!.contents;
	const exclude = messages.length - maxMessages;

	for (let i = 0; i < exclude; i++) {
		const message = messages[i];
		if (types.includes(message.type)) message.delete();
		else i--;
	}
}

setInterval(deleteMessages, INTERVAL);
