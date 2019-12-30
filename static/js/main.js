(function () {
	$(document).ready(function(){
		var d = new Date();
		var day = d.getDay();
		
		$("div.content-calendar tbody td:nth-child("+day+")").addClass("active");
		
		var selector = $("div.content-calendar tbody td:nth-child("+day+").status");
		console.log(selector.text());
		if(selector.text() != "Done") {
			selector.text("In Progress");
		}
	});
})(jQuery)