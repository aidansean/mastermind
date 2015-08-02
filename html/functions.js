function letter_object(character, color){
  this.character = character ;
  this.color = color ;
  this.className = 'td_code ' + this.color ;
  this.update_cell = function(i){
    Get('td_guess_'+i).innerHTML = this.character ;
    Get('td_guess_'+i).className = this.className ;
  }
}
//var code_length = 6 ;
var n_letters = 6 ;
var letters = new Array() ;
var code    = new Array() ;
var guess   = new Array() ;

letters.push(new letter_object('A','red'   )) ;
letters.push(new letter_object('B','green' )) ;
letters.push(new letter_object('C','blue'  )) ;
letters.push(new letter_object('D','yellow')) ;
letters.push(new letter_object('E','purple')) ;
letters.push(new letter_object('F','aqua'  )) ;

function make_code(){
  for(var i=0 ; i<code.length ; i++) code[i] = Math.floor(Math.random()*n_letters) ;
}
function mousedown(e){
  e.preventDefault() ;
}
function iterate_guess(e){
  i = e.target.id.split('_')[2] ;
  e.preventDefault() ;
  
  // Clear selected text
  if(document.selection && document.selection.empty){
    document.selection.empty() ;
  }
  else if(window.getSelection){
    var sel = window.getSelection() ;
    sel.removeAllRanges() ;
  }
  
  guess[i] = (guess[i]+1)%n_letters ;
  letters[guess[i]].update_cell(i) ;
}
function start(){
  Get('game_board').style.width = (code_length*50+140) + 'px' ;
  var tr = Get('tr_code_row') ;
  for(var i=0 ; i<code_length ; i++){
    var td = Create('td') ;
    td.id = 'td_code_' + i ;
    td.className = 'td_code grey' ;
    td.innerHTML = '?' ;
    tr.appendChild(td) ;
  }
  var td = Create('td') ;
  tr.appendChild(td) ;
  
  var tr = Get('tr_guess_row') ;
  for(var i=0 ; i<code_length ; i++){
    var td = Create('td') ;
    td.id = 'td_guess_' + i ;
    td.className = 'td_code' ;
    tr.appendChild(td) ;
  }
  var td = Create('td') ;
  var input = Create('input') ;
  input.id = 'submit_guess' ;
  input.className = 'submit' ;
  input.type = 'submit' ;
  input.value = 'Guess' ;
  td.appendChild(input) ;
  tr.appendChild(td) ;

  for(var i=0 ; i<code_length ; i++){
    code[i]  = -1 ;
    guess[i] =  0 ;
    Get('td_guess_'+(i)).addEventListener('click'    , iterate_guess) ;
    Get('td_guess_'+(i)).addEventListener('mousedown', mousedown    ) ;
    Get('td_guess_'+(i)).innerHTML = letters[0].character ;
    Get('td_guess_'+(i)).className = letters[0].className ;
  }
  Get('submit_guess'    ).addEventListener('click', evaluate_guess) ;
  Get('submit_playAgain').addEventListener('click', start_new_game) ;
  Get('submit_change_n' ).addEventListener('click', change_n      ) ;
  Get('th_code'     ).setAttribute('colspan',code_length) ;
  Get('td_playAgain').setAttribute('colspan',code_length) ;
  make_code() ;
  for(var i=0 ; i<code_length ; i++){ guess[i] =  0 ; }
  Get('input_code_length').value = code_length ;
  start_new_game() ;
}
function start_new_game(){
  var tbody = Get('tbody_code') ;
  var rows = tbody.children;
  var nRows = rows.length ;
  for(var i=nRows-1 ; i-- ; i>=0){
    var tr = rows[i] ;
    if(tr.className!='tr_past_guess') continue ;
    tbody.removeChild(tr) ;
  }
  for(var i=0 ; i<code_length ; i++){
    guess[i] = 0 ;
    Get('td_code_' +(i)).innerHTML = '?' ;
    Get('td_code_' +(i)).className = 'td_code grey'
    Get('td_guess_'+(i)).innerHTML = letters[guess[i]].character ;
    Get('td_guess_'+(i)).className = letters[guess[i]].className ;
  }
  make_code() ;
  Get('tr_play_again_row').style.display = 'none' ;
  Get('tr_guess_row').style.display = '' ;
}
function change_n(){
  var n_old = code_length ;
  var n_new = parseInt(Get('input_code_length').value) ;
  if(isNaN(n_new) || n_new<=0) return ;
  window.location = '?n=' + n_new ;
}
function evaluate_guess(){
  var n_code  = new Array() ;
  var n_guess = new Array() ;
  var score = 0 ;
  for(var i=0 ; i<n_letters ; i++){
    n_code .push(0) ;
    n_guess.push(0) ;
    for(var j=0 ; j<code_length ; j++){
      n_code[i]  += ( code[j]==i ) ;
      n_guess[i] += (guess[j]==i ) ;
    }
    score += Math.min(n_code[i],n_guess[i]) ;
  }
  for(var i=0 ; i<code_length ; i++){
    if(code[i]==guess[i]) score += 9 ;
  }
  if(score==10*code_length){
    insert_guess_row(score) ;
    reveal_code() ;
    Get('tr_play_again_row').style.display = '' ;
    Get('tr_guess_row').style.display = 'none' ;
    alert('Congratulations!  You win!') ;
  }
  else{
    insert_guess_row(score) ;
  }
}
function insert_guess_row(score){
  var tbody = Get('tbody_code') ;
  var tr = Create('tr') ;
  tr.className = 'tr_past_guess' ;
  for(var i=0 ; i<code_length ; i++){
    var td = Create('td') ;
    td.innerHTML = letters[guess[i]].character ;
    td.className = letters[guess[i]].className ;
    tr.appendChild(td) ;
  }
  var td = Create('td') ;
  td.className = 'td_score' ;
  td.innerHTML = score ;
  tr.appendChild(td) ;
  tbody.insertBefore(tr,Get('tr_guess_row')) ;
}
function reveal_code(){
  for(var i=0 ; i<code_length ; i++){
    var td = Get('td_code_'+i) ;
    td.innerHTML = letters[code[i]].character ;
    td.className = letters[code[i]].className ;
  }
}
function Get(id){ return document.getElementById(id) ; }
function Create(type){ return document.createElement(type) ; }