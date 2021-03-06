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
                '    <select class="form-control" onchange="checkAuto(this); checkBool(this); checkForeign(this.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild);">',
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

	$(row).fadeOut(0);
	$(row).fadeIn("slow");
	

	table = document.getElementById('field');
	updateRecordLayout(table);

	validation();
}


function addRecord(element)
{
	table = element.parentNode.parentNode.parentNode;
	child = table.lastElementChild;

	row = document.createElement("tr");
	row.innerHTML = recordHTML;

	table.insertBefore(row, child);

	setAuto(row);

	setDrops();

	validation();
}

function removeField(element)
{
	row = element.parentNode.parentNode;

	row.remove();
	table = document.getElementById('field');
	updateRecordLayout(table);

	validation();
}

function removeRecord(element)
{
	row = element.parentNode.parentNode;

	row.remove();

	setDrops();

	validation();
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
			var select = children[i].childNodes[5].firstElementChild;
			var value = select.options[select.selectedIndex].value;

			html = html.concat('<th class="record-head ')

			if(value == 'NULL')
			{
				html = html.concat('null');
			}
			else if(value == 'INT')
			{
				html = html.concat('int');
			}
			else if(value == 'TEXT')
			{
				html = html.concat('text');
			}
			else if(value == 'REAL')
			{
				html = html.concat('decimal');
			}
			else if(value == 'BOOLEAN')
			{
				html = html.concat('bool');
			}
			else if(value == 'DATE')
			{
				html = html.concat('date');
			}
			else if(value == 'DATETIME')
			{
				html = html.concat('datetime');
			}

			html = html.concat('">', children[i].firstChild.nextSibling.firstChild.value, '</th>');
		}
	}

	html = html.concat('<th class="record-head">Remove Record</th></tr></thead><tbody>');

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

			if(foreign)
			{
				recordHTML = recordHTML.concat('<td>', '<select class="');
			}
			else
			{
				recordHTML = recordHTML.concat('<td>', '<input class="');
			}

			if(prime)
			{
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
				recordHTML = recordHTML.concat('notNull ');
			}
			if(auto)
			{
				recordHTML = recordHTML.concat('auto ');
			}
			if(unique)
			{
				recordHTML = recordHTML.concat('unique ');
			}

			if(foreign)
			{
				var foreignVal = children[i].children[7].firstElementChild.value;

				recordHTML = recordHTML.concat('related ');

				if(foreignVal == 'null')
				{
					recordHTML = recordHTML.concat('form-control" disabled>', '</td>');
				}
				else
				{
					relatedTable = document.getElementById('table'.concat(foreignVal));
					relatedTable = relatedTable.lastElementChild;

					relatedRows = relatedTable.children;

					recordHTML = recordHTML.concat('form-control drop', foreignVal, '"><option value="null">-Select-</option>');

					for(var j = 0; j < relatedRows.length-1; j++)
					{
						var element = relatedRows[j].firstElementChild.firstElementChild.value;

						recordHTML = recordHTML.concat('<option value="', element, '">', element, '</option>');
					}
				}	
			}
			else if(value == 'NULL')
			{
				recordHTML = recordHTML.concat('null form-control" type="text" name="disabledfield" disabled>', '</td>');
			}
			else if(value == 'INT')
			{
				recordHTML = recordHTML.concat('int form-control" type="text" name="integerfield">', '</td>');
			}
			else if(value == 'TEXT')
			{
				recordHTML = recordHTML.concat('text form-control" type="text" name="textfield">', '</td>');
			}
			else if(value == 'REAL')
			{
				recordHTML = recordHTML.concat('decimal form-control" type="text" name="decimalield">', '</td>');
			}
			else if(value == 'BOOLEAN')
			{
				recordHTML = recordHTML.concat('bool" type="checkbox" name="booleanfield">', '</td>');
			}
			else if(value == 'DATE')
			{
				recordHTML = recordHTML.concat('date form-control" type="text" name="datefield">', '</td>');
			}
			else if(value == 'DATETIME')
			{
				recordHTML = recordHTML.concat('datetime form-control" type="text" name="datetimefield">', '</td>');
			}
		}
	}
	html = html.concat('<tr id="recordAdd"><td align="left"><button type="button" class="btn btn-light2 btn-circle" onclick="addRecord(this)"><b>+</b></button></td><td></td></tr></tbody>');
	recordHTML = recordHTML.concat('<td align="right"><button type="button" class="btn btn-light2 btn-circle" onclick="removeRecord(this)"><b>-</b></button></td>');

	document.getElementById('table'.concat(currentTable)).innerHTML = html;
	
	//validation();
}

function checkAuto(select)
{
	var value = select.options[select.selectedIndex].value;

	var checkbox = select.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.firstChild;

	if(value == 'INT' && !select.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.checked)
	{
		checkbox.removeAttribute('disabled');
	}
	else 
	{
		checkbox.checked = false;
		checkbox.setAttribute('disabled', 'disabled');
	}

	validation();
}

function checkBool(select)
{
	var value = select.options[select.selectedIndex].value;

	var checkbox = select.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild;

	if(value != 'BOOLEAN')
	{
		checkbox.removeAttribute('disabled');
	}
	else 
	{
		checkbox.checked = false;
		checkbox.setAttribute('disabled', 'disabled');
	}

	var checkbox = select.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild;

	if(value != 'BOOLEAN')
	{
		checkbox.removeAttribute('disabled');
	}
	else 
	{
		checkbox.checked = false;
		checkbox.setAttribute('disabled', 'disabled');
	}

	var checkbox = select.parentNode.nextElementSibling.firstElementChild;

	if(value == 'BOOLEAN' || select.parentNode.previousElementSibling.firstElementChild.checked)
	{
		checkbox.setAttribute('disabled', 'disabled');
		checkbox.checked = true;
	}
	else 
	{
		checkbox.removeAttribute('disabled');
	}

	validation();
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

	validation();
}

