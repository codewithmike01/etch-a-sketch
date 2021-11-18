const pad = document.querySelector('.sketchPad');
const box = document.createElement('div');
const eraseBtn = document.querySelector('#eraser');
const cleanBtn = document.querySelector('#clean');
const drawBtn = document.querySelector('#draw');
const enterSize = document.querySelector('#enterSquare');
const colorSelected = document.querySelector('.color-selected');
const randomColor = document.querySelector('#randomColor');
const colorPicker = document.querySelector('.colorChoice');






let size = 16;

// Simple example, see optional options for more configuration.
const pickr = Pickr.create({
    el: '.color-picker',
    theme: 'classic', // or 'monolith', or 'nano'

    position: 'right-start',



    swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 0.95)',
        'rgba(156, 39, 176, 0.9)',

    ],

    components: {

        // Main components
        preview: true,
        opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
            hex: true,
            rgba: true,
            input: true,
        }
    }
});

function createEtch(size = 12, count = 0) {
    let rgbaColor = 'black';
    size = parseInt(size);
    console.log(size)

    //To wipe the Pad click for new grid size
    if (count !== 0) {
        for (let i = 0; i <= 310; i++) {
            pad.innerHTML = ' ';
        }
        count = 0;

    }

    for (let i = 0; i <= 1700; i++) {
        const box = document.createElement('div');
        box.style.cssText = ` width:${size}px;height:${size}px;flex-grow:1;margin-top:auto;`;
        pad.appendChild(box);
        eraseBtn.addEventListener('click', () => {
            box.addEventListener('mouseover', () => box.style.backgroundColor = 'white');
            drawBtn.addEventListener('click', () => {
                box.addEventListener('mouseover', () => box.style.backgroundColor = `${rgbaColor}`);

            })
        });
        //Random Color
        randomColor.addEventListener('click', () => {
            box.addEventListener('mouseover', () => {
                let colorValueOne = ((Math.random() * 255) - 1);
                let colorValueTwo = ((Math.random() * 255) - 1);
                let colorValueThree = ((Math.random() * 255) - 1);
                box.style.backgroundColor = `rgba(${colorValueOne },${colorValueTwo },${colorValueThree },1)`;
            })
        });

        colorPicker.addEventListener('click', () => {
            console.log('here  here');
            pickr.on('change', (color, source, instance) => {
                rgbaColor = color.toRGBA().toString(1);
                colorSelected.style.backgroundColor = `${rgbaColor}`
                box.addEventListener('mouseover', () => box.style.backgroundColor = `${rgbaColor}`);


            });
        })

        box.addEventListener('mouseover', () => box.style.backgroundColor = `${rgbaColor}`);
        cleanBtn.addEventListener('click', () => box.style.backgroundColor = 'white');

    }



}



//Initial Call of main Function
createEtch();






enterSize.addEventListener('click', () => {
    // const rgbaColor;
    const count = 1;
    let size = prompt('enter size of brush strokes', 12);
    console.log(size)

    if (size > 64 || size < 12 || size === NaN || size === null) {
        alert(`${size} as size too invalid, enter size within the range 12 - 64`);
        size = 12;
    }


    createEtch(size, count);

});