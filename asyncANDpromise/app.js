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

function createPost(post){
    return new Promise((resolve,reject) => {
        setTimeout(()=>{
            posts.push(post);
            const error = true;
            if(!error){
                resolve();
            } else {
                reject(`Error: something went wrong~~~!`)
            }
        },1500)
    })
}
createPost({ title: 'Post Three', body: 'This is three'})
    .then(getPosts)
    .catch((err)=> {
        document.body.innerHTML = `<h1 style="opacity:0.5; boder:1px solid red; color:purple">${err}</h1>`
    });