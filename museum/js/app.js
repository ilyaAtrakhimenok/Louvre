let user = {
    name: 'ilya',
}

console.log(Symbol());
let name = Symbol();

user[name] = 1;

for (el in user){
    console.log(user[el]);
    console.log(user[name]);
}