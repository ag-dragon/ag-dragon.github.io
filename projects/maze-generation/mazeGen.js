function draw() {
    const canvas = document.getElementById("mazeCanvas");
    const ctx = canvas.getContext("2d");
    var imageData = ctx.createImageData(canvas.width, canvas.height);

    const data = imageData.data
    for (let i = 0; i < data.length; i+= 4) {
        data[i+0] = (((i/4)%canvas.width)/canvas.width)*255;
        data[i+1] = (((i/4)/canvas.width)/canvas.height)*255;
        data[i+2] = 255;
        data[i+3] = 255;
    }

    ctx.putImageData(imageData, 0, 0);
}
window.addEventListener("load", draw);
