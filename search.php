<?php
    $CN= mysqli_connect("localhost","root","");
    $DB= mysqli_select_db($CN,"testdatabase");

    $EncodedData = file_get_contents("php://input");
    $DecodedData = json_decode($EncodedData,true);

    $FindRollNo = $DecodedData["FindRollNo"];
    $SQ="select * from studentmaster where RollNo=$FindRollNo";

    $Table= mysqli_query($CN,$SQ);
    if(mysqli_num_rows($Table)>0)
    {
        $Row = mysqli_fetch_assoc($Table);
        $RollNo = $Row["RollNo"];
        $StudentName = $Row["StudentName"];
        $Course = $Row["Course"];
    }else {
        $RollNo = "" ; 
        $StudentName = "" ; 
        $Course = "";
    }
    $Response[] = array("RollNo"=>$RollNo,"StudentName"=>$StudentName,"Course"=>$Course);
    echo json_encode($Response);

?>