"use strict";
var loginState = false;
var loginBtn = document.querySelector("#login-btn");
var outputDiv = document.querySelector("#output-list");
var inputDiv = document.querySelector("#input-div");
loginBtn === null || loginBtn === void 0 ? void 0 : loginBtn.addEventListener('click', changeLoginState);
document.body.addEventListener('keydown', changeLoginState1);
function changeLoginState() {
    !loginState ? loginState = true : loginState = false;
    outputDiv.innerHTML = "";
    render();
}
function changeLoginState1(event) {
    if (loginState && event.key == "Enter") {
        addItem();
        render();
    }
}
function render() {
    if (!loginState) {
        loginBtn.className = "btn btn-success";
        loginBtn.innerText = "Login";
        inputDiv.innerHTML = "<p>you must be login</p>";
    }
    else {
        loginBtn.className = "btn btn-danger";
        loginBtn.innerText = "Logout";
        inputDiv.innerHTML = "<input id=\"input\" type=\"text\" class=\"p-1 w-50\" placeholder=\"I want to do...\">\n        <button class=\"btn btn-primary\" id=\"addItem-btn\" onclick=\"addItem()\">ADD</button><br/>\n        <small id=\"small\" class=\"small\"></small>\n        ";
    }
}
function addItem() {
    var input = document.querySelector("#input");
    if (input.value == "") {
        document.querySelector("#small").innerText = "*Empty";
    }
    else {
        outputDiv.innerHTML += "\n        <div class=\"my-2 d-flex justify-content-between\">\n            <div>" + input.value + "</div>\n            <div>\n                <button class=\"btn btn-success\" onclick=\"doneBtn(this)\">DONE</button>\n                <button class=\"btn btn-primary\" onclick=\"editBtn(this)\">EDIT</button>\n                <button class=\"btn btn-danger\" onclick=\"deleteBtn(this)\">DELETE</button>\n            </div>\n        </div>";
        input.value = "";
    }
}
function doneBtn(button) {
    var _a, _b;
    var div = (_b = (_a = button.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.firstElementChild;
    if (button.innerText == "DONE") {
        button.innerText = "UNDONE";
        div.className = "line";
    }
    else if (button.innerText == "UNDONE") {
        button.innerText = "DONE";
        div.className = "";
    }
}
function deleteBtn(button) {
    var _a;
    var div = (_a = button.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
    div.remove();
}
function editBtn(button) {
    var _a;
    var div = (_a = button.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
    var input = document.querySelector("#input");
    if (button.innerText == "EDIT") {
        button.className = "btn btn-warning";
        button.innerText = "CONFIRM";
        document.body.removeEventListener('keydown', changeLoginState1);
        document.querySelector("#addItem-btn").disabled = true;
        input.value = div.firstElementChild.innerText;
    }
    else {
        button.className = "btn btn-primary";
        button.innerText = "EDIT";
        var input_1 = document.querySelector("#input");
        div.firstElementChild.innerText = input_1.value;
        document.querySelector("#addItem-btn").disabled = false;
        document.body.addEventListener('keydown', changeLoginState1);
        input_1.value = "";
    }
}
//# sourceMappingURL=app.js.map