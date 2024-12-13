const x=`<div class="cross-outer">
                <div class="left-cross"></div>
                <div class="right-cross"></div>
              </div>`
const o=`<div class="round">

                </div>`              
let gameCellsContainer=document.querySelector('.game-board')
const startButton=document.getElementById("start-button")
console.log(gameCellsContainer)
const xo=[x,o]


const GameBrd=(()=>{
  let gameBroad=["","","","","","","","",""]
  const render=()=>{
      let boardHTML="";
      gameBroad.forEach((cell,index)=>boardHTML+=`<div class="cell" id=cell-${index}>${cell}</div>`);
      gameCellsContainer.innerHTML=boardHTML;    
      const cells=document.querySelectorAll('.cell')
  cells.forEach((cell)=>{
    cell.addEventListener('click',Game.clicked)
  })
}
const update=(index,mark)=>{
gameBroad[index]=mark
render()
}
const getGameBoard=()=>gameBroad
return { render , update ,getGameBoard }
})();

const displayMessage=(()=>{
    const renderMessage=(message)=>{
      document.getElementById("status").innerHTML=message
    }
    const handleScore=(players,playerIndex)=>{
          players[playerIndex].score = players[playerIndex].score + 1
          console.log(`score in handleScoreFunction ${players[playerIndex].score}`)
          document.getElementById(`score-player-${playerIndex}`).innerHTML=players[playerIndex].score
           document.getElementById("score-status").innerHTML=`${players[playerIndex].name}  scored`
            console.log('winsScore',GameBrd.getGameBoard())
            // console.log('winsScore',GameBrd.getGameBoard().filter((x)=>x==="").length===0)
    }
    return{
      renderMessage,handleScore
    }
})();



// 012
// 345
// 678

// 048
// 246

// 036
// 147
// 258

const createPlayer=(name,mark,score)=>{
       return {
        name,mark,score
       }
}
 const checkWin=(board,index)=>{
   const winConditions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
   ]
   for(let i=0;i<winConditions.length;i++){
    const [a,b,c]=winConditions[i]
    if(winConditions[i].includes(index) && board[a] && (board[a] === board[b]) && (board[a] === board[c])){
      console.log(a,board[a],b,board[b],c,board[c])
        return true
    }
   }
   return false
 }
const isATie=(board,players)=>{
  return board.every((val)=>val!=="") && players.every((x)=>x.score===players[0].score || x.score>=1)
}




const Game=(()=>{
  let players;
  let currentPlayerIndex;
  let gameOver;
   const start=()=>{
      currentPlayerIndex=0
      gameOver=false;
      let random=getRandomElement(xo)
      let removePlayerEntered=xo.filter((x)=>x!==random)
      players=[ createPlayer(document.getElementById('player-1').value,random,0),
      createPlayer(document.getElementById('player-2').value,removePlayerEntered[0],0)]
      GameBrd.render() 
      // const cells=document.querySelectorAll('.cell')
      // cells.forEach((cell)=>{
      //   cell.addEventListener('click',clicked)
      // })   
   }
   const clicked=(event)=>{
    if(GameBrd.getGameBoard().every((val)=>val!=="")){ gameOver=true;  }
    
    if(gameOver){return}
    const index=parseInt(event.target.id.split("-")[1])
    console.log(`current Player index ${currentPlayerIndex}`)
    if(GameBrd.getGameBoard()[index]!=="") return
    
    GameBrd.getGameBoard().filter((x)=>x==="").length>1?displayMessage.renderMessage(`${players[currentPlayerIndex===0?1:0].name}'s Turn`):displayMessage.renderMessage(`Game Over`)
    GameBrd.update(index,players[currentPlayerIndex].mark)
   
    if(checkWin(GameBrd.getGameBoard(),index)){
     
      console.log(`${players[currentPlayerIndex].name} scored,currentIndex${currentPlayerIndex}`)
      displayMessage.handleScore(players,currentPlayerIndex)
    }
    else if(isATie(GameBrd.getGameBoard(),players)){
      gameOver=true
      displayMessage.renderMessage("It's a tie")
    }
    // // else{
    //   currentPlayerIndex=currentPlayerIndex===0?1:0
    // }
    if(GameBrd.getGameBoard().filter((x)=>x==="").length===0 && players.every((x)=>x.score!==players[0].score)){
      document.getElementById("score-status").innerHTML=`${players.find((x)=>x.score===players.reduce((x,y)=>x.score>y.score?x.score:y.score,0)).name} Wons`
    }
    currentPlayerIndex=currentPlayerIndex===0?1:0
  
    console.log(event)
   }
   return{
    start,clicked
   }
})()
startButton.addEventListener('click',function(event){
  event.preventDefault(); 
  const Firstplayer=document.getElementById('player-1').value
const Secondplayer=document.getElementById('player-2').value
if (!Firstplayer.trim() || !Secondplayer.trim()) {
  alert('Both fields are required!');

  return;
}
document.getElementById('firstPlayer').textContent=Firstplayer
document.getElementById('secondPlayer').textContent=Secondplayer

 Game.start()



})


console.log(gameCellsContainer)

function getRandomElement(array){
    return array[Math.floor(Math.random()*array.length)]
}



























// function win(cellindex){
//   if(cellindex===0){
//       if(cells[cellindex] && ((cells[1] && cells[2]) || (cells[3] && cells[6]) || (cells[4] && cells[8]))){
//         return true
//       }
// }
// }

// function computer(notPlayerENterd,remainingcells){
//   if(!remainingcells.length) return
//   let randomCell=getRandomElement(remainingcells)
//   randomCell.innerHTML= notPlayerENterd[0]
//   notPlayerENterd[0]===gameBroad.xo[0]?gameBroad.board.push('X'):gameBroad.board.push('O')
// }


// function player(cell,arrayofXandO,index){
//   if(cell.innerHTML.trim()!=='') return
//     let random=getRandomElement(arrayofXandO)
//     console.log(random)
//     cell.innerHTML=random
//     random===gameBroad.xo[0]?gameBroad.board.push('X'):gameBroad.board.push('O')
//     console.log('celll',cell,index)
//     // win(index)?console.log('player Wins'):null
//     let remainingcells=[...cells].filter((c)=>c.innerHTML.trim()==='')
//     console.log('remaining cells',remainingcells)
//     let removePlayerEntered=arrayofXandO.filter((x)=>x!==random)
//     console.log('remove',removePlayerEntered)
// //     computer(removePlayerEntered,remainingcells)
// }


// cells.forEach((y,index)=>{
  
//         y.addEventListener('click',function(event){
//           player(y,gameBroad.xo,index);
//         })
      
// })
// console.log("Broad",gameBroad.board)
// function win(cell){
//   if(cells[0] && ((cells[1] && cells[2]) || (cells[3] && cells[6]))){
//          return true
//   }
// }