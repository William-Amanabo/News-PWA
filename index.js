const express = require("express")
const app = express()
const path = require('path')
const port = 8000;
app.listen(port,function (err){
	if(err){
		console.log("error while serving file")
	}else{
		console.log("server running on port 8000")
	}
})
app.get('/',(req,res)=>{
	res.sendFile(path.join(__dirname + '/index.html'))
})