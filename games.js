let namegame = 'Guess The World'
document.title = namegame
document.querySelector('h1').innerHTML = namegame
document.querySelector('footer').innerHTML = `${namegame} created by Aya Mohammed`
let makeinput = document.querySelector(".input")

let numoftry = 6;
let numofletter = 6;
let currentletter = 1;
let numofhunt = 2;

let guessword = ''
let word = ['Create' , 'Update' , 'Delete' , 'Master' , 'Bransh' , 'Mainly' , 'Elzero' , 'School']
guessword = word[Math.floor(Math.random(word) * word.length)].toLowerCase()
console.log(guessword)

let message = document.querySelector('.message')
let gethintbutton = document.querySelector(".hint");
gethintbutton.addEventListener("click" , gethint)
document.querySelector('.hint span').innerHTML = numofhunt



function generateinputs(){
    for(let i = 1; i <= numoftry; i++){
        let makdiv = document.createElement('div')
        makdiv.classList.add(`try${i}`)
        makdiv.innerHTML = `<span>try${i}</span>`
        if(i != 1) makdiv.classList.add("disabledinputs")
        for(let j = 1; j <= numofletter; j++){
            let inputs = document.createElement('input')
            inputs.type = 'text'
            inputs.id = `guess${i}_letter${j}`
            inputs.setAttribute("maxlength","1")
            makdiv.appendChild(inputs)
        }
        makeinput.appendChild(makdiv)
    }
    makeinput.children[0].children[1].focus()
    let inputdisableddiv = document.querySelectorAll(".disabledinputs input");
    inputdisableddiv.forEach((input) => (input.disabled = true))

    let allinputs = document.querySelectorAll("input")
    allinputs.forEach((input , index) => {
        input.addEventListener("input" , function(){
        this.value = this.value.toUpperCase()
        let nextinput = allinputs[index + 1]
        if(nextinput) nextinput.focus()

        input.addEventListener("keydown" , function(ele){
            let eletarget = ele.target 
            let arrayfromallinputs = Array.from(allinputs)
            let nextinput = arrayfromallinputs.indexOf(eletarget) + 1 
            let previnput = arrayfromallinputs.indexOf(eletarget) - 1 
            if(ele.key === 'ArrowRight'){
                if(nextinput < allinputs.length) allinputs[nextinput ].focus()
            } 
            if(ele.key === 'ArrowLeft'){
                if(previnput >=  0 ) allinputs[previnput].focus()
            }        
        })
        })
    })
}
window.onload = function(){
    generateinputs()
}

let checkbutton = document.querySelector(".check")
checkbutton.addEventListener("click" , handle);
 function handle(){
    let sucess = true
    // let actualinput = document.querySelectorAll(".input input")
    for(let i = 1; i <= numofletter; i++){
        let actualinput = document.querySelector(`#guess${currentletter}_letter${i}`)
        let letter = actualinput.value.toLowerCase()
        let word = guessword[i - 1]
        if(word  === letter ){
             actualinput.classList.add("yesinplace")
        }else if (guessword.includes(letter) && actualinput.value.toLowerCase() !== ''){
            actualinput.classList.add("notinplace")
            sucess = false
        }else{
            actualinput.classList.add("no")
            sucess = false
        }
    }
    if(sucess){
        document.querySelector(`.try${currentletter}`).disabled = true
        document.querySelector(`.try${currentletter}`).classList.add('disabledinputs')
        checkbutton.disabled = true
        message.innerHTML = `you win the word is <span>${guessword}<span/> `
        if(numofhunt === 2){
            message.innerHTML = `<p>congrates you did't use hint</p>`
        }
        gethintbutton.disabled = true        
    }else{
        document.querySelector(`.try${currentletter}`).classList.add('disabledinputs')
        document.querySelectorAll(`.try${currentletter} input`).forEach((el) => el.disabled = true)
        currentletter++
        document.querySelectorAll(`.try${currentletter} input`).forEach((el) => el.disabled = false) 
        let ele = document.querySelector(`.try${currentletter}`)
        if(ele){
            document.querySelector(`.try${currentletter}`).classList.remove('disabledinputs')
            ele.children[1].focus()
        }else{
            checkbutton.disabled = true
            message.innerHTML = `you loss the word is <span>${guessword}<span/> `
            gethintbutton.disabled = true        
        
        }
    }
}

function gethint(){
    if(numofhunt > 0){
        numofhunt--;
        document.querySelector('.hint span').innerHTML = numofhunt
    }
    if(numofhunt === 0){
        gethintbutton.disabled = true
    }
    let inputnotdisabled = document.querySelectorAll("input:not([disabled])")
    let arrayfromnotdisabled = Array.from(inputnotdisabled).filter((input) => {return input.value === '' ? input : ''})
    console.log(arrayfromnotdisabled)
    if(arrayfromnotdisabled.length > 0){
        let randomindex = Math.floor(Math.random()* arrayfromnotdisabled.length)
        let randominputletter = arrayfromnotdisabled[randomindex]
        let letterhint = Array.from(arrayfromnotdisabled).indexOf(randominputletter)
        if(letterhint !== -1){
            randominputletter.value = guessword[letterhint].toUpperCase()
        }
    }
}

function getbackspace(ele){
    if(ele.key === 'Backspace'){
        let inputs = document.querySelectorAll("input:not([disabled])")
        let currentarraynum = Array.from(inputs).indexOf(document.activeElement)
        if(currentarraynum > 0){
            let currentindex = inputs[currentarraynum]
            let previousindex = inputs[currentarraynum - 1]
            currentindex.value = ''
            previousindex.value = ''
            previousindex.focus()
        }
        
    }
}
document.addEventListener("keydown" , getbackspace)
window.onload = function(){
    generateinputs()
}
