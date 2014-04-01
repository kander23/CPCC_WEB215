$(document).ready(function(){
	console.log("text");
	$.ajax({
		url: "./all",
		dataType: "json",
		success:function(data, status, xhr){
			var i, len, $list = $('ul.comp_list'), $el;
			console.log(data);
			if (data && $.isArray(data)){
				for (i=0, len=data.length; i<len; i++){
					if (data[i] && typeof data[i] === "object"){
						if ("type" in data[i] && "name" in data[i] && "qty" in data[i]){
							console.log (data[i]);
							$el  = $('<li>').append($('<span>').text(data[i].type+":").addClass("hwtype"));
							$el.append($('<span>').text(data[i].name));
							$el.append($('<span>').text(data[i].qty));
							$list.append($el);
						}
					}
				}
			
			}
		
		},
		error:function(xhr, status, error){
			console.log(error);
		}
	
	});

});