const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();
const port = 8080
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
					"content": `<div class="dropdown">
         				<ul class="default_option">
         					<li>
         						<div class="option">
         							<p>None</p>
         						</div>
         					</li>
         				</ul>
         				<ul class="select_dropdown">
         					<li> 
         						<div class="option RDT">
         							<p>RDT</p>
         						</div>
         					</li>
         					 <li> 
         						<div class="option DNB">
         							<p>DNB</p>
         						</div>
         					</li>
         					<li> 
         						<div class="option BLS">
         							<p>BLS</p>
         						</div>
         					</li>
         					<li> 
         						<div class="option GRV">
         							<p>GRV</p>
         						</div>
         					</li>
         				</ul>
         			</div>
				</div>`
					})
					res.send(stuff)
					res.end();
					break;
				}
				case "&": {
					let stuff = JSON.stringify({
					"title": "Interface Editor",
					"content": `
<div id="Elements">
<div id="ColorPickerButton" data-target="content"></div>
<label>Content</label>
</div>
<div id="Elements">
<div id="ColorPickerButton" data-target="title-bar"></div>
<label>Title Bar</label>
</div>
<div id="Elements">
<div id="ColorPickerButton" data-target="buttons"></div>
<label>Buttons</label>
</div>
<div id="Elements" style="width: 70px;">
<div id="ColorPickerButton" data-target="text"></div>
<label>Text</label>
</div>
`
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
	let decrypt = Crypt.AES.decrypt(req.get('TOKEN').toString(), hash);
	decrypt = decrypt.toString(Crypt.enc.Utf8)
	if(req.body.Color != undefined && req.body.Data != undefined)
	{
		db.collection('Interface').doc(decrypt).get().then(q => {
			if(q.exists)
			{
				switch(req.body.Data)
				{
					case "content": {
						db.collection('Interface').doc(decrypt).update({
							"content": req.body.Color
						})
						break;
					}
					case "title-bar": {
						db.collection('Interface').doc(decrypt).update({
							"title-bar": req.body.Color
						})
						break;
					}
					case "buttons": {
						db.collection('Interface').doc(decrypt).update({
							"buttons": req.body.Color
						})
						break;
					}
					case "text": {
						db.collection('Interface').doc(decrypt).update({
							"text": req.body.Color
						})
						break;
					}
				}
			} else {
				db.collection('Interface').doc(decrypt).set({
					"title-bar": req.body.Color,
					"buttons": req.body.Color,
					"content": req.body.Color,
					"text": req.body.Color
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
				let main = q.data();
				res.send(JSON.stringify({
					"content": `${q.data().content}`,
					"title-bar": `${q.data()['title-bar']}`,
					"buttons": `${q.data().buttons}`,
					"text": `${q.data().text}`
				}))
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
	res.statusCode = 404;
	res.end();
})

app.listen(process.env.PORT || 3000,() => {
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