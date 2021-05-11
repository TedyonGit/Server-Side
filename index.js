const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();
const port = 8080
const Crypt = require('crypto-js')
const fetch = require('node-fetch')
const axios = require('axios')

let hash = "4b6c4d9d79d55456a50b98de2587d2eb9e51c57a60c7ef15344dc974fc69ed9b" // ElectronAPPtedyv2ezpez

const firebase = require('firebase/app');
const FieldValue = require('firebase-admin').firestore.FieldValue;
const admin = require('firebase-admin');
const serviceAccount = require("./serviceAccountKey.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/content', (req, res) => {
	let decrypt = Crypt.AES.decrypt(req.get('TOKEN').toString(), hash);
	decrypt = decrypt.toString(Crypt.enc.Utf8)
	db.collection('Accounts').doc(decrypt).get().then(q => {
		if(q.exists)
		{
			switch(q.data().server)
			{
				case "nephrite": {
					res.send('Los Aztecas|Grove Street|Crips Gang|Ballas|Red Dragon Triads|The Russian Mafia|San Fierro Rifa|The Italian Mafia|Da Nang Boys');
					break;
				}
				case "og-times": {
					res.send('Da Nang Boys|Avispa Rifa|The Italian Mafia|Red Dragon Triads|The Ballas Family|Los Aztecas|Los Vagos|Grove Street|The Russian Mafia');
					break;
				}
				case "bugged": {

					break;
				}
				case "b-hood": {

					break;
				}
			}
		}
	})
})


app.get('/licenceInfo', (req, res) => {
	let decrypt = Crypt.AES.decrypt(req.get('TOKEN').toString(), hash);
	decrypt = decrypt.toString(Crypt.enc.Utf8)
	db.collection('Accounts').doc(decrypt).get().then(q => {
		if(q.exists)
		{
			res.send(`<i class="las la-exclamation-circle"></i>Licence expire on: ${q.data()['Expire-Date']}|<i class="las la-clipboard-check"></i>Licence type: ${q.data().Type}|<i class="las la-server"></i>Server: ${q.data().server}|<i class="las la-user-alt"></i>Name: ${q.data().Name}`)
		}
	})
})



app.get('/getAcces', (req, res) => {
	db.collection('Accounts').doc(req.get('content')).get().then(q => 
	{
		if(q.exists) {
			res.send(Crypt.AES.encrypt(req.get('content'), hash).toString())
			res.end();
		} else {
			res.statusCode = 404;
			res.end();
		}
	})
})

app.post('/sendData',(request,response) => {
	let decrypt = Crypt.AES.decrypt(request.get('TOKEN').toString(), hash);
	decrypt = decrypt.toString(Crypt.enc.Utf8)
	db.collection('Accounts').doc(decrypt).get().then(q => {
		if(q.exists)
		{
			let host;
			switch(q.data().server)
			{
				case "og-times": {
					host = 'https://earthpanel.og-times.ro/wars'
					break;
				}
				case "nephrite": {

					break;
				}
				case "b-hood": {

					break;
				}
				case "bugged": {

					break;
				}
			}
			GetWars(host)
		} else {
			response.send('nu exista')
		}
	})
});

app.post('/countWars', (req, res) => {
	res.end();
})

app.get('/', (req, res) => {
	res.statusCode = 404;
	res.end();
})

app.listen(process.env.PORT || 3000,() => {
  console.log("Started on PORT ceva");
})

/*function Decode(c)  // O functie inutila, dar, da.
{
	let d = Crypt.AES.decrypt(c, ("Tedy" + "ENC"));
	d = d.toString(Crypt.enc.Utf8)
	d = d.split('')
	d = d.filter((v,p,i) => p === 0 || v !== i[p-1])
	if(d[0] == d[d.length -1]) return d.join('').slice(0, d.length-1);
	return d.join('')
}*/

function GetWars(host)
{
	axios.get(host)
	.then(function(response) {
		let data = response.data;
		data = data.split('<')
		for(var i = 0; i < data.length; i++)
		{
			if(data[i].includes('card-block'))
			{
				//Left
				console.log(data[i+2])
				//Right
				console.log(data[i+3])
			}
		}
	})
	.catch(err => {if(err) throw err})
	.then(() => {})
}



/*

[Nephrite] [] Done
-Da Nang Boys
-The Italian Mafia
-The Russian Mafia
-Red Dragons Triads
-Ballas
-Crips Gang
-Grove Street
-Los Aztecas
-San Fierro Rifa

[B-HOOD] [] Done
-Avispa Cartel
-SF Bikers
-The Rifa
-Verdant Family
-The Ballas
-Los Vagos
-Los Aztecas
-Grove Street

[OG-Times] [] Done
-Grove Street
-The Russian Mafia
-Los Vagos
-Red Dragons Triads
-Los Aztecas
-The Ballas Family
-Da Nang Boys
-Avispa Rifa
-The Italian Mafia

[B-Zone] [] Done
-Green STreet Bloods
-Verdant Family
-Vietnamese Boys
-The Tsar Bratva
-Red Dragon Triad
-Southern Pimps
-Avispa Rifa
-69 Pier Mobs
-El Loco Cartel
*/