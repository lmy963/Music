const http = require("http");
const url  =  require("url");
const  fs = require("fs");
const server = http.createServer((req,res)=>{
	var pathname = url.parse(req.url).pathname;
	if(pathname === "/"){
		fs.readFile("./index.html",function(err,results){
			if(!err){
				res.end(results);
			}
		})
	}
}).listen(8080,()=>{
	console.log("成功")
})