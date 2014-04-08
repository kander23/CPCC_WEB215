/**
  Add a new row to the table and display it on the screen by jumping the pagination to the required location 
  @desc datatables addon - fnAddDataAndDisplay
  @see http://www.datatables.net/plug-ins/api
*/
$.fn.dataTableExt.oApi.fnAddDataAndDisplay=function(e,t){var n=this.oApi._fnAddData(e,t);
var r=e.aoData[n].nTr;this.oApi._fnReDraw(e);
var i=-1;for(var s=0,o=e.aiDisplay.length;s<o;s++){if(e.aoData[e.aiDisplay[s]].nTr==r){i=s;break}}
if(i>=0){e._iDisplayStart=Math.floor(s/e._iDisplayLength)*e._iDisplayLength;
this.oApi._fnCalculateEnd(e)}this.oApi._fnDraw(e);return{nTr:r,iPos:n}}

/* end datatables addon */


/**
  model for a single database row
  @classdesc User_Data
  @method: constructor
  @param {object} p_object object that contains a single data record with the keys: ID, VCODE, VNAME, DESCR, DTTM, ADDBYEID
*/
var User_Data = function(p_obj){
    
    if (!(this instanceof User_Data)) {
		throw new TypeError("User_Data constructor cannot be called as a function.");
	}
    
	if (typeof p_obj !== "object"){ p_obj = {}; }
    this.student_id = p_obj.STUDENT_ID || "";
    this.first_name = p_obj.FIRST_NAME || "";
    this.last_name = p_obj.LAST_NAME || "";
    this.hobby = p_obj.HOBBY || "";

    
};

User_Data.prototype = {

    constructor: User_Data,
    /**
      return a json string representation of this object
      @method serialize
      @returns {string}
    */
    toString : function() {
		return JSON.stringify({ id: this.id, vcode: this.vcode, vname: this.vname, descr: this.descr, dttm: this.dttm, });
    },
    /**
      getter for the object attributes
      @method: get
      @param {string} p_attr attribute name
    */
    get : function (p_attr){
        if (typeof p_attr === "string" && p_attr in this){
            return this[p_attr];
        }
    },
    /**
      getter for the object attributes
      @method: get
      @param {string} p_attr attribute name
      @param {object} p_val attribute value 
    */
    set : function (p_attr,  p_val){
        if (typeof p_attr === "string" && p_attr in this){
            this[p_attr] = p_val;
        }
    }
};

