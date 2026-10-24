let a = ['a', 'b', 'c']

delete a[1];
console.log(a); // [ 'a', <1 empty item>, 'c' ]

let b = ['a', 'b', 'c'];

const deleted = b.splice(1, 1); 
console.log(b); //[ 'a', 'c' ]
console.log(deleted[0]);

let c = ['a', 'b', 'c', 'd', 'e', 'f', 'f'];

c.splice(2, 3)  //deleted 3 times from index 2

console.log(c);




