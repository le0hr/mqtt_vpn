document.querySelectorAll('.dropdown').forEach(dropdown => {
    const selected = dropdown.querySelector('.dropdown-selected');
    const options = dropdown.querySelector('.dropdown-options');
    const input = dropdown.querySelector('input');

    dropdown.addEventListener('click', () => {
        dropdown.classList.toggle('active');
    })

    options.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', (event) => {
            event.stopPropagation();
            
            options.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('selected');
            })
            option.classList.add('selected');

            selected.innerHTML = option.querySelector('p').innerHTML;
            input.value = option.dataset.value;
            dropdown.classList.remove('active');

            changeType(option.dataset.value);

            document.querySelector('.type-text h3').innerHTML = option.querySelector('p').innerHTML;
            document.querySelector('.levels h3').innerHTML = option.querySelector('p').innerHTML + " Levels";
        })
    })
})

document.addEventListener('click', (event) => {
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        if (!dropdown.contains(event.target)) {
            dropdown.classList.remove('active');
        }
    })
})

function average(list){
    return list.reduce((a, b) => a + b) / list.length;
}
function min(list){
    return list.reduce((a, b) => Math.min(a, b));
}
function max(list){
    return list.reduce((a, b) => Math.max(a, b));
}

function changeType(type){
    for(let i = 0; i < data.length; i++) {
        let color = "";
        if (data[i][type] > 300) {
            color = colors[5];
        }else{
            color = colors[Math.floor(data[i][type] / 50)];
        }
        circleList[data[i].id].setStyle({color: color, fillColor: color});
    }
    document.querySelector('.average h1').innerHTML = average(data.map(c => c[type])) + " AQI";
    document.querySelector('.min h3').innerHTML = min(data.map(c => c[type])) + " AQI";
    document.querySelector('.max h3').innerHTML = max(data.map(c => c[type])) + " AQI";
}

async function fetchData() {
    try {
        const response = await fetch('http://26.239.186.53:2000');
        const data = await response.json();
        // console.log(data);
        return data;
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
}

var colors = ["#00FF00", "#FFD700", "#FFA500", "#FF6347", "#DC143C", "#8B0000"];

// var circleList = fetchData();
var data = [
    {
        "id": 2,
        "time": "2024-02-17T18:24:00",
        "co": 27,
        "alcohol": 1,
        "co2": 13,
        "toluene": 12,
        "nh3": 6,
        "acetone": 0,
        "max": 27,
        "lat": 49.436919,
        "lng": 32.058511
    },
    {
        "id": 3,
        "time": "2024-02-17T18:24:00",
        "co": 24,
        "alcohol": 100,
        "co2": 17,
        "toluene": 8,
        "nh3": 2,
        "acetone": 4,
        "max": 24,
        "lat": 49.440919,
        "lng": 32.062511
    }];
// let data = await fetchData();
var circleList = {};

var map = L.map('map').setView([49.436919, 32.058511], 12);
// if(data.length === 0){
    // map = L.map('map').setView([49.436919, 32.058511], 12);
// }else{
//     map = L.map('map').setView([average(data.map(c => c.lat)), average(data.map(c => c.lng))], 12);
// }

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

for(let i = 0; i < data.length; i++) {
    let color = "";
    if (data[i].co > 300) {
        color = colors[5];
    }else{
        color = colors[Math.floor(data[i].co / 50)];
    }

    let circle = L.circle([data[i].lat, data[i].lng], {
        color: color,
        fillColor: color,
        fillOpacity: 0.7,
        radius: 200
    }).addTo(map);
    circle.bindPopup(`CO: ${data[i].co} AQI<br>Alcohol: ${data[i].alcohol} AQI<br>CO2: ${data[i].co2} AQI<br>Toluene: ${data[i].toluene} AQI<br>NH3: ${data[i].nh3} AQI<br>Acetone: ${data[i].acetone} AQI`);

    circleList[data[i].id] = circle;
}
document.querySelector('.average h1').innerHTML = average(data.map(c => c.co)) + " AQI";
document.querySelector('.min h3').innerHTML = min(data.map(c => c.co)) + " AQI";
document.querySelector('.max h3').innerHTML = max(data.map(c => c.co)) + " AQI";

document.querySelector('.stations p b').innerHTML = data.length;

// var circle = L.circle([49.44509904193769, 32.05674246228399], {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.7,
//     radius: 100
// }).addTo(map);
// circle.bindPopup("I am a circle.");
// circle._latlng.lat += 0.001;
// circle._latlng.lng += 0.001;
