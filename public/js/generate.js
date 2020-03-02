function generateSQL() 
{
	sql = document.getElementById('sql');
	sql.value = "";

	tabs = document.getElementById('tabs').children;

	names = document.getElementById('tblName').children;
	records = document.getElementById('records').children;
	fields = document.getElementById('field').lastElementChild.children;

	for(var i = 0; i < tabs.length; i++)
	{
		tableNum = tabs[i].id.substring(3, tabs[i].id.length-7);
		table = document.getElementById('table'.concat(tableNum));

		sql.value += 'CREATE TABLE "' + names[i].value + '" (\n';

		firstPass = true;
		compoundFlag = false;
		compoundString = "";

		foreignString = "";

		for(var j = 1; j < fields.length-1; j++)
		{
			if (fields[j].classList[0].substring(3) == tableNum)
			{
				if(!firstPass)
				{
					sql.value += ',\n';
				}
				else
				{
					firstPass = false;
				}

				sql.value += '"' + fields[j].firstElementChild.firstElementChild.value + '" ' + fields[j].children[2].firstElementChild.value;

				if(fields[j].children[1].firstElementChild.checked)
				{
					if(table.classList[table.classList.length-1] == 'single')
					{
						sql.value += ' PRIMARY KEY';
					}
					else
					{
						compoundFlag = true;

						if(compoundString == "")
						{
							compoundString += fields[j].firstElementChild.firstElementChild.value;
						}
						else
						{
							compoundString += ',' + fields[j].firstElementChild.firstElementChild.value;
						}
					}
				}

				if(fields[j].children[3].firstElementChild.checked)
				{
					sql.value += ' NOT NULL';
				}

				if(fields[j].children[5].firstElementChild.checked)
				{
					sql.value += ' UNIQUE';
				}

				if(fields[j].children[6].firstElementChild.checked)
				{
					foreignTable = document.getElementById('tbl'.concat(fields[j].children[7].firstElementChild.value, '-button')).innerHTML;

					foreignString += ', \nFOREIGN KEY ("' + fields[j].firstElementChild.firstElementChild.value + '") REFERENCES "' + foreignTable + '"("' + fields[j].children[7].firstElementChild.options[fields[j].children[7].firstElementChild.selectedIndex].text + '")'
				}
			}
		}

		if(compoundFlag)
		{
			sql.value += ', \nPRIMARY KEY(' + compoundString + ')';
		}

		sql.value += foreignString;

		sql.value += ');';
	}

	for(var i = 0; i < records.length; i++)
	{
		if(hasRecords(records[i]))
		{
			sql.value += '\n\nINSERT INTO "' + names[i].value + '"("' + records[i].firstElementChild.firstElementChild.firstElementChild.innerHTML + '"';

			headers = records[i].firstElementChild.firstElementChild.children;

			for(var j = 1; j < headers.length-1; j++)
			{
				sql.value += ', "' + headers[j].innerHTML + '"';
			}

			sql.value += ')\nVALUES ';

			firstPass = true;
			tuples = records[i].lastElementChild.children;

			for(var j = 0; j < tuples.length-1; j++)
			{
				if(!firstPass)
				{
					sql.value += ',\n';
				}
				else
				{
					firstPass = false;
				}

				values = tuples[j].children;

				if(values[0].firstElementChild.type == 'text')
				{
					sql.value += '("' + values[0].firstElementChild.value + '"';
				}
				else
				{
					sql.value += '("' + (values[0].firstElementChild.checked ? '1' : '0') + '"';	
				}

				for(var k = 1; k < values.length-1; k++)
				{
					if(values[k].firstElementChild.type == 'text')
					{
						sql.value += ',"' + values[k].firstElementChild.value + '"';
					}
					else
					{
						sql.value += ',"' + (values[k].firstElementChild.checked ? '1' : '0') + '"';	
					}
				}

				sql.value += ')'
			}

			sql.value += ';'
		}
	}
}

function hasRecords(table)
{
	return (table.lastElementChild.children.length > 1);
}