import RPi.GPIO as GPIO
import time
GPIO.setmode(GPIO.BOARD)
GPIO.setup(11,GPIO.OUT)
GPIO.setup(19,GPIO.IN)

GPIO.output(11,False)

while True:
    in_value= GPIO.input(19)
    if in_value == True:
       GPIO.output(11,True)
       print "is working."
       while in_value == True:
         in_value = GPIO.input(19)
       GPIO.output(11,False)
