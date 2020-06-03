const express = require('express');

const app = express();

const cors= require('cors');

const mongoose = require('mongoose');

require('dotenv/config');

var randomstring = require('randomstring');

//Middleware
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());

const Data = require('./models/Data');

const tiny = function(string){
	return randomstring.generate(7);
};

app.post('/', (req,res,done) =>{
	//create url, store in db and send back
	console.log(req.body);
	const data = new Data({
		original_url:req.body.original_url,
		tiny_url: tiny(req.body.original_url)
	});

	data.save()
	.then(()=>{
		str ='localhost:3000/?id='+data.tiny_url;
		console.log(str);
		res.send(str);
		done();
	})
	.catch((err)=>{ 
		res.json({message: err});
	});

});

app.get('/*', (req, res, done)=>{
	//res.send('Fetch tinyurl and send back');
	var id=req.param('id');
	console.log(id);
	Data.findOne({'tiny_url': id})
	.then((url)=>{
		console.log(url.original_url);
		res.redirect(url.original_url);
		done();
	})
	.catch((err)=>{
		console.log('unable to send');
		res.send('wrong url');
	});

});


mongoose.connect( process.env.DB_CONN,{ useNewUrlParser: true } ,()=>{
	console.log('connected to db');
});

app.listen(3000);