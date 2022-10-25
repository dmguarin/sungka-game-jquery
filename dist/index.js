// var sungkaBoard = {
//   player1StoreHouse: 0,
//   player1Slot1: 7,
//   player1Slot2: 7,
//   player1Slot3: 7,
//   player1Slot4: 7,
//   player1Slot5: 7,
//   player1Slot6: 7,
//   player1Slot7: 7,
//   player2StoreHouse: 0,
//   player2Slot1: 7,
//   player2Slot2: 7,
//   player2Slot3: 7,
//   player2Slot4: 7,
//   player2Slot5: 7,
//   player2Slot6: 7,
//   player2Slot7: 7,
// }

// create an if statement on whether whose turn it is to exclude the storehouse in array



var sungkaBoard = [7, 7, 7, 7, 7, 7, 7, 0, 7, 7, 7, 7, 7, 7, 7, 0];
var nadampotNa = false;
var player1Turn = true;


/// Rotating when changing player

// display slot values
function displaySlotValues() {
  for (j = 0; j < 8; j++) {
    var slotNumber = j + 1;
    $("#slot" + slotNumber + "Player1").text(sungkaBoard[j]);
  }

  for (j = 0; j < 8; j++) {
    var slotNumber = j + 1;
    $("#slot" + slotNumber + "Player2").text(sungkaBoard[j + 8]);
  }
  return;
}

displaySlotValues();


function blender(numberOfPebbles, drop) {

  // for (i = 0; i < numberOfPebbles; i++) {
  //
  //   //Circular access of array
  //   drop = (drop % sungkaBoard.length + sungkaBoard.length) % sungkaBoard.length;
  //   //Circular access of array
  //   if (player1Turn === true) {
  //     if (drop === 15) {
  //       drop++;
  //       numberOfPebbles++;
  //     } else {
  //       sungkaBoard[drop] = sungkaBoard[drop] + 1;
  //       drop++;
  //       displaySlotValues();
  //     }
  //   } else {
  //     if (drop === 7) {
  //       drop++;
  //       numberOfPebbles++;
  //     } else {
  //       sungkaBoard[drop] = sungkaBoard[drop] + 1;
  //       drop++;
  //       displaySlotValues();
  //     }
  //   }
  //
  //
  // }

  var delayedPebblesTracker = numberOfPebbles; //variable to track the number of Pebbles inside setTimeout function to fix the issue of the for loop executing faster than the setTime out funcion.
  for (i = 0; i < numberOfPebbles; i++) {

    setTimeout(function() {
      //Circular access of array formula
      drop = (drop % sungkaBoard.length + sungkaBoard.length) % sungkaBoard.length;
      if (player1Turn === true) {
        if (drop === 15) {
          drop = drop + 2;
          sungkaBoard[0] = sungkaBoard[0] + 1;

          if (delayedPebblesTracker===1) {
              playerTwoTurn();
              if(sungkaBoard[0] === 1 &&  sungkaBoard[14]>=1){
                sungkaBoard[7] = sungkaBoard[7]+sungkaBoard[14]+sungkaBoard[0];
                sungkaBoard[14]=0;
                sungkaBoard[0]=0;
              }
          }
          displaySlotValues();
        } else {
          sungkaBoard[drop] = sungkaBoard[drop] + 1;
          if (delayedPebblesTracker===1) {
            if (drop>=1 && drop<=6 && sungkaBoard[drop]===1){
              console.log("API success!");
              var slicedArray=sungkaBoard.slice(8,15);
              var mirroredArray=slicedArray.reverse();
              if (mirroredArray[drop]>=1){
              sungkaBoard[7]=sungkaBoard[7]+mirroredArray[drop]+sungkaBoard[drop];
              sungkaBoard[drop]=0;
              convertOppositeToZeroPlayer1(drop);
              }
              playerTwoTurn();
            }
            else if (drop === 7) {
              console.log("Still player 1's Turn");
            } else {
              playerTwoTurn();
            }
          }
          drop++;
          displaySlotValues();
        }
      } else {
        if (drop === 7) {
          drop = drop + 2;
          sungkaBoard[8] = sungkaBoard[8] + 1;
          if (delayedPebblesTracker===1) {
              playerOneTurn();
              if(sungkaBoard[8] === 1 &&  sungkaBoard[6]>=1){
                sungkaBoard[15] = sungkaBoard[15]+sungkaBoard[6]+sungkaBoard[8];
                sungkaBoard[6]=0;
                sungkaBoard[8]=0;
              }
          }
          displaySlotValues();
        } else {
          sungkaBoard[drop] = sungkaBoard[drop] + 1;
          if (delayedPebblesTracker===1) {
            if (drop>=8 && drop<=14 && sungkaBoard[drop]===1){
              console.log("API success!");
              var slicedArray=sungkaBoard.slice(0,7);
              var mirroredArray=slicedArray.reverse();
              if (mirroredArray[drop-8]>=1){
              sungkaBoard[15]=sungkaBoard[15]+mirroredArray[drop-8]+sungkaBoard[drop];
              sungkaBoard[drop]=0;
              convertOppositeToZeroPlayer2(drop);
            }
              playerOneTurn();
            }
            else if (drop === 15) {
              console.log("Still player 2's Turn");
            } else {
              playerOneTurn();
            }
          }
          drop++;
          displaySlotValues();
        }
      }
      delayedPebblesTracker--;
      checkGameFinish();
    }, 500 * i);
  }


  // var i=0;
  // if (i < numberOfPebbles) {
  //   setTimeout(function() {
  //       //Circular access of array
  //       drop = (drop % sungkaBoard.length + sungkaBoard.length) % sungkaBoard.length;
  //       //Circular access of array
  //       if (player1Turn === true) {
  //         if (drop === 15) {
  //           drop++;
  //           numberOfPebbles++;
  //         } else {
  //           sungkaBoard[drop] = sungkaBoard[drop] + 1;
  //           drop++;
  //           displaySlotValues();
  //         }
  //       } else {
  //         if (drop === 7) {
  //           drop++;
  //           numberOfPebbles++;
  //         } else {
  //           sungkaBoard[drop] = sungkaBoard[drop] + 1;
  //           drop++;
  //           displaySlotValues();
  //         }
  //       }
  //   i++;
  //   }, 500 * i);
  //   }
  // if (i<numberOfPebbles)

}

