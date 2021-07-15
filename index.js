const Discord = require('discord.js')
const bot = new Discord.Client();


const { Database } = require("quickmongo");
const db = new Database(process.env.MONGODB);
bot.db = db;
const ic = '<:mythicalcoin:842637611150606356>';
db.on('ready', () => {
  console.log(`Connected`)
})



///express/////
const express = require('express');
const app = express();

app.get('/bal/:query', async (req, res) => {
const userID = req.params.query;
if(!userID) return res.status(404).send(`Please Enter an user ID to fetch data`)
let user = bot.users.cache.get(userID)
if(!user) return res.status(404).send(`Sorry, I could not find and user with this ID`)
let bal = await db.fetch(`mon_${user.id}`) || 0;
let bank = await db.fetch(`b_${user.id}`) || 0;
let profile = {
balance: bal,
bank: bank
}
res.status(200).send(profile)
})
app.get('/profile/:query', async (req, res) => {
  const userID = req.params.query;
  if(!userID) return res.status(404).send(`Please Enter an userID`)

  let user = await bot.users.fetch(userID)
  let avatatURL = user.avatarURL()
  if(!user) return res.status(404).send(`Please provide a proper userID`)
  let prestige = await db.fetch(`prestige_${user.id}`)
    if(prestige !== 'TRUE') prestige = 'No Prestige';
 let avatar =  user.avatarURL

  let money = await db.fetch(`mon_${user.id}`)
  if (money === null) money = 0;

  let med = await db.fetch(`med_${user.id}`)
  if (med === null) med = 0;

  let trophy = await db.fetch(`tro_${user.id}`)
  if (trophy === null) trophy = 0;



  let rank = await db.fetch(`rank_${user.id}`)
  if (rank === null) rank = 0;

  let bank = await db.fetch(`b_${user.id}`)
  if (bank === null) bank = 0;






  let gifted = await db.fetch(`gifts_${user.id}`)
  if (gifted === null) gifted = 0;

let betstats = await db.fetch(`betstats_${user.id}`)
if(!betstats) betstats = 0;

let bjstats = await db.fetch(`bjstats_${user.id}`)
if(!bjstats) bjstats = 0;

  let shield = await db.fetch(`capy_${user.id}`)
  if (shield === null) shield = 0;
  
let bankspace = await db.fetch(`bankspace_${user.id}`)
if(bankspace === null) bankspace = 0;

    let pet = await db.fetch(`petnick_${user.id}`)
    if(!pet) pet = 'No Pets';
    
    let profile = {
      avatar: avatarURL,
      wallet: money,
      bank: bank,
      bankspace: bankspace,
      rank: rank,
      trophy: trophy,
      medal: med,
      shield: shield,
      bjstats: bjstats,
      betstats: betstats,
      gifted_items: gifted
      
    }
    res.status(200).send(profile)
})

app.use(express.static('public'))

app.listen(3005, () => {
console.log(`------- Server Online! ----------`)
})
bot.login(process.env.TOKEN)
