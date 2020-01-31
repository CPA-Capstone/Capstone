@extends ('layouts.layout')

@section ('content')

    <div class="container-fluid name-div">
        <table width="100%">
            <tr>
                <td width="10%"><label for="data_Name">Database Name:</label></td>
                <td width="20%"><input type="text" class="form-control" id="data_Name" name="data_Name" /></td>
                <td width="70%" align="right">{{-- <button type="button" class="btn btn-info btn-circle" onclick="databaseHelp()"><b>?</b></button> --}}</td>
            </tr>
        </table>
    </div>

    <div class="container-fluid table-tab">
        <table width="100%">
            <tr>
                <td width="15%" align="center"><button type="button" id="tbl1-button" class="btn btn-secondary tbl-button" disabled>table1</button></td>
                <td width="75%"></td>
                <td width="5%" align="left"><button type="button" class="btn btn-light2 btn-circle"><b>+</b></button></td>
                <td width="5%" align="right"><button type="button" class="btn btn-info btn-circle" onclick="tableTabHelp()"><b>?</b></button></td>
            </tr>
        </table>
    </div>

    <div class="container-fluid">
        <table width="100%">
            <tr>
                <td width="10%"><label for="table_Name">Table Name:</label></td>
                <td width="20%"><input type="text" class="form-control tbl1" id="table_Name" name="table_Name" value="table1" 
                    onchange="updateTableName('tbl1', this.value);"/>
                </td>
                <td width="60%"></td>
                <td width="5%"></td>
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
            <tr id="fld1">
                <td><input type="text" class="form-control" id="field_Name" name="field_Name" value="field1" /></td>
                <td align="center"><input type="checkbox" name="primary" checked disabled></td>
                <td>
                    <select class="form-control">
                        <option value="NULL">--Select--</option>
                        <option value="INT">Integer</option>
                        <option value="TEXT">Text</option>
                        <option value="REAL">Decimal</option>
                        <option value="BOOLEAN">True/False</option>
                        <option value="DATE">Date</option>
                        <option value="DATETIME">Date & Time</option>
                    </select>
                </td>
                <td align="center"><input type="checkbox" name="null"></td>
                <td align="center"><input type="checkbox" name="auto"></td>
                <td align="center"><input type="checkbox" name="unique"></td>
                <td align="center"><input type="checkbox" name="foreign"></td>
                <td></td>
                <td></td>
            </tr>
            <tr id="buttonRow">
                <td><button type="button" class="btn btn-light2 btn-circle" onclick="addField(this)"><b>+</b></button></td>
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
        <div class="scroll" style="overflow-x:auto; overflow-y: auto;">
            <table id="records" class="table table-striped table-bordered table-sm " cellspacing="0" width="100%">
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
                    <tr>
                        <td align="left"><button type="button" class="btn btn-light2 btn-circle" onclick="tableHelp()"><b>+</b></button></td>
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