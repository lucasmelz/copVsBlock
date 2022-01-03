function new_model() {

    let h = Math.floor((Math.random() * 250) + 50);
    let w = Math.floor((Math.random() * 250) + 50);

    let model = {
        points: 0,
        pause: false,
        yPosition: 4,
        minY: 4,
        maxY:530,
        minHeight:50,
        maxHeight:250,
        stickYPosition:20,
        action:0,
        lastBlockPosition:0,
        blocks:[
            {
                color: 'purple',
                height: h,
                width: w,
                x:2013,
                y: Math.floor((Math.random() * 546-h) + 20),
                speed: Math.floor((Math.random() * 5.5) + 3)
            }
        ],
        blockColors: ['purple', 'crimson', 'darkgreen', 'darkorange', '#8bd1de'],
        colorIndex: 1
    };
    
    model.update = update;
    
    document.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "w": case "W": model.action = 1; break;
            case "s": case "S": model.action = 2; break;
            default: model.action = 0; break;
        }
    });

    return model;
}

function update(){
    this.points++;
    switch(this.action){
        case 1:
        if(this.yPosition>this.minY) {
            this.yPosition-=3.5;
            this.stickYPosition-=3.5;
        } break;
        case 2:
        if(this.yPosition<this.maxY){
            this.yPosition+=3.5; 
            this.stickYPosition+=3.5;
        }
        break;
        default: break;
    }


    if(this.lastBlockPosition>=100){
        this.blocks.push(newBlock(this));
        this.lastBlockPosition=-1;
    }
    this.lastBlockPosition++; //controle do espaço entre blocos

    for(let i = 0; i<this.blocks.length; i++){ //movimento e ordem dos blocos
        this.blocks[i].x-=this.blocks[i].speed;

        if(i>0){
            if(this.blocks[i].x<this.blocks[i-1].x){
                let temp = this.blocks[i-1];
                this.blocks[i-1] = this.blocks[i];
                this.blocks[i]=temp;
            }
        }

    }

    let superiorCorner = this.blocks[0].y;
    let inferiorCorner = this.blocks[0].y+this.blocks[0].height;
    let blockXposition = this.blocks[0].x;

    if(blockXposition<=133 ){
        if(this.stickYPosition+16>=superiorCorner && this.stickYPosition-16<=inferiorCorner){
            this.blocks.shift();
        }
        else{
            gameOver(this);
        }
    }
}

function gameOver(model){
    document.getElementById("pointsGameOver").textContent = `Points: ${Math.floor(model.points/60)}.`;
    document.getElementById("tudo").style.display ='inherit';
    model.pause = true;
}

