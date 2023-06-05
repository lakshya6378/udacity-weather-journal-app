const express = require("express")
 const app = express()
 const bodyParser = require("body-parser")
 app.use(bodyParser.urlencoded({extended: false}));
 app.use(bodyParser.json());
 const cors = require("cors");
 app.use(cors());
 app.use(express.static('website'));
 const port=8000;
 const projectData={
    name:"",
    temp:0,
    min_temp:0,
    max_temp:0,
    main:"",
    dt:0,
    sunrise:0,
    sunset:0,
 };
 const asyncfunction=async (city)=>{
    const key="5b3f556adb4a2ae3aec7659b3cb25f41";
    
    const baseurl1="https://api.openweathermap.org/data/2.5/weather?q=";
    const response1= await fetch(`${baseurl1}+${city}&appid=${key}&units=metric`);
    const baseurl2="https://api.openweathermap.org/data/2.5/forecast?q=";
    const response2= await fetch(`${baseurl2}${city}&appid=${key}&units=metric`);
    try{
        const data1= await response1.json();
        const data2= await response2.json();
        console.log(data1);
        console.log(data2);
        projectData.name=data1.name;
      projectData.temp=data1.main.temp;
      projectData.min_temp=data1.main.temp_min;
      projectData.max_temp=data1.main.temp_max;
      projectData.main=data1.weather[0].main;
      projectData.dt=data1.dt;
      projectData.sunrise=data1.sys.sunrise;
      projectData.sunset=data1.sys.sunset;
      return projectData;
    }
    catch(error){
        console.log("error",error)
    }
    //const data=[data1,data2];
   
 }
 const adddata= async (req,res)=>{
    const city=req.params.city;
    const data= await asyncfunction(city);
    console.log(data);
    res.send(data);
 }
 const weatherData=[];
 const senddata=(req,res)=>{
    const newEntry={
        name:req.body.name,
        temp:req.body.temp,
        min_temp:req.body.min_temp,
        max_temp:req.body.max_temp,
        main:req.body.main,
        dt:req.body.dt,
        sunrise:req.body.sunrise,
        sunset:req.body.sunset,
        feeling:req.body.feeling,

    }
    weatherData.push(newEntry);
    res.send(weatherData);
 }
 const updatedata= (req,res)=>{
    res.send(weatherData);
 }

 
 app.get('/addweatherdata/:city',adddata);
 app.post('/sendweatherdata',senddata);
 app.get('/all',updatedata);

 const server = app.listen(port,listening);
 function listening(){
    console.log("server is running");
    console.log(`running on http://localhost:${port}`);
 };
 
 
