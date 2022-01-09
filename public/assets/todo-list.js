$ (document).ready (() => {

    $('form').on('submit', ()=> {

        const item = $ ('form input'); 

        const todo = {item: item.val()}; 

        $.ajax({

            type: 'POST', 

            url: '/todo', 

            data: todo, 

            success: data => {

                location.reload();

            } 

        });

        return false;

    });   

    $('li').on('click', () => {

        let item = $(this).text().replace(/ /g, "-"); 

        $.ajax({

            url: '/todo/'+ item, 

            type: 'DELETE', 

            success: data => {

                location.reload(); 

            }
        });
        
    }); 

});


