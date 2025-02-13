
/**
========================================================
========================================================

 Copyright (C) 2022.                                     
 Licensed under the  GPL-3.0 License;                    
 You may not use this file except in compliance with the License.  
 It is supplied in the hope that it may be useful                           
 * @project_name : king md                                            
 * @author : naveedbro <https://github.com/naveedbro
 * @description : king md ,A Multi-functional whatsapp bot.   
 * @version 1.3.0                                                                               
 ========================================================
 **/

const os = require('os')
const moment = require("moment-timezone")
const fs = require("fs")
const Config = require('../config')
let { fancytext, tlang, tiny, runtime, formatp, botpic, prefix, sck1 } = require("../lib");
const long = String.fromCharCode(8206)
const readmore = long.repeat(4001)
const Secktor = require('../lib/plugins')

    //---------------------------------------------------------------------------
Secktor.cmd({
            pattern: "help",
            alias: ["menu"],
            desc: "Help list",
            category: "core",
            react: "📟",
            filename: __filename
        },
        async(Void, citel, text) => {
            const { commands } = require('../lib');
            if (text.split(" ")[0]) {
                let arr = [];
                const cmd = commands.find((cmd) => cmd.pattern === (text.split(" ")[0].toLowerCase()))
                if (!cmd) return await citel.reply("*❌No Such commands.*");
                else arr.push(`*🍁Command:* ${cmd.pattern}`);
                if (cmd.category) arr.push(`*🧩Category:* ${cmd.category}`);
                if (cmd.alias) arr.push(`*🧩Alias:* ${cmd.alias}`);
                if (cmd.desc) arr.push(`*🧩Description:* ${cmd.desc}`);
                if (cmd.use) arr.push(`*〽️Usage:*\n \`\`\`${prefix}${cmd.pattern} ${cmd.use}\`\`\``);
                return await citel.reply(arr.join('\n'));
            } else {
                const cmds = {}
                commands.map(async(command, index) => {
                    if (command.dontAddCommandList === false && command.pattern !== undefined) {
                        if (!cmds[command.category]) cmds[command.category] = []
                        cmds[command.category].push(command.pattern)
                    }
                })
                const time = moment(moment())
                    .format('HH:mm:ss')
                moment.tz.setDefault('Asia/KOLKATA')
                    .locale('id')
                const date = moment.tz('Asia/Kolkata').format('DD/MM/YYYY')
                let total = await sck1.countDocuments()
                let str = `┎───═《 ${Config.botname} ❯═──⊷❍\n`
                str +=
                    '```' + `┃✦╭──────────────◆
┃✦┃ 𝙋𝙡𝙪𝙜𝙞𝙣𝙨: ${commands.length}
┃✦┃ 𝙐𝙨𝙚𝙧: ${citel.pushName}
┃✦┃ 𝙊𝙬𝙣𝙚𝙧: ${Config.ownername}
┃✦┃ 𝙋𝙧𝙚𝙛𝙞𝙭: [ ${prefix} ]
┃✦┃ 𝙈𝙚𝙢: ${formatp(os.totalmem() - os.freemem())}/${formatp(os.totalmem())}
┃✦┃ 𝘿𝙖𝙩𝙚: ${date}
┃✦┃ 𝙈𝙤𝙙𝙚: ${Config.WORKTYPE}
┃✦┃ 𝙋𝙡𝙖𝙩𝙚𝙛𝙤𝙧𝙢: King•Linux
┃✦┃ 𝙑𝙚𝙧𝙨𝙞𝙤𝙣: 1.3.0
┃✦┃ 
┃✦┃ ✦ ▍▌▌▉▏▎▌▉▐▏▌✦
┃✦┃ ✦ ▍▌▌▉▏▎▌▉▐▏▌✦
┃✦┃ 
┃✦┃ © 𝘽𝙮: ${Config.ownername}
┃✦╰━━─━─━─━━─━───◆
╰━━━━━━━━━━━──⊷✦\n
` + '```'
                for (const category in cmds) 
                {
                   str += `┎━═══⟨ *${tiny(category)}* ⟩═══━⊷❍\n┃✯╭────────────···▸\n┻✯│\n` ;
                   if(text.toLowerCase() == category.toLowerCase()){ str = `┎━═══⟨ *${tiny(category)}* ⟩═══━⊷❍\n┃✯╭────────────···▸\n┻✯│\n` ;      
                        for (const plugins of cmds[category]) { str += `│✯│◦➛ ${fancytext(plugins,1)}\n` ; }
                        str += `┳✯│\n┃✯╰────────────···▸\n╰━═════════════━⊷❍\n`  ;
                        break ;
                   }
                   else { for (const plugins of cmds[category]) { str += `│✯│◦➛ ${fancytext(plugins,1)}\n` ; }
                         str += `┳✯│\n┃✯╰────────────···▸\n╰━═════════════━⊷❍\n`  ; 
                   }
  
                }
                str+= `🔥 ${Config.botname}  🎯`
          let buttonMessaged = {
              text: str,
              contextInfo: {
                  externalAdReply: {
                  showAdAttribution: true,
                      title: Config.botname,
                      body: Config.ownername,
                      renderLargerThumbnail: true,
                      thumbnailUrl: await THUMB_IMAGE,
                      thumbnail: '',
                      mediaType: 1,
                      mediaUrl: '',
                      sourceUrl: `https://whatsapp.com/channel/0029Va66s2IJENxvTJjUtM1w`,
                  },
              },
          };
        return await Void.sendMessage(citel.chat, buttonMessaged, {
            quoted: citel,
        });
          }
        })
    //---------------------------------------------------------------------------
