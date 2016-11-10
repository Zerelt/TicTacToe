$(document).ready(function() {
    var x = "x";
    var o = 'o';
    var arr = [
        'A1',
        'A2',
        'A3',
        'B1',
        'B2',
        'B3',
        'C1',
        'C2',
        'C3'
    ];
    var count = 0;
    var clickAllowed = true;

    //modal window and user select marker
    function modalWindow() {
        $("#modal").css('display', 'block');
    }
    modalWindow();
    $('#chooseO').on('click', function() {
        $("#modal").css('display', 'none');
        x = 'o';
        o = 'x';
    });
    $('#chooseX').on('click', function() {
        $("#modal").css('display', 'none');
    });

    //reset
    function empty() {
        $('.square').html('');
        $('h1').text("");
        setTimeout(function() {
            clickAllowed = true;
        }, 500);//2000
    }

    //check if there are 3 in a row
    function check(a, b, c) {
        if ($('#' + a).text() === x && $('#' + b).text() === x && $('#' + c).text() === x) {
            $('h1').text("Player " + x + " wins !");
            clickAllowed = false; //necessary in case you're not the one to choose/click last before game ends
            return true;
        }
        if ($('#' + a).text() === o && $('#' + b).text() === o && $('#' + c).text() === o) {
            $('h1').text("Player " + o + " wins !");
            clickAllowed = false; //necessary in case you're not the one to choose/click last before game ends
            return true;
        }
        return false;
    }

    // check if there are 3 in a row in any possible winnable combination
    function resultCheck() {
        var chk1 = check(arr[0], arr[1], arr[2]);
        var chk2 = check(arr[3], arr[4], arr[5]);
        var chk3 = check(arr[6], arr[7], arr[8]);
        var chk4 = check(arr[0], arr[3], arr[6]);
        var chk5 = check(arr[1], arr[4], arr[7]);
        var chk6 = check(arr[2], arr[5], arr[8]);
        var chk7 = check(arr[0], arr[4], arr[8]);
        var chk8 = check(arr[2], arr[4], arr[6]);

        if (chk1 || chk2 || chk3 || chk4 || chk5 || chk6 || chk7 || chk8) {
            setTimeout(empty, 500);//1500
            return true;
        }
        return false;
    }

    //computer turn
    function comp() {
        for (var i = 0; i < arr.length; i++) {
            if ($('#' + arr[i]).text() === "") {
                count++;
            }
        }
        var rnd = "#" + arr[Math.floor(Math.random() * 9)];
        if (count > 1 && resultCheck() === false) {
            if ($(rnd).text() === "") {
                $(rnd).html("<p>" + o + "</p>").css('color', '#C7B21A');
                count = 0;
                resultCheck();
            } else {
                count = 0;
                comp();
            }
            // setTimeout(function() {
                clickAllowed = true;
            // }, 500);//600
        } else if (count < 2 && resultCheck() === false) {
            $('h1').text("It's a tie !");
            setTimeout(empty, 500);//1000
        } else {
            setTimeout(empty, 500);//1000
        }
    }

    //user turn
    $(".square").click(function() {
        resultCheck();
        if ($(this).html() === "" && (resultCheck() === false && clickAllowed)) {
            $(this).html("<p>" + x + "</p>").css('color', '#29f0b7');
            clickAllowed = false;
            setTimeout(comp, 500);//500
        }
    });

});
