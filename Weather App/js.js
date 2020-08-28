const input = document.querySelector('input');
const btn = document.querySelector('button');

const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');

const weather = document.querySelector('.weather');
const temp = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');


const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&APPID=48c836153c89cc86d2a4480afe2111b3';
const units = '&units=metric';

let $city;
let $url;

// zmienne do id pogody
let thunderIdMin = 200;
let thunderIdMax = 232;
let snowIdMin = 600;
let snowIdMax = 622;
let rainIdMin = 500;
let rainIdMax = 531;
let drizzleIdMin = 300;
let drizzleIdMax = 321;
let cloudIdMin = 801;
let cloudIdMax = 804;





const getWeather = () => {

    $city = (!input.value) ? 'New York' : input.value;
    $url = apiLink + $city + apiKey + units;

    axios.get($url)
        .then(res => {
            
            const status = Object.assign({}, ...res.data.weather);
            const temperature = res.data.main.temp;
            
            weather.textContent = status.main;
            setImage(status.id);

            temp.textContent = Math.floor(temperature) + ' °C';
            humidity.textContent = res.data.main.humidity + '%';
            cityName.textContent = res.data.name;

            warning.textContent = '';
            input.value = '';

        })
        .catch( ( () => {
            warning.textContent = 'Wpisz poprawna nazwe miasta';
            input.value = ''; }
        ))
};

function setImage(id){
    if(id >= thunderIdMin && id <= thunderIdMax){
        photo.setAttribute('src', './icons/thunderstorm.png');
    } else if(id >= snowIdMin && id <= snowIdMax) {
        photo.setAttribute('src', './icons/ice.png');
    } else if(id >= rainIdMin && id <= rainIdMax) {
        photo.setAttribute('src', './icons/rain.png');
    } else if(id >= drizzleIdMin && id <= drizzleIdMax) {
        photo.setAttribute('src', './icons/drizzle.png');
    } else if(id === 800) {
        photo.setAttribute('src', './icons/sun.png');
    } else if(id >= cloudIdMin && id <= cloudIdMax) {
        photo.setAttribute('src', './icons/cloud.png');
    } else if(id === 741){
        photo.setAttribute('src', './icons/fog.png');
    } else {
        photo.setAttribute('src', './icons/unknown.png');
    }
}

getWeather();
btn.addEventListener('click', getWeather);
input.addEventListener('keyup' , () => {
    if(event.keyCode === 13){
        getWeather();
    }
});
