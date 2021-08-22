var question = []; 
var count = 0; 

/*  ─────────────────────  메세지 설정 //object  ─────────────────────  */ 

var notice = { 
		 notOne: "한 칸에 숫자를 하나씩 입력하세요.", // Enter each digit into each input field. 
		 notNumber: "숫자가 아닙니다.", 			 // It's not digit. 
		 repeated: "같은 숫자가 이미 있습니다. 다른 숫자를 입력하세요.", // No digits can be duplicated. 
		 correct: "정답입니다.", 				 // Congratulations. Your answer is correct. 
		 incorrect: "다시 도전하세요!" // Your answer is incorrect. Start a new game. 
}; 


/*  ────────────────────  메세지 팝업창  ────────────────────  */ 

function alertWindow ( message ) { // "alert()" 대신에, 팝업창을 만듦

	 var text   = "<p>" + message + "</p><br />"; 
	      text += "<button onclick=' self.close() '> 창 닫기 </button>"; // Close button. 

	 var bodyStyle = "font-family: sans-serif; font-size: 12px; text-align: center;"; 

	 var winStyle = "width=300,height=100,resizable=0,status=0,toolbar=0,menubar=0,location=0,scrollbars=0"; 

	 var alertWin = window.open( "" , "_blank" , winStyle ); 
	      alertWin.document.body.innerHTML = text; 
	      alertWin.document.body.style.cssText = bodyStyle; 
} 


/*  ───────────────────   문제 출제용 함수 (4자리수 임의 생성)  ───────────────────  */ 
// lengths : 4
function setQuestion ( lengths ) { 
	 var arr = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]; 
	      arr.sort(function(){
              //Math.random() 함수는 0~1사이 실수를 return 함
              return Math.random()-Math.random();
          });
          console.log(arr);
	 return arr.slice( 0, lengths ); 
} 


/*  ─────────────────────  재시작용  ─────────────────────  */  

function reStarting () { count = 0; question = []; } 


/*  ───────────────────   게임 진행 함수   ───────────────────  */ 

function playOneRound ( tagList ) { 
    // formArea에서 받은 text값 4개로 구성된 List 생성
	 var lengths = tagList.length; 

     console.log(question);

	 if ( count == 0 ) { 
		 while ( question.length < lengths ) question = setQuestion( lengths ); 
	 } 

	 var guess = []; 
     // bulls 스트라이크, cows 볼

	 var bulls = cows = 0; 
	 var final; 

	 for ( var x = 0; x < lengths; x++ ){ guess[ x ] = tagList[ x ].value; }


	 var questionText = question.join().replace( /,/g , "" );
     console.log(questionText); 
	 var guessText = guess.join().replace( /,/g , "" ); 
     console.log(guessText);

	 for ( var x = 0; x < lengths; x++ ) { 

		 var tag = tagList[ x ]; 
         console.log(tag);

		 var value = tag.value.replace( / /g, "" ); 
         console.log(value);

		 var position = guessText.search( value ); 

		 if ( !value || value > 9 ) { 
			 tag.select(); 
			 return alertWindow( notice.notOne ); 
		 } 
		 else if (  isNaN( value )  ) { 
			 tag.select(); 
			 return alertWindow( notice.notNumber ); 
		 } 
		 else if (  position > -1  && position != x ) { 
			 tag.select(); 
			 return alertWindow( notice.repeated ); 
		 } 


		 position = questionText.search( value ); 

		 if ( position == x ){ bulls += 1; } 
		 else if ( position > -1 ){ cows += 1; }  
	 } 


	 if ( bulls < lengths && count == 8 ){ final = notice.incorrect; } 
	 else if ( bulls == lengths ){ final = notice.correct; } 

	 questionText = question.join( ", " ); 
	 guessText = guess.join( ", " ); 


	 var score = { 
		 count: count, 
		 bulls: bulls, 
		 cows: cows, 
		 question: questionText, 
		 guess: guessText, 
		 final: final 
	 }; 

	 if ( final ){ reStarting(); } 
	 else { count++; } 
	 return score; 
} 

/*  ─────────────────────  관련 태그들  ─────────────────────  */ 

var formArea = document.getElementById( "formArea" ); 
var inputList = formArea.getElementsByTagName( "input" ); 

var tbodyArea = document.getElementById( "tbodyArea" ); 
var trList = tbodyArea.getElementsByTagName( "tr" ); 

var check_Correct = document.getElementById( "check_Correct" ); 


/*  ───────────────────   게임 실행 & 결과 출력  ──────────────────  */ 
/* 게임 실행 (결과보기 버튼 클릭 시 실행) */

function bullsAndCows () { 

    //playOneRound 함수 실행, 인자로 inputList 전달
	 var result = playOneRound( inputList ); 

    console.log(result);

	 if ( result == undefined ) return; 

	 var strikes = result.bulls; 
	 var balls = result.cows; 
	 var roundScore =  strikes + " 스트라이크 │ " + balls + " 볼"; 


	 var count = result.count; 
     // 게임 초기화
	 if ( count == 0 ){ deleteText(); } 

	 var question = result.question; 
	 var guess = result.guess; 

	 var tr = trList [ count ]; 

	 var td1 = tr.getElementsByTagName( "td" )[ 1 ]; 
	 var td2 = tr.getElementsByTagName( "td" )[ 2 ]; 

	 td1.innerHTML = guess; 
	 td2.innerHTML = roundScore; 
     
	 var text = ""; 
	 var final = result.final; 
     console.log(final);
    
     //final에 값이 있을 때
	 if ( final ) { 
         // 틀렸으면 
		 if ( strikes < inputList.length ){ 
             text = "  " + final + "정답은 " + question + " 입니다."; 
             alertWindow(text,notice.incorrect);} 
		 // 정답이라면
         else { 
             text = final; 
             alertWindow(notice.correct); 
        }
    } 
    

	 check_Correct.innerHTML = ""; 

	 formArea.reset(); 
	 inputList[0].focus(); 
} 


/*  ──────────────────  마우스 커서, 자동 이동  ──────────────────  */ 

function changeFocus ( tag , next , event ){ 

	 event = event || window.event; 

	 var keyCode = event.which || event.keyCode;

	 if ( keyCode == 8 || keyCode == 46 ){ return; } 

	 else if ( tag.value.length == 1 ){ inputList[ next ].select(); } 
} 

inputList[ 0 ].onkeyup = function( e ){ changeFocus ( this , 1 , e ) }; 
inputList[ 1 ].onkeyup = function( e ){ changeFocus ( this , 2 , e ) }; 

if ( inputList[ 3 ] != undefined ){ 
	 inputList[ 2 ].onkeyup = function( e ) { changeFocus( this , 3 , e ) }; 
} 


/*  ─────────────────────    리셋 효과   ─────────────────────  */ 

function deleteText () { 

	 inputList[0].focus(); 

	 for ( var x = 0; x < trList.length; x++ ) { 

		 var tr = trList [ x ]; 
		 var tdList = tr.getElementsByTagName( "td" ); 

		 tdList[ 1 ].innerHTML = "&nbsp;"; 
		 tdList[ 2 ].innerHTML = "&nbsp;"; 
	 } 
} 
