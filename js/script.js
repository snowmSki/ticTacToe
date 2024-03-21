"use strict";


window.addEventListener("DOMContentLoaded",()=>{
   
    function getElements(){
        const btn = document.getElementById("button"),
              main = document.querySelector(".main"),
              game = document.querySelector(".game"),
              who = document.getElementById("who"),
              items = document.querySelectorAll(".block__items"),
              playAgain = document.querySelector(".game__again"),
              winner = document.querySelector(".winner")

              return{
                btn: btn,
                main: main,
                game: game,
                who : who,
                items: items,
                currentPlayer: '',
                playAgain: playAgain,
                winner: winner,
              }
    }
    
    function clickEvent(object){
        object.btn.addEventListener("click",()=>{
            object.main.style.display = "none";
            object.game.style.display = "block";
            players(object)
           
            
        })
    }

    clickEvent(getElements())

    function gameDisabled(object){
 
        object.game.style.display = "none"
    }
    gameDisabled(getElements())

    function players(object) {
        if (object.currentPlayer === "p1") {
            object.who.innerHTML = "X"; 
        } else {

            object.who.innerHTML = "O"; 
        }
    }
    

    function getBlockItems(object) {
        object.items.forEach(items => {
            items.addEventListener("click", (event) => {
                if (!event.target.classList.contains("p1") && !event.target.classList.contains("p2") && event.target.innerHTML === "") {
                    if (object.currentPlayer === "p1") {
                        event.target.classList.add("p1");
                        object.currentPlayer = "p2"
                        event.target.innerHTML = "<span class='x'>X</span>"
                    } else {
                        event.target.classList.add("p2");
                        object.currentPlayer = "p1"
                        event.target.innerHTML = "<span class='o'>O</span>"
                        
                    }

                    players(object);
                    isWinner(object);
                    isDraw(object);                
                    
                }
                
            });
        });
       
    
    }
    

    getBlockItems(getElements());


function ressetGame(object){
    object.items.forEach(items => {

        items.classList.remove("p1","p2")
        items.innerHTML = ""
    })
    object.currentPlayer = "p2"
    
    players(object);

}

   



function winCombination(){
    const winArray = [
        [0,1,2],[3,4,5],[6,7,8], // ჰორიზონტალური 
        [0,3,6],[1,4,7],[2,5,8], // ვერტიკალური
        [0,4,8],[2,4,6] // დიაგონალი

    ]

    return winArray

}
function checkWinner(combination,object){
 
        for (let combo of combination){

            const [a,b,c] = combo;
            const items = object.items
            const itemA = items[a].innerHTML;
            const itemB = items[b].innerHTML;
            const itemC = items[c].innerHTML;

            if (itemA !== "" && itemA === itemB && itemA === itemC) {
                return true;
            }
        }
    
        return false;

            
    
}

function isWinner(object){
    const winCombinations = winCombination();
    if(checkWinner(winCombinations,object)){
      object.currentPlayer === "p1" ? object.winner.innerHTML = "Winner is: 0" : object.winner.innerHTML = "Winner is: X"
      ressetGame(object) 
    }else if(isDraw(object)){
        object.winner.innerHTML = "is a draw"
        ressetGame(object);
    }


}

function isDraw(object) {
    const items = object.items;
    for (let item of items) {
        if (item.innerHTML === "") {
            return false
        }
    }
    return true;
}



})