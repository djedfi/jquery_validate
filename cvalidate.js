(function($) {
    $.fn.option_default = 
    {
        data_cerror_msg         : 'Please provide a right value.',
        data_cok_msg            : 'It looks good!!!',
        data_cmatch_msg         : 'The password values do not match',        
        show_msg_cok            :  false 
    };

    $.fn.cvalidateForm = function(option_user) 
    {
        var error   =   false;
        var id_pass_ini;
        var id_pass_iqualto;
        $.fn.setParameter(option_user);
        
        //validate input type text only
        $(this).find(':input:text').each(function(index) 
        {
            id_controller_txt = ($(this).attr('id')).toString();

            if(($('#'+id_controller_txt).val().trim() == '' && $(this).attr('required') != undefined) || !document.getElementById(id_controller_txt).checkValidity())
            {
                $.fn.set_error_msg(id_controller_txt);
                $( "#"+id_controller_txt ).removeClass( "is-valid" ).addClass( "is-invalid ");
                error = true;
            }
            else
            {
                $.fn.set_ok_msg(id_controller_txt);
                $( "#"+id_controller_txt ).removeClass( "is-invalid" ).addClass( "is-valid ");
            }
        });

        $(this).find('input[type=number], input[type=tel], input[type=email], input[type=url]').each(function(index) 
        {
            id_controller_misc = ($(this).attr('id')).toString();

            if($('#'+id_controller_misc).val().trim() == '' || !document.getElementById(id_controller_misc).checkValidity())
            {
                $.fn.set_error_msg(id_controller_misc);
                $( "#"+id_controller_misc ).removeClass( "is-valid" ).addClass( "is-invalid ");
                error = true;
            }
            else
            {
                $.fn.set_ok_msg(id_controller_misc);
                $( "#"+id_controller_misc ).removeClass( "is-invalid" ).addClass( "is-valid ");
            }
        });

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
                $( "#"+id_controller_pass ).removeClass( "is-valid" ).addClass( "is-invalid ");
                error = true;
            }
            else
            {
                $.fn.set_ok_msg(id_controller_pass);
                $( "#"+id_controller_pass ).removeClass( "is-invalid" ).addClass( "is-valid ");
            }            
        });

        //validate input type password only
        $(this).find(' textarea').each(function(index) 
        {
            id_controller_txta = ($(this).attr('id')).toString();

            if($('#'+id_controller_txta).val().trim() == '' || !document.getElementById(id_controller_txta).checkValidity())
            {
                $.fn.set_error_msg(id_controller_txta);
                $( "#"+id_controller_txta ).removeClass( "is-valid" ).addClass( "is-invalid ");
                error = true;
            }
            else
            {
                $( "#"+id_controller_txta ).removeClass( "is-invalid" ).addClass( "is-valid ");
            }            
        });

        $(this).find(' select').each(function(index) 
        {
            id_controller_sel = ($(this).attr('id')).toString();

            if(!document.getElementById(id_controller_sel).checkValidity())
            {
                $.fn.set_error_msg(id_controller_sel);
                $( "#"+id_controller_sel ).removeClass( "is-valid" ).addClass( "is-invalid ");
                error = true;
            }
            else
            {
                $( "#"+id_controller_sel ).removeClass( "is-invalid" ).addClass( "is-valid ");
            }            
        });


        $(this).find(':input:radio[required]').each(function(index) 
        {
            id_controller_rd = ($(this).attr('id')).toString();
            nm_controller_rd = ($(this).attr('name')).toString();
           
            if(!document.getElementById(id_controller_rd).checkValidity())
            {
                $("#"+id_controller_rd+"+ label").css({"color":"#DC3545","font-weight": "lighter"});
                $("#fld_"+nm_controller_rd).css({"border" : "1px solid #DC3545","border-radius": "5px","padding" : "5px","color":"#DC3545","font-weight": "lighter"});
                error = true;
            }
            else
            {
                $("#"+id_controller_rd+"+ label").css({"color":"#4FA746","font-weight": "lighter"});
                $("#fld_"+nm_controller_rd).css({"border" : "1px solid #4FA746","border-radius": "5px","padding" : "5px","color":"#4FA746","font-weight": "lighter"});
                error = false;
            }
        });

        $(this).find(':input:checkbox[required]').each(function(index) 
        {
            id_controller_chk = ($(this).attr('id')).toString();
            if(!document.getElementById(id_controller_chk).checkValidity())
            {
                $.fn.set_error_msg(id_controller_chk,true);
                $( "#"+id_controller_chk ).removeClass( "is-valid" ).addClass( "is-invalid ");
                error = true;
            }
            else
            {
                $.fn.set_ok_msg(id_controller_chk);
                $( "#"+id_controller_chk ).removeClass( "is-invalid" ).addClass( "is-valid ");
                error = false;
            }

        });



        if(id_pass_ini!=undefined && id_pass_iqualto!=undefined)
        {
            if($('#'+id_pass_ini).val().trim()!='' && $('#'+id_pass_iqualto).val().trim()!='')
            {
                error = $.fn.validatePassMatch(id_pass_ini,id_pass_iqualto);
            }
        }


        

        return error;
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
                msg_error_set   =   $.fn.option_default.data_cerror_msg;
            }

            $control_validate = $('<div/>', {
                'id'        : 'id_msg_error_' + id,
                'class'     :  'invalid-feedback',
                'html'      :   msg_error_set
            });
            if(act_chbx)
            {
                $("#"+id+"+label").after($control_validate);
            }
            else
            {
                $("#"+id).after($control_validate);
            }
            
        }
    };

    $.fn.set_ok_msg  =   function(id)
    {
        $("#id_msg_ok_"+id).remove();
        if($.fn.option_default.show_msg_cok && !$("#id_msg_ok_"+id).hasClass("valid-feedback"))
        {
            var msg_ok_input = $( "#"+id ).attr( "data-cok-msg" );
            var msg_ok_set;
            if(msg_ok_input != undefined)
            {
                msg_ok_set  = msg_ok_input;
            }
            else
            {
                msg_ok_set   =   $.fn.option_default.data_cok_msg;
            }
            $control_validate = $('<div/>', {
                'id'        : 'id_msg_ok_' + id,
                'class'     :  'valid-feedback',
                'html'      :   msg_ok_set
            });

            $("#"+id).after($control_validate);
        }
    };

    $.fn.setParameter = function(opt) 
    {
        $.each(opt, function(key, value) 
        {
            $.fn.option_default[key] = value;
        });
    };

    $.fn.validatePassMatch = function(id_pass_ini,id_pass_match)
    {
        var val_pass_ini    =   $("#"+id_pass_ini).val().trim();
        var val_pass_match  =   $("#"+id_pass_match).val().trim();
        var msg_error_input;
        var val_msg_error_input;
        $("#id_msg_ok_"+id_pass_match).remove();
        $("#id_msg_error_"+id_pass_match).remove();
        
        if((val_pass_ini == val_pass_match) && (val_pass_ini!='') && (val_pass_match!=''))
        {
            $( "#"+id_pass_ini ).removeClass( "is-invalid" ).addClass( "is-valid ");
            $( "#"+id_pass_match ).removeClass( "is-invalid" ).addClass( "is-valid ");
            $.fn.set_ok_msg(id_pass_match);
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
                $( "#"+id_pass_match ).removeClass( "is-invalid" );
                $( "#"+id_pass_match ).removeClass( "is-valid" ).addClass( "is-invalid ");
                $( "#id_msg_error_"+id_pass_match ).text(val_msg_error_input);
            }
            else if(!$("#id_msg_error_"+id_pass_match).hasClass("invalid-feedback"))
            {
                $( "#"+id_pass_match ).addClass( "is-invalid ");

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
})(jQuery);