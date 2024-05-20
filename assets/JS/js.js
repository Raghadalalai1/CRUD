const container = document.querySelector(".container")
const form = document.querySelector("form")
let data =[];



function read() {
     data = (localStorage.getItem("data") )? JSON.parse(localStorage.getItem("data")): []
    container.innerHTML=""
    data.forEach(element => {
        addItem(element) 
    });
}
function addItem(item) {
    container.innerHTML += `
    <div class="card ${(item.done) ? "done" : " "}">
  <h1 id="name${item.id}">${item.taskName}</h1>
  <input type="text" value="" id="updateNameInput${item.id}" class="updateName">
  <button onclick="updateName(${item.id})" id="updateNameButton${item.id}" class="updateName">save</button>
  
  <button onclick="updateState(${item.id})">update state</button>
  <button onclick="showUpdateForm(${item.id})">update name</button>
  <button onclick="deleteItem(${item.id})">delete</button>

</div>
    
    
    `

}
function creat() {
    let input = document.querySelector("#nameTask")
    let id = (localStorage.getItem("id")) ? parseInt(localStorage.getItem("id")) + 1 : 1;

    const task = { id:id, taskName:input.value, done:false }
    data.push(task);
    addItem(task)
    input.value=""
    localStorage.setItem("data",JSON.stringify(data));
    localStorage.setItem("id",id)
}
form.addEventListener("submit", (event) => {
    event.preventDefault();
    creat();
    
    



})
function updateState(id) {
   
    data=data.map(element=>{
        if (element.id==id) {

            element.done=!element.done
        }
        return element
    })
    localStorage.setItem("data",JSON.stringify(data))
    read();
    
    
}
function updateName(id) {
    const input =document.querySelector(`#updateNameInput${id}`)
    const button =document.querySelector(`#updateNameButton${id}`)
    const h1 =document.querySelector(`#name${id}`)
    data=data.map(element=>{
        if (element.id==id) {

            element.taskName=input.value;
        }
        return element
        
    })
    localStorage.setItem("data",JSON.stringify(data))
    input.style.display="none"
    button.style.display="none"
    h1.style.display="inline"
    
    read();

    
}
function showUpdateForm(id) {
    const input =document.querySelector(`#updateNameInput${id}`)
    const button =document.querySelector(`#updateNameButton${id}`)
    const h1 =document.querySelector(`#name${id}`)

    input.style.display="inline"
    button.style.display="inline"
    h1.style.display="none"
    const value= data.find(element=>{return element.id==id 
    })
    input.value=value.taskName
    
    
    
}
function deleteItem(id) {
    data=data.filter(element=>{return (element.id!=id)})
    localStorage.setItem("data",JSON.stringify(data))
    read();
    
}



read();

