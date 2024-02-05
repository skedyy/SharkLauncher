function loginCracked(){
    var inputvalue = document.getElementById('username-input').value;
    if(!inputvalue==undefined||!inputvalue==null||!inputvalue==""){
        window.app.loginCracked(inputvalue);
    }
}
function returnw() {
    window.location.href = '../main.html'
}