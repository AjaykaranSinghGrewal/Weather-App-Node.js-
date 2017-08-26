const api = "c3f32d238e76d4d4";
const https = require('https');
const http = require('http');

function printError(error){
    console.error(error);
}

function printTemperature(location, temp){
    const message = "The temperature at " +location+ " is " + temp;
    console.log(message);
}

function getWeather(location){
    try{
        const request = http.get('http://api.wunderground.com/api/c3f32d238e76d4d4/conditions/q/' + location +'.json', (response) => {
           if(response.statusCode === 200){
               let body = "";
               
               response.on('data', (data) =>{
                  body += data; 
               });
               
               response.on('end', () =>{
                   try{
                       const tapmaan = JSON.parse(body);
                       printTemperature(location, tapmaan.current_observation.temperature_string);
                   } catch (error){
                        printError(error);
                    }
                   /*console.log(body);*/
               });
           } else{
               printError(error);
           }
        });
        
        request.on('error', (error) => {
            console.error("OOPS!! " +error); 
            });
        } catch (error){
            printError(error);
        }
    }

const loc = process.argv.slice(2).join("_").replace(" ", "_");
getWeather(loc);