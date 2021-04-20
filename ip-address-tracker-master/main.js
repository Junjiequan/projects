//selectors
const ipOutput = document.querySelector('[data-id = "ip"]').childNodes[3];
const cityOutput = document.querySelector('[data-id = "location"]').childNodes[3];
console.log(cityOutput)
const timeOutput = document.querySelector('[data-id = "timezone"]').childNodes[3];
const ispOutput = document.querySelector('[data-id = "isp"]').childNodes[3];
const loading = document.querySelector('.map__loading');
const form = document.querySelector('form');
const input = document.querySelector('input[type=text]');
const ipReg = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
//functions
async function init(ip) {
    try{
        const res = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_UTDYv4fFYO4pdElyoGoCeSGOn1FB2&ipAddress=${ip}`);
        if(!res.ok)
            throw new Error('Invalid IP address');
        data = await res.json();
        displayData(data);
        isLoading();
    } catch(err){
        input.setAttribute('id', 'invalid');
        input.value = `${err}`
    }
}
init('');  // <<<<<<<<<<init

// loading animation
const isLoading =()=>{
    if(loading.style.display != 'flex'){
        loading.style.display = 'flex'
        setTimeout(()=>{
            loading.style.opacity = '1'
        },100);
    }else{
        setTimeout(()=>{
            loading.style.opacity = '0';
            setTimeout(()=> loading.style.display = 'none',500)
        },1000)
    };
}

let mymap = null;

const displayData = (data)=>{
    ipOutput.innerText = data.ip;
    cityOutput.innerHTML = `<p>${data.location.city} <br>${data.location.postalCode}</p>`;
    timeOutput.innerText = data.location.timezone;
    ispOutput.innerText = data.isp;
    if(mymap != undefined && mymap != null){
        mymap.remove();
    }
    displayMap(data.location.lat, data.location.lng);
    isLoading();
}

// map API
const displayMap = (x,y) =>{
    mymap = L.map('mapid',{ zoomControl: false}).setView([x, y], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a> ' + '<a style="color:red" href="https://github.com/a331998513/projects">Jay</a> was here',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
    }).addTo(mymap);

    let greenIcon = L.icon({
        iconUrl: './images/icon-location.svg',
        iconSize: [36, 46],
    });
    L.marker([x, y], {icon: greenIcon}).addTo(mymap);
    L.control.zoom({ position: 'topleft'}).addTo(mymap);
}
//eventListener
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const formData = new FormData(e.target)
    init(formData.get('searchIP'));
    isLoading();
})
input.addEventListener('click', ()=>{
    if(!ipReg.test(input.value)){
        input.setAttribute('id','');
        input.value = '';
    }
})

