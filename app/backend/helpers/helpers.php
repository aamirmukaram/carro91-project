<?php
//HELPERS

function utf8ize($d)
{
    if (is_array($d)) {
        foreach ($d as $k => $v) {
            $d[$k] = utf8ize($v);
        }
    } else if (is_string($d)) {
        return utf8_encode($d);
    }
    return $d;
}

function array_to_number($arry)
{

    foreach ($arry as $key => $value) {
        $arry[$key] = intval($value);
    }
    return $arry;
}

function date_formate_converter ($date, $from_format, $to_format)
{
    $date = DateTime::createFromFormat($from_format, $date);
    return $date->format($to_format);
}


//Need to create normalize function which will convert string-numbers to numbers
