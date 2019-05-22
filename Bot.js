const Discord = require("discord.js");
const client = new Discord.Client();
const newUsers = new Discord.Collection();
var prefix = "!";
const swearWords = ["Scam", "Scammed"];

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
})

function isCommand(command, message) {
    var command = command.toLowerCase();
    var content = message.content.toLowerCase();
    return content.startsWith(prefix + command);
}

// General commands
client.on("message", (message) => {
    if (message.author.bot) return; // Dont answer yourself.
    var args = message.content.split(/[ ]+/)

    let soruce = message
    let guild = message.guild
    let channels = guild.channels
    var ruleschannel = channels.find("name", "rules")
    var general = channels.find("name", "general-chat")
    var logchannel = channels.find("name", "admin-logs")

    if (isCommand("Commands", message)) {
        message.channel.send({
            embed: {
                color: 3447003,
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL
                },
                title: "Commands list",
                description: "All commands are shown below",
                fields: [{
                        name: "Rules",
                        value: "To find out about the rules please visit #Rules"
                    },
                    {
                        name: "What is TNF BlackMarket?",
                        value: "The TNF Blackmarket is where people go to buy items and pounds with USD, Robux & Pounds, They can also contact a Market Manager to sell their items, If you have any more questions contact a Market Admin or higher"
                    },
                    {
                        name: "Is this a scam?",
                        value: "No, TNF Blackmarket is not a scam, We provide all our items at the cheapest prices possible, We have unlimited pounds & can get almost any item you need."
                    },
                    {
                        name: "How do I use the custom bot?",
                        value: "If you are wondering about the bot, Please use !commands in the bot-commands channel!"
                    }
                ],
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: "The Northern Frontier, BlackMarket"
                }
            }
        })
    } else if (isCommand("Invite", message)) {
        message.reply("Here is the invite code you have requested. https://discord.gg/AVhHkDF");
    } else if (swearWords.some(word => message.content.toLowerCase().includes(word))) {
        message.delete();
        message.reply("If you have been scammed, Please contact The TNF Blackmarket Staff team, If you have questions about if this is a scam, Feel free to check out the information channel or talk to a staff member.");
       }
    });

client.login(process.env.BOT_TOKEN);
