let table;
let days = [];

function preload(){
  table = loadTable("data.csv", "csv", "header");
}

// setup() runs once at the load of the page.
function setup(){
  var canvas = createCanvas(windowWidth, (windowHeight + 250));
  console.log(windowHeight);
  console.log(height);
  canvas.parent("sketch");
  frameRate(200);

  console.log("rows: " + table.getRowCount());

  for(let i= 1; i<table.getRowCount(); i++){
    let id = parseInt(table.getString(i, 0));
    id = id - 1;
    let date = table.getString(i, 1);
    let fructose = table.getString(i, 2);
    let sorbitol = table.getString(i, 3);
    let mannitol = table.getString(i, 4);
    let lactose = table.getString(i, 5);
    let gluten = table.getString(i, 6);
    let garlic = table.getString(i, 7);
    let onion = table.getString(i, 8);
    let galactans = table.getString(i, 9);
    let b = table.getString(i, 10);
    let c = table.getString(i, 11);
    let t = table.getString(i, 12);
    day = new Day(id, date, fructose, sorbitol, mannitol, lactose, gluten, garlic, onion, galactans, b, c, t);
    days.push(day);
  }
  noStroke();
}


// draw() runs in a loop as many times as specified by frameRate() per second.
function draw(){
  //grey
  background(240,240,240);
  // yellow
  //background("#f0ede4");
  fill(50);
  textFont('Avenir');
  textSize(20);
  text('FODMAP is an acronym standing for     Fermentable Oligosaccharides,             Disaccharides, Monosaccharides, and   Polyols.', 1095, 260, 355, 500);
  text('Put simply, FODMAPs are a collection   of short-chain carbohydrates, or sugars, that aren’t absorbed properly in the gut. Consumption of FODMAPs can cause   considerable pain and discomfort for    people with sensitive guts, like me.', 1095, 385, 360, 500);
  text('There are a plethora of foods that are   high in FODMAPs, but some examples are garlic, onion, asparagus, apples,      and beans, to name a few.', 1095, 570, 355, 500);
  fill("#e4eb63");
  circle(850, 260, 30);
  fill(50)
  textSize(18);
  rotate(-0.1);
  text("each dot represents a day.", 760, 350);
  rotate(0.1);
  text("colors = what i ate", 740, 320);
  rotate(0.1);
  text("size = severity of my symptoms", 800, 300);
  text("hover on a dot to see more!", 840, 110);
  rotate(-0.1);
  textSize(30);
  textFont('Mont');
  text("S", 50, 50);
  text("M", 150, 50);
  text("T", 250, 50);
  text("W", 347, 50);
  text("Th", 446, 50);
  text("F", 555, 50);
  text("S", 655, 50);
  textSize(40);
  text("tracking my FODMAP", 750, 80);
  text("consumption & symptoms", 800, 130);
  fill("#BDC700");
  fill("#e27396");
  text("&", 1080, 130);
  fill("#FFAB00")
  textSize(30);
  text("what is a FODMAP?", 1100, 220);
  textSize(120);
  fill(250);
  text("by", 1325, 900);
  text("arielle", 1080, 1000);

  textSize(20);
  fill("#e8633b");
  rect(820, 460, 145, 30);
  fill(255);
  text("fructose", 840, 480);
  fill("#5fb5c2");
  rect(820, 500, 145, 30);
  fill(255);
  text("sorbitol", 840, 520);
  fill("#2e7676");
  rect(820, 540, 145, 30);
  fill(255);
  text("mannitol", 840, 560);
  fill("#5d2e46");
  rect(820, 580, 145, 30);
  fill(255);
  text("lactose", 840, 600);
  fill("#a9d784");
  rect(820, 620, 145, 30)
  fill(255);
  text("gluten", 840, 640);
  fill("#b58db6");
  rect(820, 660, 145, 30)
  fill(255);
  text("garlic", 840, 680);
  fill("#ad6a6c");
  rect(820, 700, 145, 30)
  fill(255);
  text("onion", 840, 720);
  fill("#ffe66d");
  rect(820, 740, 145, 30)
  fill(255);
  text("galactans", 840, 760);
  fill(180);
  rect(820, 780, 145, 30)
  fill(255);
  text("no fodmaps", 833, 800);

  fill(50);
  textSize(13);
  textFont("Avenir");
  text("Feb", 20, 70);
  text("Mar", 20, 360);
  text("Apr", 20, 760);
  stroke(1);
  line(50, 67, 100, 67);
  line(50, 357, 100, 357);
  line(47, 757, 100, 757);
  noFill();
  curve(800, 260, 900, 265, 865, 305, 800, 320);
  curve(800, 290, 910, 265, 910, 370, 850, 300);
  curve(800, 450, 850, 240, 710, 190, 600, 290);
  curve(1000, 600, 735, 320, 805, 620, 1100, 500);
  noStroke();
  fill(50);
  for(let i=0; i<days.length; i++){
    let day = days[i];
    // if no fodmaps consumed, print dot in grey
    if(day.fructose + day.sorbitol + day.mannitol + day.lactose + day.gluten + day.garlic + day.onion + day.galactans == 0) {
      fill(180);
      circle(day.xloc, day.yloc, day.severity);
    // otherwise, print pie chart
    }
    else {
      pieChart(day);
    }
  }
  // Hover function to display info box
  for(let i=0; i<days.length; i++){
    let day = days[i];
    let d = dist(mouseX, mouseY, day.xloc, day.yloc);
    if(d < day.severity) {
      fill(255,255,255);
      //filter(BLUR, 3); Deleted because it makes the code slow

      rect(800, 160, 500, 500, 30);
      fill(0);
      textSize(20);
      textFont('Mont');
      text(day.date, 830, 210);
      textSize(16);
      textFont("Avenir");
      text("FODMAPs eaten", 830, 270);
      fill(180);
      if(day.fructose == 1) {
        fill("#e8633b");
      }
      circle(850, 330, 30);
      fill(0);
      textSize(12);
      text("fructose", 830, 365);

      fill(180);
      if(day.sorbitol == 1) {
        fill("#5fb5c2");
      }
      circle(850, 410, 30);
      fill(0);
      text("sorbitol", 835, 445);

      fill(180);
      if(day.mannitol == 1) {
        fill("#2e7676");
      }
      circle(850, 490, 30);
      fill(0);
      text("mannitol", 830, 525);

      fill(180);
      if(day.lactose == 1) {
        fill("#5d2e46");
      }
      circle(850, 570, 30);
      fill(0);
      text("lactose", 835, 605);

      fill(180);
      if(day.gluten == 1) {
        fill("#a9d784");
      }
      circle(930, 330, 30);
      fill(0);
      text("gluten", 910, 365);

      fill(180);
      if(day.garlic == 1) {
        fill("#b58db6");
      }
      circle(930, 410, 30);
      fill(0);
      text("garlic", 915, 445);

      fill(180);
      if(day.onion == 1) {
        fill("#ad6a6c");
      }
      circle(930, 490, 30);
      fill(0);
      text("onion", 915, 525);

      fill(180);
      if(day.galactans == 1) {
        fill("#ffe66d");
      }
      circle(930, 570, 30);
      fill(0);
      text("galactans", 910, 605);

      textSize(16);
      text("Symptoms", 1100, 270);
      fill(100);
      rect(1070,330,day.b*50 +10, 40);
      rect(1070,430,day.c*50 +10, 40);
      rect(1070,530,day.t*50 +10, 40);
      textSize(12);
      fill(0);
      text("Bloating", 1070, 390);
      text("Constipation", 1070, 490);
      text("Stomach Pain", 1070, 590);
    }
  }
}