//change this to switch

function convertOppositeToZeroPlayer1(drop){
  if (drop===1){
    sungkaBoard[13]=0;
  }else if(drop===2){
    sungkaBoard[12]=0;
  }else if(drop===3){
    sungkaBoard[11]=0;
  }else if(drop===4){
    sungkaBoard[10]=0;
  }else if(drop===5){
    sungkaBoard[9]=0;
  }else if(drop===6){
    sungkaBoard[8]=0;
  }
}

function convertOppositeToZeroPlayer2(drop){
  if (drop===9){
    sungkaBoard[5]=0;
  }else if(drop===10){
    sungkaBoard[4]=0;
  }else if(drop===11){
    sungkaBoard[3]=0;
  }else if(drop===12){
    sungkaBoard[2]=0;
  }else if(drop===13){
    sungkaBoard[1]=0;
  }else if(drop===14){
    sungkaBoard[0]=0;
  }
}

function playerOneTurn(){
  player1Turn = true;
  $("#player-turn").text("Player 1 Turn");
}

function playerTwoTurn(){
  player1Turn = false;
  $("#player-turn").text("Player 2 Turn");
}


function slot1Player1() {
  var numberOfPebbles = sungkaBoard[0];
  sungkaBoard[0] = 0;
  blender(numberOfPebbles, 1);
}

function slot2Player1() {
  var numberOfPebbles = sungkaBoard[1];
  sungkaBoard[1] = 0;
  blender(numberOfPebbles, 2);
}

function slot3Player1() {
  var numberOfPebbles = sungkaBoard[2];
  sungkaBoard[2] = 0;
  blender(numberOfPebbles, 3);
}

