function addField(element)
{
	table = element.parentNode.parentNode.parentNode;
	child = document.getElementById('buttonRow');

	row = document.createElement("tr");
	row.setAttribute('id', 'fld'.concat(fieldNumber));
	row.innerHTML = '                <td><input type="text" class="form-control" id="field_Name" name="field_Name" value="field'.concat(fieldNumber, '" /></td>',
                '<td align="center"><input type="checkbox" name="primary"></td>',
                '<td>',
                '    <select class="form-control">',
                '        <option value="NULL">--Select--</option>',
                '        <option value="INT">Integer</option>',
                '        <option value="TEXT">Text</option>',
                '        <option value="REAL">Decimal</option>',
                '        <option value="BOOLEAN">True/False</option>',
                '        <option value="DATE">Date</option>',
                '        <option value="DATETIME">Date & Time</option>',
                '    </select>',
                '</td>',
                '<td align="center"><input type="checkbox" name="null"></td>',
                '<td align="center"><input type="checkbox" name="auto"></td>',
                '<td align="center"><input type="checkbox" name="unique"></td>',
                '<td align="center"><input type="checkbox" name="foreign"></td>',
                '<td></td>',
                '<td><button type="button" class="btn btn-light2 btn-circle" onclick="removeField(this)"><b>-</b></button></td>'
                );

	table.insertBefore(row, child);
	fieldNumber++;

	table = document.getElementById('field');
	updateRecordLayout(table);
}

function removeField(element)
{
	row = element.parentNode.parentNode;

	row.remove();
	table = document.getElementById('field');
	updateRecordLayout(table);
}

function updateRecordLayout(table)
{
	table = table.lastChild;
	children = table.children;

	var html = "<thead><tr>";

	for (var i = 1; i < children.length-1; i++)
	{
		html = html.concat('<th class="record-head">', children[i].firstChild.nextSibling.firstChild.value, '</th>');
	}
	html = html.concat('<th class="record-head">Remove Record</th></tr></thead><tbody><tr>');
	for (var i = 1; i < children.length-1; i++)
	{
		html = html.concat('<td>', '<input class="form-control" type="text" name="defaultfield" disabled>', '</td>');
	}
	html = html.concat('<td></td></tr><tr><td align="left"><button type="button" class="btn btn-light2 btn-circle"><b>+</b></button></td><td></td></tr></tbody>');

	document.getElementById('records').innerHTML = html;
}