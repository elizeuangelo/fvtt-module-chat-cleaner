import { getSetting } from './settings.js';
import { LOADING_SVG } from '../assets/loading.js';
Hooks.once('setup', () => {
    CONFIG.ChatMessage.batchSize = getSetting('scrollingMessages');
    let timer = 0;
    ChatLog.prototype._onScrollLog = function (event) {
        if (!this.rendered)
            return;
        if (ui.chat.element[0].querySelector('#chat-log').childElementCount === game.messages.size)
            return;
        if (event.target.scrollTop === 0) {
            window.clearTimeout(timer);
            display(true);
            timer = window.setTimeout(async () => {
                await this._renderBatch(this.element, CONFIG.ChatMessage.batchSize);
                display(false);
            }, 1000);
        }
    };
});
function insertLoadIcon() {
    document.querySelector('section.chat-sidebar').prepend(LOADING_SVG);
}
function display(display) {
    LOADING_SVG.style.display = display ? 'initial' : 'none';
}
Hooks.on('ready', () => {
    insertLoadIcon();
});
