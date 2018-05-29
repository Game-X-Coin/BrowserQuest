
define(['jquery'], function() {
 var TextWindowHandler = Class.extend({
     init: function(){
         this.self = this;
         this.textWindowOn = true;
         this.textWindow = $('#textWindow');

         var text = '<p><h4>GXC Quest</h4></p>'
                     + '<p><h3>Demo Game based on GXC Token Model.</h3></p>'
                     + '<p>You can get GXQ token via killng some mobs.</p>'
                     + '<p>Using token, You can buy some items via npc.</p>'
                     + '<p>You can check token balance on right upper corner.</p>'
                     + '<p>or visit https://mew.gamexcoin.io/balances.</h3></p>'

                     + '<footer>Thank you. Enjoy the game!</footer>';
         $('#textWindow').html(text);
         $('#textWindow').fadeIn('fast');
     },
     toggleTextWindow: function(){
         if(this.textWindowOn){
             this.textWindowOn = false;
             $('#textWindow').fadeOut('fast');
             $('#helpbutton').removeClass('active');
         } else{
             this.textWindowOn = true;
             $('#textWindow').fadeIn('fast');
             $('#helpbutton').addClass('active');
         }
     },
     setHtml: function(html){
         $('#textWindow').html(html);
     },
     close: function(){
         this.textWindowOn = false;
         $('#textWindow').fadeOut('fast');
         $('#helpbutton').removeClass('active');
     }
 });

 return TextWindowHandler;
});
