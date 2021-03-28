const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();
const port = 3000
const Crypt = require('crypto-js')

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

app.get('/getChilds', (req, res) => {
let decrypt = Crypt.AES.decrypt(req.get('TOKEN').toString(), hash);
	decrypt = decrypt.toString(Crypt.enc.Utf8)
	db.collection('Accounts').doc(decrypt).get().then(q => {
		if(q.exists)
		{
			switch(req.get('Element'))
			{
				case "*": {
					let stuff = JSON.stringify({
					"title": "Evidentiator",
					"content": `          <select name="cars" id="cars">
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="mercedes">Mercedes</option>
  <option value="audi">Audi</option>
</select>`
					})
					res.send(stuff)
					res.end();
					break;
				}
				case "&": {
					let stuff = JSON.stringify({
					"title": "Interface Editor",
					"content": `          <select name="cars" id="cars">
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="mercedes">Mercedes</option>
  <option value="audi">Audi</option>
</select>`
					})
					res.send(stuff)
					res.end();
					break;
				}
				case "F": {
					let stuff = JSON.stringify({
					"title": "Spammer",
					"content": `          <select name="cars" id="cars">
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="mercedes">Mercedes</option>
  <option value="audi">Audi</option>
</select>`
					})
					res.send(stuff)
					res.end();
					break;
				}
				case "%": {
					let stuff = JSON.stringify({
					"title": "Options",
					"content": `          <select name="cars" id="cars">
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="mercedes">Mercedes</option>
  <option value="audi">Audi</option>
</select>`
					})
					res.send(stuff)
					res.end();
					break;
				}
			}
		}
	})
})

app.post('/setInterface', (req, res) => {
	console.log(req.body.GlobalColor)
	let decrypt = Crypt.AES.decrypt(req.get('TOKEN').toString(), hash);
	decrypt = decrypt.toString(Crypt.enc.Utf8)
	if(req.body.GlobalColor != undefined)
	{
		db.collection('Interface').doc(decrypt).get().then(q => {
			if(q.exists)
			{
				db.collection('Interface').doc(decrypt).update({
					"GlobalColor": req.body.GlobalColor
				})
			} else {
				db.collection('Interface').doc(decrypt).set({
					"GlobalColor": req.body.GlobalColor
				})
			}
		})
	}
})

app.get('/getInterface', (req, res) => {
	let decrypt = Crypt.AES.decrypt(req.get('TOKEN').toString(), hash);
	decrypt = decrypt.toString(Crypt.enc.Utf8)
	if(req.get('TOKEN').toString().length > 1)
	{
		db.collection('Accounts').doc(decrypt).get().then(q => {if(!q.exists) return;});
		db.collection('Interface').doc(decrypt).get().then(q => {
			if(q.exists)
			{
				res.send(q.data().GlobalColor);
				res.end();
			}
		})
	}
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
	console.log(request.headers.TOKEN)
	if(request.body.TOKEN != undefined)
	{
		db.collection('Accounts').doc(request.body.Data).get().then(q => {
			if(q.exists)
			{
				response.send(q.data().Name);
			} else {

			}
		})
	} else {
		console.log('I-am dat 404')
		response.statusCode = 404;
		response.end();
	}
});

app.post('/countWars', (req, res) => {
	res.end();
})

app.get('/', (req, res) => {
	res.send('A mers.');
})

app.listen(port,() => {
  console.log("Started on PORT 3000");
})

function Decode(c)
{
	let d = Crypt.AES.decrypt(c, ("Tedy" + "ENC"));
	d = d.toString(Crypt.enc.Utf8)
	d = d.split('')
	d = d.filter((v,p,i) => p === 0 || v !== i[p-1])
	if(d[0] == d[d.length -1]) return d.join('').slice(0, d.length-1);
	return d.join('')
}