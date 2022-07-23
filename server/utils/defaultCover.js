const { createCanvas } = require('canvas')

function getFont() {
    const fontList = [
        "Arial",
        "Times New Roman",
        "Courier New"
    ]
    const index = Math.floor(Math.random()*fontList.length)
    return fontList[index];
}

function genRan(min, max) {
    let difference = max - min;
    let rand = Math.random();
    rand = Math.floor( rand * difference);
    rand = rand + min;
    return rand;
}

function getX(canvas, text, max, width) {
    let length;
    if (typeof text === "string") {
        const metrics = canvas.measureText(text);
        length = metrics.width
    } else {
        length = width
    }
    const ranInt = Math.floor(Math.random() * (max - length));
    return ranInt;
}

function getY(size, max) {
    const ranInt = Math.floor(Math.random() * (max - size)) + size;
    return ranInt;
}

module.exports = (
  username,
  journalName
) => {
  const canSize = 500;
  const canvas = createCanvas(canSize, canSize)
  var ctx = canvas.getContext("2d");
  
  const gradX = getX(ctx, null, canSize, 200)
  const gradY = getX(ctx, null, canSize, 10)
  const gradLength = genRan(100, 300)
  const gradHeight = genRan(5,50)
  
  const grd = ctx.createLinearGradient(gradX, 0, (gradX + gradLength), 0);
  grd.addColorStop(0, `rgb(${genRan(0, 255)},${genRan(0, 255)},${genRan(0, 255)})`);
  grd.addColorStop(1, `rgb(${genRan(0, 255)},${genRan(0, 255)},${genRan(0, 255)})`);
  
  ctx.fillStyle = grd;
  ctx.fillRect(gradX, gradY, gradLength, gradHeight);
  
  ctx.fillStyle = "black"
  
  const nameSize = genRan(15, 30)
  const journalSize = genRan(25, 40)
  
  ctx.font = `${nameSize}px ${getFont()}`
  ctx.fillText(username, getX(ctx, username, canSize), getY(nameSize, canSize));
  ctx.font = `${journalSize}px ${getFont()}`
  ctx.fillText(journalName, getX(ctx, journalName, canSize), getY(journalSize, canSize));
  
  return canvas.toDataURL()  
}

