$(document).ready(function () {
    let turn = 1;
    let index1 = 1, index2 = 1;
    let time1 = 60, time2 = 60;
    let noInc = false;
    let canStart = false;
    let isWinner1 = false, isWinner2 = false;
    let attempt1 = 0, attempt2 = 0;
    let name1 = 'player1', name2 = 'player2';
    let nameOfSquare = "#sq", nameOfCircle = "#circle";
    let player1Fields = [], player2Fields = [];
    let player1Circles = [], player2Circles = [];
    let player1Last4 = [], player2Last4 = [];
    let firstStart = true;
    let player1Combination = ['tref', 'pik', 'skocko', 'skocko'], player2Combination = ['tref', 'pik', 'skocko', 'skocko'];
    let handleInterval;
    let tied = false;

    init();
    function init() {
        let tmp = localStorage.getItem('kombinacije');
        let arr = JSON.parse(tmp);
        name1 = arr[0]['name'];
        name2 = arr[1]['name'];
        player1Combination = arr[0]['combination'];
        player2Combination = arr[1]['combination'];
    }

    function getAllIndexes(arr, val) {
        let indexes = [], i = -1;
        while ((i = arr.indexOf(val, i+1)) != -1){
            indexes.push(i);
        }
        return indexes;
    }

    function checkCombination(){
        let winner = [];
        if(turn == 1){
            let indexCircle = index1 - 4;
            let duplicate = [];
            
            for(let i = 0; i < 4; i++){
                duplicate.push(player1Last4[i]);
                let duplicateNum = getAllIndexes(duplicate, player1Last4[i]);
                let tmp = getAllIndexes(player2Combination, player1Last4[i]);
                if(duplicateNum.length > tmp.length)
                    continue;
                if(tmp.length != 0){
                    if(tmp.includes(i) == true){
                        $(nameOfCircle+indexCircle).css("background-color", "red");
                        indexCircle++;
                        player1Circles.push('red');
                        winner.push('red');
                    }else{
                        $(nameOfCircle+indexCircle).css("background-color", "yellow");
                        indexCircle++;
                        player1Circles.push('yellow');
                    }
                }else{
                    player1Circles.push('');
                }
            }
            if(winner.length == 4){
                isWinner1 = true;
                noInc = false;
                canStart = false;
            }
        }else{
            let indexCircle = index2 - 4;
            let duplicate = [];
            
            for(let i = 0; i < 4; i++){
                duplicate.push(player2Last4[i]);
                let duplicateNum = getAllIndexes(duplicate, player2Last4[i]);
                let tmp = getAllIndexes(player1Combination, player2Last4[i]);
                if(duplicateNum.length > tmp.length)
                    continue;
                if(tmp.length != 0){
                    if(tmp.includes(i) == true){
                        $(nameOfCircle+indexCircle).css("background-color", "red");
                        indexCircle++;
                        player1Circles.push('red');
                        winner.push('red');
                    }else{
                        $(nameOfCircle+indexCircle).css("background-color", "yellow");
                        indexCircle++;
                        player1Circles.push('yellow');
                    }
                }else{
                    player1Circles.push('');
                }
            }
            if(winner.length == 4){
                isWinner2 = true;
                noInc = false;
                canStart = false;
            }
        }
    }

    function clearTable() {
        $('.square').each(function (index, element) {
            let tmp = $(this).attr('id');
            if( !(tmp == 'tref' || tmp == 'pik' || tmp == 'karo' || tmp == 'srce' || tmp == 'zvezda' || tmp == 'skocko')){
                $(this).children('img').remove();    
            }
        });
        $('.circle').each(function (index, element){
            $(this).css('background-color', 'lightblue');
        })
    }

    function loadForPlayer1() {
        player1Last4 = [];
        index1 = 1;
        $('.square').each(function (index, element) {
            if(index < player1Fields.length){
                let img = $('<img>');
                img.attr('src', 'skocko-dodatno/' + player1Fields[index] + '.png');
                index1++;
                player1Last4.push(player1Fields[index]);
                if(player1Last4.length == 4){
                    checkCombination();
                    player1Last4 = [];
                }
                $(this).append(img);
            }
                
        });

    }

    function loadForPlayer2() {
        index2 = 1;
        player2Last4 = [];
        $('.square').each(function (index, element) {
            if(index < player2Fields.length){
                let img = $('<img>');
                index2++;
                img.attr('src', 'skocko-dodatno/' + player2Fields[index] + '.png');
                player2Last4.push(player2Fields[index]);
                if(player2Last4.length == 4){
                    checkCombination();
                    player2Last4 = [];
                }
                $(this).append(img);
            }
                
        });
    }

    function check(){
        if(turn == 1){
            if(player1Last4.length == 4){
                attempt1++;
                checkCombination();
                player1Last4 = [];
                turn = 2;
                noInc = true;
                setTimeout(function () { 
                    $('#igrac').text('Igrac: ' + name2);
                    $('#preostaloVreme').text('Preostalo vreme: ' + time2);
                    clearTable();
                    loadForPlayer2();
                   noInc = false;
                 }, 1000);
                
            }
        }else{
            if(player2Last4.length == 4){
                attempt2++;
                checkCombination();
                player2Last4 = [];
                turn = 1;
                noInc = true;
                setTimeout(function () {
                    $('#igrac').text('Igrac: ' + name2);
                    $('#preostaloVreme').text('Preostalo vreme ' + time2);
                    clearTable();
                    loadForPlayer1();
                   noInc = false;
                }, 1000);
                
            }
        }
        if(attempt1 == 7 && attempt2 == 7){
            tied = true;
            
        }
    }

    $('.icons').click(function (e) { 
        e.preventDefault();
        if(canStart == false || noInc == true)
            return;
        let choice = $(this).attr("id");
        let img = $('<img>');
        switch (choice) {
            case 'pik':
                img.attr('src', 'skocko-dodatno/pik.png');
                if(turn == 1){
                    $(nameOfSquare + index1).append(img);
                    index1++;
                    player1Fields.push('pik');
                    player1Last4.push('pik');

                }
                else{
                    $(nameOfSquare + index2).append(img);
                    index2++;
                    player2Fields.push('pik');
                    player2Last4.push('pik');
                }
                check();
            break;
            case 'tref':
                img.attr('src', 'skocko-dodatno/tref.png');
                if(turn == 1){
                    $(nameOfSquare + index1).append(img);
                    index1++;
                    player1Fields.push('tref');
                    player1Last4.push('tref');

                }
                else{
                    $(nameOfSquare + index2).append(img);
                    index2++;
                    player2Fields.push('tref');
                    player2Last4.push('tref');
                }
                check();
            break;
            case 'karo':
                img.attr('src', 'skocko-dodatno/karo.png');
                if(turn == 1){
                    $(nameOfSquare + index1).append(img);
                    index1++;
                    player1Fields.push('karo');
                    player1Last4.push('karo');

                }
                else{
                    $(nameOfSquare + index2).append(img);
                    index2++;
                    player2Fields.push('karo');
                    player2Last4.push('karo');
                }  
                check();
            break;
            case 'srce':
                img.attr('src', 'skocko-dodatno/srce.png');
                if(turn == 1){
                    $(nameOfSquare + index1).append(img);
                    index1++;
                    player1Fields.push('srce');
                    player1Last4.push('srce');

                }
                else{
                    $(nameOfSquare + index2).append(img);

                    index2++;
                    player2Fields.push('srce');
                    player2Last4.push('srce');
                }
                check();
            break;
            case 'zvezda':
                img.attr('src', 'skocko-dodatno/zvezda.png');
                if(turn == 1){
                   $(nameOfSquare + index1).append(img);

                    index1++;
                    player1Fields.push('zvezda');
                    player1Last4.push('zvezda');

                }
                else{
                    $(nameOfSquare + index2).append(img);

                    index2++;
                    player2Fields.push('zvezda');
                    player2Last4.push('zvezda');
                }
                check();
            break;
            case 'skocko':
                img.attr('src', 'skocko-dodatno/skocko.png');
                if(turn == 1){
                    $(nameOfSquare + index1).append(img);

                    index1++;
                    player1Fields.push('skocko');
                    player1Last4.push('skocko');

                }
                else{
                    $(nameOfSquare + index2).append(img);

                    index2++;
                    player2Fields.push('skocko');
                    player2Last4.push('skocko');
                } 
                check();
                break;

            default:
                break;
        }
        
    });

    function loadEnd(){
        let cnt = 29;
        if(isWinner1){
            for(let i = 0; i < player1Combination.length; i++){
                let img = $('<img>');
                img.attr('src', 'skocko-dodatno/'+ player1Combination[i] + '.png');
                $('#sq' + (cnt + i)).append(img);
            }
        }else{
            for(let i = 0; i < player2Combination.length; i++){
                let img = $('<img>');
                img.attr('src', 'skocko-dodatno/'+ player2Combination[i] + '.png');
                $('#sq' + (cnt + i)).append(img);
            }
        }
    }

    function decTime(){
        if(tied == true){
            noInc = false;
            canStart = false;
            clearInterval(handleInterval);
            canStart = false;
            alert('Partija je neresena, oba igraca su iskoristili sve pokusaje');
            return;
        }
        if(isWinner1){
            alert('Pobednik je igrac 1');
            setTimeout(() => {
                clearTable();
                loadForPlayer2();
                loadEnd();
            }, 1000);
            
            clearInterval(handleInterval);
            canStart = false;
            return;
        }
        if(isWinner2){
            alert('Pobednik je igrac 2');
            setTimeout(() => {
                clearTable();
                loadForPlayer1();
                loadEnd();
            }, 1000);
            
            clearInterval(handleInterval);
            canStart = false;
            return;
        }
        if(noInc == false){
            if(turn == 1){
                time1--;
                if(time1 == 0){
                    alert('Pobednik je igrac 2');
                    clearInterval(handleInterval);
                    canStart = false;
                }
                $('#preostaloVreme').text('Preostalo vreme ' + time1);
            }else{
                time2--;
                if(time2 == 0){
                    alert('Igrac 1 je pobednik');
                    clearInterval(handleInterval);
                    canStart = false;
                }
                $('#preostaloVreme').text('Preostalo vreme ' + time2);
            }
        }   
    }

    $('#start').click(function () {
        if(firstStart){  
            firstStart = false;
            $('#igrac').text('Igrac: ' + name1);
            $('#preostaloVreme').text('Preostalo vreme ' + time1);
            canStart = true;
            handleInterval = setInterval(decTime, 1000);
        }
    })

});