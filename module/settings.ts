export const SYSTEM_ID = 'chat-cleaner';

const settings = {
	sensitiveMessages: {
		name: 'Preserve Sensitive Chat Messages',
		hint: 'Preserve whispers, in-character and emote messages.',
		scope: 'world',
		config: true,
		type: Boolean,
		default: true,
	},
	maxMessages: {
		name: 'Maximum Messages in Chat Log',
		hint: 'The maximum messages you want to keep in the chat log.',
		scope: 'world',
		config: true,
		type: Number,
		default: 50,
		range: {
			min: 10,
			max: 100,
			step: 1,
		},
	},
	scrollingMessages: {
		name: 'Scrolling Buffer',
		hint: 'How many messages you want to preload in the chat log. Scrolling loads more messages.',
		scope: 'world',
		config: true,
		type: Number,
		default: 10,
		range: {
			min: 1,
			max: 100,
			step: 1,
		},
	},
} as const;

export type Settings = typeof settings;

export function getSetting<T extends keyof Settings>(name: T) {
	return game.settings.get(SYSTEM_ID, name) as unknown as ReturnType<Settings[T]['type']>;
}

Hooks.once('setup', () => {
	for (const [key, setting] of Object.entries(settings)) {
		game.settings.register(SYSTEM_ID, key, setting as unknown as any);
	}
});
