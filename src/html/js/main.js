window.app.gettoken()
window.app.getoken((event, value) => {
    window.localStorage.setItem('token',value)
    window.app.removedata()
    window.app.savedata('token', value)
})
var token = window.localStorage.getItem('token')
console.log(token)
if (token==undefined||token=="undefined"){

}else{
    window.location.href = "launcher/select.html"
}