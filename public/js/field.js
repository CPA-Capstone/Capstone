function addField(element)
{
	table = element.parentNode.parentNode.parentNode;
	child = document.getElementById('buttonRow');

	row = document.createElement("tr");
	row.setAttribute('id', 'fld'.concat(fieldNumber));
	row.setAttribute('class', 'tbl'.concat(currentTable));
	row.innerHTML = '                <td><input type="text" class="form-control" id="field_Name" name="field_Name" value="field'.concat(fieldNumber, '" /></td>\n',
                '<td align="center"><input type="checkbox" name="primary" onchange="checkPrimary(this);"></td>\n',
                '<td>',
                '    <select class="form-control" onchange="checkAuto(this);">',
                '        <option value="NULL">--Select--</option>',
                '        <option value="INT">Integer</option>',
                '        <option value="TEXT">Text</option>',
                '        <option value="REAL">Decimal</option>',
                '        <option value="BOOLEAN">True/False</option>',
                '        <option value="DATE">Date</option>',
                '        <option value="DATETIME">Date & Time</option>',
                '    </select>',
                '</td>\n',
                '<td align="center"><input type="checkbox" name="null"></td>\n',
                '<td align="center"><input type="checkbox" name="auto" disabled></td>\n',
                '<td align="center"><input type="checkbox" name="unique"></td>\n',
                '<td align="center"><input class="foreignKey" type="checkbox" name="foreign" onchange="checkForeign(this);"></td>\n',
                '<td></td>\n',
                '<td><button type="button" class="btn btn-light2 btn-circle" onclick="removeField(this)"><b>-</b></button></td>\n'
                );

	table.insertBefore(row, child);
	fieldNumber++;

	table = document.getElementById('field');
	updateRecordLayout(table);
}

function addRecord(element)
{
	table = element.parentNode.parentNode.parentNode;
	child = table.lastElementChild;

	row = document.createElement("tr");
	row.innerHTML = recordHTML;

	table.insertBefore(row, child);

	setAuto(row);
}

function removeField(element)
{
	row = element.parentNode.parentNode;

	row.remove();
	table = document.getElementById('field');
	updateRecordLayout(table);
}

function removeRecord(element)
{
	row = element.parentNode.parentNode;

	row.remove();
}

function updateRecordLayout(table)
{
	var primeCheck = false;
	table = table.lastChild;
	children = table.children;

	var html = "<thead><tr>";
	recordHTML = "";

	for (var i = 1; i < children.length-1; i++)
	{
		if(children[i].style.display != 'none')
		{
			html = html.concat('<th class="record-head">', children[i].firstChild.nextSibling.firstChild.value, '</th>');
		}
	}

	html = html.concat('<th class="record-head">Remove Record</th></tr></thead><tbody><tr>');

	for (var i = 1; i < children.length-1; i++)
	{
		if(children[i].style.display != 'none')
		{
			var select = children[i].childNodes[5].firstElementChild;
			var prime = children[i].children[1].firstElementChild.checked;
			var notNull = children[i].children[3].firstElementChild.checked;
			var auto = children[i].children[4].firstElementChild.checked;
			var unique = children[i].children[5].firstElementChild.checked;
			var foreign = children[i].children[6].firstElementChild.checked;

			var value = select.options[select.selectedIndex].value;

			html = html.concat('<td>', '<input class="');
			recordHTML = recordHTML.concat('<td>', '<input class="');

			if(prime)
			{
				html = html.concat('primary ');
				recordHTML = recordHTML.concat('primary ');

				document.getElementById('table'.concat(currentTable)).classList.add('single');
				document.getElementById('table'.concat(currentTable)).classList.remove('compound');

				if(primeCheck)
				{
					document.getElementById('table'.concat(currentTable)).classList.remove('single');
					document.getElementById('table'.concat(currentTable)).classList.add('compound');
				}
				primeCheck = true;
			}
			if(notNull)
			{
				html = html.concat('notNull ');
				recordHTML = recordHTML.concat('notNull ');
			}
			if(auto)
			{
				html = html.concat('auto ');
				recordHTML = recordHTML.concat('auto ');
			}
			if(unique)
			{
				html = html.concat('unique ');
				recordHTML = recordHTML.concat('unique ');
			}

			if(value == 'NULL')
			{
				html = html.concat('null form-control" type="text" name="disabledfield" disabled>', '</td>');
				recordHTML = recordHTML.concat('null form-control" type="text" name="disabledfield" disabled>', '</td>');
			}
			else if(value == 'INT')
			{
				if(auto)
				{
					html = html.concat('int form-control" type="text" name="integerfield" value="1">', '</td>')
				}
				else
				{
					html = html.concat('int form-control" type="text" name="integerfield">', '</td>');
				}
				recordHTML = recordHTML.concat('int form-control" type="text" name="integerfield">', '</td>');
			}
			else if(value == 'TEXT')
			{
				html = html.concat('text form-control" type="text" name="textfield">', '</td>');
				recordHTML = recordHTML.concat('text form-control" type="text" name="textfield">', '</td>');
			}
			else if(value == 'REAL')
			{
				html = html.concat('decimal form-control" type="text" name="decimalield">', '</td>');
				recordHTML = recordHTML.concat('decimal form-control" type="text" name="decimalield">', '</td>');
			}
			else if(value == 'BOOLEAN')
			{
				html = html.concat('bool" type="checkbox" name="booleanfield">', '</td>');
				recordHTML = recordHTML.concat('bool" type="checkbox" name="booleanfield">', '</td>');
			}
			else if(value == 'DATE')
			{
				html = html.concat('date form-control" type="text" name="datefield">', '</td>');
				recordHTML = recordHTML.concat('date form-control" type="text" name="datefield">', '</td>');
			}
			else if(value == 'DATETIME')
			{
				html = html.concat('datetime form-control" type="text" name="datetimefield">', '</td>');
				recordHTML = recordHTML.concat('datetime form-control" type="text" name="datetimefield">', '</td>');
			}
		}
	}
	html = html.concat('<td></td></tr><tr id="recordAdd"><td align="left"><button type="button" class="btn btn-light2 btn-circle" onclick="addRecord(this)"><b>+</b></button></td><td></td></tr></tbody>');
	recordHTML = recordHTML.concat('<td align="right"><button type="button" class="btn btn-light2 btn-circle" onclick="removeRecord(this)"><b>-</b></button></td>');

	document.getElementById('table'.concat(currentTable)).innerHTML = html;
}

