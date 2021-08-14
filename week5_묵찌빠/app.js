/* Logic */

var score = 0;
var playerChoice;

var playerinlead = false;
var cpuinlead = false;

var readable = {
  '0': '바위',
  '1': '보',
  '2': '가위'
};

// 컴퓨터 가위바위보 결정
var cpuChoice = {
  init: function() {
    this.store = Math.floor(Math.random() * 3);
    this.text = readable[this.store];
  },
  store: '', // 0,1,2
  text: '' //주먹,보,가위
};

// Array
// [0,1,2] 까지만 하면 공수교대해서 내가 이기는 쪽이 되어도 이번에 비기면 집니다 출력!
// order[index] 가 order[index+1]한테 항상 지는 구조
// 바위 < 보 < 가위 < 바위
var order = [0, 1, 2, 0];

// 승패 결정 함수
// 각자에 맞는 숫자가 들어옴
var chooseWinner = function(player, cpu) {
  
  // case1) 사용자,컴퓨터 비겼을 때
  if(order[player] === order[cpu]) {
    
    // playerinlead가 true일때 (디폴트는 false)
    if(playerinlead){
      //true -> false로 다시 디폴트값 설정
        playerinlead = false;
        // +1점
        score++; // score = socre + 1 ;
        return "You won!";
    }

    // cpuinlead가 true일때 (디폴트는 false)
    if(cpuinlead){
        cpuinlead = false;
        score--;
        return "You Lost!";
    }

    // !playerinlead 는 playerinlead의 반대값, &&는 둘다 참일때만 true 
    //playerinlead cpuinlead가 둘 다 false였을때
    if(!playerinlead && !cpuinlead){
        return "비겼습니다! 다시 가위바위보!";
    }
  }
  // case2) player 승
  if(order[player] === order[cpu + 1]) {
    playerinlead = true;
    cpuinlead = false;
    return "이번에 비기면 이깁니다:) 묵찌빠!";
  } 
  // case3) cpu 승
    else {
    cpuinlead = true;
    playerinlead = false;
    return '이번에 비기면 집니다:( 묵찌빠!';
  }
}



/**
* UI
*/
//html p태그 지우면 화면 출력 안됨, p태그 paragraph 본문으로 감싸기..
var paragraph = document.querySelector('p');



//click 함수 (1)바위 이미지, 0 (2)보 이미지, 1 (3)가위 이미지, 2

var assignClick = function(tag, pos) {
  // assign a click listener
  tag.addEventListener('click', function() {

    // 사용자 선택
    playerChoice = pos;

    // 컴퓨터 선택 (초기화)
    cpuChoice.init();
    paragraph.innerText = '컴퓨터: ' + cpuChoice.text;

    // determine a winner
    // display the winner and the current score
    // innerText는 'Element'의 속성으로, 해당 Element 내에서 사용자에게 '보여지는' 텍스트 값을 읽어옵니다.
    paragraph.innerText += '\n' + chooseWinner(playerChoice, cpuChoice.store);
    paragraph.innerText += '\n' + 'SCORE: ' + score;
  });
}



// 기초 ui 가위바위보 이미지 세팅

var images = {
  //tags 에 이미지 3개 저장
  tags: document.getElementsByTagName('img'),
  init: function() {
    for(var step = 0; step < this.tags.length; step++) {
      assignClick(this.tags[step], step);
      //console.log(this.tags[step],step,'herherherheh')
      // 여기서 this는 tags와 init을 지칭
      //this.tags[step]은 개별 이미지 하나씩 [0]일땐 묵 [1]일땐 보 [2]일땐 가위
    }
  }
}

// 루프와 반복문
// var step;
// for (step = 0; step < 5; step++) {
//   // Runs 5 times, with values of step 0 through 4. 0,1,2,3,4
//   console.log('Walking east one step');
// }

images.init();
