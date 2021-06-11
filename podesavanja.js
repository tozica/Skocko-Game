$(document).ready(function () {
    let combination1 = [], combination2 = [];
    let name1, name2;
    let cnt = 0;
    let turn = 1;
    let can = true;

    $('.icons').click(function () {
        if(!can)
            return;  
        if(turn == 1){
            let img = $('<img>');
            img.attr('src', 'skocko-dodatno/'+ $(this).attr("id") + '.png');
            $('#s' + (cnt + 1)).append(img);
            combination1.push($(this).attr("id"));
            cnt++;
            if(cnt == 4){
                can = false;
                cnt = 0;
                turn = 2;
                setTimeout(() => {
                    clearTable();
                    can = true;
                }, 1000);
               
            }
        }else if( turn == 2){
            let img = $('<img>');
            img.attr('src', 'skocko-dodatno/'+ $(this).attr("id") + '.png');
            $('#s' + (cnt + 1)).append(img);
            combination2.push($(this).attr("id"));
            cnt++;
            if(cnt == 4){
                turn = 3;
                can = false;
                name1 = $('#name1').val();
                name2 = $('#name2').val();
                saveToLocalStorage();
                setTimeout(() => {
                    window.location.href = 'skocko-igra.html';
                }, 1000);
                
            }
        }
        
     })

     function saveToLocalStorage(){
         let storage = [];
         storage.push({
             name : name1,
             combination : combination1,
         });
         storage.push({
            name : name2,
            combination : combination2,
        });

        localStorage.setItem('kombinacije', JSON.stringify(storage));
        
     }

     function clearTable() {
        $('.square').each(function (index, element) {
            let tmp = $(this).attr('id');
            if( !(tmp == 'tref' || tmp == 'pik' || tmp == 'karo' || tmp == 'srce' || tmp == 'zvezda' || tmp == 'skocko')){
                $(this).children('img').remove();    
            }
        });

    }
});