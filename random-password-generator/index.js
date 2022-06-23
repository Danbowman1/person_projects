const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];
let passwordLength = ''

// Selectors
const generatorBtn = document.getElementById('generatorBtn')
let passOne = document.getElementById('passwordOne')
let passTwo = document.getElementById('passwordTwo')
let parentOfPass = document.querySelector('.passwordContainer')
let theme = document.getElementById('check')

// Event Listeners
generatorBtn.addEventListener('click', generatePassword)
parentOfPass.addEventListener('click', copyPassword)
theme.addEventListener('click', changeTheme)

function generatePassword() {
    let passwordOne = ''
    let passwordTwo = ''
    for( let i = 0; i <= 15; i++ ) {
        let randomIndexOne = Math.floor(Math.random() * characters.length)
        let randomIndexTwo = Math.floor(Math.random() * characters.length)
        passwordOne += characters[randomIndexOne]
        passwordTwo += characters[randomIndexTwo]
    }
    passOne.textContent = passwordOne
    passTwo.textContent = passwordTwo
    
}

function copyPassword(e) {
    if(e.target !== e.currentTarget){
        let clickedItem = e.target.id
        const content = document.getElementById(clickedItem).textContent
        navigator.clipboard.writeText(content)
        alert(`Passward copied: ${content}`)
    }
    
}

function changeTheme() {
    document.body.classList.toggle('light-theme')
}