// function to make pie charts with corresponding colors based on what food groups are present in the day
function pieChart(day) {
  let fodmaps = 0;
  let colors = [];
  if(day.fructose == 1) {
    fodmaps++
    colors.push("#e8633b");
  }
  if(day.sorbitol == 1) {
    fodmaps++
    colors.push("#5fb5c2");
  }
  if(day.mannitol == 1) {
    fodmaps++
    colors.push("#2e7676");
  }
  if(day.lactose == 1) {
    fodmaps++
    colors.push("#5d2e46");
  }
  if(day.gluten == 1) {
    fodmaps++
    colors.push("#a9d784");
  }
  if(day.garlic == 1) {
    fodmaps++
    colors.push("#b58db6");
  }
  if(day.onion == 1) {
    fodmaps++
    colors.push("#ad6a6c");
  }
  if(day.galactans == 1) {
    fodmaps++
    colors.push("#ffe66d");
  }
  let lastangle = 0;
  for (let i = 0; i < colors.length; i++) {
    fill(colors[i]);
    arc(day.xloc, day.yloc, day.severity, day.severity, lastangle, lastangle + radians(360 / fodmaps));
    lastangle += radians(360 / fodmaps)
  }
}

// windowResized() is called whenever the browser size changes.
function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

class Day {
  constructor(id, date, fructose, sorbitol, mannitol, lactose, gluten, garlic, onion, galactans, b, c, t) {
    this.date = date;
    this.fructose = fructose;
    this.sorbitol = sorbitol;
    this.mannitol = mannitol;
    this.lactose = lactose;
    this.gluten = gluten;
    this.garlic = garlic;
    this.onion = onion;
    this.galactans = galactans;
    this.b = b;
    this.c = c;
    this.t = t;
    if(id % 7 == 1) {
      this.xloc = 60;
    }
    else if(id % 7 == 2) {
      this.xloc = 160;
    }
    else if(id % 7 == 3) {
      this.xloc = 260;
    }
    else if(id % 7 == 4) {
      this.xloc = 360;
    }
    else if(id % 7 == 5) {
      this.xloc = 460;
    }
    else if(id % 7 == 6) {
      this.xloc = 560;
    }
    else if(id % 7 == 0) {
      this.xloc = 660;
    }
    if(parseInt(id) % 7 == 0) {
      this.yloc = (parseInt(id) / 7) * 100;
    }
    else {
      this.yloc = (Math.floor((parseInt(id)/ 7)) + 1 ) * 100;
    }
    this.severity = 30 + 8 * (parseInt(b) + parseInt(c) + parseInt(t));
  }
}
