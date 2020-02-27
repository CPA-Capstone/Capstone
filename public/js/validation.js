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

		//element.parentNode.innerHTML = element.parentNode.innerHTML.concat('<br/><p class="error">Your database needs a name</p>');
	
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
		//element.parentNode.innerHTML = element.parentNode.innerHTML.concat('<br/><p class="error">Database Name must be alphanumeric</p>');
	}

	element = document.getElementById('tblName');

	var tableNames = element.children;

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

				//tableNames[i].parentNode.innerHTML = tableNames[i].parentNode.innerHTML.concat('<br/><p class="error">You must enter a table name');
			}
			else
			{
				tab = document.getElementById('tbl'.concat(tableNum, '-button'));

				tab.classList.add('btn-danger');

				//tab.parentNode.innerHTML = tab.parentNode.innerHTML.concat('<br/><p class="error">You must enter a table name');
			}
		}
		else if(!isAlphaNumeric(tableNames[i].value))
		{
			valid = false;

			tableNames[i].parentNode.innerHTML = tableNames[i].parentNode.innerHTML.concat('<br/><p class="error">"Table Name must be alphanumeric');
		}
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

			//element.parentNode.innerHTML = element.parentNode.innerHTML.concat('<br/><p class="error">You must enter a field name');
		}
		else if(!isAlphaNumeric(fieldName))
		{
			valid = false;

			//element.parentNode.innerHTML = element.parentNode.innerHTML.concat('<br/><p class="error">Field Name must be alphanumeric');
		}
		else if(!isUniqueField(fieldName, names, tableNum))
		{
			valid = false;

			//element.parentNode.innerHTML = element.parentNode.innerHTML.concat('<br/><p class="error">Field names must be unique within their table');
		}

		names.push([tableNum, fieldName]);

		var select = fields[i].childNodes[5].firstElementChild;

		var value = select.options[select.selectedIndex].value;

		if(value == 'NULL')
		{
			valid = false;

			//element.parentNode.innerHTML = element.parentNode.innerHTML.concat('<br/><p class="error">A datatype must be selected');
		}

		var foreign = fields[i].children[6].firstElementChild.checked;

		if(foreign)
		{
			var foreignVal = fields[i].children[7].firstElementChild.value;

			if(foreignVal == 'null')
			{
				valid = false;

				//element.parentNode.innerHTML = element.parentNode.innerHTML.concat('<br/><p class="error">A foreign key must be selected');
			}
		}
	}

	var tables = document.getElementById('records').children;

	for(var i = 0; i < tables.length; i++)
	{
		var records = tables[i].lastElementChild.children;

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

					//element.parentNode.innerHTML = element.parentNode.innerHTML.concat('<br/><p class="error">Record must be an Integer (Whole Number)');
				}
				else if(input.classList.contains('decimal') && !/^\d+\.\d+$/.test(input.value) && input.value != '')
				{
					valid = false;

					//element.parentNode.innerHTML = element.parentNode.innerHTML.concat('<br/><p class="error">Record must be a Decimal');
				}
				else if(input.classList.contains('date') && validatedate(input.value) && input.value != '')
				{
					valid = false;
					

					//element.parentNode.innerHTML = element.parentNode.innerHTML.concat('<br/><p class="error">Record must be a date (YYYY-MM-DD)');	
				}
				else if(input.classList.contains('datetime') && !/\d{4}-[01]\d-[0-3]\d [0-2]\d:[0-5]\d:[0-5]\d/.test(input.value) && input.value != '')
				{
					valid = false;

					//element.parentNode.innerHTML = element.parentNode.innerHTML.concat('<br/><p class="error">Record must have a date & time (YYYY-MM-DD HH:MM:SS)');	
				}

				if(input.classList.contains('related'))
				{
					if(input.classList.contains('notNull') && input.value == 'null')
					{
						valid = false;

						//element.parentNode.innerHTML = element.parentNode.innerHTML.concat('<br/><p class="error">Record cannot be null');
					}
				}
				else
				{
					if(input.classList.contains('notNull') && input.value == '')
					{
						valid = false;

						//element.parentNode.innerHTML = element.parentNode.innerHTML.concat('<br/><p class="error">Record cannot be null');
					}
				}

				if(input.classList.contains('unique') && !isUniqueRecord(input.value, uniques[k]))
				{
					valid = false;

					//element.parentNode.innerHTML = element.parentNode.innerHTML.concat('<br/><p class="error">Record must be unique');
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

				//element.parentNode.innerHTML = element.parentNode.innerHTML.concat('<br/><p class="error">Primary Key must be unique');
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
  var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  // Match the date format through regular expression
  if(inputText.value.match(dateformat))
  {
  document.form1.text1.focus();
  //Test which seperator is used '/' or '-'
  var opera1 = inputText.value.split('/');
  var opera2 = inputText.value.split('-');
  lopera1 = opera1.length;
  lopera2 = opera2.length;
  // Extract the string into month, date and year
  if (lopera1>1)
  {
  var pdate = inputText.value.split('/');
  }
  else if (lopera2>1)
  {
  var pdate = inputText.value.split('-');
  }
  var dd = parseInt(pdate[0]);
  var mm  = parseInt(pdate[1]);
  var yy = parseInt(pdate[2]);
  // Create list of days of a month [assume there is no leap year by default]
  var ListofDays = [31,28,31,30,31,30,31,31,30,31,30,31];
  if (mm==1 || mm>2)
  {
  if (dd>ListofDays[mm-1])
  {
  alert('Invalid date format!');
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
  alert('Invalid date format!');
  return false;
  }
  if ((lyear==true) && (dd>29))
  {
  alert('Invalid date format!');
  return false;
  }
  }
  }
  else
  {
  alert("Invalid date format!");
  document.form1.text1.focus();
  return false;
  }}