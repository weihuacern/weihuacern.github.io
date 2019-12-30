(function () {	
	//subscribe
	function subscribe_to_server () {
		var email = $("#subscribe-input").val();
		$.ajax({
			url: "https://ec2-18-191-213-11.us-east-2.compute.amazonaws.com/subscribe",
			type: 'post',
			dataType: 'text',
			data: email
		}).done(function(data) {
			$("div.subscribe-block-feedback").text("Successfully subscribed!");
		});
	}
	
	function unsubscribe_to_server () {
		var email = $("#subscribe-input").val();
		$.ajax({
			url: "https://ec2-18-191-213-11.us-east-2.compute.amazonaws.com/unsubscribe",
			type: 'post',
			dataType: 'text',
			data: email
		}).done(function(data) {
			$("div.subscribe-block-feedback").text("Successfully unsubscribed!");
		});
	}
	
	$("#subscribe-block-button-sub").click(function(){
		subscribe_to_server ();
	});
	
	$("#subscribe-block-button-unsub").click(function(){
		unsubscribe_to_server ();
	});
	
	function get_subscribe_status () {
		$.ajax({
			url: "https://ec2-18-191-213-11.us-east-2.compute.amazonaws.com/subscribe_status",
			type: 'get',
			dataType: 'text'
		}).done(function(data) {
			$("div.subscribe-block-status").text(data);
		});
	}
})(jQuery)