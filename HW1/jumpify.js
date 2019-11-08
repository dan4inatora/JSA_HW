
const jumpHeight = 3;
let tower = [3,2,1];

function jumpingJimmy(tower, jumpHeight) {
	//i use slice(creates a copy of our array), because the ejecting of the reduce function will mutate the original array which is unwanted
    return tower.slice(0).reduce((acc,value,index, arr) => {
        if(value <= jumpHeight){acc += value;}
        else{arr.splice(1);}
        return acc;
    }, 0);
}

console.log(jumpingJimmy(tower, jumpHeight));