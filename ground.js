let ground1, ground2, width, worldwidth;
ground1 = document.getElementById("ground1");
ground2 = document.getElementById('ground2');
width = ground1.offsetWidth;
worldwidth = document.querySelector(".container").offsetWidth;
//get the "left" value of the second ground element in percentage.
let value1;
let value2; //second ground element must come right after the first one 
export const SPEED_FACTOR = window.innerWidth>=window.innerHeight ? 0.022: 0.077; // for landscape and portrait displays of ground and cactus

export function setUpGround(){
  ground1.style.setProperty("--left", 0);
  ground2.style.setProperty("--left", 300);
  value1 = 0;
  value2 = 300;
}

export function moveGround(delta, speedScale) {

  value1 = value1 - delta * SPEED_FACTOR * speedScale;
  value2 = value2 - delta * SPEED_FACTOR * speedScale;
  //always use the same property to update the positions of the ground and cactus in order to get the same speed. Don't use translate for ground
  //and "right" for cactus because they give different speeds
  ground1.style.setProperty("--left", value1);
  ground2.style.setProperty("--left", value2);
  if (value1 <= -300) {
    value1 = 300;
  }
  if (value2 <= -300) {
    value2 = 300;
  }
}
