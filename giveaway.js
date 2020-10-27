const Discord = require('discord.js')
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const { Database } = require("quickmongo");
const config = require('./config.json')
const discord = require('discord.js')
const db = new Database(config.database);  
const prefix = config.prefix; 
 db.on("ready", () => {
    console.log("Database connected!");  
  });

   
client.on('ready', () => {
 console.log("App Connected! " , client.user.tag)
 })
client.commands= new Discord.Collection();

const { join } = require('path');
const { readdirSync } = require('fs');
const { O_RDONLY, S_IFMT } = require('constants');
const { count } = require('console');
const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(join(__dirname, "commands", `${file}`));
    client.commands.set(command.name , command);
}

client.on("message", async message => {
   if(message.author.bot) return;
      if(message.channel.type === 'dm') return;
       if(message.content.startsWith(prefix)) {
          
 
          const args = message.content.slice(prefix.length).trim().split(/ +/);
  
          const command = args.shift().toLowerCase();
  
          if(!client.commands.has(command)) return;
  
          try {
              client.commands.get(command).run(client, message, args, db, prefix);
  
          } catch (error){
              console.error(error);
          }
       }
  })

// GIVEAWAY PART
// THATS NOT THE FULL VERISON IT'S ALPHA!
client.on('messageReactionAdd', async (reaction, user) => {
  console.log(user.username)
  if(user.partial) await user.fetch();
  if(reaction.partial) await reaction.fetch();
  if(reaction.message.partial) await reaction.message.fetch();
  if(user.bot) return;
  let giveawayid = await db.get(`GiveawayEmbed_${reaction.message.id}`)
  console.log(giveawayid)
  if(!giveawayid) return
  let giveawayrole = await db.get(`GiveawayRole_${reaction.message.id}`)
  if(!giveawayrole) return;
   if(reaction.message.id == giveawayid && reaction.emoji.name == `🎉`) {
      let member = reaction.message.guild.members.cache.get(user.id) 
      let embed = new Discord.MessageEmbed()
      .setThumbnail(reaction.message.guild.iconURL())
      .setTitle(`Entry Arpoved!`)
      .setDescription(`**Done!**
      
       [Go To Giveaway](https://discord.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id})
        `)
      .setTimestamp()
      .setFooter(reaction.message.guild.name , reaction.message.guild.iconURL())
      
       if(member.roles.cache.has(`${giveawayrole}`)) return user.send(embed)
if(!member.roles.cache.has(`${giveawayrole}`)) { 
  reaction.users.remove(user.id)
  return user.send(ffff);
}
 

      }
})
