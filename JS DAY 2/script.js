
//  let fruits = ["apple", "banana"];
//  let newLength = fruits.push("cherry");
//  console.log(new)

//  let fruits = ["apple", "banana", "cherry"];
//  let removed = fruits.pop();
//  console.log(removed) //
//  console.log(fruits)

// Q1.

// let arr = [1,2,3,4,5]
// let rev=[]
// while(arr.length>0){
//     rev.push(arr.pop())
// }
// console.log(rev)


// Q2. 

// let arr=[-3,7,-6,-11,13,8];
// let res = []

// while(arr.length>0){
//   let val = arr.shift();
//   if(val>0){
//     res.push(val);
//   }
// }
// console.log(res)


// Q3. 

function palindrome() {
    let arr = [1, 2, 3, 2, 1];
    let original = [] //[1,2,3,2,1]
    let reverse = [] //[1,2,3,2,1]

    for (let i = 0; i < arr.length; i++) {
        original.push(arr[i]);
    }
    while (arr.length > 0) {
        reverse.push(arr.pop())
    }
    for (i = 0; i < original.length; i++) {
        if (original[i] !== reverse[i]) {
            return "not a palindrome"
        }
    }
    return "palindrome"
}
console.log(palindrome())
