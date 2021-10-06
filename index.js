//canvas settings
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext("2d")

const canvasWidth = 1200
const canvasHeight = 700

canvas.width = canvasWidth
canvas.height = canvasHeight

//blocks
const blocks = [
    {
        x: 10,
        y: 10,
        width: 100,
        height: 100,
        color: "black",
        active: false
    },
    {
        x: 500,
        y: 100,
        width: 120,
        height: 50,
        color: "red",
        active: false
    },
    {
        x: 120,
        y: 370,
        width: 100,
        height: 100,
        color: "pink",
        active: false
    },
]


let activeBlock = undefined

function addBlock() {

    blocks.forEach(({ x, y, width, height, color }, index) => {

        if(activeBlock === index) {

            ctx.fillStyle = 'blue'

            ctx.fillRect(x - 2, y - 2, width + 4, height + 4)

        }

        ctx.fillStyle = color

        ctx.fillRect(x, y, width, height)


    })
}


function dragBlock(newX, newY) {

    if(activeBlock >= 0) {

        blocks[activeBlock].x = newX - (blocks[activeBlock].width / 2)
    
        blocks[activeBlock].y = newY - (blocks[activeBlock].height / 2)
    
        collision()

    }


}

function updateBlockPosition(key, value) {
    blocks[activeBlock][key] = value
}


function collision() {

    const activeX = blocks[activeBlock].x
    const activeY = blocks[activeBlock].y

    const activeWidth = blocks[activeBlock].width
    const activeHeight = blocks[activeBlock].height


    blocks.forEach(({ x, y, width, height }, index) => {

        
        if(activeBlock !== index) {
            
            if(activeX + activeWidth >= x && activeX + activeWidth <= x + width && activeY >= y && activeY <= y + height) {

                updateBlockPosition('x', x - activeWidth - 1)

            }

            else if(activeX <= x + width && activeX >= x && activeY >= y && activeY <= y + height) {

                updateBlockPosition('x', x + width + 1)

            }

            else if(activeY + activeHeight >= y - 10 && activeY + activeHeight <= y + height) {

                if(activeX >= x && activeX <= x + width || activeX + activeWidth >= x && activeX + activeWidth <= x + width) {

                    updateBlockPosition('y', y - activeHeight - 1)

                }

            }

            else if(activeY <= y + height + 10 && activeY >= y) {
                
                if(activeX >= x && activeX <= x + width || activeX + activeWidth >= x && activeX + activeWidth <= x + width) {

                    updateBlockPosition('y', y + height + 1)

                }

            } 

            else if (y > activeY && y + height < activeY + activeHeight) {

                if (x + width >= activeX && x + width <= activeX + activeWidth) {
    
                    updateBlockPosition('x', x + width + 1)
    
                } else if (x <= activeX + activeWidth && x > activeX) {
    
                    updateBlockPosition('x', x - activeWidth - 1)
    
                }
            }


            if (x >= activeX && x + width <= activeX + activeWidth) {

                if (y <= activeY + activeHeight && y > activeY) {
    
                    updateBlockPosition('y', y - activeHeight - 1)
    
                } else if (y + height >= activeY && y + height <= activeY + activeHeight) {

                    updateBlockPosition('y', y + height + 1)

                }

            }  


        }


    })


    
}

//canvas options
function clearCanvas() {

    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    
}

function updateCanvas() {

    clearCanvas()

    addBlock()

}


function blockClickHandler(clientX, clientY) {

    blocks.forEach(({ x, y, width, height }, index) => {

        if(activeBlock === index) {

            activeBlock = null

        } else if(clientX >= x && clientX <= x + width && clientY >= y && clientY <= y + height) {
            
            activeBlock = index
            

        }

    })

}
 


//event listeners
canvas.addEventListener('mousedown', ({ clientX, clientY }) => blockClickHandler(clientX, clientY))

canvas.addEventListener('mouseup', () => activeBlock = undefined)

canvas.addEventListener('mousemove', ({ clientX, clientY }) => dragBlock(clientX, clientY))



const updateInterval = setInterval(() => updateCanvas(), 16)
