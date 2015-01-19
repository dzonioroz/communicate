var main = function() {
        var myDataRef = new Firebase('https://boiling-torch-6924.firebaseio.com/');
        $('.dugme').click(function(){  
          var name = $('.nameInput').val();
          var text = $('.messageInput').val();
          myDataRef.push({name: name, text: text});
          $('.messageInput').val('');
          $('.counter').text('140');
          $('.dugme').addClass('disabled');  
        });
        $('.messageInput').keyup(function() {
          var postLength = $(this).val().length;
          var charactersLeft = 140 - postLength;
          $('.counter').text(charactersLeft);
  
          if(charactersLeft < 0) {
            $('.dugme').addClass('disabled'); 
          }
          else if(charactersLeft == 140) {
            $('.dugme').addClass('disabled');
          }
          else {
            $('.dugme').removeClass('disabled');
          }
        });
        $('.dugme').addClass('disabled');
        myDataRef.on('child_added', function(snapshot) {
        var message = snapshot.val();
        displayChatMessage(message.name, message.text);
        });
        function displayChatMessage(name, text) {
          $('<li/>').text(text).prepend($('<em/>').text(name+':  ') ).appendTo($('.posts'));
          $('.posts')[0].scrollTop = $('.posts')[0].scrollHeight;
        };
      }
$(document).ready(main);
