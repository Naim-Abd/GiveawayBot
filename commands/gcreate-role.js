 
 const Discord = require("discord.js")
 const ms = require('ms')
const pretty = require('pretty-ms')
 module.exports = {
    name: "gcreate-role",
    description: "Role Giveaway Command",
    run: async (client, message, args, db, prefix) => {
 let channel = message.mentions.channels.first()
 if(!channel) return message.channel.send(`**${prefix}gcreate <channel> <Role> <time> <Prize>**`)
 let channelcheck = message.guild.channels.cache.find(x => x.name == `${channel.name}`)
 if(!channelcheck) return message.channel.send(`that channel is invaild.`)
  let role = message.mentions.roles.first();
 if(!role) return message.channel.send(`**${prefix}gcreate ${channel} <Role> <time> <Prize>**`)
 let rolecheck = message.guild.roles.cache.find(x => x.name == `${role.name}`)
 if(!rolecheck) return message.channel.send(`This invaild Role..`)
 if(!args[2]) return message.channel.send(`**${prefix}gcreate ${channel} ${role.name} <time> <Prize>**
 
 __1d,2h,1m,1s__`)
 let prize = message.content.split(' ').slice(4).join(' ');

if(!prize) return message.channel.send(`**${prefix}gcreate ${channel} ${role.name} ${args[2]} <Prize>**`)

channel.send(`:tada: :tada: **GIVEAWAY** :tada: :tada:`).then(o => {
db.set(`giveawaymsg_${o.id}`, o.id)
let giveawayEmbed = new Discord.MessageEmbed()
.setTitle(prize)
.setDescription(`
React With 🎉 To Enter The Giveaway
Must Have **${role.name}** Role To Enter!
Ends After ${pretty(ms(args[2]))} 
Hosted By: ${message.author}
`)
.setFooter(message.guild.name , message.guild.iconURL())
.setTimestamp()
console.log(ms(args[2]))
channel.send(giveawayEmbed).then(async giveaway =>  {
    db.set(`GiveawayEmbed_${giveaway.id}`,giveaway.id)
    db.set(`GiveawayRole_${giveaway.id}`, role.id)
   giveaway.react(`🎉`)
   console.log(ms(args[2]))
db.set(`giveawaytimer_${o.id}`, ms(args[2]))
   var giveAwayCut = setInterval(async function() {
 await db.subtract(`giveawaytimer_${o.id}`, 5000)
let ends = await db.get(`giveawaytimer_${o.id}`)
let okay = ends - 5000
let edittimer = new Discord.MessageEmbed()
.setTitle(prize)
.setDescription(`
React With 🎉 To Enter The Giveaway
Must Have **${role.name}** Role To Enter!
Ends After ${pretty(okay)}
`)
.setFooter(message.guild.name , message.guild.iconURL())
.setTimestamp()
await giveaway.edit(edittimer)


},5000)
   setTimeout(async function(){
                  let users = await giveaway.reactions.cache.get("🎉").users.fetch();
                  let list = users.array().filter(u => u.id !== client.user.id);
                  let gFilter = list[Math.floor(Math.random() * list.length) + 0]
                  let member = message.guild.members.cache.get(gFilter.id) 
 if(!member.roles.cache.has(role.id)) {
    let gFilter = list[Math.floor(Math.random() * list.length) + 0]
  }
                  if(!gFilter) gFilter =" No One Won"
o.edit(`:tada: :tada: **GIVEAWAY ENDED** :tada: :tada:`)
let editembed = new Discord.MessageEmbed()
 .setDescription(`
 Winners: ${gFilter}
 `)
.setFooter(message.guild.name , message.guild.iconURL())
.setTimestamp()
 giveaway.edit(editembed)
db.delete(`GiveawayEmbed_${giveaway.id}`)
db.delete(`GiveawayRole_${giveaway.id}`)
db.delete(`giveawaytimer_${o.id}`)
clearInterval(giveAwayCut);
giveaway.edit(editembed);
await clearInterval(giveAwayCut);
await giveaway.edit(editembed);

 }, ms(args[2]));
 
 })
})
}}
