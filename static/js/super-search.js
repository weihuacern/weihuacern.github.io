/*  Super Search
    MIT Licensed
*/

(function () {
    var isSearchOpen = false,
        searchEl = document.querySelector('#js-search'),
        searchInputEl = document.querySelector('#js-search__input'),
        searchResultsEl = document.querySelector('#js-search__results'),
        currentInputValue = '',
        lastSearchResultHash,
        posts = [];

	// Changes XML to JSON
	function xmlToJson(xml) {		
		// Create the return object
		var obj = {};

		if (xml.nodeType == 1) { // element
			// do attributes
			if (xml.attributes.length > 0) {
			obj["@attributes"] = {};
				for (var j = 0; j < xml.attributes.length; j++) {
					var attribute = xml.attributes.item(j);
					obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
				}
			}
		} else if (xml.nodeType == 3) { // text
			obj = xml.nodeValue;
		}

		// do children
		if (xml.hasChildNodes()) {
			for(var i = 0; i < xml.childNodes.length; i++) {
				var item = xml.childNodes.item(i);
				var nodeName = item.nodeName;
				if (typeof(obj[nodeName]) == "undefined") {
					obj[nodeName] = xmlToJson(item);
				} else {
					if (typeof(obj[nodeName].push) == "undefined") {
						var old = obj[nodeName];
						obj[nodeName] = [];
						obj[nodeName].push(old);
					}
					obj[nodeName].push(xmlToJson(item));
				}
			}
		}
		return obj;
	};
	
    $('#search-input').on('keypress', function (event) {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if( keycode != '13' ){
			return;
		}
        var resultdiv = $('#js-search__results');
        var query = $(this).val();
		resultdiv.empty();
        findInSitemap(query, resultdiv);
	})
	
	/*var evt;
	document.onmousemove = function (e) {
		e = e || window.event;
		evt = e;
	}*/
	
	$('#js-search').focusout(function(e) {
		if (e.currentTarget.id != "js-search") { 
			$('#js-search__results').hide();
			$('.show-results-count').text(0 + ' Results');
			$('#search-input').val("");
			$('.show-results-count').removeClass("active");
		}
	})

	function findInSitemap (keyword, resultdiv) {
		$.ajax({
			url: window.location.protocol + "//" + window.location.host + "/sitemap.xml",
		}).done(function(data) {
			var sitemap = xmlToJson(data);
			//console.log(sitemap);
			
			var result = [];
			$.each(sitemap.rss.channel.item, function(key, val){
				if (val.description["#text"].search(new RegExp(keyword,"i")) != -1 || val.title["#text"].search(new RegExp(keyword,"i")) != -1) {
					result.push(val);
				}
			});
			
			$('.show-results-count').text(result.length + ' Results');
			$('.show-results-count').addClass("active");
			
			for (var item in result) {
				var searchitem = '<li><a href="'+ result[item].link["#text"]+'">'+result[item].title["#text"]+'</a></li>';
				resultdiv.append(searchitem);
			}
			if (!resultdiv.is(':visible'))
				resultdiv.show();
			});		
	}
    

})();