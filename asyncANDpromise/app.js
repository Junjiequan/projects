// //////////////////////////////////////////////
//                 //callback
// //////////////////////////////////////////////

// const posts = [
//     { title: 'Post One', body: 'This is post one'},
//     { title: 'Post Two', body: 'This is post two'}
// ];

// function getPosts(){
//     setTimeout(()=>{
//         let output = '';
//         posts.forEach(index =>{
//             output += `<li>${index.title}</li>`
//         });
//         document.body.innerHTML = output;
//     }, 1000);
// }

// function createPost(post,callback){
//     setTimeout(()=>{
//         posts.push(post);
//         callback();
//     }, 2000)
// }

// createPost({title: 'Post Three', body: 'This is post Three'},getPosts);

const posts = [
    { title: 'Post One', body: 'This is post one'},
    { title: 'Post Two', body: 'This is post two'}
];

function getPosts(){
    setTimeout(()=>{
        let output = '';
        posts.forEach(index =>{
            output += `<li>${index.title}</li>`
        });
        document.body.innerHTML = output;
    }, 1000);
}

// function createPost(post,callback){
//     return new Promise((resolve, reject)=>{
//         setTimeout(()=>{
//             posts.push(post)
//             const error = false;
//             if(!error){
//                 resolve();
//             } else {
//                 reject('WARNING: Your laptop will be exploaded in counting 3')
//             }
//         }, 2000)
        
//     })
// }
// createPost({title: 'Post three', body: 'This is post three'})
    // .then(getPosts)
    // .catch(err => document.body.innerHTML = `<span style="color:red">THIS IS AN ${err}`)




// async function init(){
//     await createPost({ title: 'post Junjie', body:'This it post three'});
// }




// //////////////////////////////////////////////
//                 //Promise 
// //////////////////////////////////////////////
// createPost({ title: 'Post Three', body: 'This is three'})
//     .then(getPosts)
//     .catch((err)=> {
//         document.body.innerHTML = `<h1 style="opacity:0.5; boder:1px solid red; color:purple">${err}</h1>`
//     });

const promise1 = Promise.resolve('Hello you are jay');
const promise2 = ('niceeeeee');
const promise3 = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        const error = false;
        if(!error){
            resolve('OKKKKKKAY');
        } else {
            reject(`Error: it is not working`)
        }
    },1000)
});
const promise4 = fetch('https://jsonplaceholder.typicode.com/users')
                .then(resp => resp.json())
                .then(data => data.map((index)=>{
                    return document.body.innerHTML = `<li>${index.email}</li>`
                }))



Promise.all([promise1, promise2, promise3,promise4])
    .then(value=> 
        console.log(value))
    .catch(re => console.log(re));


