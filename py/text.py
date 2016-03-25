import RPi.GPIO as GPIO
import time, random

"""
Display date to LED lights
There are four lights, it displays 4 number
"""

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)

def setp(n, status='on'):
    if status == 'on':
        GPIO.output(n, GPIO.HIGH)
    else:
        GPIO.output(n, GPIO.LOW)

pins = [4, 17, 22, 10, 9, 11] #GPIO ports

for i in pins:
    GPIO.setup(i, GPIO.OUT)
    setp(i, 'off')

for i in range(6):
    setp(pins[i], 'on')

time.sleep(5)
GPIO.cleanup()
