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
    dt:data.dt,
    sunrise:data.sunrise,
    sunset:data.sunset,
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
    const isDayTime=(dt,sunrise,sunset)=>{
        const currentTimestamp = dt; // Assuming `data` is the fetched weather data object
  const sunriseTimestamp = sunrise;
  const sunsetTimestamp = sunset;

  // Convert timestamps to milliseconds
  const currentDateTime = new Date(currentTimestamp * 1000);
  const sunriseDateTime = new Date(sunriseTimestamp * 1000);
  const sunsetDateTime = new Date(sunsetTimestamp * 1000);

  return currentDateTime > sunriseDateTime && currentDateTime < sunsetDateTime;
    }
const updateUI=async ()=>{
    const response = await fetch('/all')
    try{
        const alldata= await response.json()
        document.querySelector('.city-name').innerHTML=alldata[i].name;
        document.querySelector('.temperature').innerHTML=alldata[i].temp;
        document.querySelector('.min-max-temp').innerHTML=`${alldata[i].min_temp}&deg;/${alldata[i].max_temp}&deg;`;
        const timestamp = alldata[i].dt; // Assuming `data` is the fetched weather data object
        const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
        const day = date.getDate();

            document.querySelector('#date').innerHTML=`Date: ${year}-${month}-${day}`;
            document.querySelector('#feel').innerHTML=`feel:${alldata[i].feeling}`;

        if(isDayTime(alldata[i].dt,alldata[i].sunrise,alldata[i].sunset))
        {
        switch(alldata[i].main)
        {
            case "Haze":
                document.querySelector('.city-container img').src="images/amcharts_weather_icons_1.0.0/animated/cloudy.svg";
                document.querySelector('.city-container').style.backgroundImage="url(images/hazeday.jpg)"
                break;
            case "Thunderstorm":
                document.querySelector('.city-container img').src="images/amcharts_weather_icons_1.0.0/animated/thunder.svg";
                document.querySelector('.city-container').style.backgroundImage="url(images/thunderstormday.jpg)"
                break;
            case "Drizzle":
                document.querySelector('.city-container img').src="images/amcharts_weather_icons_1.0.0/animated/rainy-6.svg";
                document.querySelector('.city-container').style.backgroundImage="url(images/Drizzleday.jpg)"
                break;
            case "Rain":
                document.querySelector('.city-container img').src="images/amcharts_weather_icons_1.0.0/animated/rainy-7.svg";
                document.querySelector('.city-container').style.backgroundImage="url(images/rainday.jpg)"
                break;
            case "Clear":
                document.querySelector('.city-container img').src="images/amcharts_weather_icons_1.0.0/animated/day.svg";
                document.querySelector('.city-container').style.backgroundImage="url(images/clearday.jpg)"
                break;
            case "Clouds":
                document.querySelector('.city-container img').src="images/amcharts_weather_icons_1.0.0/animated/cloudy.svg";
                document.querySelector('.city-container').style.backgroundImage="url(images/clouds-and-sun.png))"
                break;
            case "Snow":
                document.querySelector('.city-container img').src="images/amcharts_weather_icons_1.0.0/animated/snowy-3.svg";
                document.querySelector('.city-container').style.backgroundImage="url(images/snowday.jpg)"
                break;
            default :
                document.querySelector('.city-container img').src="images/haze.png";
                document.querySelector('.city-container').style.backgroundImage="url(images/hazeday.jpg)"
                break;
        }
    }
      else{
        switch(alldata[i].main)
        {
            case "Haze":
                document.querySelector('.city-container img').src="images/amcharts_weather_icons_1.0.0/animated/cloudy-night-1.svg";
                document.querySelector('.city-container').style.backgroundImage="url(images/hazenight.jpg)"
                break;
            case "Thunderstorm":
                document.querySelector('.city-container img').src="images/amcharts_weather_icons_1.0.0/animated/thunder.svg";
                document.querySelector('.city-container').style.backgroundImage="url(images/thunderstormnight.jpg)"
                break;
            case "Drizzle":
                document.querySelector('.city-container img').src="images/amcharts_weather_icons_1.0.0/animated/rainy-6.svg";
                document.querySelector('.city-container').style.backgroundImage="url(images/Drizzlenight.jpg)"
                break;
            case "Rain":
                document.querySelector('.city-container img').src="images/amcharts_weather_icons_1.0.0/animated/rainy-7.svg";
                document.querySelector('.city-container').style.backgroundImage="url(images/rainnight.jpg)"
                break;
            case "Clear":
                document.querySelector('.city-container img').src="images/amcharts_weather_icons_1.0.0/animated/night.svg";
                document.querySelector('.city-container').style.backgroundImage="url(images/clearnight.jpg)"
                break;
            case "Clouds":
                document.querySelector('.city-container img').src="images/amcharts_weather_icons_1.0.0/animated/cloudy.svg";
                document.querySelector('.city-container').style.backgroundImage="url(images/clouds-and-sun.png))"
                break;
            case "Snow":
                document.querySelector('.city-container img').src="images/amcharts_weather_icons_1.0.0/animated/snowy-3.svg";
                document.querySelector('.city-container').style.backgroundImage="url(images/snownight.jpg)"
                break;
            default :
                document.querySelector('.city-container img').src="images/haze.png";
                document.querySelector('.city-container').style.backgroundImage="url(images/hazenight.jpg)"
                break;
        }
      }
        i++;

    }
    catch(error){
        console.log("error",error);
    }
}