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

app.get('/getObjects', (req, res) => {
let decrypt = Crypt.AES.decrypt(req.get('TOKEN').toString(), hash);
	decrypt = decrypt.toString(Crypt.enc.Utf8)
	db.collection('Accounts').doc(decrypt).get().then(q => {
		if(q.exists)
		{
			res.send(`<head>
	<meta charset="UTF-8">
	<!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
	<meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;">
	<meta http-equiv="X-Content-Security-Policy" content="default-src 'self'; script-src 'self'">
 <link rel="stylesheet" href="./monolith.min.css" style-src='unsafe-inline'/>  <!-- 'monolith' theme -->
   <link rel="stylesheet" href="./nano.min.css"/> <!-- 'nano' theme -->
	<link rel="stylesheet" type="text/css" href="./css.css" style-src='unsafe-inline'>
	<link rel="stylesheet" href="./lineawsome/css/line-awesome.min.css">
	<title>Interfata</title>
</head>
<body>
		
		<!--<div id="title-bar">
			<span id="WinTitle">Interfata</span>
			<button id="xB">X</button>
		</div>
		<div class="main">
			<div class="dropdown" status="false">
				<div class="title">
					<span id="default"><i class="las la-user-tie"></i>Marian's Licence</span>
					<span id="arrows"><i class="las la-angle-down"></i></span>
				</div>
				<div class="content">
					<ul>
						<li style='padding: 7px;'>Name: Marian Sug  Pula</li>
						<li style='padding: 7px;'>Licence type: Standard</li>
						<li style='padding: 7px;'>Server: OG-Times</li>
						<li style='padding: 7px;'>Your licence expire in: x days</li>
					</ul>
				</div>
			</div>
			<div class="dropdown" status="false">
				<div class="title">
					<span id="default"><i class="las la-wrench"></i>Aditional Options</span>
					<span id="arrows"><i class="las la-angle-down"></i></span>
				</div>
				<div class="content">
					<ul>
						<li>
							<div class="checkbox_container" data-status="false">
								<div class="checkbox"><span><i class="las la-check"></i></span></div>
								<span>Wars date</span>
							</div>
						</li>
						<li>
							<div class="checkbox_container" data-status="false">
								<div class="checkbox"><span><i class="las la-check"></i></span></div>
								<span>Count wars</span>
							</div>
						</li>
						<li>
							<div class="inputbox_container">
								<form onSubmit="return false;">
									<input type="text" target="_blank" maxlength="12" />
								</form>
								<span>File name (without extention *.txt)</span>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="outside">
			<div class="dropdown_container_small" status="false">
				<div class="title">
					<span id="default"><i class="las la-users"></i>RDT</span>
					<span id="arrows"><i class="las la-angle-down"></i></span>
					<a>Faction</a>
				</div>
				<ul class="content_small">
					<li>1</li>
					<li>2</li>
					<li>3</li>
					<li>4</li>
				</ul>
			</div>
			<div class="dropdown_container_small" status="false">
				<div class="title" style="font-size: 17.5px;">
					<span id="default"><i class="las la-archive"></i>Passed Members</span>
					<span id="arrows"><i class="las la-plus-square"></i><i class="las la-angle-down"></i></span>
				</div>
				<ul class="content_small_actions">
					<li><span>title1</span><a>X</a></li>
					<li><span>title2</span><a>X</a></li>
					<li><span>title3</span><a>X</a></li>
					<li><span>title4</span><a>X</a></li>
				</ul>
			</div>
			<button class="StartButton"><i class="las la-play"></i>Start</button>-->
		</div>

	</body>
			<script src="./renderer.js"></script>`)
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