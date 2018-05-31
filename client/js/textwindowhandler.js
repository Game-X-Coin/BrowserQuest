
define(['jquery'], function() {
 var TextWindowHandler = Class.extend({
     init: function(){
         this.self = this;
         this.textWindowOn = true;
         this.textWindow = $('#textWindow');

         var text = '<p><h4>GXC Quest</h4></p>'
                     + '<p><h3>This demo game is operating on blockchain venture’s own GXC test blockchain -- which is a hardfork of EOS.</h3></p>'
                     + '<p>Acquiring game token: Players can kill monsters to acquire yellow game tokens.</p>'
                     + '<p>Using game token: You can purchase items by talking to the wizard located left to the village.</p>'
                     + '<p>This game is developed to showcase different applications of GXC to game developers. We’ll continue to add new functionalities to this game.</p>'
                     + '<p>https://mew.gamexcoin.io to check your balance!</h3></p>'

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
