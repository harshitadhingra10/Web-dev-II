// function print(num){
//     return new Promise((res,rej)=>{
//         setTimeout(()=>{
//             console.log(num);
//             res();
//         }, 1000)
//     })
// }
// print(1)
// .then(()=>print(2))
// .then(()=>print(3))
// .then(()=>print(4))
// .then(()=>print(5))

// //asyn function:

// async function getData(){
//     pro.then((res)=>console.log(res))
//     console.log("After Promise");
// }
// //why async and await exist?
// //1. to avoid promise chaining
// //2. to execute the asynchronous code properly without confusion
// //3. to handle a promise in a better way.
// // important:
// //async function always return a promise.
// async function demo(){
//     return 'async intro'
// }
// console.log(demo());

// //await
// //it will pause aysnc function until a promise return a result(not in pending state)
// async function demo(){
//     const value = await pro;
//     console.log(value)
//     console.log("after promise")
// }
// console.log(demo())

async function fetchData(city) {
    try {
        const API_key = "";
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`);

        const data = await response.json();
        console.log(city);
        console.log(data.main.temp);
        console.log(data.main.humidity);
    } catch (err) {
        console.error(err);
    }
}
fetchData("london")