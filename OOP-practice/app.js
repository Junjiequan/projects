///////////////////////////////////////////////////////////
                        //Object                         
///////////////////////////////////////////////////////////

// const book1={
//     title:'Book one',
//     author:'John Doe',
//     year:'2013',
//     getSummary:function(){
//         return `${this.title} written by ${this.author} in ${this.year}`;
//     }
// };
// // console.log(book1.getSummary());


// const book2={
//     title:'Book two',
//     author:'John Doe',
//     year:'2016',
//     getSummary:function(){
//         return `${this.title} written by ${this.author} in ${this.year}`;
//     }
// };
// // console.log(book2.getSummary())
// // console.log(Object.values(book2));
// // console.log(Object.keys(book2));

///////////////////////////////////////////////////////////
                    //constructor                        
///////////////////////////////////////////////////////////

// //Constructor
// function Book(title, author, year){
//     this.title = title;
//     this.author = author;
//     this.year = year;

//     // this.getSummary = function(){
//     //     return`${this.title} was written by ${this.author} in ${this.year}`
//     // }
// }

// //getSummary
// Book.prototype.getSummary = function(){
//     return `${this.title} was written by ${this.author} in ${this.year}`
// }

// //getAge
// Book.prototype.getAge = function(){
//     const years = new Date().getFullYear() - this.year;
//     return `${this.title} is ${years} years old`;
// }

// //Revise / Change year
// Book.prototype.revise = function(newYear){
//     this.year = newYear;
//     this.revised = true;
// }



// //Initiate an object
// const book1 = new Book('Book one', 'John Smith', '1996');
// const book2 = new Book('Book two', 'Junjie Quan', '2010');

// console.log(book2.getAge());
// book2.revise('2018')
// console.log(book2) 


///////////////////////////////////////////////////////////
                    //Inheritence                        
///////////////////////////////////////////////////////////

// //Constructor
// function Book(title, author, year){
//     this.title = title;
//     this.author = author;
//     this.year = year;

//     // this.getSummary = function(){
//     //     return`${this.title} was written by ${this.author} in ${this.year}`
//     // }
// }

// //getSummary
// Book.prototype.getSummary = function(){
//     return `${this.title} was written by ${this.author} in ${this.year}`
// }

// //Magazine Constructor
// function Magazine(title, author, year, month){
//     Book.call(this, title, author, year);

//     this.month = month;
// }

// //Inherit Prototype
// Magazine.prototype = Object.create(Book.prototype);

// //Instantiate Magazine Object
// const mag1 = new Magazine('Magazine One', 'Junjie', '2020', 'January');

// //Use Magazine Constructor
// Magazine.prototype.constructor = Magazine;


// console.log(mag1);


///////////////////////////////////////////////////////////
                         //Object                        
///////////////////////////////////////////////////////////

// Object of Protos
const Workout = {
    doWeight: function(){
        return `${this.exercise} do 50 reps in ${this.duration} mins.`
    },
    doCardio: function(){
       return `run on ${this.cardio} for ${this.duration} mins, then take ${this.rest} hours break.`
    }
} 

const WeightTraining = Object.create(Workout,{
    exercise: {value: 'bench press'},
    duration: {value: '50'},
    cardio : {value: 'treadmill'},
    rest: {value: '2'}
})

console.log(WeightTraining.doCardio());
console.log(WeightTraining.doWeight());