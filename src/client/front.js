$(document).ready(function() {
    var domHeight = document.body.scrollHeight
    var hasMsg = false // to check is there any value in the input msg field, so that once there is a value in the input message
    var flag = true

    // DOM Caching
    $userRegistration = $('#userRegistration')
    $registeredUser = $('#registeredUser')
    $users = $('#users')
    $chats = $('#chats')
    $sentMessage = $('#sentMessage')
    $hitSend = $('#hitSend')
    $clearChat = $('#clearChat')
    $regUserSeubmitBtn = $('#regUserSeubmitBtn')
    $typeMsgSection = $('#typeMsgSection')
    $registeredUser.focus() //giving the user name field in the cursor

    WebSocket.prototype.emit = function(event) {
        this.send(JSON.stringify({ event }))
    }

    // we add emit event on a protptype of ws, so whenever we call socketClient emit
    // its going to replace 'this' with a client

    // establish our new socketClient as new WebSocket 
    const socketClient = new WebSocket('ws://localhost:9876/server')

    socketClient.onopen = function () {
        console.log(`WebSocket is live`)
        if ($chats.html() == 0) {
            $clearChat.attr('disabled', true)
        }
        $hitSend.attr('disabled', true)
    }

    // section - user typing the message
    $sentMessage.on('keyup', function () {
        if ($(this).val()) {
            $hitSend.attr('disabled', false)

            if (!hasMsg) {
                hasMsg = true // if there is some value in the input msg field we neeed to check again
                socketClient.emit('addTypingUsers')
            }
        } else {
            $hitSend.attr('disabled', true)
            hasMsg = false // if there is some value in the input field we might check again until there is some value
            // if there is no value in the input field, remove the current user from 'typing uses' list
            socketClient.emit('removeTypingUsers')
        }

    })
})