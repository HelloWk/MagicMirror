<?php
$pin = $_GET['pin'];
echo "pin:$pin, blink";
system("gpio write $pin 1");
system("gpio write $pin 0");
?>