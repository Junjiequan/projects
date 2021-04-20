const ipOutput = document.querySelector('[data-id = "ip"]').childNodes[3];
const cityOutput = document.querySelector('[data-id = "location"]').childNodes[3];
const postOutput = document.querySelector('[data-id = "location"]').childNodes[5];
const timeOutput = document.querySelector('[data-id = "timezone"]').childNodes[3];
const ispOutput = document.querySelector('[data-id = "isp"]').childNodes[3];
const form = document.querySelector('form');
const input = document.querySelector('input[type=text]');




async function getData(ip){
    const res = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_UTDYv4fFYO4pdElyoGoCeSGOn1FB2&ipAddress=${ip}`);
    console.log(res)
    if(!res.ok)
        throw new Error('Check IP address');
    data = await res.json();
    displayData(data);
}
//selectors
const dataOutput = document.querySelectorAll('.hero__data__block');
//functions

const displayData = (data)=>{
    ipOutput.innerText = data.ip;
    cityOutput.innerText = data.location.city;
    postOutput.innerText = data.location.postalCode;
    timeOutput.innerText = data.location.timezone;
    ispOutput.innerText = data.isp;
    // getData()
    //     .catch((e)=>  document.querySelector('input[type=text]').value = e)
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const formData = new FormData(e.target)
    getData(formData.get('searchIP'));
})