var App = function(p_obj){
	if (!(this instanceof App)) {
		throw new TypeError("NNI_App constructor cannot be called as a function.");
	}
	if (typeof p_obj !== "object"){ p_obj = {}; }
	this.headers = p_obj.headers || "";
	this.data = p_obj.data || "";
	this.$tbl = $('#body').find('table');
	this.$dataTbl = null;
	this.editHTML_cell = '<span class="edit"><img src="./images/pencil_sm.png" width="16px" height="16px" alt="Edit" title="Edit"/></span><span class="delete"><img  width="16px" height="16px" src="./images/delete_sm.png" alt="Delete" title="Delete"/></span>';
};
App.prototype = {

    constructor: App,
	/**
	  init data tables on the html table element
	  @method: loadTable
	*/
	loadTable : function(){
		var $head, a, nTr, that = this, i, len;
		var columnDef;
		if (this.$tbl && this.$tbl.length){
			if (!(this.$tbl).hasClass('initialized')){
				$thead = this.$tbl.find("thead");
                $thead.empty();
				columnDef = [
					{ 'bAutoWidth': false, 'aTargets': [ 0,1,2,3,4 ]},
					{ 'bSortable': false, 'aTargets': [ 4 ] },
					{ "sWidth": "20%", "aTargets": [ 0 ] },
					{ "sWidth": "20%", "aTargets": [ 1 ] },
					{ "sWidth": "20%", "aTargets": [ 2 ] },
					{ "sWidth": "20%", "aTargets": [ 3 ] },
					{ "sWidth": "18%", "aTargets": [ 4 ] }
				];		
				$thead.append('<tr>');
                for (i = 0, len = this.headers.length; i < len; i++){
					$thead.find("tr:last").append($('<th>').addClass((this.headers[i]).toLowerCase()).text((this.headers[i]).replace("_", " ")));
				}
				// add the edit column to the header
				$thead.find("tr:last").append($('<th>').addClass("edit").html('&nbsp;'));
				this.$dataTbl = this.$tbl.addClass('initialized').dataTable({
                    "bJQueryUI": true,
                    "iDisplayLength" : 25,
                    "sPaginationType": "full_numbers",
                    "aoColumnDefs": columnDef,                    
                    /*
					"fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
                        var j, lenj; 
						$(nRow).attr('id', "rid_"+(aData[0]+aData[1]).toLowerCase());
                        for (j=1, lenj = headers.length; j < lenj; j++){
							$('td:eq('+(j-1)+')', nRow).addClass(that.dataKeyLookup(headers[j]));
						}
						return nRow;
                    },
					*/
					"fnDrawCallback": function(){
						if (this.$dataTbl && this.$dataTbl.length){
							console.log("added rows?");
						
						}
					}
					
                });
				
				// append the edit controls to each row of bootstrapped data before inserting into table
				for (i = 0, len = this.data.length; i < len; i++){
					this.data[i].push(this.editHTML_cell);
				}
				// add the last row as an "add new" row
				this.data.push([
					'<input class="new" type="text" placeholder="new student id" value="" data-col-id="'+this.headers[0]+'" />',
					'<input class="new" type="text" placeholder="student first name" value="" data-col-id="'+this.headers[1]+'" />',
					'<input class="new" type="text" placeholder="student last name" value="" data-col-id="'+this.headers[2]+'" />',
					'<input class="new" type="text" placeholder="student hobby" value="" data-col-id="'+this.headers[3]+'" />',
					'<div><span class="savenew"><img width="16px" height="16px" src="./images/save_sm.png" alt="Save" title="Save"/></span></div>'
				]);
				
				// insert the bootstapped data into the the table
				this.$dataTbl.fnAddData(this.data);
				
				
				/*
				a = this.$dataTbl.fnAddData( );
				nTr = this.$dataTbl.fnSettings().aoData[ a[0] ].nTr;
				$(nTr).addClass("addnew").find('input')
				*/
				
				this.$tbl.on("focusin", 'input.new' ,function(e){
					$(this).data("placeholder",$(this).attr("placeholder")).removeAttr("placeholder");
					$(this).one("focusout", function(e){
						if (($(this).val()).length === 0){
							$(this).attr("placeholder",$(this).data("placeholder"));
						}
					});
				})
				// bind the save / edit / delete events
				this.$tbl.on("click", function(e){
					e.preventDefault();
					var action, $target = $(e.target);
					var nRow, rowData;
					var stdt_id;
					try{
						if ($.inArray(($target.get(0).tagName).toLowerCase() , ["img","span"]) >= 0 ){
							
							action = ($target.closest('span').attr("class")).toLowerCase();
							console.log(action);
							/* Get the row as a parent of the link that was clicked on */
							nRow = $target.parents('tr')[0];
							
							if (action === "save"){
								if ( nEditing == nRow ){
									saveRow( that.$dataTbl, nEditing );
									//nEditing = null;  //  <-- move this to the save function
								}
							}
							else if (action === "savenew"){
								console.log("savenew");
								rowData = that.collectRowData(nRow);
								rowData["newrow"] = true;
								if (typeof rowData === "object" && "valid" in rowData && rowData.valid){
									that.saveRow(that.$dataTbl, nRow, rowData);
								}
							}
							else if (action === "delete"){
								stdt_id = $('td:first', nRow).text();
								if (typeof stdt_id === "string" ){
									doAction = confirm("Are you sure you want to delete the record for: "+ stdt_id );
									if (doAction){
										that.deleteRow(that.$dataTbl, nRow, stdt_id);
									}
								}
							}
						}
					}
					catch(e){
						// fail silently on jquery error
						if (typeof console !== "undefined"){
							console.log("jQuery access error: "+e.message);
							// implement the restore row fx
							// restoreRow( that.$dataTbl,  nEditing );
						}
					}
					
				});
				
			}
			
		}
	},
	/**
	  function to remove unwanted characters from user input strings			
	  @method dataClense 
	  @param {string} p_str
	  @returns {string}
	*/
	dataClense : function(p_str){
		var result = '';
		if (typeof p_str === "string" && p_str.length){
			result = (p_str.replace(/[';\?<>\(\)"]/g, '')).replace(/(-{2})/g, '');
		}
		return result;
	},
	/**
	  read and return the values from the inputs on the row to be saved back to the database
	  returns an object witheach value under the db column key
	  @method collectRowData
	  @param {object} nRow jquery reference to the target row to save
	  @returns {object}
	*/
	collectRowData :  function(nRow){
		var data = { valid: true }, that = this;
		$(nRow).find('input').each(function(idx, val){
			if(($(this).val()).length === 0){
				$(this).addClass("error").one("focusin", function(e){
					$(this).removeClass("error");
				});
				data.valid = false;
				return data.valid;
			}
			else{
				if ($(this).attr("data-col-id")){
					data[($(this).attr("data-col-id"))] = that.dataClense($(this).val());
				}
			}
		});
		return data;
	},
	/**
	  save the contents of the datatable row to the datatabase
	  @method saveRow
	  @param {object} oTable jquery reference to the datatable object
	  @param {object} nRow jquery reference to the target row to save
	  @param {boolean} newRow boolean to control if the event was generated for a row edit or a new row insert
	*/
	saveRow : function( oTable, nRow, rowData ){
		var that = this;
		if (typeof rowData === "object"){
			console.log("save row "+JSON.stringify(rowData));
			$.ajax({
				data: rowData,
				dataType: "json",
				type: "POST",
				success: function(data, status, xhr){
					if (typeof data === "object"){
						if ("error" in data && "msg" in data){
							// present error to user
							console.log("error: "+data.msg);
							that.display_row_error(nRow, data.msg);
						}
						else if ("success" in data){
							// insert record into table and redraw
							if ("newrow" in rowData){
								that.$dataTbl.fnAddDataAndDisplay([ rowData["student_id"], rowData["first_name"], rowData["last_name"], rowData["hobby"], that.editHTML_cell ]);
								that.$tbl.find('input.new').each(function(){
									$(this).val("");
								});
							
							}
							else{
								// handle save for edit rows
							}
						}
						else{
							console.log("Unknown error occured");
						}
					
					}
					console.log(JSON.stringify(data));
				},
				error: function(xhr, status, error){
					console.log(error);
					// that.toggleErrMsg(status+" ,"+error);  // <-- implement 
					//restoreRow( oTable, nRow );   // <-- implement
				}
			});
		}
	},
	/**
	  delete the  datatable row from the datatabase that matches the student id parameter
	  @method deleteRow
	  @param {object} oTable jquery reference to the datatable object
	  @param {object} nRow jquery reference to the target row to save
	  @param {string} student_id id of the row to remove from the table
	*/
	deleteRow : function( oTable, nRow, p_student_id){
		var that = this;
		if (typeof p_student_id === "string"){
			console.log("delete row for "+p_student_id);
			$.ajax({
				data: {"delete": true, "student_id": p_student_id},
				dataType: "json",
				type: "POST",
				success: function(data, status, xhr){
					if (typeof data === "object"){
						if ("error" in data && "msg" in data){
							// present error to user
							console.log("error: "+data.msg);
							that.display_row_error(nRow, data.msg);
						}
						else if ("success" in data){
							console.log("record deleted");
							that.$dataTbl.fnDeleteRow( nRow );	
						}
						else{
							console.log("Unknown error occured");
						}
					
					}
					console.log(JSON.stringify(data));
				},
				error: function(xhr, status, error){
					console.log(error);
					// that.toggleErrMsg(status+" ,"+error);  // <-- implement 
					//restoreRow( oTable, nRow );   // <-- implement
				}
			});
		}
	
	},
	/**
	  on update or insert error, extend the row height, and display the DB error message o the user as well as highligh the fields as error
	  @method display_row_error
	*/
	display_row_error : function(nRow, errorMsg){
		var rowHeight, $row;
		if (typeof nRow === "object" && typeof errorMsg === "string"){
			$row = $(nRow);
			if ($row && $row.length){
				rowHeight = $row.height();
				$row.height(rowHeight+22).css("vertical-align", "top");
				$row.find('td:first').append($('<div class="rowError">').text(errorMsg));
				$row.find('input').each(function(){
					$(this).addClass("error");
					$row.attr("data-error", true);
				})
				$row.one("focusin", 'input', function(e){
					console.log("here");
					if (typeof $row.attr("data-error") === "string" && $row.attr("data-error") === "true"){
						console.log("here2");
						$row.find('input').each(function(){
							$(this).removeClass("error");
						});
						$row.find('div.rowError').remove();
						$row.attr("style","");
					}
				});
			}
		}
	
	}
	
}


$( document ).ready(function() {
	console.log("test");
	var app = new App({"headers":tblHeaders, "data": tblData});
	app.loadTable();
 });