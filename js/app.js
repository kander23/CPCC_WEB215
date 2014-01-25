$( document ).ready(function() {

 var step = 0, template, $el, today = moment().format('MMMM Do YYYY, h:mm:ss a');
   template = $("#template1").html();
   $el = $("#popup");
   $el.html(_.template(template,{"today":today}));
	$el.delay( 1000 ).show({
		duration  :"slow" ,
		step :  function(){
			var fontSize = parseInt(($el.css('font-size')).replace("px", ""),10);
			if (step%30 === 1 && fontSize < 15){
				fontSize++;
			}
			$el.css('font-size', (fontSize+"px"));
			step++;
		},
		complete: function(){
			$el.find("img").one("click", function(){
				$el.hide({
					duration: "slow",
					step :  function(){
						var fontSize = parseInt(($el.css('font-size')).replace("px", ""),10);
						if (step%20 === 1 && fontSize > 6){
							fontSize--;
						}
						$el.css('font-size', (fontSize+"px"));
						step--;
					}
				});
			});
		}
	});
});