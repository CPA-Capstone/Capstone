function updateTableName(table, value)
{
	document.getElementById(table.concat('-button')).innerHTML = value;

	validation();
}

function addTable()
{
	table = document.getElementById('field').lastElementChild;
	child = document.getElementById('buttonRow');

	row = document.createElement("tr");
	row.setAttribute('id', 'fld'.concat(fieldNumber));
	row.setAttribute('class', 'tbl'.concat(tableNumber));
	row.innerHTML = '                <td><input type="text" class="form-control" id="field_Name" name="field_Name" value="field'.concat(fieldNumber, '" /></td>\n',
                '<td align="center"><input type="checkbox" name="primary" onchange="checkPrimary(this);" checked disabled></td>\n',
                '<td>',
                '    <select class="form-control" onchange="checkAuto(this); checkForeign(this.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild);">',
                '        <option value="NULL">--Select--</option>',
                '        <option value="INT">Integer</option>',
                '        <option value="TEXT">Text</option>',
                '        <option value="REAL">Decimal</option>',
                '        <option value="BOOLEAN">True/False</option>',
                '        <option value="DATE">Date</option>',
                '        <option value="DATETIME">Date & Time</option>',
                '    </select>',
                '</td>\n',
                '<td align="center"><input type="checkbox" name="null" checked disabled></td>\n',
                '<td align="center"><input type="checkbox" name="auto" disabled></td>\n',
                '<td align="center"><input type="checkbox" name="unique"></td>\n',
                '<td align="center"><input class="foreignKey" type="checkbox" name="foreign" onchange="checkForeign(this);"></td>\n',
                '<td></td>\n',
                '<td></td>\n'
                );

	table.insertBefore(row, child);
	row.style.display = 'none';
	fieldNumber++;

	records = document.createElement("table");
	records.setAttribute('id', 'table'.concat(tableNumber));
	records.setAttribute('class', 'table table-bordered table-sm tbl'.concat(tableNumber, ' single'));
	records.setAttribute('cellspacing', '0');
	records.setAttribute('width', '100%');

	div = document.getElementById('records');
	div.appendChild(records);
	records.style.display = 'none';

	input = document.createElement("INPUT");
	input.setAttribute('type', 'text');
	input.setAttribute('class', 'form-control tbl'.concat(tableNumber));
	input.setAttribute('value', 'table'.concat(tableNumber));
	input.setAttribute('onchange', 'updateTableName("tbl'.concat(tableNumber, '", this.value);'));

	nameDiv = document.getElementById('tblName');
	nameDiv.appendChild(input);
	input.style.display = 'none'

	button = document.createElement("button");
	button.setAttribute('type', 'button');
	button.setAttribute('id', 'tbl'.concat(tableNumber, '-button'));
	button.setAttribute('class', 'btn btn-secondary tbl-button');
	button.setAttribute('onclick', 'switchTable('.concat(tableNumber, ', false)'));
	button.innerHTML = 'table'.concat(tableNumber);

	tab = document.getElementById('tabs');
	tab.appendChild(button);

	removal = document.createElement("button");
	removal.setAttribute('type', 'button');
	removal.setAttribute('class', 'btn btn-light2 btn-circle tbl'.concat(tableNumber));
	removal.setAttribute('onclick', 'removeTable()');
	removal.innerHTML = '<b>-</b>';

	min = document.getElementById('minus');
	min.appendChild(removal);
	removal.style.display = 'none';

	switchTable(tableNumber, true);

	tableNumber++;

	table = document.getElementById('field');
	updateRecordLayout(table);

	validation();
}

function removeTable()
{
	if(document.getElementsByClassName('drop'.concat(currentTable)).length > 0)
	{
		alert('There are table(s) that have a foreign key related to this table. Please remove this relationship and try again.');
	}
	else
	{
		if(confirm("Are you sure?\n(All fields and records in this table will be lost permanently)"))
		{
			current = document.getElementsByClassName('tbl'.concat(currentTable));
			length = current.length;

			for(var i = 0; i < length; i++)
			{
				current[0].remove();
			}
			document.getElementById('tbl'.concat(currentTable, '-button')).remove();

			switchTable(1);
		}
	}

	validation();
}

function switchTable(tableNum, isNew)
{
	setDrops();

	current = document.getElementsByClassName('tbl'.concat(currentTable));
	switched = document.getElementsByClassName('tbl'.concat(tableNum));

	for(var i = 0; i < current.length; i++)
	{
		current[i].style.display = 'none';
	}

	for(var i = 0; i < switched.length; i++)
	{
		if(switched[i].nodeName == "TR")
		{
			switched[i].style.display = 'table-row';		
		}
		else if(switched[i].nodeName == "TABLE")
		{
			switched[i].style.display = 'table';
		}
		else
		{
			switched[i].style.display = 'block';
		}
	}

	if(document.getElementById('tbl'.concat(currentTable, '-button')))
	{
		document.getElementById('tbl'.concat(currentTable, '-button')).removeAttribute('disabled');
	}
	document.getElementById('tbl'.concat(tableNum, '-button')).setAttribute('disabled', 'disabled');

	currentTable = tableNum;

	setRecord(document.getElementById('field'));

	if(!isNew)
	{
		keys = document.getElementsByClassName('foreignKey');

		for(var i = 0; i < keys.length; i++)
		{
			if(keys[i].parentNode.parentNode.classList.contains('tbl'.concat(currentTable)))
			{
				checkForeign(keys[i]);
			}
		}
	}

	//validation();
}