(function($) 
{
     $.fn.option_default = 
    {
        data_cerror_msg         : 'Please provide a right value.',
        data_cok_msg            : 'It looks good!!!',
        data_cmatch_msg         : 'The password values do not match',        
        show_msg_cok            :  false 
    };


    $.fn.cvalidateForm = function(option_user) 
    {
        var error      =    false;
        var error_pass =    false;
        var error_misc =    false;
        var error_misc_d =  false;
        var error_txta =    false;
        var error_select = false;
        var error_rdo   = false;
        var error_chk   = false;
        var id_pass_ini;
        var id_pass_iqualto;
        var id_inpt_iqualto;
        var id_inpt_ini;
        var array_position = new Array();        
        
        
        //validate input type text only
        $(this).find(':input:text').each(function(index) 
        {
            id_controller_txt = ($(this).attr('id')).toString();

            if($(this).attr('data-cerror-print') != undefined)
            {
                $("#"+($(this).attr('data-cerror-print')).toString()).html('');
            }               


            if(($('#'+id_controller_txt).val().trim() == '' && $(this).attr('required') != undefined && $(this).attr('disabled') != 'disabled') || !document.getElementById(id_controller_txt).checkValidity())
            {
                $.fn.set_error_msg(id_controller_txt);
                array_position.push($("#"+id_controller_txt).offset().top);
                error = true;
            }
            else if(!document.getElementById(id_controller_txt).checkValidity())
            {
                $.fn.set_error_msg(id_controller_txt);
                array_position.push($("#"+id_controller_txt).offset().top);
                error = true;   
            }
            else
            {
                $('#'+id_controller_txt).removeClass('is-invalid').addClass('is-valid');

                if($("#id_msg_error_"+id_controller_txt).length)
                {
                    $("#id_msg_error_"+id_controller_txt).remove();
                }
            }
        });


        //validate input another only
        $(this).find('input[type=number], input[type=tel], input[type=url], input[type=hidden]').each(function(index) 
        {
            id_controller_misc_d = ($(this).attr('id')).toString();

            if($(this).attr('data-cerror-print') != undefined)
            {
                $("#"+($(this).attr('data-cerror-print')).toString()).html('');
            }

            if(($('#'+id_controller_misc_d).val().trim() == '' && $(this).attr('required') != undefined && $(this).attr('disabled') != 'disabled') || !document.getElementById(id_controller_misc_d).checkValidity())
            {
                $.fn.set_error_msg(id_controller_misc_d);
                error_misc_d = true;
                array_position.push($("#"+id_controller_misc_d).offset().top);
            }
            //else if(document.getElementById(id_controller_misc_d).checkValidity() && $(this).attr('disabled') != 'disabled')
            else
            {
               $('#'+id_controller_misc_d).removeClass('is-invalid').addClass('is-valid');

                if($("#id_msg_error_"+id_controller_misc_d).length)
                {
                    $("#id_msg_error_"+id_controller_misc_d).remove();
                }
            }
        });

        //validate input type email only
        $(this).find('input[type=email]').each(function(index) 
        {
            id_controller_misc = ($(this).attr('id')).toString();

            if($(this).attr('data-cmatch') != undefined)
            {
                id_inpt_iqualto = id_controller_misc;
            }
            else
            {
                id_inpt_ini = id_controller_misc;
            }

            if($(this).attr('data-cerror-print') != undefined)
            {
                $("#"+($(this).attr('data-cerror-print')).toString()).html('');
            }

            if(($('#'+id_controller_misc).val().trim() == '' && $(this).attr('required') != undefined && $(this).attr('disabled') != 'disabled') || !document.getElementById(id_controller_misc).checkValidity())
            {
                $.fn.set_error_msg(id_controller_misc);
                error_misc = true;
                array_position.push($("#"+id_controller_misc).offset().top);
            }
            else
            {
               $('#'+id_controller_misc).removeClass('is-invalid').addClass('is-valid');

                if($("#id_msg_error_"+id_controller_misc).length)
                {
                    $("#id_msg_error_"+id_controller_misc).remove();
                }
            }
        });       
        
        if(id_inpt_iqualto!=undefined && id_inpt_ini!=undefined)
        {
            if($('#'+id_inpt_ini).val().trim()!='' && $('#'+id_inpt_iqualto).val().trim()!='')
            {
                error_misc = $.fn.validatePassMatch(id_inpt_ini,id_inpt_iqualto);
            }
        } 

    

        //validate input type password only
        
        $(this).find(':input:password').each(function(index) 
        {
            id_controller_pass = ($(this).attr('id')).toString();

            if($(this).attr('data-cmatch') != undefined)
            {
                id_pass_iqualto = id_controller_pass;
            }
            else
            {
                id_pass_ini = id_controller_pass;
            }

            if(($('#'+id_controller_pass).val().trim() == '' && $(this).attr('required') != undefined) || !document.getElementById(id_controller_pass).checkValidity())
            {
                $.fn.set_error_msg(id_controller_pass);
                error_pass = true;
                array_position.push($("#"+id_controller_pass).offset().top);
            }
            else
            {
                $('#'+id_controller_pass).removeClass('is-invalid').addClass('is-valid');
                if($("#id_msg_error_"+id_controller_pass).length)
                {
                    $("#id_msg_error_"+id_controller_pass).remove();
                }
            }            
        });


        if(id_pass_ini!=undefined && id_pass_iqualto!=undefined)
        {
            if($('#'+id_pass_ini).val().trim()!='' && $('#'+id_pass_iqualto).val().trim()!='')
            {
                error_pass = $.fn.validatePassMatch(id_pass_ini,id_pass_iqualto);
            }
        }

        //validate input type password only
        $(this).find(' textarea').each(function(index) 
        {
            id_controller_txta = ($(this).attr('id')).toString();

            if($(this).attr('data-cerror-print') != undefined)
            {
                $("#"+($(this).attr('data-cerror-print')).toString()).html('');
            }

            if($('#'+id_controller_txta).val().trim() == '' || !document.getElementById(id_controller_txta).checkValidity())
            {
                $.fn.set_error_msg(id_controller_txta);
                error_txta = true;
                array_position.push($("#"+id_controller_txta).offset().top);
            }
            else
            {
                $('#'+id_controller_txta).removeClass('is-invalid').addClass('is-valid');
                if($("#id_msg_error_"+id_controller_txta).length)
                {
                    $("#id_msg_error_"+id_controller_txta).remove();
                }
            }            
        });


        $(this).find(' select').each(function(index) 
        {
            id_controller_sel = ($(this).attr('id')).toString();
            valor_select        =  parseInt($('#'+id_controller_sel).val());

            if($(this).attr('data-cerror-print') != undefined)
            {
                $("#"+($(this).attr('data-cerror-print')).toString()).html('');
            }

            if(!document.getElementById(id_controller_sel).checkValidity() || valor_select === 0)
            {
                $.fn.set_error_msg(id_controller_sel);
                error_select = true;
                array_position.push($("#"+id_controller_sel).offset().top);
            }
            else
            {
                $('#'+id_controller_sel).removeClass('is-invalid').addClass('is-valid');
                if($("#id_msg_error_"+id_controller_sel).length)
                {
                    $("#id_msg_error_"+id_controller_sel).remove();
                }
            }            
        });


        
        $(this).find(':input:radio[required]').each(function(index) 
        {
            id_controller_rd = ($(this).attr('id')).toString();
            nm_controller_rd = ($(this).attr('name')).toString();

           
            if(!document.getElementById(id_controller_rd).checkValidity())
            {
                $("#"+id_controller_rd).removeClass('is-valid').addClass('is-invalid');
                //$("#fld_"+nm_controller_rd).removeClass('is-valid').addClass('is-invalid');
                error_rdo = true;
                array_position.push($("#"+id_controller_rd).offset().top);
            }
            else
            {
                $("#"+id_controller_rd).removeClass('is-invalid').addClass('is-valid');
                //$("#fld_"+nm_controller_rd).removeClass('is-invalid').addClass('is-valid');
            }
        });



        $(this).find(':input:checkbox[required]').each(function(index) 
        {
            id_controller_chk = ($(this).attr('id')).toString();
            if(!document.getElementById(id_controller_chk).checkValidity())
            {
                $.fn.set_error_msg(id_controller_chk,true);
                error_chk = true;
                array_position.push($("#"+id_controller_chk).offset().top);
            }
            else
            {
                $('#'+id_controller_chk).removeClass('is-invalid').addClass('is-valid');
                $("#"+id_controller_chk+"_label").removeClass('text-danger');
                if($("#id_msg_error_"+id_controller_chk).length)
                {
                    $("#id_msg_error_"+id_controller_chk).remove();
                }
            }
        });

        
        if(error == true || error_txta == true || error_select == true || error_rdo == true || error_chk == true || error_pass == true || error_misc == true || error_misc_d == true)
        {

            array_position.sort(function(a, b){return a - b})
            //console.log(array_position);
            
            for (var key in array_position)
            {
                if(array_position[key] > 0)
                {
                    $("html, body").animate({
                        scrollTop: (array_position[key] - 100)
                    }, 500);
                    break;
                }
                
            }
            return true;
        }
    };


    $.fn.set_error_msg  =   function(id,act_chbx=false)
    {
        $("#id_msg_error_"+id).remove();
        if(!$("#id_msg_error_"+id).hasClass("invalid-feedback"))
        {
            var msg_error_set;
            var msg_error_input;

            msg_error_input = $( "#"+id ).attr( "data-cerror-msg" );

            if(msg_error_input != undefined)
            {
                msg_error_set  = msg_error_input;
            }
            else
            {
                msg_error_set   =   'Valor ingresado incorrectamente';
            }
            $('#'+id).removeClass('is-valid').addClass('is-invalid');

            if($( "#"+id ).attr( "data-cerror-print" ) == undefined)
            {   
                $control_validate = $('<div/>', {
                    'id'        : 'id_msg_error_' + id,
                    'class'     :  'invalid-feedback',
                    'html'      :   msg_error_set
                });
                if(act_chbx)
                {
                    $("#"+id+"+label").after($control_validate);
                    $("#"+id+"_label").addClass('invalid-feedback');
                }
                else
                {
                    $("#"+id).after($control_validate);
                }
            }
            else
            {
                let id_destino = $( "#"+id ).attr("data-cerror-print");
                $( "#"+id_destino).removeClass('d-none').addClass('d-block').addClass('invalid-feedback');
                $( "#"+id_destino).html(msg_error_set);
                
            }
            
        }
    };

    $.fn.validatePassMatch = function(id_pass_ini,id_pass_match)
    {
        var val_pass_ini    =   $("#"+id_pass_ini).val().trim();
        var val_pass_match  =   $("#"+id_pass_match).val().trim();
        var msg_error_input;
        var val_msg_error_input;
        $("#id_msg_error_"+id_pass_match).remove();

        if((val_pass_ini == val_pass_match) && (val_pass_ini!='') && (val_pass_match!=''))
        {

            $( "#"+id_pass_ini ).removeClass( "is-invalid" ).addClass("is-valid");
            $( "#"+id_pass_match ).removeClass( "is-invalid" ).addClass("is-valid");
            //$.fn.set_ok_msg(id_pass_match);
            return false;
        }
        else if((val_pass_ini != val_pass_match) && (val_pass_ini!='') && (val_pass_match!=''))
        {
            msg_error_input = $( "#"+id_pass_match ).attr( "data-cmatch-msg" );

            if(msg_error_input != undefined)
            {
                val_msg_error_input     =   msg_error_input;
            }
            else
            {
                val_msg_error_input     =   $.fn.option_default.data_cmatch_msg;
            }

            if($("#id_msg_error_"+id_pass_match).hasClass("invalid-feedback"))
            {
                $( "#"+id_pass_match ).removeClass( "is-valid" );
                $( "#"+id_pass_match ).addClass( "is-invalid");
                $( "#id_msg_error_"+id_pass_match ).text(val_msg_error_input);
            }
            else if(!$("#id_msg_error_"+id_pass_match).hasClass("invalid-feedback"))
            {
                $( "#"+id_pass_match ).removeClass( "is-valid" );
                $( "#"+id_pass_match ).addClass( "is-invalid");

                $control_validate = $('<div/>', {
                    'id'        : 'id_msg_error_' + id_pass_match,
                    'class'     :  'invalid-feedback',
                    'html'      :   val_msg_error_input
                });
    
                $("#"+id_pass_match).after($control_validate);
            }
            return true;
        }
        
    };

    $.fn.set_error_msg_array  =   function(array_errores)
    {
        for(var clave in array_errores)
        {
            $control_validate = $('<div/>', {
                'id'        :  'id_msg_error_' + clave,
                'class'     :  'invalid-feedback',
                'html'      :   array_errores[clave]
            });

            
            
            if($("#"+clave).hasClass("form-control"))
            {
                $('#'+clave).removeClass('is-valid').addClass('is-invalid');
                if(!$("#id_msg_error_"+clave).length)
                {
                    $("#"+clave).after($control_validate);
                }
                else
                {
                    $("#id_msg_error_"+clave).html(array_errores[clave]);      
                }
                
            }
            else if($("#"+clave).hasClass("div-identificador"))
            {
                $('#'+clave).removeClass('valid-feedback').addClass('invalid-feedback').removeClass('d-none').addClass('d-block');
                $("#"+clave).html(array_errores[clave]);
            }
            else if(!$("#id_msg_error_"+clave).length)
            {
                $('#'+clave).removeClass('valid-feedback').addClass('invalid-feedback').removeClass('d-none').addClass('d-block');
                $("#"+clave).after($control_validate);    
            }
            else
            {
                $('#'+clave).removeClass('valid-feedback').addClass('invalid-feedback').removeClass('d-none').addClass('d-block');
                $("#id_msg_error_"+clave).html(array_errores[clave]);   
            }
        }
    };
})(jQuery);
