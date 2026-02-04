//create element
const para=document.createElement("p")
para.textContent="This is a  dynamically added paragraph";
console.log(para);

//append element
document.getElementById("content").appendChild(para)

//remove element
document.querySelector("#content p").remove()