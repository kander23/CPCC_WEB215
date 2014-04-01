
var mongoose = require('mongoose');

var partSchema = mongoose.Schema({
	qty : Number,
	type: String,
	name: String,
});

var Part = mongoose.model('Inventory', partSchema);


// stack overflow mongoose find

module.exports = {
	getParts : function(res){
		console.log("here");
		var all_records = function(res){
			return function(err,data){
				if (err){
					console.log("error occurred");
					resturn;
				}
				console.log("query:"+data);
				res.send(data);
			}
		
		
		}
		Part.find({},'type name qty', all_records(res));
	},
	savePart : function(p_type, p_name, p_qty){
		var part = new Part({type:p_type,name:p_name,qty:p_qty});
		part.save(function(err,p_part){
			if (err){
				console.log("save failed");
			}
			console.log(p_part);
		});
	
	}
}