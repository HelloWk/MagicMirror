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

#
#     __2_
#    |     |    |  0 ->  011 1111 -> 0x3f
#  1 |     | 3  |  1 ->  010 0001 -> 0x21
#    |__7__|    |  2 ->  111 0110 -> 0x76
#    |     |    |  4 ->  ...
#  6 |     | 4  |        ...
#    |__5__|    |  9 ->  ...      -> 0x5f
#
#

pins = [27, 17, 22, 10, 25, 24, 11, 9] #GPIO ports
sels = [14, 15, 18] #GPIO ports to select led, there are four led lights
nums = [0x3f, 0x21, 0x76, 0x5e, 0x4d, 0x5b, 0x7b, 0x0e, 0x7f, 0x5f]

for i in pins + sels:
    GPIO.setup(i, GPIO.OUT)
    setp(i, 'off')

for i in sels:
    setp(i, 'on')


def flush(sel, n):
    setp(sels[sel], 'off')
    n = nums[n]
    for i in sels:
        if i != sels[sel]:
            setp(i, 'on')

    for i in range(7):
        if (n & (1 << i)):
            setp(pins[i], 'on')

    for i in range(7):
        if (n & (1 << i)):
            setp(pins[i], 'off')

try:
    while True:
        t = time.gmtime()
        #flush(3, t.tm_min / 10)
        flush(2, t.tm_min % 10)
        flush(1, t.tm_sec / 10)
        flush(0, t.tm_sec % 10)
except:
    GPIO.cleanup()
