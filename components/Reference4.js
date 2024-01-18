//use async function await to try and catch error from api
//version 1 =====================================================================
const cookBeanSouffle = require('./library.js');

// Write your code below:
async function hostDinnerParty(){
  try{
    let cookbean = await cookBeanSouffle();
    console.log(`${cookbean} is served!`);
  }
  catch(error){
    console.log(error);
    console.log('Ordering a pizza!');
  }
}

hostDinnerParty();



//version 2 =====================================================================
let {cookBeans, steamBroccoli, cookRice, bakeChicken} = require('./library.js');

// Write your code below:
async function serveDinnerAgain() {
  const foodArray = await Promise.all([steamBroccoli(), cookRice(), bakeChicken(), cookBeans()]);

  console.log(`Dinner is served. We're having ${foodArray[0]}, ${foodArray[1]}, ${foodArray[2]}, and ${foodArray[3]}.`);
}

serveDinnerAgain();


//======================================================================
// This function returns true 50% of the time.
let randomSuccess = () => {
  let num = Math.random();
  if (num < .5 ){
    return true;
  } else {
    return false;
  }
 };
 
 // This function returns a promise that resolves half of the time and rejects half of the time
 let cookBeanSouffle = () => {
  return new Promise((resolve, reject) => {
    console.log('Fingers crossed... Putting the Bean Souffle in the oven');
    setTimeout(()=>{
      let success = randomSuccess();
      if(success){
        resolve('Bean Souffle');
      } else {
        reject('Dinner is ruined!');
      }
    }, 1000);
  });
 };
 
 module.exports = cookBeanSouffle;

//###########################################################################################################
//###########################################################################################################