function slot4Player1() {
  var numberOfPebbles = sungkaBoard[3];
  sungkaBoard[3] = 0;
  blender(numberOfPebbles, 4);
}

function slot5Player1() {
  var numberOfPebbles = sungkaBoard[4];
  sungkaBoard[4] = 0;
  blender(numberOfPebbles, 5);
}

function slot6Player1() {
  var numberOfPebbles = sungkaBoard[5];
  sungkaBoard[5] = 0;
  blender(numberOfPebbles, 6);
}

function slot7Player1() {
  var numberOfPebbles = sungkaBoard[6];
  sungkaBoard[6] = 0;
  blender(numberOfPebbles, 7);
}

function slot1Player2() {
  var numberOfPebbles = sungkaBoard[8];
  sungkaBoard[8] = 0;
  blender(numberOfPebbles, 9);
}

function slot2Player2() {
  var numberOfPebbles = sungkaBoard[9];
  sungkaBoard[9] = 0;
  blender(numberOfPebbles, 10);
}

function slot3Player2() {
  var numberOfPebbles = sungkaBoard[10];
  sungkaBoard[10] = 0;
  blender(numberOfPebbles, 11);
}

function slot4Player2() {
  var numberOfPebbles = sungkaBoard[11];
  sungkaBoard[11] = 0;
  blender(numberOfPebbles, 12);
}

function slot5Player2() {
  var numberOfPebbles = sungkaBoard[12];
  sungkaBoard[12] = 0;
  blender(numberOfPebbles, 13);
}

function slot6Player2() {
  var numberOfPebbles = sungkaBoard[13];
  sungkaBoard[13] = 0;
  blender(numberOfPebbles, 14);
}

function slot7Player2() {
  var numberOfPebbles = sungkaBoard[14];
  sungkaBoard[14] = 0;
  blender(numberOfPebbles, 15);
}

//change condition statement to sum if zero
function checkGameFinish(){
  if(sungkaBoard[0]===0&&sungkaBoard[1]===0&&sungkaBoard[2]===0&&sungkaBoard[3]===0&&sungkaBoard[4]===0&&sungkaBoard[5]===0&&sungkaBoard[6]===0){
    checkWinner();
  }else if(sungkaBoard[8]===0&&sungkaBoard[9]===0&&sungkaBoard[10]===0&&sungkaBoard[11]===0&&sungkaBoard[12]===0&&sungkaBoard[13]===0&&sungkaBoard[14]===0){
    checkWinner();
  }
}

function checkWinner(){
  if(sungkaBoard[7]>sungkaBoard[15]){
    alert("Game Over! Player 1 wins!");
  }else if(sungkaBoard[7]<sungkaBoard[15]){
    alert("Game Over! Player 2 wins!");
  }else{
    alert("Draw!")
  }
}


// function slot1Player1() {
//   var numberOfPebbles = sungkaBoard[0];
//   if (!nadampotNa) {
//     sungkaBoard[0] = 0;
//     nadampotNa = true;
//     blender(numberOfPebbles, 1);
//   } else {
//     slot2Player2();
//   }
// }

// for(i=1;i<8;i++){
// function window["slot"+i+"Player1"](){
//   var position=i-1;
//   var numberOfPebbles=sungkaBoard[position];
//   sungkaBoard[position]=0;
//   blender(numberOfPebbles,i);
// }
// }


$("div[type=button]").on("click", function() {
  var userChosenSlot = this.id;
  $("#" + userChosenSlot).fadeIn(100).fadeOut(100).fadeIn(100);
  window[userChosenSlot]();
});


// if(player1Turn===true){
// $("div[id*='Player1']").on("click", function() {
//   var userChosenSlot = this.id;
//   $("#" + userChosenSlot).fadeIn(100).fadeOut(100).fadeIn(100);
//   window[userChosenSlot]();
// });
// }else if(player1Turn===false){
// $("div[id*='Player2']").on("click", function() {
//   var userChosenSlot = this.id;
//   $("#" + userChosenSlot).fadeIn(100).fadeOut(100).fadeIn(100);
//   window[userChosenSlot]();
// });
// }
