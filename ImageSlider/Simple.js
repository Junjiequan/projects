let i = 0;
const timer = 1000;
const image = [];
const imageBox = document.querySelector('.image') // choice 1
const imageBOx2 = document.image  //choice 2
image[0] = './images/image1.png';
image[1] = './images/image2.png';
image[2] = './images/image3.png';
image[3] = './images/image4.png';

const imageAuto = () =>{
    imageBOx2.src = image[i];
    if( i < image.length-1){
        i++;
    } else {
        i = 0;
    }
setTimeout(imageAuto, timer)
}
window.onload = imageAuto;

console.log(image.length)