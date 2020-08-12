$( document ).ready(function() 
{
   //needs-validation
   //was-validated

});


$(document).on('click', '#id_btn_submit', function()
{ 
    
    console.log($('#id_form_addrbook').cvalidateForm());
});


$(document).on('click','#id_btn_test', function()
{
    //var id_match;
    var id_pass_ini;
    var id_pass_iqualto;

    $('#id_form_addrbook').find(':input:password').each(function(index) 
    {
            id_controller_pass  = ($(this).attr('id')).toString();

            if($(this).attr('data-cmatch') != undefined)
            {
                id_pass_iqualto = id_controller_pass;
            }
            else
            {
                id_pass_ini = id_controller_pass;
            }
           
    });
    console.log(id_pass_ini);
    console.log(id_pass_iqualto);
});