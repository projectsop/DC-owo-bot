/*
 * OwO Bot for Discord
 * Copyright (C) 2021 Christopher Thai
 * This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 * For more information, see README.md and LICENSE
 */

exports.name = 'Grab Emojis';

exports.handle = async function (interaction) {
	let content = '';
	const messages = interaction.packet.data.resolved.messages;
	for (let id in messages) {
		const msg = messages[id];
		content += msg.content;
		content += JSON.stringify(msg.embeds);
		content += JSON.stringify(msg.reactions);
		if (msg.reactions?.length) {
			msg.reactions.forEach((reaction) => {
				const emoji = reaction.emoji;
				content += `<${emoji.animated ? 'a' : ''}:${emoji.name}:${emoji.id}>`;
			});
		}
		if (msg.sticker_items?.length) {
			msg.sticker_items.forEach((sticker) => {
				content += `<s:${sticker.name}:${sticker.id}>`;
			});
		}
	}

	interaction.args = [content];
	interaction.command = 'emoji';

	this.command.executeInteraction(interaction);
};
