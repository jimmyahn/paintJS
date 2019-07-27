const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById('jsSave');
const resetBtn = document.getElementById('jsReset');

const Initial_COLOR = "#2c2c2c"

canvas.width = 800;
canvas.height = 500;

ctx.fillStyle = 'white';
ctx.fillRect(0,0,canvas.width, canvas.height);



ctx.stokeStyle = Initial_COLOR;
ctx.fillStyle = Initial_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(event){
    painting = false
}
function startPainting(event){
    painting = true
}

function onMouseMove(event){
    if(filling === true){
         return false;
    }
    const x = event.offsetX
    const y = event.offsetY
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    // }else if(painting && !filling){
    //     return false;
    // }
    }else{
        ctx.lineTo(x, y);
        ctx.stroke();
    }
    
}


function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;

}

function handleModeClick(event){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
           
    }else{
        filling = true;
        mode.innerText = 'Paint';
       
    }
}


function handleCanvasClick(event){
    if(filling){
    ctx.fillRect(0,0,canvas.width, canvas.height);
    }
    
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(event){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = 'myPaintingJS';
    link.click()
}

function resetClick(event){
    location.reload();

}


if (canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener('contextmenu', handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick))

if(range){
    range.addEventListener("input", handleRangeChange)
}

if(mode){
    mode.addEventListener("click", handleModeClick)
}

if(saveBtn){
    saveBtn.addEventListener('click', handleSaveClick)
}

if(resetBtn){
    resetBtn.addEventListener('click', resetClick)
}