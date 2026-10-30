function greet(name: string) : void{
    console.log(`Hello ${name}`);
}
greet("Pritam")


//isLegal

function isLegal(age: number){
    return age > 18 ? "yes" : "no"
}

console.log(isLegal(20));


let user = {
  name: "pritam",
  email: "email@gmail.com",
  age: 21,
};

console.log(user);

interface User {
    firstname: string,
    lastname: string,
    age: number,
    email: string
}

let user2: User = {
    firstname: "pritam",
    lastname: 's',
    age: 21,
    email: "abc"

}


interface Person {
    name: string,
    id: number,
    greet(phrase: string) : void
}

class Employee implements Person {
    name: string;
    age: number;
    id: number

    constructor(name: string, age:number, id: number) {
        this.name = name,
        this.age = age
        this.id = id
    }

    greet(phrase: string): void {
        console.log(phrase);
    }
}


