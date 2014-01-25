$( document ).ready(function() {
    console.log( "ready!" );

	var template = $("#template1").html(), $el = $('#body'), counter = function(){
		// basic counter object that will always give a value higher than the last
		var idx = 0;
		return {
			getNext : function(){
				return idx++;
			}
		}
	}(),
	code_samples = [  /* begining of the function array */
	{ index : counter.getNext(), code_sample: function(){ return "A basic string"; } },
	{ index : counter.getNext(), code_sample: 
function(){ 
  // case senstivity
  var A = 1, a = 2; 
  if (A === a ){
	return "The Value in variable A is the same as the value in variable a";		
  }
  else{
	return "The value in the variable A is NOT the same as the value in variable a";
  }
} 
	},
	{ index : counter.getNext(), code_sample: function(){
  // more case sensativity
  var letter = "k";
  if (letter.toUpperCase() === "k".toUpperCase()){ 
    return "The Letter is: "+letter;
  }
} 
    },
	{ index : counter.getNext(), code_sample: function(){
  //statements 1
  var str = "This statemnt doesn't end with a semicolon"
  return str;
} 
	},
	{ index : counter.getNext(), code_sample: function(){
  //statements 2
  var value1 = 1
  +value1
  var value2 = 1;
  +value2;
  return "The difference a colon can make - value1: "+value1+", value2: "+value2;
} 
    },
	{ index : counter.getNext(), code_sample: function(){ 
  // comments don't execute
  var value = 1;
  /*  value = value +1; */
  return "The value is: "+value; 
}
    },	
	{ index : counter.getNext(), code_sample: function(){ 
	// this code block is defined in the object: : { index : counter.getNext(), code_sample: function(){ /* code */ }}
	return "I am code block: "+this.index; } 
	},
	{ index : counter.getNext(), code_sample: function(){ 
  // + as a math opperator
  return 1+1; 
}
	},
	{ index : counter.getNext(), code_sample: function(){ 
  // + as a string opperator
  return "1"+"1"; 
}
	},
	{ index : counter.getNext(), code_sample: function(){ return "A (pseudo) random number: "+(Math.random()).toFixed(2); } },	
	{ index : counter.getNext(), code_sample: function(){ 
  // scope demo
  var a_var1 = 1;  // local scope
  a_var2 = 2;  // no var keyword - variable attached the the global window object
  return "If you dont use var, the variable goes in global scope: "+(typeof window.a_var2)+", see? "+(typeof window.a_var1);  
}
	},	
	{ index : counter.getNext(), code_sample: function(){ 
  // playing with types 1
  var bool = false; 
  return "I am of type: \""+(typeof bool)+"\" and my value is: "+bool; 
} 
	},	
	{ index : counter.getNext(), code_sample: function(){ 
  // playing with types 2
  var bool = new Boolean(true);
  return "But, I am of type: \""+(typeof bool)+"\" and my value is: "+bool; } 
    },
	{ index : counter.getNext(), code_sample: function(){ 
  // playing with types 3
  var my_string = "a string"; 
  return " I am of type: \""+(typeof my_string)+"\" and my value is: "+my_string; 
} 
	},
	{ index : counter.getNext(), code_sample: function(){ 
  // playing with types 4
  var my_string2 = new String("another string"); 
  return " I am of type: \""+(typeof my_string2)+"\" and my value is: "+my_string2; 
} 
	},
    { index : counter.getNext(), code_sample: function(){ 
  // playing with types 5
  var my_number = 2; 
  return " I am of type: \""+(typeof my_number)+"\" and my value is: "+my_number; 
} 
	},
	{ index : counter.getNext(), code_sample: function(){ 
  // playing with types 6
  var my_number2 = new Number(3); 
  return " I am of type: \""+(typeof my_number2)+"\" and my value is: "+my_number2; 
} 
	},
	{ index : counter.getNext(), code_sample: function(){ 
  // playing with types 7
  var my_variable1 = null; 
  return " I am of type: \""+(typeof my_variable1)+"\" and my value is: "+my_variable1; 
} 
	},
	{ index : counter.getNext(), code_sample: function(){ 
  // playing with types 8
  // var my_variable1 = null;  // <-- oops, now it doesnt exist
  return " I am of type: \""+(typeof my_variable1)+"\" and i'll crash things if you try and print me"; 
} 
	},
	{ index : counter.getNext(), code_sample: function(){ 
  // playing with types 9
  var my_function = function(){ return "inside my_function!"}; 
  return " I am of type: \""+(typeof my_function)+"\" and my value is: "+my_function(); 
} 
	},	
	{ index : counter.getNext(), code_sample: function(){ 
  // falsey and truthy 1
  var a_value1 = 0;
  if (a_value1){
	return "a_value1 ("+a_value1+") is truthy"; 
  }
  else{
	return "a_value1 ("+a_value1+") is falsey"; 
  }
} 
	},	
	{ index : counter.getNext(), code_sample: function(){ 
  // falsey and truthy 2
  var a_value2 = 1;
  if (a_value2){
	return "a_value2 ("+a_value2+") is truthy"; 
  }
  else{
	return "a_value2 ("+a_value2+") is falsey"; 
  }
} 
	},	
	{ index : counter.getNext(), code_sample: function(){ 
  // falsey and truthy 3
  var a_value3 = -1;
  if (a_value3){
	return "a_value3 ("+a_value3+") is truthy"; 
  }
  else{
	return "a_value3 ("+a_value3+") is falsey"; 
  }
} 
	},	
	{ index : counter.getNext(), code_sample: function(){ 
  // falsey and truthy 4
  var a_value4 = "";  // empty string
  if (a_value4){
	return "a_value4 ("+a_value4+") is truthy"; 
  }
  else{
	return "a_value4 ("+a_value4+") is falsey"; 
  }
} 
	},	
	{ index : counter.getNext(), code_sample: function(){ 
  // falsey and truthy 5
  var a_value5 = "test string"; 
  if (a_value5){
	return "a_value5 ("+a_value5+") is truthy"; 
  }
  else{
	return "a_value5 ("+a_value5+") is falsey"; 
  }
} 
	},
	{ index : counter.getNext(), code_sample: function(){ 
  // falsey and truthy 6
  var a_value6 = []; // empty array 
  if (a_value6){
	return "a_value6 ("+JSON.stringify(a_value6)+") is truthy"; 
  }
  else{
	return "a_value6 ("+JSON.stringify(a_value6)+") is falsey"; 
  }
} 
	},
	{ index : counter.getNext(), code_sample: function(){ 
  // falsey and truthy 7
  var a_value7 = ["1","2"]; // NON-empty array 
  if (a_value7){
	return "a_value7 ("+JSON.stringify(a_value7)+") is truthy"; 
  }
  else{
	return "a_value7 ("+JSON.stringify(a_value7)+") is falsey"; 
  }
} 
	},
	{ index : counter.getNext(), code_sample: function(){ 
  // falsey and truthy 8
  var a_value8 = {}; // empty object
  if (a_value8){
	return "a_value8 ("+JSON.stringify(a_value8)+") is truthy"; 
  }
  else{
	return "a_value8 ("+JSON.stringify(a_value8)+") is falsey"; 
  }
} 
	},
	{ index : counter.getNext(), code_sample: function(){ 
  // falsey and truthy 9
  var a_value9 = {key:"value"}; // NON-empty object
  if (a_value9){
	return "a_value9 ("+JSON.stringify(a_value9)+") is truthy"; 
  }
  else{
	return "a_value9 ("+JSON.stringify(a_value9)+") is falsey"; 
  }
} 
	},
	{ index : counter.getNext(), code_sample: function(){ 
  // falsey and truthy 10
  var a_value10 = null
  if (a_value10){
	return "a_value10 ("+a_value10+") is truthy"; 
  }
  else{
	return "a_value10 ("+a_value10+") is falsey"; 
  }
} 
	},
	{ index : counter.getNext(), code_sample: function(){ 
  // falsey and truthy 11
  /* var a_value11 = "value" */  // <-- undefined
  try{
    if (a_value11){
	  return "a_value11 ("+a_value11+") is truthy"; 
    }
    else{
	  return "a_value11 ("+a_value11+") is falsey"; 
    }
  }
  catch(error){
	 return error.message;
  }
} 
	},
	{ index : counter.getNext(), code_sample: function(){ 
  // parsing numbers 1
  var num_1 = "abc123"; 
  return "ParseInt yields: "+parseInt(num_1); 
} 
	},
	{ index : counter.getNext(), code_sample: function(){ 
  // parsing numbers 2
  var num_2 = "123abc"; 
  return "ParseInt yields: "+parseInt(num_2); 
} 
	},
	{ index : counter.getNext(), code_sample: function(){ 
  // parsing numbers 3
  var num_3 = ".01"; 
  return "ParseInt yields: "+parseInt(num_3); 
} 
	},
	{ index : counter.getNext(), code_sample: function(){ 
  // parsing numbers 4
  var num_4 = ".01"; 
  return "ParseFloat yields: "+parseFloat(num_4); 
} 
	},
	{ index : counter.getNext(), code_sample: function(){ 
  // binary opperation 1
  var bin_val = -8; 
  return "to binary: "+bin_val.toString(2); 
} 
	},
	{ index : counter.getNext(), code_sample: function(){ 
  // binary opperation 2
  var bin_val = ~(-8); // bitwise not 
  return "to binary: "+bin_val.toString(2); 
} 
	},
	{ index : counter.getNext(), code_sample: function(){ 
  // equality comparison with double equals 
  //(compares equality of value only)
  var a_obj = new String("text"); 
  var a_str = "text" ;
  if(a_obj == a_str){
	return "Using ==, the string object is equal to the primative string";
  }
  else{
    return "Using ==, the string object is NOT equal to the primative string";
  }  
} 
	},
	{ index : counter.getNext(), code_sample: function(){ 
  // equality comparison with triple equals 
  //(compares equality of value AND type)
  var a_obj = new String("text"); 
  var a_str = "text" ;
  if(a_obj === a_str){
	return "Using ===, the string object is equal to the primative string";
  }
  else{
    return "Using ===, the string object is NOT equal to the primative string";
  }  
} 
	},
	{ index : counter.getNext(), code_sample: function(){ 
  // Ternary opperator 
  // (condition) ? output-if-true : output-if-false
  var val1 = 16; 
  var val2 = 17;
  return ((val1 > val2)?val1+" is greater than "+val2:val1+" is less than or equal to "+val2);
} 
	},
	{ index : counter.getNext(), code_sample: function(){ 
  // loops 1 
  // a &#60;br /&#62; is printed on the end of each line
  var output = "", ctr = 0, stop = 5;
  do{
    output += "Loop: "+ ctr+"<br />"; // <-- br element at the end
     ctr++;
  }while ( ctr <= stop);
  return output;
} 
	},
	{ index : counter.getNext(), code_sample: function(){ 
  // loops 2 
  // a &#60;br /&#62; is printed after evey other loop
  var output = "", i, len;
  for(i=1, len=12;i<=len;i++){
	output += "Loop: "+i+"&nbsp;&nbsp";
	if ( i > 1 && i%2 == 0 ){
	  output += "<br />"; // <-- br element here
	}
  }
  return output;
} 
	},
	{ index : counter.getNext(), code_sample: function(){ 
  // loops 3 
  // count backwards
  // a &#60;br /&#62; is printed after evey other loop
  var output = "", i, stop;
  for(i=9, stop=0;i>=stop;i--){
	output += "Loop: "+i+"<br />"; // <-- br element here
  }
  return output;
} 
	},
	{ index : counter.getNext(), code_sample: function(){ 
  // loops 4 
  // a &#60;br /&#62; is printed at the end of each line
  // break on the 4th line
  var output = "", i, len;
  for(i=1, len=6;i<=len;i++){
	output += "Loop: "+i+"<br />"; // <-- br element here
	
	if (i==4){
	   break;
	}
  }
  return output;
} 
	},
	{ index : counter.getNext(), code_sample: function(){ 
  // loops 5 
  // loop through object attributes
  // a &#60;br /&#62; is printed at the end of each line
  var output = "", obj = {
  "a": "test 1",
  "b": "test 2",
  "c": "test 3",
  "d": "test 4",
  };
  for(var prop in obj){
	if (obj.hasOwnProperty(prop)){
	  output += "key: "+prop+" , value: "+obj[prop]+"<br />"; // <-- br element here
	}
  }
  return output;
} 
	},
	{ index : counter.getNext(), code_sample: function(){ 
  // loops 6 
  // a &#60;br /&#62; is printed on the end of each line
  // skip even elements
  var output = "", ctr = 1, stop = 12;
  do{
    if(ctr%2 == 0){
	   ctr++;
	   continue;
	}
	output += "Loop: "+ ctr+"<br />"; // <-- br element at the end
     ctr++;
  }while ( ctr <= stop);
  return output;
} 
	},
	{ index : counter.getNext(), code_sample: function(){ 
  // timeout for 3 seconds 
  // (gotta use jquery to make this work in the page)
  var $el = $('div.line[data-index="'+this.index+'"]').find('div.code_result');
  var timeoutFx = function(p_$el){ p_$el.html("...Finally!"); }
  window.setTimeout(function(){ timeoutFx($el); }, 3000);
  return "soon..."
  
} 
	},
	{ index : counter.getNext(), code_sample: function(){ 
  // timeout for 3 seconds and color the div!
  // (gotta use more jquery to make this work in the page)
  var $el = $('div.line[data-index="'+this.index+'"]').find('div.code_result');
  var timeoutFx = function(p_$el){ p_$el.html($("<div>").css("background-color", "red").text("...Finally!")); }
  window.setTimeout(function(){ timeoutFx($el); }, 3000);
  return "soon..."
  
} 
	},
	{ index : counter.getNext(), code_sample: function(){ 
  // apply a pseudo random color to the div after a half second!
  // (gotta use more jquery to make this work in the page)
  var $el = $('div.line[data-index="'+this.index+'"]').find('div.code_result');
  var colors=["red","green","blue","yellow","orange","pink","grey","cyan","lavender","salmon", "tan", "skyblue"];
  var index = Math.round((Math.random()*10));
  var timeoutFx = function(p_$el){ p_$el.html($("<div>").css("background-color", colors[index]).text("...Finally!")); }
  window.setTimeout(function(){ timeoutFx($el); }, 500);
  return "soon..."
  
} 
	},
	{ index : counter.getNext(), code_sample: function(){ 
  // apply all ten colors to the div at a 0.75 second intervals!
  // (gotta use more jquery to make this work in the page)
  var $el = $('div.line[data-index="'+this.index+'"]').find('div.code_result');
  var colors=["red","green","blue","yellow","orange","pink","grey","cyan","lavender","salmon", "tan", "skyblue"];
  var index = 0;
  var timeoutFx = function(p_$el){ 
	if (timer && index < colors.length){
		p_$el.html($("<div>").css("background-color", colors[index]).text("This is : "+colors[index])); 
		index++;
	}
	else{
		clearInterval(timer);
	}
  }
  var timer = window.setInterval(function(){ timeoutFx($el); }, 750);
  return "soon..."
  
} 
	}
/* end of the function array */	];
	
	$.each(code_samples, function(key, obj){
		$el.append(_.template(template,code_samples[key]));
	});	
	
	
	$el.on("click", "input[type='button']", function(e){
		e.preventDefault();
		var $target, result, rowId, $parent, result;
		$parent = $(e.target).closest("div.line");
		rowId = $parent.attr("data-index");
		if ($.isNumeric(rowId)){
			rowId = parseInt(rowId,10);
			if (typeof rowId === "number" && rowId >= 0 ){
				$target = $parent.find('div.code_result');
				$target.html("<span>Result&#58;</span>&nbsp;"+(code_samples[rowId].code_sample)());
			
			}
		}
		
	})
	
	
});