function checkAuto(select)
{
	var value = select.options[select.selectedIndex].value;

	var checkbox = select.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.firstChild;

	if(value == 'INT')
	{
		checkbox.removeAttribute('disabled');
	}
	else 
	{
		checkbox.checked = false;
		checkbox.setAttribute('disabled', 'disabled');
	}
}

function checkPrimary(check)
{
	var value = check.checked;

	var nullBox = check.parentNode.nextElementSibling.nextElementSibling.firstChild;

	if(value)
	{
		nullBox.setAttribute('disabled', 'disabled');
		nullBox.checked = true;
	}
	else 
	{
		nullBox.removeAttribute('disabled');
	}
}

function checkForeign(check)
{
	var value = check.checked;

	var relatedField = check.parentNode.nextElementSibling;

	relatedField.innerHTML = "";

	var dataSelect = check.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild;
	var dataType = dataSelect.options[dataSelect.selectedIndex].value;

	if(value)
	{
		related = document.createElement("select");
		related.setAttribute('class', 'form-control');

		primeTables = document.getElementsByClassName('single');

		inner = '<option value="null">--Select--</option>';

		for(var i = 0; i < primeTables.length; i++)
		{
			fieldClass = primeTables[i].lastElementChild.firstElementChild.firstElementChild.firstElementChild.classList;

			tableNum = primeTables[i].id.substring(5);

			if(tableNum != currentTable)
			{
				if(dataType == 'NULL' && fieldClass.contains('null'))
				{
					inner = inner.concat('<option value="', tableNum, '">', primeTables[i].firstElementChild.firstElementChild.firstElementChild.innerHTML, '</option>');
				}
				else if(dataType == 'INT' && fieldClass.contains('int'))
				{
					inner = inner.concat('<option value="', tableNum, '">', primeTables[i].firstElementChild.firstElementChild.firstElementChild.innerHTML, '</option>');
				}
				else if(dataType == 'TEXT' && fieldClass.contains('text'))
				{
					inner = inner.concat('<option value="', tableNum, '">', primeTables[i].firstElementChild.firstElementChild.firstElementChild.innerHTML, '</option>');
				}
				else if(dataType == 'REAL' && fieldClass.contains('decimal'))
				{
					inner = inner.concat('<option value="', tableNum, '">', primeTables[i].firstElementChild.firstElementChild.firstElementChild.innerHTML, '</option>');
				}
				else if(dataType == 'BOOLEAN' && fieldClass.contains('bool'))
				{
					inner = inner.concat('<option value="', tableNum, '">', primeTables[i].firstElementChild.firstElementChild.firstElementChild.innerHTML, '</option>');
				}
				else if(dataType == 'DATE' && fieldClass.contains('date'))
				{
					inner = inner.concat('<option value="', tableNum, '">', primeTables[i].firstElementChild.firstElementChild.firstElementChild.innerHTML, '</option>');
				}
				else if(dataType == 'DATETIME' && fieldClass.contains('datetime'))
				{
					inner = inner.concat('<option value="', tableNum, '">', primeTables[i].firstElementChild.firstElementChild.firstElementChild.innerHTML, '</option>');
				}
			}
		}

		relatedField.append(related);

		related.innerHTML = inner;
	}
}

function setAuto(row)
{
	body = row.parentNode;
	rows = body.children;

	children = row.children;

	autoNum = 1;

	for(var i = 0; i < children.length; i++)
	{
		var element = children[i].firstElementChild;

		if(element.classList.contains('auto'))
		{
			for(var j = 0; j < rows.length-1; j++)
			{
				if(rows[j].children[i].firstElementChild.value > autoNum)
				{
					autoNum = parseInt(rows[j].children[i].firstElementChild.value);
				}
			}

			element.value = autoNum+1;

			autoNum = 1;
		}
	}
}