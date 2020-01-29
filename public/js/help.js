function databaseHelp()
{
    alert("Type in the name of the database here.");
}

function tableTabHelp()
{
    alert("This is how you add new tables and switch between existing tables.");
}

function fieldHelp()
{
    alert("This is where you can change the table name and add or change field names. You can also specify the following information:\n".concat(
    "\na. Primary Key:  A unique identifying column for the table. You can have multiple primary keys in which case the combination becomes the unique identifier\n", 
    "b. Data Types: How do you want the data in each column stored. i.e. If you are entering a whole number, text, or date:\n",
    "   •Integer is for whole numbers.\n",
    "   •Text is for any characters not intended for arithmetic.\n", 
    "   •Decimal is any number with a decimal. \n",
    "   •True/False is any field that is binary. \n",
    "   •Date is specific down to the day. (Must follow this format: YYYY-MM-DD)\n",
    "   •DateTime is specific down to the second. \n",
    "(Must follow this format: YYYY-MM-DD HH:MM:SS)\n",
    "c. Not null: prevents this field from being empty.\n", 
    "d. Auto increment: counts up by 1 starting from 1. Only useable with Integer data type.\n",
    "e. Unique: will make sure the value held in this field is unique. \n",
    "f. Foreign Key: This field will relate to a primary key held in a different table in the database. The related field must be the same data type. i.e. employee’s ID on an invoice.\n",
    ));
}

function tableHelp()
{
    alert("This area is where you add your data to the database. The data must follow the rules specified in the field definition.");
}

function makeDatabaseHelp()
{
    alert("This is where you generate the database so you can download it. The download option will become available once generation is complete. If changes are made to the database you must generate the database again so that changes are reflected in the downloaded database.");
}