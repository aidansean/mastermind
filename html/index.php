<?php
$code_length = (isset($_GET['n'])) ? $_GET['n'] : 4 ;
$title = 'Generic code game' ;
$js_scripts  = array('functions.js') ;
$stylesheets = array('style.css') ;
include($_SERVER['FILE_PREFIX'] . '/_core/preamble.php') ;
?>
    <script type="text/ecmascript"><?php echo 'var code_length = ' , $code_length , ' ;' ; ?></script>
    <div class="right">
      <h3>About this page</h3>
      <div class="blurb">
        <p>Guess the code!  Click on the coloured cells to change your guess.  If you get a letter correct, and it is in the correct position you will get 10 points.  If you get a letter correct, but it is not in the correct position you will get 1 point.</p>
        <table id="game_board">
          <thead>
            <tr id="tr_code_row"></tr>
            <tr>
              <th id="th_code">Code</th>
              <th class="th_score">Score</th>
            </tr>
          </thead>
          <tbody id="tbody_code">
            <tr id="tr_guess_row"><tr>
            <tr id="tr_play_again_row">
              <td id="td_playAgain"><input id="submit_playAgain" class="submit" type="submit" value="Play again"/></td>
            </tr>
          </tbody>
        </table>
        
        <p class="center">Play with <input id="input_code_length" value="4"/> columns <input type="submit" id="submit_change_n" value="Go!"/></p>
      </div>
    </div>

<?php foot() ; ?>