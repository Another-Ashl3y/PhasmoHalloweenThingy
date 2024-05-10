class Ghost{
  constructor(
    name="demon",
    freezing=true,
    writing=true,
    uv=true,
    emf=false,
    orbs=false,
    dots=false,
    spiritBox=false,
    attackSanity=80,
    touchy=1
  ) {
    this.name = name;
    this.freezing=freezing;
    this.writing=writing;
    this.uv=uv;
    this.emf=emf;
    this.orbs=orbs;
    this.dots=dots;
    this.spiritBox=spiritBox;
    this.attackSanity=attackSanity;
    this.touchy=touchy;
  }
}
let l = "<br>";
let ghosts = [
    new Ghost("demon",true,true,true,false,false,false,false,70),
    new Ghost("spirit",false,true,false,true,false,false,true,60),
    new Ghost("wraith",false,false,false,true,false,true,true,60),
    new Ghost("phantom",false,false,true,false,false,true,true,60),
    new Ghost("poltergeist",false,true,true,false,false,false,true,50, 2),
    new Ghost("banshee",false,false,true,false,true,true,false,50),
    new Ghost("the twins",true,false,false,true,false,false,true,50),
    new Ghost("shade", false,true,false,true,false,false,true,35),
    new Ghost("hantu",true,false,true,false,true,false,false,50),
    new Ghost("yurei",true,false,false,false,true,true,false,50),
    new Ghost("myling",false,true,true,true,false,false,false,50),
    new Ghost("oni", true,false,false,true,false,true,false,50)
  
];
let curses = [
  "mirror", "cards", "board",
  "paw", "doll", "circle"
];
let ghost = ghosts[Math.floor(Math.random()*ghosts.length)];
let curse = curses[Math.floor(Math.random()*curses.length)];
let room = Math.ceil(Math.random()*8);
let chance = 0.15;
let activity = document.getElementById("activity");
let context = activity.getContext("2d");
activity.width = 400;
activity.height = 400;

setInterval(update,1000);
setInterval(clear, 10000);
setInterval(stopHunt, (ghost.attackSanity)*1000);
let sanity = document.getElementById("sanity").value;
let hunt = false;
let canHunt = true;
let time = 0;
let info = false;
let temps = false;
let correctRoom = document.getElementById("room").value == room;
let points = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

if (ghost.name == "the twins") {
  let points = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
}

function update() {
  sanity = document.getElementById("sanity").value+1;
  correctRoom = document.getElementById("room").value == room;
  context.fillStyle = "darkslategray";
  context.fillRect(0,0,400,400);
  for (let i = 0; i < 10; i++) {
    context.strokeStyle = "gray";
    context.strokeWidth = 0.5;
    line(0,(10-i)/10*380,400,(10-i)/10*380);
  } // Units
  for (let point=0; point < points.length;point++) {
    let x = point/points.length*400;
    let y = (10-points[point])/10*380;
    let x1 = (point+1)/points.length*400;
    let y1 = (10-points[point+1])/10*380;
    if (canHunt) {
      context.strokeStyle = "red";
    }
    else if (correctRoom) {
      context.strokeStyle = "ghostwhite";
    } else {
      context.strokeStyle = "white";
    }
    context.strokeWidth = 2;
    // context.fillRect(x,y,2,2);
    line(x,y,x1,y1);
    if (point > 0) {
      // points[point] = points[point-1];
    } 
    else if (time % 2 == 0 && ((Math.random() < 0.5*ghost.touchy || Math.random() > (sanity/100)/4) ||  (document.getElementById("room").value == room && ghost.name != "shade"))) {
      if (ghost.emf) {
        if (Math.random() < 0.05) {
          if (points[1] < 5) {
            points[0] = points[1]+5;
          }
          else {
            points[0] = points[1]-5;
          }
        } else {
          points[0] += Math.round((Math.random()*3-1.5));
        }
      } else if (Math.random() < 0.5 || sanity < 90) {
        points[0] += Math.round(Math.random()*4-2)
      } else {
        points[0] = Math.round((Math.random()*-2));
      }
    }
    if (hunt) {
      points[0] = 10;
    }
    else {
      points[0] = Math.min(Math.max(points[0], 0), 9)
    }
    if (Math.random() < 0.1*points[0] && canHunt && time % 2 == 0 && sanity <= ghost.attackSanity) {
      hunt = true;
      setTimeout(stopHunt, 60*1000);
    }
  }
  for (let i = points.length; i > 0; i--) {
    points[i] = points[i-1];
  }
  points.pop();
  time++;
  if (hunt) {
    hunting();
  }
}
function stopHunt() {
  hunt = false;
  canHunt = false;
  setTimeout(function(){canHunt = true;},180*1000);
}
function clear() {
  document.getElementById("orbs").innerHTML = "";
  document.getElementById("spirit box").innerHTML = "";
  document.getElementById("uv").innerHTML = "";
  document.getElementById("dots").innerHTML = "";
  document.getElementById("emf").innerHTML = "";
  document.getElementById("freezing").innerHTML = "";
  document.getElementById("ghost writing").innerHTML = "";
}
function line(x0,y0,x1,y1) {
  context.beginPath();
  context.moveTo(x0,y0);
  context.lineTo(x1,y1);
  context.stroke();
}
function toggleInfo() {
  if (info) {
    document.getElementById("info").innerHTML = "";
    info = false;
  }
  else {
    document.getElementById("info").innerHTML = [
      ghost.name,l,
      curse,l,
      room,l,
      "EMF5:",ghost.emf,l,
      "Spirit box:",ghost.spiritBox,l,
      "UV:",ghost.uv,l,
      "Ghost orbs:",ghost.orbs,l,
      "Ghost writing:",ghost.writing,l,
      "Freezing temperatures:",ghost.freezing,l,
      "Dots projector:", ghost.dots,l
    ].join(" ");
    info = true;
  }
}

