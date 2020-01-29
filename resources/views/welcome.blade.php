@extends ('layouts.layout')

@section ('content')

    <div class="container-fluid name-div">
        <table width="100%">
            <tr>
                <td width="10%"><label for="data_Name">Name:</label></td>
                <td width="20%"><input type="text" class="form-control" id="data_Name" name="data_Name" /></td>
                <td width="70%" align="right"><button type="button" class="btn btn-primary btn-circle" onclick="databaseHelp()"><b>?</b></button></td>
            </tr>
        </table>
    </div>

    <div class="container-fluid table-tab">
        <table width="100%">
            <tr>
                <td width="15%" align="center"><button type="button" class="btn btn-secondary tbl-button">table1</button></td>
                <td width="75%"></td>
                <td width="5%" align="left"><button type="button" class="btn btn-light2 btn-circle"><b>+</b></button></td>
                <td width="5%" align="right"><button type="button" class="btn btn-primary btn-circle" onclick="tableTabHelp()"><b>?</b></button></td>
            </tr>
        </table>
    </div>

    <div class="container-fluid">
        <table width="100%">
            <tr>
                <td width="10%"><label for="table_Name">Table Name:</label></td>
                <td width="20%"><input type="text" class="form-control" id="table_Name" name="table_Name" value="table1" /></td>
                <td width="60%"></td>
                <td width="5%"><button type="button" class="btn btn-light2 btn-circle"><b>-</b></td>
                <td width="5%" align="right"><button type="button" class="btn btn-primary btn-circle" onclick="fieldHelp()"><b>?</b></button></td>
            </tr>
        </table>
        <table width="100%" class="table">
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
            </tr>
            <tr>
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
            </tr>
            <tr>
                <td><button type="button" class="btn btn-light2 btn-circle"><b>+</b></button></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </table>
        <div align="right"><button type="button" class="btn btn-primary btn-circle" onclick="tableHelp()"><b>?</b></button></div>
        <br>
        <div class="scroll" style="overflow-x:auto; overflow-y: auto;">
            <table id="dtHorizontalVerticalExample" class="table table-striped table-bordered table-sm " cellspacing="0" width="100%">
                <thead>
                    <tr>
                        <th>field1</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input class="form-control" type="text" name="defaultfield" disabled></td>
                    </tr>
                    <tr>
                        <td align="left"><button type="button" class="btn btn-light2 btn-circle" onclick="tableHelp()"><b>+</b></button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="container-fluid name-div">
        <table width="100%">
            <tr>
                <td width="30%"></td>
                <td width="20%" align="left"><button type="button" class="btn btn-dark"><b>Generate</b></button></td>
                <td width="20%" align="right"><button type="button" class="btn btn-dark" disabled><b>Download</b></button></td>
                <td width="30%" align="right"><button type="button" class="btn btn-primary btn-circle" onclick="makeDatabaseHelp()"><b>?</b></button></td>
            </tr>
        </table>
    </div>
    <br>

@endsection