
define(['jquery'], function() {
  var ChatHandler = Class.extend({
      init: function(game) {
          this.self = this;
          this.game = game;
          this.chatLog = $('#chatLog');
          this.board = $('#board');
          this.max_height = 15;
      },

      show: function(){
        $('#chatLog').css('display', 'block');
        $('#gamebutton').css('display', 'block');
        $('#boardbutton').css('display', 'block');
      },

      hide: function(){
        $('#chatLog').css('display', 'none');
      },

      /**
       * Process a sent message.
       *
       * @param string message
       * @param boolean send
       */
      processSendMessage: function(message) {
          return this.processMessage(null, message, 'senders');
      },

      /**
       * Processes a received message.
       *
       * @param string message
       */
      processReceiveMessage: function(entityId, message) {
          return this.processMessage(entityId, message, 'receivers');
      },

      /**
       * Calls a registered command pattern callback.  Returns true if a callback occurs.
       *
       * @param string message
       * @param string type
       */
      processMessage: function(entityId, message, type) {
          var pattern = message.substring(0, 3),
              self = this,
              commandPatterns = {
                  senders: {
                    // World chat
                    "/1 ": function(message) {
                        self.game.client.sendChat("/1 " + self.game.player.name + ": " + message);
                        return true;
                    },
                    // Heal target set
                    "/h ": function(message){
                        self.game.client.sendMagic("setheal", message);
                        self.game.player.healTargetName = message;
                        return true;
                    },
                  },
                  receivers: {
                      // World chat
                      "/1 ": function(entityId, message) {
                          messageId = Math.floor(Math.random() * 10000);
                          self.addToChatLog(message, "world");
                          return true;
                      }
                  }
              };
          if (pattern in commandPatterns[type]) {
              if (typeof commandPatterns[type][pattern] == "function") {
                  switch(type) {
                      case 'senders':
                          return commandPatterns[type][pattern](message.substring(3));
                      case 'receivers':
                          return commandPatterns[type][pattern](entityId, message.substring(3));
                  }
                  
              }
          } else {
            switch(type) {
                case 'senders':
                    // self.game.client.sendChat(self.game.player.name + ": " + message);
                    return false;
                case 'receivers':
                    messageId = Math.floor(Math.random() * 10000);
                    self.addToChatLog(self.game.player.name + ": " + message);
                    return false;
            }
          }
          return false;
      },
      addToChatLog: function(message, type){
          var self = this;
          var name = message.split(':')[0];
          var contents = message.split(':')[1];
          if(type == "world") {
              var el = $("<p class='world'>" + "<span>" + name + "</span>: " + contents + "</p>");
          } else {
            var el = $("<p>" + "<span>" + name + "</span>: " + contents + "</p>");
          }
          $(el).appendTo(this.chatLog);
          $(this.chatLog).scrollTop(999999);
      },
      incChatWindow: function(){
          this.max_height += 5;
          this.chatLog.css('max-height', this.max_height + '%');
      },
      decChatWindow: function(){
          this.max_height -= 5;
          if(this.max_height < 5){
              this.max_height = 5;
          }
          this.chatLog.css('max-height', this.max_height + '%');
      }
  });

  return ChatHandler;
});