window.app.gettoken()
window.app.getoken((event, value) => {
    window.localStorage.setItem('token', value)
})
var token = window.localStorage.getItem('token')
if(token==undefined||token=="undefined"){
    window.location.href = "../main.html"
}
console.log(token)
var returned;
function returnw(){
        window.location.href = '../main.html'
}
function startzombies(){
    var download = document.getElementById('download-text')
    download.removeAttribute("hidden");
    var downloadtext = download.textContent
        fetch("../../token.json")
            .then((res) => {
                return res.json();
            })
            .then((data) => {data = JSON.stringify(data)
                window.localStorage.setItem('json',data)
        console.log(data)}); 
        try {
            var json1 = JSON.parse(window.localStorage.getItem('token'))
        } catch (error) {
            console.log("json null parse")
            console.log(error)
            window.app.getdata((event, value) => {
                download.textContent = "Descargando: "+value.type+ " "+value.task+"/"+value.total
            })
            returned = window.localStorage.getItem('download')
            window.app.startminecraft("https://www.dropbox.com/scl/fi/2yc0idlqpj7wmb1g53om4/sharkzombies.zip?rlkey=g767kcppjfnu58f1k22bpedlw&dl=1", "https://maven.minecraftforge.net/net/minecraftforge/forge/1.18.2-40.2.0/forge-1.18.2-40.2.0-installer.jar", true)
        }
        try {
            if (!json1.access_token == null || !json1.access_token == undefined || !json1.access_token == "") {
                console.log("json not null")
                window.app.getdata((event, value) => {
                    download.textContent = "Descargando: " + value.type + " " + value.task + "/" + value.total
                    if(value.task==value.total){
                        download.textContent = "Instalando forge.. "
                    }
                })
                window.app.startminecraft("https://www.dropbox.com/scl/fi/2yc0idlqpj7wmb1g53om4/sharkzombies.zip?rlkey=g767kcppjfnu58f1k22bpedlw&dl=1", "https://maven.minecraftforge.net/net/minecraftforge/forge/1.18.2-40.2.0/forge-1.18.2-40.2.0-installer.jar", false)
            }else{
                console.log("json null")
                window.app.startminecraft("https://www.dropbox.com/scl/fi/2yc0idlqpj7wmb1g53om4/sharkzombies.zip?rlkey=g767kcppjfnu58f1k22bpedlw&dl=1", "https://maven.minecraftforge.net/net/minecraftforge/forge/1.18.2-40.2.0/forge-1.18.2-40.2.0-installer.jar", true)
                window.app.getdata((event, value) => {
                    download.textContent = "Descargando: " + value.type + " " + value.task + "/" + value.total
                })
            }  
        } catch (error) {
            
        }
}
async function logout(){
    await window.app.removedata()
    setTimeout(()=>{
        window.location.href = '../main.html'
    },2800)
}
