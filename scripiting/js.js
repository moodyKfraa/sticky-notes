
let inputes = document.querySelectorAll(`.header input`)
const addBt = document.querySelector(`.header .add-bt`);
const clearBt = document.querySelector(`.header .clear-bt`);
const notesSection = document.querySelector(`.notes`)
let counter = 0;

clearBt.addEventListener(`click` , ()=>{window.localStorage.clear() ; notesSection.innerHTML =``})

function deleteNote(e){
    window.localStorage.removeItem(e.offsetParent.id);
    notesSection.removeChild(e.offsetParent)
    counter--;
}

function addNote(titleEntered , descriptionEntered){    
    let title = titleEntered
    let description = descriptionEntered
    if(title === null && description === null || description === "")return

    let note = document.createElement(`div`);
    note.className=`note`;

    let delBt = document.createElement(`button`)
    let xLetter = document.createTextNode(`X`);
    delBt.appendChild(xLetter);
    delBt.setAttribute(`onclick` , `deleteNote(this)`)
    note.appendChild(delBt)

    let textDiv = document.createElement(`div`)
    textDiv.className = `text`;
    let noteTitle = document.createElement(`h1`)
    let noteTitleText = document.createTextNode(title);
    noteTitle.appendChild(noteTitleText);
    textDiv.appendChild(noteTitle);

    let noteDescription = document.createElement(`p`)
    let noteDescriptionText = document.createTextNode(description);
    noteDescription.appendChild(noteDescriptionText)
    textDiv.appendChild(noteDescription);
    
    note.style.backgroundColor=`RGB(${Math.random() * (255)} , ${Math.random() * 255} , ${Math.random() * 255})`
    note.style.transform = `rotateZ(${(Math.random() * 10) - (Math.random() * 10) }deg)`

    note.setAttribute(`id`, counter)
    counter++
    note.appendChild(textDiv)

    notesSection.prepend(note);
}

function addNoteToLocaleStorage(title , description){
    if(title === null && description === null || description === "")return
    window.localStorage.setItem(window.localStorage.length , [title , description])
    inputes.forEach((e)=>{e.value =""})
}

window.addEventListener(`load` , ()=>{
    if(window.localStorage.length > 0){
        for(let i = 0 ; i < window.localStorage.length ; i++){
            addNote(window.localStorage.getItem(i).split(`,`)[0] , window.localStorage.getItem(i).split(`,`)[1] )
        }
    }

})

addBt.addEventListener(`click` , () => {
    addNote(document.querySelector(`[data-title]`).value , document.querySelector(`[data-description]`).value) , 
    addNoteToLocaleStorage(document.querySelector(`[data-title]`).value , document.querySelector(`[data-description]`).value )
})


function reset (e){
    e.value =""
}