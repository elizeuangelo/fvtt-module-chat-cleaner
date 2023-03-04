import './module/settings.js';
import('./module/scrolling-buffer.js');

Hooks.once('ready', () => {
	if (game.user!.isGM) import('./module/chatlog-cleaner.js');
});
