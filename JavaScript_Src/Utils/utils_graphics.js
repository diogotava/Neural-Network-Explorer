let mPage;
let mExportImageCanvas;
let canvas;
let mBlockImage;

function mCreateCanvas(windowWidth, windowHeight) {
    canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    canvas.parent('column2');
    mPage = createGraphics(width, height, WEBGL);
    mPage.parent('column2');
    mExportImageCanvas = createGraphics(width, height, WEBGL);
    mBlockImage = createGraphics(width, height, WEBGL);
}

function mBox(id, shapeX, shapeY, shapeZ) {
    smooth();
    strokeWeight(dynamicValues.strokeWeight);
    box(shapeX, shapeY, shapeZ);
    mExportImageCanvas.smooth();
    mExportImageCanvas.strokeWeight(dynamicValues.strokeWeight);
    mExportImageCanvas.box(shapeX, shapeY, shapeZ);

    mPage.fill((id >> 16) & 0xFF, (id >> 8) & 0xF, id & 0xFF);
    mPage.noStroke();
    mPage.box(shapeX, shapeY, shapeZ);
    strokeWeight(dynamicValues.strokeWeight);
}

function mBlock(id, shapeX, shapeY, shapeZ, blockColor) {
    smooth();
    strokeWeight(dynamicValues.strokeWeight);
    stroke(blockColor[0], blockColor[1], blockColor[2])
    box(shapeX, shapeY, shapeZ);
    mExportImageCanvas.box(shapeX, shapeY, shapeZ);

    mPage.noFill();
    mPage.strokeWeight(4);
    mPage.stroke((id >> 16) & 0xFF, (id >> 8) & 0xFF, id & 0xFF);
    mPage.box(shapeX, shapeY, shapeZ);
    strokeWeight(dynamicValues.strokeWeight);
}

function mTranslate(...arguments) {
    translate(...[...arguments]);
    mExportImageCanvas.translate(...[...arguments]);
    mPage.translate(...[...arguments]);
}

function mTranslateWithoutMPage(...arguments) {
    translate(...[...arguments]);
    mExportImageCanvas.translate(...[...arguments]);
}

function mResizeCanvas() {
    let element1Width = document.getElementById('column1').offsetWidth;
    let w = parseInt(windowWidth - element1Width, 10);
    let h = parseInt(windowHeight, 10);
    resizeCanvas(w, h);
    mPage.resizeCanvas(w, h);
    layersChanged = true;
}

function mCamera() {
    camera(...[...arguments]);
    mPage.camera(...[...arguments]);
    mExportImageCanvas.camera(0, -500, 500, 0, 0, 0, 0, 1, 0);
    mExportImageCanvas.resizeCanvas(getMaxXPosition() * 2, height)
    mExportImageCanvas.ortho(0, getMaxXPosition(), -100, 100, 10, 5000);
}

function mPush(mPageApply = true) {
    push();
    mExportImageCanvas.push();
    if (mPageApply)
        mPage.push();
}

function mPop(mPageApply = true) {
    pop();
    mExportImageCanvas.pop();
    if (mPageApply)
        mPage.pop();
}

function mBackground() {
    background(...[...arguments]);
    mExportImageCanvas.background(...[...arguments]);
    mPage.background(0);
}

function mTexture() {
    fill(...[...arguments]);
    mExportImageCanvas.fill(...[...arguments]);
}

function mAngleModeDegrees() {
    angleMode(DEGREES);
    mExportImageCanvas.angleMode(DEGREES);
}

function mRotateX(angle) {
    rotateX(angle);
    mExportImageCanvas.rotateX(angle);
}

function mRotateZ(angle) {
    rotateZ(angle);
    mExportImageCanvas.rotateZ(angle);
}

function mCylinder() {
    cylinder(...[...arguments]);
    mExportImageCanvas.cylinder(...[...arguments]);
}

function mCone() {
    cone(...[...arguments]);
    mExportImageCanvas.cone(...[...arguments]);
}

function mOrbitControl(sensitivityX = 1, sensitivityY = 1, sensitivityZ = 0.01) {
    orbitControl(sensitivityX, sensitivityY, sensitivityZ);
    mPage.orbitControl(sensitivityX, sensitivityY, sensitivityZ);
}

function getLayerId() {
    let pixels = mPage.get(mouseX, mouseY);

    return (pixels[0] << 16 | pixels[1] << 8 | pixels[2]) - 1;
}

function getBlockId() {
    let pixels = mPage.get(mouseX, mouseY);

    return (pixels[0] << 16 | pixels[1] << 8 | pixels[2]) - 1;
}