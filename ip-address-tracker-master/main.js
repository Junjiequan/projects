async function getData(){
    const res = await fetch('https://geo.ipify.org/api/v1?apiKey=at_UTDYv4fFYO4pdElyoGoCeSGOn1FB2&ipAddress=8.8.8.8');
    if(!res.ok)
        throw new Error('Something is not going well with getting data.');
    data = await res.json();
    displayData(data);
}
getData()
    .catch(()=> console.log('fetching process went wrong'))

//selectors
const dataOutput = document.querySelectorAll('.hero__data__block');
//functions
const getIp = (ip) =>{
console.log('this', ip)
}
const displayData = (data)=>{
    return;
}

document.querySelector('form').addEventListener('submit', (e)=>{
    e.preventDefault();
    const formData = new FormData(e.target)
    getIp(formData.get('searchIP'));
})