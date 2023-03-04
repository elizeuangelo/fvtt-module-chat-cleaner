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
            display(this, true);
            timer = window.setTimeout(async () => {
                const chatLogs = [ui.chat, ...Object.values(ui.windows).filter((i) => i.title === 'Chat Log')];
                for (const chatLog of chatLogs) {
                    await chatLog._renderBatch(chatLog.element, CONFIG.ChatMessage.batchSize);
                }
                display(this, false);
            }, 1000);
        }
    };
});
function insertLoadIcon(html) {
    const node = LOADING_SVG.cloneNode(true);
    if (html.nodeName === 'SECTION')
        html.prepend(node);
    else
        html.querySelector('section.chat-sidebar').prepend(node);
    return node;
}
function display(chatLog, display) {
    chatLog.LOADING_SVG.style.display = display ? 'initial' : 'none';
}
Hooks.on('renderChatLog', (chatLog, html, data) => {
    chatLog.LOADING_SVG = insertLoadIcon(html[0]);
    if (chatLog.popOut) {
        const diff = ui.chat.element[0].querySelector('#chat-log').childElementCount - CONFIG.ChatMessage.batchSize;
        if (diff > 0)
            chatLog._renderBatch(chatLog.element, diff);
    }
});