Secktor.cmd({
            pattern: "list",
            desc: "list menu",
            category: "general"
        },
        async(Void, citel) => {
            const { commands } = require('../lib');
            let str = `
┏━━━━━•❃〘 ${Config.botname} 〙❃•━━━━━┓`
            str += `
┗━━━━━━━━━━•••\n`
for (let i = 0; i < commands.length; i++) 
{
     if(commands[i].pattern==undefined) continue
     str +=       `✰ ${i+1} *${fancytext(commands[i].pattern,1)}*\n` 
      if (commands[i].desc === undefined) commands[i].desc = "";
      str += `✰ ${fancytext(commands[i].desc, 1)}\n`
}
          let buttonMessaged = {
              text: str,
              contextInfo: {
                  externalAdReply: {
                  showAdAttribution: true,
                      title: Config.botname,
                      body: Config.ownername,
                      renderLargerThumbnail: true,
                      thumbnailUrl: await THUMB_IMAGE,
                      thumbnail: '',
                      mediaType: 1,
                      mediaUrl: '',
                      sourceUrl: `https://whatsapp.com/channel/0029Va66s2IJENxvTJjUtM1w`,
                  },
              },
          };
        return await Void.sendMessage(citel.chat, buttonMessaged);
        }
    )
    //---------------------------------------------------------------------------
Secktor.cmd({
        pattern: "owner",
        desc: "To find owner number",
        category: "core",
        react: "💜",
        filename: __filename
    },
    async(Void, citel) => {
        const Config = require('../config')
        const vcard = 'BEGIN:VCARD\n' +
            'VERSION:3.0\n' +
            'FN:' + Config.ownername + '\n' +
            'ORG:;\n' +
            'TEL;type=CELL;type=VOICE;waid=' + owner[0] + ':+' + owner[0] + '\n' +
            'END:VCARD'
        let buttonMessaged = {
            contacts: { displayName: Config.ownername, contacts: [{ vcard }] },
            contextInfo: {
                externalAdReply: {
                showAdAttribution: true,
                    title: Config.ownername,
                    body: 'Touch here.',
                    renderLargerThumbnail: true,
                    thumbnailUrl: await THUMB_IMAGE,
                    thumbnail: '',
                    mediaType: 2,
                    mediaUrl: '',
                    sourceUrl: `https://wa.me/+` + owner[0] + '?text=Hii bro,I am ' + citel.pushName,
                },
            },
        };
        return await Void.sendMessage(citel.chat, buttonMessaged, {
            quoted: citel,
        });

    }
)

Secktor.cmd({
    pattern: "core",
    desc: "to get extact name where that command is in repo.\nSo user can edit that.",
    category: "general",
    react: "✨",
    filename: __filename
},
async(Void, citel, text) => {
 const { commands } = require('../lib');
 let arr = [];
        const cmd = commands.find((cmd) => cmd.pattern === (text.split(" ")[0].toLowerCase()))
        if (!cmd) return await citel.reply("*❌No Such commands.*");
        else arr.push(`*🍁Command:* ${cmd.pattern}`);
        if (cmd.category) arr.push(`*🧩Type:* ${cmd.category}`);
        if(cmd.filename) arr.push(`✨FileName: ${cmd.filename}`)
        return citel.reply(arr.join('\n'));


})
  
