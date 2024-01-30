const fs = require('fs');
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { getGroups, robloxUsertoID, getDate, err, getUserInfoFromId } = require('../../modules/helperFunctions')
let json = {};
const filepath = '../../cache.json';
const { blacklistedGroups } = require('../../../config.json');
/* A way to update the bot in a simple command. */
module.exports = {
	data: new SlashCommandBuilder()
		.setName('findusergroupsinblacklist')
		.setDescription('Command to find if users are in blacklisted groups. IF BOT DOESN\'T TO SAY "Done!" THEN TRY AGAIN!')
        .addStringOption(option =>
			option
				.setName('users')
				.setDescription('User(s) to check from, use a space to separate them.')
				.setRequired(false))
        .addStringOption(option =>
            option
                 .setName('ids')
                .setDescription('Ids(s) to check from, use a space to separate them.')
                .setRequired(false))
		.setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
	async execute(interaction) {
        await interaction.deferReply();
		await interaction.editReply('Finding groups and spotting blacklisted ones, please stand-by!');
		console.log(`Command getrobloxlog begun on ${await getDate()} by ${interaction.user.username}.`);
        const users = (interaction.options.getString('users') ? interaction.options.getString('users').split(' ') : []);
        const ids = (interaction.options.getString('ids') ? interaction.options.getString('ids').split(' ') : []);
        const badGroups = await blacklistedGroups.split(',')
        let robloxUsers = [undefined]
        // variables/arguments
        robloxUsers = await robloxUsertoID(users).catch(error => err(interaction, error))
        console.log(robloxUsers)
        const allRobloxIds = []
        for (const userData of robloxUsers.data) {
            allRobloxIds.push(userData.id)
        }
        for (const id of ids) {
            allRobloxIds.push(Number(id))
        }
        for (const id of allRobloxIds) {
            let blacklistedFound = false
            const groups = await getGroups(id).catch(error => err(interaction, error));
            const userInfo = await getUserInfoFromId(id).catch(error => err(interaction, error));
            console.log(groups)
            for (const groupData of groups.data) {
                if (badGroups.includes(groupData.group.id.toString())) {
                    blacklistedFound = true
                    break
                }
            }
            if (blacklistedFound == true) {
                interaction.followUp(`**Found blacklisted group** in groups of user **${userInfo.name}**!`)
            }
            else {
                interaction.followUp(`**No blacklisted groups found** in groups of user **${userInfo.name}**!`)
            }
        }

        interaction.followUp('Done!')
	},
};