let obj = {
    name: 'hello',
    age: 5,
}
let arr = [1,2,3]

for(el in arr){
    console.log(el);
}
for(el of arr){
    console.log(el);
}

