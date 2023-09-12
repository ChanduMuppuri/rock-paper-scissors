let score=JSON.parse(localStorage.getItem('score'))||{
  wins:0,
  losses:0,
  Ties:0
};

updateScoreElement();

/* if(!score){
score={
  wins:0,
  losses:0,
  Ties:0
};
}*/

let isAutoPlaying=false;
let intervalId;

function autoplay(){
  if(!isAutoPlaying){
    intervalId=setInterval(()=>{
    const playerMove=pickComputerMove();
    playGame(playerMove);
    },1000)
    isAutoPlaying=true;
  }else{
    clearInterval(intervalId);
    isAutoPlaying=false;
  }
  
}

document.querySelector('.js-rock-button').addEventListener('click',()=>{
  playGame('Rock');
})

document.querySelector('.js-paper-button').addEventListener('click',()=>{
  playGame('Paper');
})

document.querySelector('.js-scissors-button').addEventListener('click',()=>{
  playGame('Scissors');
})

document.body.addEventListener('keydown',(event)=>{
  if(event.key==='r'){
    playGame('Rock');
  }else if(event.key==='p'){
    playGame('Paper');
  }else if(event.key==='s'){
    playGame('Scissors');
  }
})

function playGame(playerMove){
const computerMove=pickComputerMove();

let result='';

if(playerMove==='Rock'){
  if(computerMove==='Rock'){
  result='Tie';
  }else if(computerMove==='Paper'){
    result='You loss';
  }else if(computerMove==='Scissors'){
    result='You win';
  }

}else if(playerMove==='Paper'){
  if(computerMove==='Rock'){
  result='You win';
  }else if(computerMove==='Paper'){
    result='Tie';
  }else if(computerMove==='Scissors'){
    result='You loss';
  }

}else if(playerMove==='Scissors'){
  if(computerMove==='Rock'){
  result='You loss';
  }else if(computerMove==='Paper'){
    result='You win';
  }else if(computerMove==='Scissors'){
    result='Tie';
  }
}

if(result === 'You win'){
  score.wins++;
}else if(result === 'You loss'){
  score.losses++;
}else if(result === 'Tie'){
  score.Ties++;
}

localStorage.setItem('score',JSON.stringify(score));

updateScoreElement();

document.querySelector('.js-result').innerHTML=result;
document.querySelector('.js-moves').innerHTML=`You
<img src="images/${playerMove}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon">
computer`;
}

function updateScoreElement(){
document.querySelector('.js-score').
  innerHTML=`wins:${score.wins}, losses:${score.losses}, Ties:${score.Ties}.`;
}

function pickComputerMove(){
const randomNumber=Math.random();
let computerMove=''; 

if(randomNumber>=0 && randomNumber<1/3){
  computerMove='Rock';
}else if(randomNumber>=1/3 && randomNumber<2/3){
  computerMove='Paper';
}else if(randomNumber>=2/3 && randomNumber<1){
  computerMove='Scissors';
}

return computerMove;
}