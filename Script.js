var gradsX = 0;
var gradsY = 0;

var posX = 0;
var posY = 0

/*
  localStorage.setItem("gradsX", gradsX);
  localStorage.setItem("gradsY", gradsY);
  
  localStorage.setItem("posX", posX);
  localStorage.setItem("posY", posY);
*/
var oldMouseX = 0;
var oldMouseY = 0;
var oldMouseClick = 0;

var dice = document.getElementById("dice");

setInterval(render, 30)

window.onbeforeunload = function () {
  localStorage.setItem("gradsX", gradsX);
  localStorage.setItem("gradsY", gradsY);
  
  localStorage.setItem("posX", posX);
  localStorage.setItem("posY", posY);
};

posX = +localStorage.getItem("posX");
posY = +localStorage.getItem("posY");

gradsX = +localStorage.getItem("gradsX");
gradsY = +localStorage.getItem("gradsY");

var caras = [
  "0.9,0,0,0,0,0.9,0,0,0,0,0.9,0,0,0,100,1",
  "-0.9,0,0,0,0,0.9,0,0,0,0,-0.9,0,0,0,-100,1",
  "0.9,0,0,0,0,-1.072884E-07,-0.9000001,0,0,0.9000001,-1.072884E-07,0,0,100,0,1",
  "0.9,0,0,0,0,-1.072884E-07,0.9000001,0,0,-0.9000001,-1.072884E-07,0,0,-100,0,1",
  "-1.072884E-07,0,-0.9000001,0,0,0.9,0,0,0.9000001,0,-1.072884E-07,0,100,0,0,1",
  "-1.072884E-07,0,0.9000001,0,0,0.9,0,0,-0.9000001,0,-1.072884E-07,0,-100,0,0,1",
  "0.9,0,0,0,0,0.05020459,-0.05020458,0,0,0.6363961,0.6363961,0,0,95,95,1",
  "0.9,0,0,0,0,0.05020459,0.05020458,0,0,-0.6363961,0.6363961,0,0,-95,95,1",
  "-0.9000002,0,0,0,0,0.05020459,0.05020459,0,0,0.6363961,-0.6363962,0,0,95,-95,1",
  "-0.9000002,0,0,0,0,0.05020459,-0.05020459,0,0,-0.6363961,-0.6363962,0,0,-95,-95,1",
  "-1.072884E-07,0,-0.9000001,0,-0.05020459,0.05020459,0,0,0.6363961,0.6363961,-1.072884E-07,0,95,95,0,1",
  "-1.072884E-07,0,0.9000006,0,0.05020459,0.05020459,0,0,-0.6363963,0.6363963,-1.072884E-07,0,-95,95,0,1",
  "-1.072884E-07,0,-0.9000006,0,0.05020459,0.05020459,0,0,0.6363963,-0.6363963,-1.072884E-07,0,95,-95,0,1",
  "-1.072884E-07,0,0.9000006,0,-0.05020459,0.05020459,0,0,-0.6363963,-0.6363963,-1.072884E-07,0,-95,-95,0,1",
  "-1.072885E-07,0.900001,0,0,-0.05020459,-8.463861E-09,-0.05020459,0,-0.6363964,0,0.6363963,0,-95,0,95,1",
  "-1.072884E-07,0.9000006,0,0,0.0502046,-8.463862E-09,-0.0502046,0,-0.6363961,0,-0.6363962,0,-95,0,-95,1",
  "-1.072885E-07,0.900001,0,0,-0.05020459,-8.463861E-09,0.05020459,0,0.6363964,0,0.6363963,0,95,0,95,1",
  "-1.072884E-07,0.9000006,0,0,0.0502046,-8.463862E-09,0.0502046,0,0.6363961,0,-0.6363962,0,95,0,-95,1",
];

var edges = [
  "0.05020459,0,-0.05020458,0,-0.02474036,0.04996828,-0.02474036,0,0.04112519,0.04072392,0.04112519,0,92.5,95,92.5,1",
  "-0.05020459,0,-0.05020459,0,-0.02474036,0.04996827,0.02474036,0,0.04112518,0.04072392,-0.0411252,0,92.5,95,-92.5,1",
  "0.05020459,0,0.05020459,0,0.02474036,0.04996827,-0.02474036,0,-0.04112518,0.04072392,0.04112519,0,-92.599,95,92.523,1",
  "-0.05020459,0,0.05020459,0,0.02474036,0.04996827,0.02474036,0,-0.04112518,0.04072392,-0.0411252,0,-92.5,95,-92.5,1",
  "-0.05020459,0,0.05020459,0,-0.02474036,-0.04996827,-0.02474036,0,0.04112518,-0.04072392,0.04112519,0,92.5,-95,92.5,1",
  "0.05020459,0,0.05020459,0,-0.02474036,-0.04996828,0.02474036,0,0.0411252,-0.04072393,-0.04112521,0,92.5,-95,-92.5,1",
  "-0.05020459,0,-0.05020459,0,0.02474036,-0.04996827,-0.02474036,0,-0.04112518,-0.04072392,0.04112519,0,-92.599,-95,92.523,1",
  "0.05020459,0,-0.05020459,0,0.02474036,-0.04996828,0.02474036,0,-0.0411252,-0.04072393,-0.04112521,0,-92.5,-95,-92.5,1",
];

console.log(caras.length);

for (var i=0;i<caras.length;i++){
  CreateFace(dice,caras[i], "#f00");
}
for (var i=0;i<edges.length;i++){
  CreateEdge(dice,edges[i], "#0f0");
}

render();

document.getElementById("background").onmousemove = function(e){
  if(e.buttons ==2 ){
    if(oldMouseClick==2){
      gradsY+= (e.clientX-oldMouseX);
      gradsX-= (e.clientY-oldMouseY);    
    }
    oldMouseX = e.clientX;
    oldMouseY = e.clientY;
    oldMouseClick=e.buttons;
  }else{
    if(e.buttons ==1 ){
        if(oldMouseClick==1){
          posX+= (e.clientX-oldMouseX);
          posY+= (e.clientY-oldMouseY);    
        }
      }
    }    
    oldMouseX = e.clientX;
    oldMouseY = e.clientY;
  oldMouseClick=e.buttons;
};

function render(){
  
  var mat = new Matrix4();
  mat.rotationEuler( gradsX *  0.0174532924,gradsY*  0.0174532924,0);
  mat.position( posX,posY,0);
  dice.style.transform = "matrix3d("+mat.elements.toString()+")";
  
  //dice.style.transform = "translateX( "+posX+"px ) translateY( "+posY+"px ) rotateX("+gradsX+"deg)  rotateY("+gradsY+"deg)";
  
}

function CreateFace(parent, matrix, color){
  var iDiv = document.createElement('div');
  iDiv.className = 'face';
  iDiv.style.background= "linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.8)), url('https://cdn.glitch.com/950d23d4-3341-4297-af0e-f9c81ae41d9a%2Fdescarga.jpeg?1519743720552')";
  iDiv.style.transform = "matrix3d("+matrix+")"
  
  parent.appendChild(iDiv);  
}

function CreateEdge(parent, matrix, color){
  var iDiv = document.createElement('div');
  iDiv.className = 'edge';
  iDiv.style.background= "linear-gradient(rgba(0,0,0,.8), rgba(0,0,0,.8)), url('https://cdn.glitch.com/950d23d4-3341-4297-af0e-f9c81ae41d9a%2Fdescarga.jpeg?1519743720552')";
  iDiv.style.transform = "matrix3d("+matrix+")"
  parent.appendChild(iDiv);  
}