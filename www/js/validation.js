//var app_state = 'test';
if (app_state=='test') { //TEST   
    var server = 'http://gazel.local';
}
else{ //PRODUCTION
    var server = 'http://gazel.mansur.ml';
}
function check(inp,btn) {
    if(inp.val()=='') {
        inp.focus();
        inp.css('border-color','red');
        btn.hide();
   }
   else{
       inp.css('border-color','#b3b3b3');
       btn.show();
   }
}



$('#page-1 input').live('blur',function(){
   check($(this),$('#begin'));  
});
$('#phone').live('blur',function(){
    var str = this.value;
    var btn = $('#begin');
    if (str.match(/^[0-9]{10}$/)) {
        $(this).css('border-color','#b3b3b3');
        btn.show();
        $.post(server+'?func=check',
               {'user_login' : this.value},
               function(data){
                    if (data) {
                        var json = JSON.parse(data);
                        //alert(json.first_name);
                        $('#name').val(json.first_name);
                        $('#town').val(json.town);
                    }
        });
    }
    else {
        $(this).focus();
        $(this).css('border-color','red');
        btn.hide();
    }
});
$('#page-1 #begin').live('focus',function(){
   check($('#name'),$('#begin'));
   check($('#phone'),$('#begin'));  
});
$('#page-2 input').live('blur',function(){
   check($(this),$('#order'));  
});
$('#page-2 #order').live('focus',function(){
    check($('#from'),$('#order'));
   check($('#to'),$('#order'));
   check($('#date'),$('#order'));
   check($('#time'),$('#order'));
   check($('#price'),$('#order'));
});