function hunting() {
  document.getElementById("orbs").innerHTML = "Ghost Orbs: " + Math.random()*20;
  document.getElementById("spirit box").innerHTML ="Spirit box: " + Math.random()*20;
  document.getElementById("uv").innerHTML = "UV: " +Math.random()*20;
  document.getElementById("dots").innerHTML = "Dots Projector: " +Math.random()*20;
  document.getElementById("emf").innerHTML = "EMF: " +Math.random()*20;
  document.getElementById("freezing").innerHTML = "Temperature : " +Math.random()*20;
}

function camReady() {
  if (document.getElementById("room").value == room) {
    if (ghost.orbs) {
      if (Math.random() < chance) {
        document.getElementById("orbs").innerHTML = "Ghost orbs: Orbs!!";
      } else {
        document.getElementById("orbs").innerHTML = "Ghost orbs: Nothing yet...";
      }
    } else {
      document.getElementById("orbs").innerHTML = "Ghost orbs: Nothing yet...";
    }
  } else {
    document.getElementById("orbs").innerHTML = "Ghost orbs: Nothing yet...";
  }
}
function dotsReady() {
  if (document.getElementById("room").value == room) {
    if (ghost.dots) {
      if (Math.random() < chance) {
        document.getElementById("dots").innerHTML = "Dots Projector: Dots!!";
      } else {
        document.getElementById("dots").innerHTML = "Dots Projector: Nothing yet...";
      }
    } else {
      document.getElementById("dots").innerHTML = "Dots Projector: Nothing yet...";
    }
  } else {
    document.getElementById("dots").innerHTML = "Dots Projector: Nothing yet...";
  }
}
function spiritReady() {
  if (document.getElementById("room").value == room) {
    if (ghost.spiritBox) {
      if (Math.random() < chance) {
        document.getElementById("spirit box").innerHTML = "Spirit box: *Hello*";
      } else {
        document.getElementById("spirit box").innerHTML = "Spirit Box: Nothing yet...";
      }
    } else {
      document.getElementById("spirit box").innerHTML = "Spirit Box: Nothing yet...";
    }
  } else {
    document.getElementById("spirit box").innerHTML = "Spirit Box: Nothing yet...";
  }
}
function thermoReady() {
  if (correctRoom) {
    if (ghost.freezing) {
      if (Math.random() < chance) {
        if (ghost.name == "hantu") {
          document.getElementById("freezing").innerHTML = "Temperature: " + Math.round((Math.random()*-50)*10)/10;
        } else {
          document.getElementById("freezing").innerHTML = "Temperature: " +Math.round((Math.random()*-5)*10)/10;
        }
      } else {
        document.getElementById("freezing").innerHTML = "Temperature: " +Math.round((Math.random()*5+1)*10)/10;
      }
    } else {
      document.getElementById("freezing").innerHTML = "Temperature: " +Math.round((Math.random()*5+1)*10)/10;
    }
  
  } else {
    document.getElementById("freezing").innerHTML = "Temperature: " +Math.round((Math.random()*5+10)*10)/10;
  }
}
function emfReady() {
  if (Math.random() < chance && ghost.emf) {
    document.getElementById("emf").innerHTML = "EMF 5";
  }
  else {
    document.getElementById("emf").innerHTML = "EMF "+Math.round(Math.min(Math.max(Math.random()*5-Math.random()*5,0),4));
  }
}
let writing = false;
function bookReady() {
  if (document.getElementById("room").value == room) {
    if (ghost.writing) {
      if (Math.random() < chance || writing) {
        document.getElementById("ghost writing").innerHTML = "Book: Ghost writing!!";
        writing = true;
      } else {
        document.getElementById("ghost writing").innerHTML = "Book: Nothing yet...";
      }
    } else {
      document.getElementById("ghost writing").innerHTML = "Book: Nothing yet...";
    }
  } else {
    document.getElementById("ghost writing").innerHTML = "Book: Nothing yet...";
  }
}
function uvReady() {
  if (document.getElementById("room").value == room) {
    if (ghost.uv) {
      if (Math.random() < chance) {
        document.getElementById("uv").innerHTML = "UV: Fingers!!";
      } else {
        document.getElementById("uv").innerHTML = "UV: Nothing yet...";
      }
    } else {
      document.getElementById("uv").innerHTML = "UV: Nothing yet...";
    }
  } else {
    document.getElementById("uv").innerHTML = "UV: Nothing yet...";
  }
}
function incense() {
    stopHunt();
}






