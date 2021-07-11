const Discord = require('discord.js')
const bot = new Discord.Client();


const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://GentleScreamer:Piku2007@cluster0.wofjo.mongodb.net/jelly?retryWrites=true&w=majority"); 
bot.db = db;
const ic = '<:mythicalcoin:842637611150606356>';
 

///express/////
const express = require('express');
const app = express();
app.get('/user/:query', async (req, res) => {
const userID = req.params.query;
if(!userID) return res.status(404).send(`Please Enter an user ID to fetch data`)
let user = bot.users.cache.get(userID)
if(!user) return res.status(`Sorry, I could not find and user with this ID`)
let bal = await db.fetch(`mon_${user.id}`) || 0;
let bank = await db.fetch(`b_${user.id}`) || 0;
let profile = {
balance: bal,
bank: bank
}
res.status(200).send({ profile })
})

app.listen(3005, () => {
console.log(`------- Server Online! ----------`)
})
bot.login(process.env.TOKEN)
