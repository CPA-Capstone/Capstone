function validation() 
{
	var errors = document.getElementsByClassName('error');

	errLength = errors.length;

	for(var i = 0; i < errLength; i++)
	{
		errors[0].previousElementSibling.remove();

		errors[0].remove();
	}

	var valid = true;

	generate = document.getElementById('btn_generate');

	var element = document.getElementById('content');

	var errorMessage = "";

	element = element.firstElementChild.firstElementChild.firstElementChild.firstElementChild.children[1].firstElementChild;

	if(element.value == "")
	{
		valid = false;

		element.parentNode.innerHTML = element.parentNode.innerHTML.concat('<br/><p class="error">Your database needs a name</p>');
	
	}
	else if(!isAlphaNumeric(element.value))
	{
		valid = false;

		alert("Database Name must be alphanumeric");
	}

	element = document.getElementById('tblName');

	var tableNames = element.children;

	for(var i = 0; i < tableNames.length; i++)
	{
		if(tableNames[i].value == "")
		{
			valid = false;

			alert("You must enter a table name");
		}
		else if(!isAlphaNumeric(tableNames[i].value))
		{
			valid = false;

			alert("Table Name must be alphanumeric");
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

			alert("You must enter a field name");
		}
		else if(!isAlphaNumeric(fieldName))
		{
			valid = false;

			alert("Field Name must be alphanumeric");
		}
		else if(!isUniqueField(fieldName, names, tableNum))
		{
			valid = false;

			alert("Field names must be unique within their table");
		}

		names.push([tableNum, fieldName]);

		var select = fields[i].childNodes[5].firstElementChild;

		var value = select.options[select.selectedIndex].value;

		if(value == 'NULL')
		{
			valid = false;

			alert('A datatype must be selected');
		}

		var foreign = fields[i].children[6].firstElementChild.checked;

		if(foreign)
		{
			var foreignVal = fields[i].children[7].firstElementChild.value;

			if(foreignVal == 'null')
			{
				valid = false;

				alert('A foreign key must be selected');
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

					alert('Record must be an Integer (Whole Number)');
				}
				else if(input.classList.contains('decimal') && !/^\d+\.\d+$/.test(input.value) && input.value != '')
				{
					valid = false;

					alert('Record must be a Decimal');
				}
				else if(input.classList.contains('date') && !/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(input.value) && input.value != '')
				{
					valid = false;

					alert('Record must be a date (YYYY-MM-DD)');	
				}
				else if(input.classList.contains('datetime') && !/\d{4}-[01]\d-[0-3]\d [0-2]\d:[0-5]\d:[0-5]\d/.test(input.value) && input.value != '')
				{
					valid = false;

					alert('Record must have a date & time (YYYY-MM-DD HH:MM:SS)');	
				}

				if(input.classList.contains('related'))
				{
					if(input.classList.contains('notNull') && input.value == 'null')
					{
						valid = false;

						alert('Record cannot be null');
					}
				}
				else
				{
					if(input.classList.contains('notNull') && input.value == '')
					{
						valid = false;

						alert('Record cannot be null');
					}
				}

				if(input.classList.contains('unique') && !isUniqueRecord(input.value, uniques[k]))
				{
					valid = false;

					alert('Record must be unique');
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

				alert('Primary Key must be unique');
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