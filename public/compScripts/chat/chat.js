$(() => {
    const socket = io();
    const contactUsBox = $('#contactUsBox');
    const contactUs = $('#contactUs');
    const nickName = $('#nickName');
    const userEmail = $('#email');
    const messageChat = $('#messageChat');
    const messageForm = $('#messageForm');
    const sendMessage = $('#sendMessage');
    const messageInput = $('#messageInput');

    /*const sendMessage = $('#sendMessage');*/
    /*sendMessage.on('submit', e => {
        e.preventDefault();
    });*/

    const newMessage = $('#newMessage');

    contactUs.on('submit', e => {
        e.preventDefault();
        socket.emit('login', nickName.val());
    });

    messageForm.on('submit', e => {
        e.preventDefault();

        const date = new Date();
        date.setMilliseconds(3 * 60 * 60 * 1000);
        const currentTime = date.getUTCHours() + ':' + date.getUTCMinutes();

        if (messageInput.val()) {
            socket.emit('chat message', {
                nick: nickName.val(),
                email: userEmail.val(),
                msg: messageInput.val(),
                time: currentTime
            });

            messageInput.val('');
        }
    });

    socket.on('login', data => {
        if (data.status === 'OK') {
            contactUsBox.addClass('d-none');
            messageChat.removeClass('d-none');
        }
    });

    socket.on('chat message', data => {
        newMessage.append(`
            <div class="new-message__info">
                <div class="new-message__user-info-box">
                    <div class="container new-message__user-info">
                        <div class="row new-message__data">
                            <div class="col-4 new-message__nickname-val-box">
                                <div class="alert new-message__nickname-val">${data.nick}</div>
                                <div class="alert new-message__user-email-val">${data.email}</div>
                            </div>
                            <div class="col-2 new-message__user-email-val-box">
                                <div class="alert new-message__send-msg">${data.time}</div>
                            </div>
                        </div>
                        <div class="alert new-message__chat-message">${data.msg}</div>
                    </div>
                </div>
            </div>
        `);
    });
});