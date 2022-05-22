//initialize stuffs
const box = 20;
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var rx = 6;
var ry = 6;
var d = "";
var flag = 0;
var foodx = 0;
var foody = 0;
var score = 0;
var intertime;
// initial snake length is 5
var snakearr = [
  [(rx-4)*box,ry*box],
  [(rx-3)*box, ry*box],
  [(rx-2)*box, ry*box],
  [(rx-1)*box, ry*box],
  [rx*box, ry*box]
];
createFood();
ctx.fillStyle= "#3d8ebd";

for (i = 0; i < snakearr.length; i++)
{
ctx.fillRect(snakearr[i][0], snakearr[i][1], box, box);
}
window.addEventListener("keydown", direction);
function direction(event)
{
   if (event.keyCode == 39 && d != "left")
     d = "right";
   else if (event.keyCode == 37 && d != "right")
     d = "left";
   else if (event.keyCode == 38 && d != "down")
     d = "up";
   else if (event.keyCode == 40 && d != "up")
     d = "down";
   if (flag == 0)
   {
   intertime =  setInterval(drawshit,170);
   flag = 1;
   }
};

//depending on the arrows pressed draw the frame
function drawshit()
{
  if (d == "right")
    rx += 1;
  if (d == "left")
    rx -= 1;
  if (d == "up")
    ry -= 1;
  if (d == "down")
    ry += 1;

  resetFrame();
  drawFrame();
}

function resetFrame()
{
ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawFrame()
{
  //create new snake
  var shifted = snakearr.shift();
  var temp = [[rx*box, ry*box]]
  snakearr = snakearr.concat(temp);



  if (snakearr[snakearr.length-1][0] == foodx && snakearr[snakearr.length-1][1] == foody)
  {
    createFood();
    score += 5;
    snakearr.unshift(shifted);
    document.getElementById("score").innerHTML = "Score: " + score;
  }


  //draw new snake
  for (i = 0; i < snakearr.length; i++)
  {
  ctx.fillStyle= "#3d8ebd";
  ctx.fillRect(snakearr[i][0], snakearr[i][1], box, box);
  }


  //draw food
  ctx.fillStyle = "pink";
  ctx.fillRect(foodx, foody, box, box);

  //check if snake is out of the box
  if (snakearr[snakearr.length-1][0] >= 500 || snakearr[snakearr.length-1][0] < 0 || snakearr[snakearr.length-1][1] >= 500 || snakearr[snakearr.length-1][1] < 0)
  {
    clearInterval(intertime);
    alert ("Game "+ "Over")
  }

  //check if snake touches itself
  for (i = 0; i < snakearr.length-1; i++)
  {
    if ((snakearr[snakearr.length - 1][0] == snakearr[i][0]) && (snakearr[snakearr.length - 1][1] == snakearr[i][1]))
    {
      clearInterval(intertime);
      alert ("Game " + "Over");
      break;
    }
  }
}

function createFood()
{

  foodx = (Math.floor(Math.random() * 25)) * box;
  foody = (Math.floor(Math.random() * 25)) * box;

  for (i= 0; i < snakearr.length; i++)
  {
    if (foodx == snakearr[i][0] && foody == snakearr[i][1])
    {
      createFood();
    }
  }
}
