document.getElementById('search-button').addEventListener('click',performaction)
let i=0;
function performaction(e){
 const city=document.getElementById('input').value;
   getweatherdata(city)
   .then(function(data){
      const feeling=document.getElementById('input-text').value;
      sendweatherdata('/sendweatherdata',{
        name:data.name,
        temp:data.temp,
    min_temp:data.min_temp,
    max_temp:data.max_temp,
    main:data.main,
    feeling:feeling,
      });
   } )
   .then(
    updateUI);
}

const getweatherdata = async (city)=>{
     const response= await fetch(`/addweatherdata/${encodeURIComponent(city)}`)
    //const response=await fetch("api.openweathermap.org/data/2.5/forecast?q=jaipur&appid=5b3f556adb4a2ae3aec7659b3cb25f41");
   
    try{
        const data= await response.json();
       // console.log(data);
       // console.log(data);
      // document.querySelector('.temperature').innerHTML=Math.round(data.temp)+`&deg;<sup>c</sup>`;
        console.log(data);
        return data;
    }
    catch(error)
    {
        console.log("error",error);
    }
}

const sendweatherdata = async(url='',data={})=>{
    const response= await fetch(url,{
        method:'POST',
        credentials:'same-origin',
        headers: {
          'Content-Type':'application/json',
        },
        body:JSON.stringify(data),  
      })
      try{
        const newdata=await response.json();
        console.log(newdata);
        return newdata;
      }
      catch(error)
      {
        console.log("error",error);
      }
    }
const updateUI=async ()=>{
    const response = await fetch('/all')
    try{
        const alldata= await response.json()
        document.querySelector('.city-name').innerHTML=alldata[i].name;
        document.querySelector('.temperature').innerHTML=alldata[i].temp;
        document.querySelector('.min-max-temp').innerHTML=`${alldata[i].min_temp}&deg;/${alldata[i].max_temp}&deg;`;
        switch(alldata[i].main)
        {
            case "Haze":
                document.querySelector('.city-container img').src="images/amcharts_weather_icons_1.0.0/animated/thunder.svg";
                break;
        }
        i++;

    }
    catch(error){
        console.log("error",error);
    }
}