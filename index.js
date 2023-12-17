//instagram page with EJS in views and CSS & JS in public

//npm init -y: for package.json
//installed packages: express, EJS-> npm install express/EJS (both)

const express=require("express");   //requiring express, it return a value i.e. express()
const app=express();    //storing express() in app
const path=require("path"); //'path' package: provides a way of working with directories and file paths

//nodemon indes.js: starts the server   //Ctrl+C to stop
let port=8080;  //connection point- logical endpoints of network connection b/w web server and web client
app.listen(port,()=>{   //use to start the server- listens to incomming API request
    console.log(`listning on port ${port}`);
});
//localhost:8080-> on brouser to send API request to port 8080

//serving static files: 'public' folder or its subfolder will serve all static files like CSS, JS
app.use(express.static(path.join(__dirname,"/public/css")));    //do require 'path' package first
app.use(express.static(path.join(__dirname,"/public/js")));

app.set("view engine","ejs");   //view-> template, view/template engine-> ejs //setting 'view engine' to 'ejs'
app.set("views",path.join(__dirname,"/views"));
//'path.join'-> use to join two paths, '__dirname'-> current directory where server is running form

app.get("/ig/:username",(req,res)=>{//routing- localhost:8080/ig/(variable)
                                    //:username is a variable i.e. path parameter, it will be saved in req object
    // console.log(req.params)  //prints all incoming values path parameter as an object
    // let {username}=req.params;   //store :username(path parameter)
    // let followers=["adam","eve","mark","jene"];
    // console.log(username);
    // res.render("instagram.ejs",{username,followers});    //EJS will be able to use this object

    let {username}=req.params;  //storing requested ':username'
    const instaData=require("./data.json"); //requiring JSON file which contains data of all the users
    const data=instaData[username]; //storing data only for specific/requested user
    // console.log(data);
    if(data){
        res.render("instagram.ejs",{data}); //EJS will be able to use this object i.e. data of the user
    }                                       //render EJS as a response to client
    else{
        res.render("error.ejs"); //if user not found in JSON
    }
});