let video1;

let constraints1;

let poses1 = [];

let poseNet1;

let helFont; //variable for the font
//details for the score 

//size of the circle on start
let size = 20;

let pg;




function preload() {
    helFont = loadFont('myfont.otf');
   // txt = loadStrings('/sec144.txt')
}

function setup() {
    createCanvas(innerWidth, innerHeight);
    // noCanvas()


    video1 = createCapture({
        video: {
          mandatory: {
            maxWidth: 432,
            maxHeight: 240
          },
          optional: [{ maxFrameRate: 10 }]
        },
        audio: false
      });
    video1.size(width, height)
    video1.position(0, 0);
    //  video1.show()
    //  pg = createGraphics(video1.width, video1.height)
    poseNet1 = ml5.poseNet(video1, modelLoaded);
    poseNet1.on('pose', function (results) {
        poses1 = results;
    });



}
// When the model is loaded
modelLoaded = function () {
    console.log('Model Loaded!');
}

function draw() {
    clear()
   // background(150,0);
    push()
    translate(video1.width, 0)
    scale(-1, 1)



    drawKeypoints1();
    pop()
    detectDetention();
    //    scrollText()



}

function detectDetention() {
    push()
    fill(255)
    textFont(helFont)
    textSize(150)
    textAlign(CENTER, CENTER)
    for (let i = 0; i < poses1.length; i++) {
        if (poses1.length > 4 && poses1[i].pose.score > 0.5) {
            textSize(250)
            fill(255,0,0, 100)
            rect(0,0,width,height)
            fill(255)
            text("DETAINED", width / 2, height / 2);
         
//             saveFrames('out', 'png', 1, 3, data => {
//               print(data);
//            });
      
        }
    }
    pop()

}

function drawKeypoints1() {

    //initiating the poses and nose keypoint for video1
    for (let i = 0; i < poses1.length; i++) {
        let pr = poses1[i].pose.keypoints[0];

        if (poses1[i].pose.score > 0.20) {
            //fill(255, 0, 0, 100);
            noStroke();
            //ellipse(pr.position.x, pr.position.y, size);
            textAlign(CENTER, CENTER)
            textSize(200)
            text("🤬", pr.position.x, pr.position.y)
        }
    }


}
