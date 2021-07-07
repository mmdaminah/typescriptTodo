let loginState : boolean = false;
let loginBtn : HTMLElement = document.querySelector("#login-btn") as HTMLElement;
let outputDiv : HTMLElement = document.querySelector("#output-list") as HTMLElement;
let inputDiv : HTMLElement = document.querySelector("#input-div") as HTMLElement;
loginBtn?.addEventListener('click', changeLoginState);
document.body.addEventListener('keydown', changeLoginState1);
function changeLoginState(){
    !loginState ? loginState = true : loginState = false;
    outputDiv.innerHTML = ""
    render();
}
function changeLoginState1(event:KeyboardEvent){
    if(loginState && event.key == "Enter"){
        addItem();
        render();
    }
}
function render():void{
    if(!loginState){
        loginBtn.className = "btn btn-success";
        loginBtn.innerText = "Login";
        inputDiv.innerHTML = "<p>you must be login</p>";
    }else{
        loginBtn.className = "btn btn-danger";
        loginBtn.innerText = "Logout";
        inputDiv.innerHTML = `<input id="input" type="text" class="p-1 w-50" placeholder="I want to do...">
        <button class="btn btn-primary" id="addItem-btn" onclick="addItem()">ADD</button><br/>
        <small id="small" class="small"></small>
        `;
    }
}
function addItem():void{
    let input = (document.querySelector("#input") as HTMLInputElement);
    if(input.value == ""){
        (document.querySelector("#small") as HTMLInputElement).innerText = "*Empty";
    }else{
        outputDiv.innerHTML += `
        <div class="my-2 d-flex justify-content-between">
            <div>${input.value}</div>
            <div>
                <button class="btn btn-success" onclick="doneBtn(this)">DONE</button>
                <button class="btn btn-primary" onclick="editBtn(this)">EDIT</button>
                <button class="btn btn-danger" onclick="deleteBtn(this)">DELETE</button>
            </div>
        </div>`;
        input.value = "";
    }

}
function doneBtn(button:HTMLButtonElement):void{
    let div = button.parentElement?.parentElement?.firstElementChild as HTMLDivElement;
    if(button.innerText == "DONE"){
        button.innerText = "UNDONE";
        div.className = "line"
    }
    else if(button.innerText == "UNDONE"){
        button.innerText = "DONE";
        div.className = ""
    }
}
function deleteBtn(button:HTMLButtonElement):void{
    let div = button.parentElement?.parentElement as HTMLDivElement;
    div.remove()
}
function editBtn(button:HTMLButtonElement):void{
    let div = button.parentElement?.parentElement as HTMLDivElement;
    let input = (document.querySelector("#input") as HTMLInputElement);
    if(button.innerText == "EDIT"){
        button.className = "btn btn-warning";
        button.innerText = "CONFIRM";
        document.body.removeEventListener('keydown', changeLoginState1);
        (document.querySelector("#addItem-btn") as HTMLButtonElement).disabled = true;
        input.value = (div.firstElementChild as HTMLDivElement).innerText
    }else{
        button.className = "btn btn-primary";
        button.innerText = "EDIT";
        let input = (document.querySelector("#input") as HTMLInputElement);
        (div.firstElementChild as HTMLDivElement).innerText = input.value;
        (document.querySelector("#addItem-btn") as HTMLButtonElement).disabled = false;
        document.body.addEventListener('keydown', changeLoginState1);
        input.value = "";
    }
}