
$(document).ready(function() {
  var x = "x";
  var o = 'o';
  var arr = ['A1','A2','A3','B1','B2','B3','C1','C2','C3'];
  var count = 0;

  //modal window and user select marker
  function modalWindow () {
    setTimeout($("#modal").css('display' , 'block'),500);
  }
  modalWindow();
  $('#chooseO').on('click', function () {
    $("#modal").css('display' , 'none');
    x='o';
    o='x';
  });
  $('#chooseX').on('click', function () {
    $("#modal").css('display' , 'none');
  });


  //reset
  function empty () {
    $('.square').html(' ');
    $('h1').text(" ");
  }
  //check if there are 3 in a row
  function check (a,b,c) {
    if ($('#'+a).text()=== x && $('#'+b).text()=== x && $('#'+c).text()=== x) {
      // console.log('Player "x" wins !');
      $('h1').text("Player "+x+" wins !");
      // setTimeout($('.square').html(' '),2000);
      return true;
    }
    if ($('#'+a).text()=== o && $('#'+b).text()=== o && $('#'+c).text()=== o) {
      // console.log('Player "o" wins !');
      // setTimeout($('.square').html(' '),2000);
      $('h1').text("Player "+o+" wins !");
      return true;
    }
      return false;

  }
  // check if there are 3 in a row in any possible winnable combination
  function resultCheck () {
    var chk1 = check( arr[0],arr[1],arr[2] );
    var chk2 = check( arr[3],arr[4],arr[5] );
    var chk3 = check( arr[6],arr[7],arr[8] );
    var chk4 = check( arr[0],arr[3],arr[6] );
    var chk5 = check( arr[1],arr[4],arr[7] );
    var chk6 = check( arr[2],arr[5],arr[8] );
    var chk7 = check( arr[0],arr[4],arr[8] );
    var chk8 = check( arr[2],arr[4],arr[6] );

    if (chk1 === true || chk2 === true ||  chk3 === true || chk4 === true || chk5 === true || chk6 ===true || chk7 === true || chk8 === true) {

      // setTimeout($('.square').html(' '),2000);
      setTimeout(empty,2000);
      return true;
    }
    return false;
  }
  //computer turn
  function comp() {
    for ( var i=0 ; i<arr.length ; i++ ) {
      if ( $('#'+arr[i]).text()===" " ) {
        count++;
      }
      // console.log(count);
    }
    var rnd = "#" + arr[Math.floor(Math.random()*9)];
    // console.log(rnd);

    if ( count > 1 && resultCheck() === false ) {
      if ( $(rnd).text()===" " ) {
        $(rnd).html("<p>" + o + "</p>");
        count=0;
        resultCheck();
      } else { count=0; comp(); }
    } else if ( count < 2 && resultCheck() === false) {
      $('h1').text("It's a tie !");setTimeout(empty,2000);
    } else  {
      setTimeout(empty,2000);
    }

  }
  //user turn
  $(".square").click(function() {
    resultCheck();
    // console.log(resultCheck());
    if ( $(this).html()===" " && resultCheck() === false ) {
      $(this).html("<p>" + x + "</p>");
      setTimeout(comp,500);
      // resultCheck();
    }
  });

});