function checkForeign(check)
{
	var value = check.checked;

	var auto = check.parentNode.previousElementSibling.previousElementSibling.firstElementChild;

	var currentVal = 'null';
	var relatedField = check.parentNode.nextElementSibling;
	if(relatedField.firstElementChild)
	{
		currentVal = relatedField.firstElementChild.options[relatedField.firstElementChild.selectedIndex].value;
	}

	var dataSelect = check.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild;
	var dataType = dataSelect.options[dataSelect.selectedIndex].value;

	if(value)
	{
		auto.setAttribute('disabled', 'disabled');
		auto.checked = false;

		related = document.createElement("select");
		related.setAttribute('class', 'form-control');

		primeTables = document.getElementsByClassName('single');

		inner = '<option value="null">--Select--</option>';

		for(var i = 0; i < primeTables.length; i++)
		{
			fieldClass = primeTables[i].firstElementChild.firstElementChild.firstElementChild.classList;

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

		if(relatedField.innerHTML == "" || relatedField.firstElementChild.innerHTML != inner)
		{
			relatedField.innerHTML = "";

			relatedField.append(related);

			related.innerHTML = inner;
			related.value = currentVal;

			if(related.selectedIndex == -1)
			{
				related.value = 'null';

				updateRecordLayout(document.getElementById('field'));
			}
		}
	}
	else
	{
		relatedField.innerHTML = "";

		if(auto.parentNode.previousElementSibling.previousElementSibling.firstElementChild.value == 'INT')
		{
			auto.removeAttribute('disabled');
		}
	}

	//validation();
}

function setAuto(row)
{
	body = row.parentNode;
	rows = body.children;

	children = row.children;

	autoNum = 0;

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

			autoNum = 0;
		}
	}

	validation();
}

function setRecord(table)
{
	table = table.lastChild;
	children = table.children;

	recordHTML = "";

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

			if(foreign)
			{
				recordHTML = recordHTML.concat('<td>', '<select class="');
			}
			else
			{
				recordHTML = recordHTML.concat('<td>', '<input class="');
			}

			if(prime)
			{
				recordHTML = recordHTML.concat('primary ');
			}
			if(notNull)
			{
				recordHTML = recordHTML.concat('notNull ');
			}
			if(auto)
			{
				recordHTML = recordHTML.concat('auto ');
			}
			if(unique)
			{
				recordHTML = recordHTML.concat('unique ');
			}

			if(foreign)
			{
				var foreignVal = children[i].children[7].firstElementChild.value;

				recordHTML = recordHTML.concat('related ');

				if(foreignVal == 'null')
				{
					recordHTML = recordHTML.concat('form-control" disabled>', '</td>');
				}
				else
				{
					relatedTable = document.getElementById('table'.concat(foreignVal));
					relatedTable = relatedTable.lastElementChild;

					relatedRows = relatedTable.children;

					recordHTML = recordHTML.concat('form-control drop', foreignVal, '"><option value="null">-Select-</option>');

					for(var j = 0; j < relatedRows.length-1; j++)
					{
						var element = relatedRows[j].firstElementChild.firstElementChild.value;

						recordHTML = recordHTML.concat('<option value="', element, '">', element, '</option>');
					}
				}	
			}
			else if(value == 'NULL')
			{
				recordHTML = recordHTML.concat('null form-control" type="text" name="disabledfield" disabled>', '</td>');
			}
			else if(value == 'INT')
			{
				recordHTML = recordHTML.concat('int form-control" type="text" name="integerfield">', '</td>');
			}
			else if(value == 'TEXT')
			{
				recordHTML = recordHTML.concat('text form-control" type="text" name="textfield">', '</td>');
			}
			else if(value == 'REAL')
			{
				recordHTML = recordHTML.concat('decimal form-control" type="text" name="decimalield">', '</td>');
			}
			else if(value == 'BOOLEAN')
			{
				recordHTML = recordHTML.concat('bool" type="checkbox" name="booleanfield">', '</td>');
			}
			else if(value == 'DATE')
			{
				recordHTML = recordHTML.concat('date form-control" type="text" name="datefield">', '</td>');
			}
			else if(value == 'DATETIME')
			{
				recordHTML = recordHTML.concat('datetime form-control" type="text" name="datetimefield">', '</td>');
			}
		}
	}
	recordHTML = recordHTML.concat('<td align="right"><button type="button" class="btn btn-light2 btn-circle" onclick="removeRecord(this)"><b>-</b></button></td>');

	//validation();
}

function setDrops()
{
	drops = document.getElementsByClassName('drop'.concat(currentTable));

	for(var i = 0; i < drops.length; i++)
	{
		currentVal = drops[i].value;
		drops[i].innerHTML = "";

		relatedTable = document.getElementById('table'.concat(currentTable));
		relatedTable = relatedTable.lastElementChild;

		relatedRows = relatedTable.children;

		var inner = '<option value="null">-Select-</option>';

		for(var j = 0; j < relatedRows.length-1; j++)
		{
			var element = relatedRows[j].firstElementChild.firstElementChild.value;

			inner = inner.concat('<option value="', element, '">', element, '</option>');
		}

		drops[i].innerHTML = inner;

		drops[i].value = currentVal;

		if(drops[i].selectedIndex == -1)
		{
			drops[i].selectedIndex = 0;
		}
	}

	//validation();
}