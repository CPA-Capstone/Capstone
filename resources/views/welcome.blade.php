@extends ('layouts.layout')

@section ('content')

<form autocomplete="off" method="POST" action="/download" target="_blank">
      {{ csrf_field() }}

<div id="content" onchange="validation();">
    <div class="container-fluid name-div">
        <table width="100%">
            <tr>
                <td width="10%"><label for="data_Name">Database Name:</label></td>
                <td width="20%"><input type="text" class="form-control" id="data_Name" name="data_Name"/></td>
                <td width="50%" align="right"></td>
            </tr>
          
        </table>
    </div>
    
    <br>

    <br>
    <div class="container-fluid table-tab">
        <table width="100%">
            <tr>
                <td id="tabs" width="90%"><button type="button" id="tbl1-button" class="btn btn-secondary tbl-button" disabled onclick="switchTable(1, false); validation();">table1</button></td>
                <td width="5%" align="left"><button type="button" class="btn btn-light2 btn-circle" onclick="addTable()"><b>+</b></button></td>
                <td width="5%" align="right"><button type="button" class="btn btn-info btn-circle" onclick="tableTabHelp()"><b>?</b></button></td>
            </tr>
        </table>
    </div>

    <div class="container-fluid">
        <table width="100%">
            <tr>
                <td width="10%"><label for="table_Name">Table Name:</label></td>
                <td width="20%" id="tblName"><input type="text" class="form-control tbl1" id="table_Name" name="table_Name" value="table1" 
                    onchange="updateTableName('tbl1', this.value);"/>
                </td>
                <td width="60%"></td>
                <td width="5%" id="minus"></td>
                <td width="5%" align="right"><button type="button" class="btn btn-info btn-circle" onclick="fieldHelp()"><b>?</b></button></td>
            </tr>
        </table>
        <table id="field" width="100%" class="table" onchange="updateRecordLayout(this);">
            <caption class="fields"><h4>Table Fields</h4></caption>
            <tr>
                <th>Field Name</th>
                <th>Primary Key</th>
                <th>Data Type</th>
                <th>Not Null</th>
                <th>Auto Increment</th>
                <th>Unique</th>
                <th>Foreign Key</th>
                <th>Related Field</th>
                <th>Remove Field</th>
            </tr>
            <tr id="fld1" class="tbl1">
                <td><input type="text" class="form-control" id="field_Name" name="field_Name" value="field1" /></td>
                <td align="center"><input type="checkbox" name="primary" checked disabled onchange="checkPrimary(this);"></td>
                <td>
                    <select class="form-control" onchange="checkAuto(this); checkBool(this); checkForeign(this.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild); checkBoolean(this)">
                        <option value="NULL">--Select--</option>
                        <option value="INT">Integer</option>
                        <option value="TEXT">Text</option>
                        <option value="REAL">Decimal</option>
                        <option value="BOOLEAN">True/False</option>
                        <option value="DATE">Date</option>
                        <option value="DATETIME">Date & Time</option>
                    </select>
                </td>
                <td align="center"><input type="checkbox" name="null" checked disabled></td>
                <td align="center"><input type="checkbox" name="auto" disabled></td>
                <td align="center"><input type="checkbox" name="unique"></td>
                <td align="center"><input class="foreignKey" type="checkbox" name="foreign" onchange="checkForeign(this);"></td>
                <td></td>
                <td></td>
            </tr>
            <tr id="buttonRow">
                <td><button type="button" id="newField" class="btn btn-light2 btn-circle" onclick="addField(this)"><b>+</b></button></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </table>
        <div align="right"><button type="button" class="btn btn-info btn-circle" onclick="tableHelp()"><b>?</b></button></div>
        <br>

        <center><h5>Table Records</h5></center>
        <div id="records" class="scroll" style="overflow-x:auto; overflow-y: auto;" onchange="setDrops();">
            <table id="table1" class="table table-bordered table-sm tbl1 single" cellspacing="0" width="100%">
                <thead>
                    <tr>
                        <th class="record-head">field1</th>
                        <th class="record-head">Remove Record</th>
                    </tr>
                </thead>
                <tbody>
                    <tr id="recordAdd">
                        <td align="left"><button type="button" class="btn btn-light2 btn-circle" onclick="addRecord(this)"><b>+</b></button></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="container-fluid name-div">
        <table width="100%">
        <div id="errors" onblur="showErrors()">
            <tr>
                <td width="30%"></td>
                <td width="20%" align="left"><button id="btn_generate" type="button" class="btn btn-blue" disabled="" onclick="generateSQL();">Generate</button></td>
                {{-- <form method="POST" action="/download" target="_blank">
                {{ csrf_field() }} --}}
                    <td width="20%" align="right">
                        <input id="sql" name="sql" type="hidden" value="asdasd">
                        <input id="DBname" name="DBname" type="hidden">
                        <input id="btn_download" type="submit" class="btn btn-blue" value="Download" >
                        {{-- <script>
                            confirm("There was an error! Would you like to send us the error info? This will send us the information from your database.");
                        </script> --}}

                    </td>
                    
                {{-- </form> --}}
                <td width="30%" align="right"><button type="button" class="btn btn-info btn-circle" onclick="makeDatabaseHelp()"><b>?</b></button></td>
            </tr>
         </div>            

        </table>
    </div>

    <br>
</div>

</form>

@endsection