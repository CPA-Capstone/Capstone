function validation() 
{
	var errors = document.getElementsByClassName('error');

	errLength = errors.length;

	for(var i = 0; i < errLength; i++)
	{
		errors[0].previousElementSibling.remove();

		errors[0].remove();
	}

	errors = document.getElementsByClassName('btn-danger');

	errLength = errors.length;

	for(var i = 0; i < errLength; i++)
	{
		errors[0].classList.remove('btn-danger');
	}

	var valid = true;

	generate = document.getElementById('btn_generate');

	var element = document.getElementById('content');

	var lineBreak;
	var pargraph;

	element = element.firstElementChild.firstElementChild.firstElementChild.firstElementChild.children[1].firstElementChild;

	if(element.value == "")
	{
		valid = false;

		lineBreak = document.createElement('br');
		pargraph = document.createElement('p');


		pargraph.setAttribute('class', 'error');
		element.parentNode.appendChild(lineBreak);
		element.parentNode.appendChild(pargraph);
		pargraph.innerText = 'Your database needs a name';	
	}
	else if(!isAlphaNumeric(element.value))
	{
		valid = false;
		
		lineBreak = document.createElement('br');
		pargraph = document.createElement('p');


		pargraph.setAttribute('class', 'error');
		element.parentNode.appendChild(lineBreak);
		element.parentNode.appendChild(pargraph);
		pargraph.innerText = 'Database Name must be alphanumeric';
	}

	element = document.getElementById('tblName');

	var tableNames = element.children;

	var tabNames = [];

	tableLength = tableNames.length;

	for(var i = 0; i < tableLength; i++)
	{
		tableNum = tableNames[i].classList[tableNames[i].classList.length-1].substring(3);

		if(tableNames[i].value == "")
		{
			valid = false;

			if(tableNum == currentTable)
			{
				lineBreak = document.createElement('br');
				pargraph = document.createElement('p');
		
		
				pargraph.setAttribute('class', 'error');
				tableNames[i].parentNode.appendChild(lineBreak);
				tableNames[i].parentNode.appendChild(pargraph);
				pargraph.innerText = 'You must enter a table name';
			}
			else
			{
				tab = document.getElementById('tbl'.concat(tableNum, '-button'));

				tab.classList.add('btn-danger');
			}
		}
		else if(!isAlphaNumeric(tableNames[i].value))
		{
			valid = false;

			if(tableNum == currentTable)
			{
				lineBreak = document.createElement('br');
				pargraph = document.createElement('p');
		
		
				pargraph.setAttribute('class', 'error');
				tableNames[i].parentNode.appendChild(lineBreak);
				tableNames[i].parentNode.appendChild(pargraph);
				pargraph.innerText = 'Table Name must be alphanumeric';
			}
			else
			{
				tab = document.getElementById('tbl'.concat(tableNum, '-button'));

				tab.classList.add('btn-danger');
			}
		}
		else if(!isUniqueTable(tableNames[i].value, tabNames))
		{
			valid = false;

			if(tableNum == currentTable)
			{
				lineBreak = document.createElement('br');
				pargraph = document.createElement('p');
		
		
				pargraph.setAttribute('class', 'error');
				tableNames[i].parentNode.appendChild(lineBreak);
				tableNames[i].parentNode.appendChild(pargraph);
				pargraph.innerText = 'Table Name must be unique';
			}
			else
			{
				tab = document.getElementById('tbl'.concat(tableNum, '-button'));

				tab.classList.add('btn-danger');
			}
		}

		tabNames.push(tableNames[i].value);
	}

	element = document.getElementById('field').children[1];

	var fields = element.children;
	var names = [];

	for(var i = 1; i < fields.length-1; i++)
	{
		var tableNum = fields[i].classList[0].substring(3);
		var fieldName = fields[i].firstElementChild.firstElementChild.value;

		if(fieldName == "")
		{
			valid = false;

			if(tableNum == currentTable)
			{
				lineBreak = document.createElement('br');
				pargraph = document.createElement('p');
		
		
				pargraph.setAttribute('class', 'error');
				fields[i].firstElementChild.appendChild(lineBreak);
				fields[i].firstElementChild.appendChild(pargraph);
				pargraph.innerText = 'You must enter a field name';
			}
			else
			{
				tab = document.getElementById('tbl'.concat(tableNum, '-button'));

				tab.classList.add('btn-danger');
			}
		}
		else if(!isAlphaNumeric(fieldName))
		{
			valid = false;

			if(tableNum == currentTable)
			{
				lineBreak = document.createElement('br');
				pargraph = document.createElement('p');
		
		
				pargraph.setAttribute('class', 'error');
				fields[i].firstElementChild.appendChild(lineBreak);
				fields[i].firstElementChild.appendChild(pargraph);
				pargraph.innerText = 'Field name must be alphanumeric';
			}
			else
			{
				tab = document.getElementById('tbl'.concat(tableNum, '-button'));

				tab.classList.add('btn-danger');
			}
		}
		else if(!isUniqueField(fieldName, names, tableNum))
		{
			valid = false;

			if(tableNum == currentTable)
			{
				lineBreak = document.createElement('br');
				pargraph = document.createElement('p');
		
		
				pargraph.setAttribute('class', 'error');
				fields[i].firstElementChild.appendChild(lineBreak);
				fields[i].firstElementChild.appendChild(pargraph);
				pargraph.innerText = 'Field name must be unique within their table';
			}
			else
			{
				tab = document.getElementById('tbl'.concat(tableNum, '-button'));

				tab.classList.add('btn-danger');
			}
		}

		names.push([tableNum, fieldName]);

		var select = fields[i].childNodes[5].firstElementChild;

		var value = select.options[select.selectedIndex].value;

		if(value == 'NULL')
		{
			valid = false;

			if(tableNum == currentTable)
			{
				lineBreak = document.createElement('br');
				pargraph = document.createElement('p');
		
		
				pargraph.setAttribute('class', 'error');
				fields[i].children[2].appendChild(lineBreak);
				fields[i].children[2].appendChild(pargraph);
				pargraph.innerText = 'A datatype must be selected';
			}
			else
			{
				tab = document.getElementById('tbl'.concat(tableNum, '-button'));

				tab.classList.add('btn-danger');
			}
		}

		var foreign = fields[i].children[6].firstElementChild.checked;

		if(foreign)
		{
			var foreignVal = fields[i].children[7].firstElementChild.value;

			if(foreignVal == 'null')
			{
				valid = false;

				if(tableNum == currentTable)
				{
					lineBreak = document.createElement('br');
					pargraph = document.createElement('p');
			
			
					pargraph.setAttribute('class', 'error');
					fields[i].children[7].appendChild(lineBreak);
					fields[i].children[7].appendChild(pargraph);
					pargraph.innerText = 'A related field must be selected';
				}
				else
				{
					tab = document.getElementById('tbl'.concat(tableNum, '-button'));

					tab.classList.add('btn-danger');
				}
			}
		}
	}

	var tables = document.getElementById('records').children;

	for(var i = 0; i < tables.length; i++)
	{
		var records = tables[i].lastElementChild.children;

		var tableNum = tables[i].id.substring(5);

		var uniques = [];
		var primaries = [];

		for(var j = 0; j < records.length-1; j++)
		{
			var recordFields = records[j].children;

			if(!primaries[j])
			{
				primaries[j] = "";
			}

			for(var k = 0; k < recordFields.length-1; k++)
			{
				var input = recordFields[k].firstElementChild;

				if(!uniques[k])
				{
					uniques[k] = [];
				}

				if(input.classList.contains('int') && (!/^-{0,1}\d+$/.test(input.value) && input.value != ''))
				{
					valid = false;

					if(tableNum == currentTable)
					{
						lineBreak = document.createElement('br');
						pargraph = document.createElement('p');
				
				
						pargraph.setAttribute('class', 'error');
						input.parentNode.appendChild(lineBreak);
						input.parentNode.appendChild(pargraph);
						pargraph.innerText = 'Record must be an integer (Whole Number)';
					}
					else
					{
						tab = document.getElementById('tbl'.concat(tableNum, '-button'));

						tab.classList.add('btn-danger');
					}
				}
				else if(input.classList.contains('decimal') && !/^\d+\.\d+$/.test(input.value) && input.value != '')
				{
					valid = false;

					if(tableNum == currentTable)
					{
						lineBreak = document.createElement('br');
						pargraph = document.createElement('p');
				
				
						pargraph.setAttribute('class', 'error');
						input.parentNode.appendChild(lineBreak);
						input.parentNode.appendChild(pargraph);
						pargraph.innerText = 'Record must be a Deciaml';
					}
					else
					{
						tab = document.getElementById('tbl'.concat(tableNum, '-button'));

						tab.classList.add('btn-danger');
					}
				}
				else if(input.classList.contains('date') && !validatedate(input.value) && input.value != '')
				{
					valid = false;
					
					if(tableNum == currentTable)
					{
						lineBreak = document.createElement('br');
						pargraph = document.createElement('p');
				
				
						pargraph.setAttribute('class', 'error');
						input.parentNode.appendChild(lineBreak);
						input.parentNode.appendChild(pargraph);
						pargraph.innerText = 'Record must be a date (YYYY-MM-DD)';
					}
					else
					{
						tab = document.getElementById('tbl'.concat(tableNum, '-button'));

						tab.classList.add('btn-danger');
					}
				}
				else if(input.classList.contains('datetime') && (!/\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01]) (0[1-9]|1[0-9]|2[0-3]):[0-5]\d:[0-5]\d/.test(input.value) || !validatedate(input.value.substring(0, 10))) && input.value != '')
				{
					valid = false;

					if(tableNum == currentTable)
					{
						lineBreak = document.createElement('br');
						pargraph = document.createElement('p');
				
				
						pargraph.setAttribute('class', 'error');
						input.parentNode.appendChild(lineBreak);
						input.parentNode.appendChild(pargraph);
						pargraph.innerText = 'Record must have a date & time (YYYY-MM-DD HH:MM:SS)';
					}
					else
					{
						tab = document.getElementById('tbl'.concat(tableNum, '-button'));

						tab.classList.add('btn-danger');
					}
				}

				if(input.classList.contains('related'))
				{
					if(input.classList.contains('notNull') && input.value == 'null')
					{
						valid = false;

						if(tableNum == currentTable)
						{
							lineBreak = document.createElement('br');
							pargraph = document.createElement('p');
					
					
							pargraph.setAttribute('class', 'error');
							input.parentNode.appendChild(lineBreak);
							input.parentNode.appendChild(pargraph);
							pargraph.innerText = 'Record cannot be null';
						}
						else
						{
							tab = document.getElementById('tbl'.concat(tableNum, '-button'));

							tab.classList.add('btn-danger');
						}
					}
				}
				else
				{
					if(input.classList.contains('notNull') && input.value == '')
					{
						valid = false;

						if(tableNum == currentTable)
						{
							lineBreak = document.createElement('br');
							pargraph = document.createElement('p');
					
					
							pargraph.setAttribute('class', 'error');
							input.parentNode.appendChild(lineBreak);
							input.parentNode.appendChild(pargraph);
							pargraph.innerText = 'Record cannot be null';
						}
						else
						{
							tab = document.getElementById('tbl'.concat(tableNum, '-button'));

							tab.classList.add('btn-danger');
						}
					}
				}

				if(input.classList.contains('unique') && !isUniqueRecord(input.value, uniques[k]))
				{
					valid = false;

					if(tableNum == currentTable)
					{
						lineBreak = document.createElement('br');
						pargraph = document.createElement('p');
				
				
						pargraph.setAttribute('class', 'error');
						input.parentNode.appendChild(lineBreak);
						input.parentNode.appendChild(pargraph);
						pargraph.innerText = 'Record must be unique';
					}
					else
					{
						tab = document.getElementById('tbl'.concat(tableNum, '-button'));

						tab.classList.add('btn-danger');
					}
				}

				uniques[k].push(input.value);

				if(input.classList.contains('primary'))
				{
					primaries[j] = primaries[j].concat(input.value);
				}
			}

			if(!isUniquePrimary(primaries[j], primaries))
			{
				valid = false;

				if(tableNum == currentTable)
				{
					lineBreak = document.createElement('br');
					pargraph = document.createElement('p');
			
			
					pargraph.setAttribute('class', 'error');
					input.parentNode.parentNode.firstElementChild.appendChild(lineBreak);
					input.parentNode.parentNode.firstElementChild.appendChild(pargraph);
					pargraph.innerText = 'Primary Key must be unique';
				}
				else
				{
					tab = document.getElementById('tbl'.concat(tableNum, '-button'));

					tab.classList.add('btn-danger');
				}
			}
		}
	}

	if(valid)
	{
		generate.removeAttribute('disabled');
	}
	else
	{
		generate.setAttribute('disabled', 'disabled');
	}
}

