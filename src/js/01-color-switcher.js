const refs = {
    bodyEl : document.querySelector('body'),
    btnStart : document.querySelector('button[data-start]'),
    btnStop : document.querySelector('button[data-stop]'),
}
let changeColor = null;
onStop()

function changeBodyColor (){
    refs.bodyEl.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

refs.btnStart.addEventListener('click', onStart)

function onStart(){
    changeColor = setInterval(changeBodyColor, 1000)
    refs.btnStart.disabled = true;
    refs.btnStop.disabled = false;
}
refs.btnStop.addEventListener('click', onStop)

function onStop(){
    clearInterval(changeColor)
    refs.btnStop.disabled = true;
    refs.btnStart.disabled = false;
}
