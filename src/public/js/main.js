$(function() {
//	alert('works');

	const socket = io();

	// obteniendo elementos del DOM
	const $messageForm = $('#message-form');
	const $messageBox = $('#message');
	const $chat = $('#chat');


	// obteniendo datos de NickNameForm
	const $nickForm = $('#nickForm');
	const $nickError = $('#nickError');
	const $nickname = $('#nickname');

	const $users = $('#usernames');

	$nickForm.submit(e => {
		e.preventDefault();
		socket.emit('new user', $nickname.val(), data => {
			if (data) {
				$('#nickWrap').hide();
				$('#contentWrap').show();
			} else {
				$nickError.html(`
					<div class="alert alert-danger">
						That Username already exits.
					</div>
				`);
			}
			$nickname.val('');
		});
	});

	// Eventos
	$messageForm.submit( e => {
		e.preventDefault();
		socket.emit('send message', $messageBox.val() );
		$messageBox.val('');
	});

	socket.on('new message', function (data) {
		$chat.append('<b>' + data.nick + ": " + '</b>' + "<span>" + data.msg + "</span>" + "<br/>");
	});

	socket.on('usernames', data => {
		let html = ``;
		for (let i = 0; i < data.length; i++) {
			html += `<p><div id="span"></div> ${data[i]} </p>`
		};
		$users.html(html); 
	});


});