function isAlphaNumeric(str) 
{
  var code
  returnVal = true;

  for (var i = 0; i < str.length; i++) 
  {
    code = str.charCodeAt(i);
    if (!(code > 47 && code < 58) && !(code > 64 && code < 91) && !(code > 96 && code < 123)) 
    {
      returnVal = false;
    }
  }
  return returnVal;
}

function isUniqueTable(text, array)
{
	var returnVal = true;

	for(var i = 0; i < array.length; i++)
	{
		if(array[i] == text)
		{
			returnVal = false;
		}
	}

	return returnVal;
}

function isUniqueField(text, array, table) 
{
	var returnVal = true;

	for(var i = 0; i < array.length; i++)
	{
		if(array[i][0] == table && array[i][1] == text)
		{
			returnVal = false;
		}
	}

	return returnVal;
}

function isUniqueRecord(text, array) 
{
	var returnVal = true;

	for(var i = 0; i < array.length; i++)
	{
		if(array[i] == text)
		{
			returnVal = false;
		}
	}

	return returnVal;
}

function isUniquePrimary(text, array) 
{
	var returnVal = true;

	for(var i = 0; i < array.length-1; i++)
	{
		if(array[i] == text)
		{
			returnVal = false;
		}
	}

	return returnVal;
}

function showErrors(value){

	if (errorMessage != "")
	{
		
		
	}
	
}
function validatedate(inputText)
{
  var dateformat = /\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])/
  
  if(inputText.match(dateformat))
  {
	  var opera2 = inputText.split('-');
	  lopera2 = opera2.length;

	  if (lopera2>1)
	  {
	  	var pdate = inputText.split('-');
	  }

	  var yy = parseInt(pdate[0]);
	  var mm  = parseInt(pdate[1]);
	  var dd = parseInt(pdate[2]);

	  var ListofDays = [31,28,31,30,31,30,31,31,30,31,30,31];

	  if (mm==1 || mm>2)
	  {
		  if (dd>ListofDays[mm-1])
		  {
		  	return false;
		  }
	  }

	  if (mm==2)
	  {
		  var lyear = false;
		  if ( (!(yy % 4) && yy % 100) || !(yy % 400)) 
		  {
		  	lyear = true;
		  }
		  if ((lyear==false) && (dd>=29))
		  {
		  	return false;
		  }
		  if ((lyear==true) && (dd>29))
		  {
		  	return false;
		  }
	  }
  }
  else
  {
  	return false;
  }

  return true;
}