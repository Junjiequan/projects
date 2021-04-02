const book1={
    title:'Book one',
    author:'John Doe',
    year:'2013',
    getSummary:function(){
        return `${this.title} written by ${this.author} in ${this.year}`;
    }
};
console.log(book1.getSummary());