function render(model){
    let y = model.yPosition;
    let gc = this;
    
    gc.fillStyle = "#0e0e10";
    gc.fillRect(0,0,2160,1024);
    
    //hair
    gc.fillStyle = '#6d4009';
    gc.beginPath();
    gc.ellipse(70, y+85, 29, 27, Math.PI*2, 0, Math.PI*2);
    gc.fill();
    
    //biggerBluePartOfHat
    gc.fillStyle = '#0e4caf';
    gc.beginPath();
    gc.ellipse(70, y+66, 28, 18, Math.PI*2, 0, Math.PI*2);
    gc.fill();
    
    //smallerBluePartOfHat
    gc.fillStyle = '#1262e2';
    gc.beginPath();
    gc.ellipse(70, y+68, 20, 9, Math.PI*2, 0, Math.PI*2);
    gc.fill();
    
    
    //hatBadge
    gc.fillStyle = '#efc334';
    gc.strokeStyle = '#efc334';
    gc.lineWidth = 1.8;
    gc.lineCap = "round";
    gc.beginPath();
    gc.arc(66.5, y+50, 4, Math.PI*0.7, Math.PI*0.26, true);
    gc.stroke();
    gc.fillStyle = '#efc334';
    gc.strokeStyle = '#efc334';
    gc.lineWidth = 1.8;
    gc.lineCap = "round";
    gc.beginPath();
    gc.arc(72.5, y+50, 4, Math.PI*0.7, Math.PI*0.3, true);
    gc.stroke();
    gc.fillStyle = '#efc334';
    gc.fillRect(63.2, y+54.1, 12.6, 5);
    gc.beginPath();
    gc.lineWidth = 1;
    gc.moveTo(63.2, y+59.1);
    gc.quadraticCurveTo(66, y+64, 70, y+63.5);
    gc.moveTo(70, y+63.5);
    gc.quadraticCurveTo(72.8, y+64, 75.8, y+59.1);
    gc.moveTo(75.8, y+59.1);
    gc.lineTo(63.2, y+59.1);
    gc.closePath();
    gc.stroke();
    gc.fill();
    gc.beginPath();
    gc.lineWidth = 2;
    gc.moveTo(62.6, y+59.1);
    gc.lineTo(76, y+59.1);
    gc.lineTo(70, y+64);
    gc.closePath();
    gc.fill();
    
    //leftHand
    gc.beginPath();
    gc.strokeStyle = '#efc334';
    gc.fillStyle = '#efc334';
    gc.ellipse(30,y+32,10,14, Math.PI*2, 0, Math.PI*2);
    gc.fill();
    
    //rightHand
    gc.beginPath();
    gc.ellipse(112,y+32,10,14, Math.PI*2, 0, Math.PI*2);
    gc.fill();
    
    //stick
    
    gc.beginPath();
    gc.strokeStyle='black';
    gc.fillStyle = '#563401';
    gc.moveTo(16,y);
    gc.lineTo(128,y);
    gc.quadraticCurveTo(138, y+16, 128, y+32);
    gc.lineTo(16, y+32);
    gc.quadraticCurveTo(28,y+16,16,y+32);
    gc.fill();
    gc.stroke();
    
    gc.beginPath();
    gc.fillStyle = '#7e4c01';
    gc.lineWidth = 2;
    gc.ellipse(16,y+16,6,16, Math.PI*2, 0, Math.PI*2);
    gc.stroke();
    gc.fill();
    gc.closePath();
    
    gc.beginPath();
    gc.fillStyle = "#3d2501";
    gc.lineWidth = 1;
    gc.moveTo(128,y);
    gc.lineTo(155, y+16);
    gc.lineTo(128, y+32);
    gc.quadraticCurveTo(138,y+16,128,y);
    gc.lineJoin = 'bevel';
    gc.closePath();
    gc.fill();
    gc.stroke();
    
    //leftThumb
    
    gc.beginPath();
    gc.strokeStyle = '#efc334';
    gc.fillStyle = '#efc334';
    gc.ellipse(39, y+29, 2, 7, Math.PI*2, 0, Math.PI*2);
    gc.stroke();
    gc.fill();
    
    //rightThumb
    gc.beginPath();
    gc.ellipse(103, y+29, 2, 7, Math.PI*2, 0, Math.PI*2);
    gc.stroke();
    gc.fill();
    
    //jacket
    gc.fillStyle = '#0e4caf';
    gc.strokeStyle = '#0e4caf';
    gc.beginPath();
    gc.ellipse(70, y+136, 40, 20, Math.PI*2, 0, Math.PI*2);
    gc.fill();
    
    gc.fillRect(30, y+136, 80, 75);
    
    //leftArm
    gc.lineWidth = 2;
    gc.moveTo(46,y+136);
    gc.lineTo(28, y+86);
    gc.lineTo(35, y+44);
    gc.lineTo(22, y+41);
    gc.lineTo(12, y+84);
    gc.lineTo(30, y+150);
    gc.closePath();
    gc.fill();
    gc.stroke();
    
    //rightArm
    gc.moveTo(96, y+136);
    gc.lineTo(114, y+86);
    gc.lineTo(107, y+44);
    gc.lineTo(120, y+41);
    gc.lineTo(130, y+88);
    gc.lineTo(110, y+150);
    gc.closePath();
    gc.fill();
    gc.stroke();
    
    //legs
    
    gc.beginPath();
    gc.strokeStyle = '#efc334';
    gc.fillStyle = '#efc334';
    gc.ellipse(49.5, y+291, 11, 48, Math.PI*2, 0, Math.PI*2);
    gc.fill();
    
    gc.beginPath();
    gc.ellipse(92, y+290, 10.5, 48, Math.PI*2, 0, Math.PI*2);
    gc.fill();
    
    //leftShoe
    
    gc.beginPath();
    gc.fillStyle = '#7e4c01';
    gc.moveTo(40, y+328);
    gc.lineTo(43, y+328);
    gc.quadraticCurveTo(50, y+333, 56, y+328);
    gc.lineTo(59, y+328);
    gc.quadraticCurveTo(61, y+332, 60, y+338);
    gc.quadraticCurveTo(58, y+346, 34, y+358);
    gc.quadraticCurveTo(30, y+362, 18, y+356);
    gc.quadraticCurveTo(18, y+346, 40, y+328);
    gc.fill();
    
    gc.beginPath();
    gc.strokeStyle = "black";
    gc.moveTo(59, y+338);
    gc.quadraticCurveTo(58, y+346, 34, y+358);
    gc.quadraticCurveTo(30, y+362, 19, y+354);
    gc.stroke();
    
    gc.beginPath(); //firstLace
    gc.moveTo(44, y+336);
    gc.quadraticCurveTo(40, y+331, 33, y+334);
    gc.stroke();
    
    gc.beginPath(); //secondLace
    gc.moveTo(41, y+339.5);
    gc.quadraticCurveTo(37, y+334.5, 30, y+337.5);
    gc.stroke();
    
    gc.beginPath(); //thirdLace
    gc.moveTo(38, y+343);
    gc.quadraticCurveTo(34, y+338, 27, y+341);
    gc.stroke();
    
    //rightShoe
    gc.beginPath();
    gc.fillStyle = '#7e4c01';
    gc.moveTo(86, y+328);
    gc.lineTo(84, y+328);
    gc.quadraticCurveTo(83, y+333,84, y+341);
    gc.quadraticCurveTo(93, y+355, 106, y+359); 
    gc.quadraticCurveTo(112, y+360, 120, y+352);
    gc.quadraticCurveTo(111, y+336, 99, y+328);
    gc.lineTo(97, y+328);
    gc.quadraticCurveTo(91.5, y+331,86, y+328);
    gc.fill();
    
    gc.beginPath();
    gc.moveTo(84, y+341);
    gc.quadraticCurveTo(93, y+355, 106, y+359); //sola
    gc.quadraticCurveTo(112, y+360, 120, y+352);
    gc.stroke();
    
    gc.beginPath(); //firstLace
    gc.moveTo(108, y+336);   
    gc.quadraticCurveTo(104, y+331, 96, y+336); 
    gc.stroke();
    
    gc.beginPath(); //secondLace
    gc.moveTo(111, y+340);   
    gc.quadraticCurveTo(107, y+335, 99, y+340); 
    gc.stroke();
    
    gc.beginPath(); //thirdLace
    gc.moveTo(114, y+343);   
    gc.quadraticCurveTo(110, y+338, 102, y+343); 
    gc.stroke();
    
    //pants
    gc.fillStyle = '#020c9d';
    gc.strokeStyle = '#020c9d';
    gc.beginPath();
    gc.moveTo(35, y+212); 
    gc.quadraticCurveTo(33, y+228, 36, y+276);
    gc.lineTo(64, y+276);
    gc.quadraticCurveTo(70, y+256, 70, y+241);
    gc.quadraticCurveTo(68, y+241, 78, y+276);
    gc.lineTo(104, y+276);
    gc.quadraticCurveTo(108, y+228, 104, y+212);
    gc.closePath();
    gc.fill();
    gc.stroke();
    
    //t-shirt
    gc.fillStyle = 'black';
    gc.fillRect(66, y+111, 7, 21.5);
    
    //neck
    gc.fillStyle = '#d9aa12';
    gc.beginPath();
    gc.ellipse(70, y+116, 10, 10, Math.PI*2, 0, Math.PI*2);
    gc.fill();
    
    //leftCollar
    gc.fillStyle = '#1262e2';
    gc.strokeStyle = '#1262e2';
    gc.lineWidth = 2.8;
    gc.beginPath();
    gc.moveTo(60, y+115);
    gc.lineTo(68, y+132);
    gc.lineTo(58, y+127);
    gc.lineTo(52, y+129);
    gc.closePath();
    gc.fill();
    gc.stroke();
    
    //rightCollar
    gc.beginPath();
    gc.moveTo(80, y+115);
    gc.lineTo(72, y+132);
    gc.lineTo(81, y+127);
    gc.lineTo(87, y+129);
    gc.closePath();
    gc.fill();
    gc.stroke();
    
    //head
    gc.fillStyle = '#efc334';
    gc.beginPath();
    gc.ellipse(70, y+91, 25, 25, Math.PI*2, 0, Math.PI * 2);
    gc.fill();
    
    //blackPartOfHat
    gc.fillStyle = '#211a03';
    gc.beginPath();
    gc.arc(70, y+98, 34, Math.PI*1.32, Math.PI*-(0.32));
    gc.arc(70, y+40.6, 34, Math.PI*-1.32, Math.PI*0.32, true);
    gc.fill();
    
    //hairAroundLeftEar
    gc.lineWidth = 2;
    gc.strokeStyle = '#6d4009';
    gc.fillStyle =  '#6d4009';
    gc.beginPath();
    gc.arc(68.5, y+98.5, 34, Math.PI*-0.66, Math.PI*-0.76, true);
    gc.lineTo(47,y+83);
    gc.lineTo(48,y+91);
    gc.lineTo(55,y+71);
    gc.closePath();
    gc.stroke();
    gc.fill();
    
    //hairAroundRightEar
    gc.strokeStyle = '#6d4009';
    gc.fillStyle =  '#6d4009';
    gc.beginPath();
    gc.arc(72.5, y+99.5, 34, Math.PI*1.64, Math.PI*-0.24);
    gc.moveTo(86,y+70);
    gc.lineTo(91,y+91);
    gc.lineTo(94.5,y+76);
    gc.lineTo(87,y+69);
    gc.closePath();
    gc.fill();
    gc.stroke();
    
    //left eyebrown
    gc.strokeStyle = '#6d4009';
    gc.lineWidth = 3;
    gc.lineCap = "round";
    gc.beginPath();
    gc.arc(60, y+84, 4.666666, Math.PI*1.2, Math.PI*-(0.2));
    gc.stroke();
    gc.closePath();
    
    //right eyebrown
    gc.strokeStyle = '#6d4009';
    gc.lineWidth = 3;
    gc.lineCap = "round";
    gc.beginPath();
    gc.arc(79, y+84, 4.666666, Math.PI*1.2, Math.PI*-(0.2));
    gc.stroke();
    gc.closePath();
    
    //left eye
    gc.fillStyle = '#211a03';
    gc.beginPath();
    gc.ellipse(60, y+86, 3, 3, Math.PI*2, 0, Math.PI * 2);
    gc.fill();
    
    //right eye
    gc.fillStyle = '#211a03';
    gc.beginPath();
    gc.ellipse(79, y+86, 3, 3, Math.PI*2, 0, Math.PI * 2);
    gc.fill();
    
    //mouth
    gc.fillStyle = '#211a03';
    gc.beginPath();
    gc.ellipse(70, y+104, 8, 4, Math.PI*2, 0, Math.PI);
    gc.fill();
    
    //nose
    gc.fillStyle = '#CC8A11';
    gc.lineWidth = 2;
    gc.lineJoin = "round";
    gc.strokeStyle = '#CC8A11';
    gc.beginPath();
    gc.moveTo(67, y+94);
    gc.lineTo(73, y+94);
    gc.lineTo(70, y+97);
    gc.closePath();
    gc.stroke();
    gc.fill();

    let arrayOfBlocksAccordingToSpeed = model.blocks.slice(0).sort(function (a, b) {
        return a.speed - b.speed;
      });


    for(let i = 0; i<arrayOfBlocksAccordingToSpeed.length; i++){

       gc.fillStyle = arrayOfBlocksAccordingToSpeed[i].color;
        let x = arrayOfBlocksAccordingToSpeed[i].x;
        let y = arrayOfBlocksAccordingToSpeed[i].y;
        let w = arrayOfBlocksAccordingToSpeed[i].width;
        let h = arrayOfBlocksAccordingToSpeed[i].height;
        gc.fillRect(x, y, w, h);
    }

    document.getElementById("points").textContent = `Points: ${Math.floor(model.points/60)}`;
}

  // sort by value
  
  
  



//distance of 500 between each block
//max 4 blocos

function newBlock(model){
    let h = Math.floor((Math.random() * model.maxHeight) + model.minHeight);
    let w = Math.floor((Math.random() * model.maxHeight) + model.minHeight);

    let block = {
    color: model.blockColors[model.colorIndex],
    height: h,
    width: w,
    x:2013,
    y: Math.floor((Math.random() * (546-h)) + 20),
    speed: Math.floor((Math.random() * 5.5) + 3)
    }

    if(model.colorIndex===4) model.colorIndex=0;
    else model.colorIndex++;

    return block;
}

function main() {
    let gc = document
    .getElementById("acanvas")
    .getContext("2d"); 
    gc.scale(0.68,0.68);
    
    
    gc.render = render;
    
    let model = new_model();

    let step = (ts) => {
        if(!model.pause){
        gc.render(model);
        model.update();
        requestAnimationFrame(step);
        }
    }
    requestAnimationFrame(step);
    
}