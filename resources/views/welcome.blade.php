@extends ('layouts.layout')

@section ('content')

    <div class="container-fluid name-div">
        <table width="100%">
            <tr>
                <td width="10%"><label for="data_Name">Database Name:</label></td>
                <td width="20%"><input type="text" class="form-control" id="data_Name" name="data_Name" /></td>
                <td width="70%" align="right"></td>
            </tr>
        </table>
    </div>
    <br>

    <br>
    <div class="container-fluid table-tab">
        <table width="100%">
            <tr>
                <td id="tabs" width="90%"><button type="button" id="tbl1-button" class="btn btn-secondary tbl-button" disabled onclick="switchTable(1, false)">table1</button></td>
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
            <caption class="fields">Table Fields</caption>
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
                    <select class="form-control" onchange="checkAuto(this);">
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

        <center>Table Records</center>
        <div id="records" class="scroll" style="overflow-x:auto; overflow-y: auto;">
            <table id="table1" class="table table-bordered table-sm tbl1 single" cellspacing="0" width="100%">
                <thead>
                    <tr>
                        <th class="record-head">field1</th>
                        <th class="record-head">Remove Record</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input class="form-control" type="text" name="defaultfield" disabled></td>
                        <td></td>
                    </tr>
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
            <tr>
                <td width="30%"></td>
                <td width="20%" align="left"><button type="button" class="btn btn-blue"><b>Generate</b></button></td>
                <td width="20%" align="right"><button type="button" class="btn btn-blue" disabled><b>Download</b></button></td>
                <td width="30%" align="right"><button type="button" class="btn btn-info btn-circle" onclick="makeDatabaseHelp()"><b>?</b></button></td>
            </tr>
        </table>
    </div>
    <br>

@endsection