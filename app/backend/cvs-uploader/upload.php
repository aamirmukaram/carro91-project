<?php
//Note
//->Column name ORDER should match with DB table column ORDER.
//->Add empty columns if any column is missing in csv file.
//->Date format should be 31/05/15 format
//->TimeStamp format should be 31/05/15 15:45 format
//->Only 'ALLOW NULL' columns in mysql table can be provide empty value from csv file
//->You should check in mysql which columns are 'ALLOW NULL' and which are not


require '../config/config.php';
require '../helpers/helpers.php';
require('../helpers/vendors/parsecsv.lib.php');

$filename = "a.csv";
$table_name = 'restaurant_trip_advisor_detail';

?>
    <style type="text/css" media="screen">
        table {
            background-color: #BBB;
        }

        th {
            background-color: #EEE;
        }

        td {
            background-color: #FFF;
        }

        .error {
            margin: 10px 0;
            padding: 12px;
            color: #D8000C;
            background-color: #FFBABA;
        }

        .success {
            margin: 10px 0;
            padding: 12px;
            color: #4F8A10;
            background-color: #DFF2BF;
        }

        hr {
            margin: 45px 0 0 0;
            border: 0;
            height: 1px;
            background-image: -webkit-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);
            background-image: -moz-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);
            background-image: -ms-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);
            background-image: -o-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);
        }
    </style>
<?php


///////////////////////////

$column_names = null;

$date_index = null;
$date_time_index = null;

//Getting table columns names
$sql = "SELECT `COLUMN_NAME` FROM `INFORMATION_SCHEMA`.`COLUMNS` WHERE `TABLE_SCHEMA`='" . $dbname . "' AND `TABLE_NAME`='" . $table_name . "';";
$result = $conn->query($sql);
while ($row = $result->fetch_assoc()) {
    $column_names[] = $row;
}

//Creating insert statement

$sql = "INSERT INTO `" . $table_name . "` (";

$counter = 0;
foreach ($column_names as $value) {
    $sql = $sql . "`" . $value['COLUMN_NAME'] . "`,";

    if ($value['COLUMN_NAME'] == 'date') {
        $date_index = $counter;
    }
    if ($value['COLUMN_NAME'] == 'timestamp') {
        $date_time_index = $counter;
    }

    $counter = $counter + 1;
}
$sql = rtrim($sql, ",");
$sql = $sql . ") VALUES (";

$sql_pre = $sql;


$csv = new parseCSV();
$csv->auto('files/' . $filename);

//Adding values in insert statement

foreach ($csv->data as $key => $row):
    $row_current = null;
    $counter = 0;
    foreach ($row as $value):
        $row_current = $row;
        $value = $conn->real_escape_string($value);
        $value = preg_replace('/[[:^print:]]/', '', $value);
        if ($value == "") {
            $sql = $sql . "NULL" . ",";
        } else {

            if($date_index !== NULL && $date_index == $counter){
                $value = date_formate_converter($value,'d/m/y','Y-m-d');

            }
            if($date_time_index !== NULL && $date_time_index == $counter){
                $value = date_formate_converter($value,'d/m/y H:i','Y-m-d H:i');
            }

            $sql = $sql . "'" . $value . "'" . ",";
        }
        $counter = $counter + 1;
    endforeach;

    $sql = rtrim($sql, ",");
    $sql = $sql . ");";

    if ($conn->query($sql) === FALSE) {
        echo '<br><br>';
        echo '<center class="error">Error</center>' . $sql . '<br><p class="error">' . $conn->error . '</p>';

        ?>


        <table border="0" cellspacing="1" cellpadding="3">
            <tr>
                <?php foreach ($csv->titles as $value): ?>
                    <th><?php echo $value; ?></th>
                <?php endforeach; ?>
            </tr>

            <tr>
                <?php foreach ($row_current as $value): ?>
                    <td><?php echo $value; ?></td>
                <?php endforeach; ?>
            </tr>

        </table>

        <hr>

        <?php

    }
    $sql = $sql_pre;
endforeach;
echo '<br><br>';
echo '<center class="success">All DONE</center>';

