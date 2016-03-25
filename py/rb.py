#!/usr/bin/python coding:utf-8
import RPi.GPIO as GPIO
import time

import virtkey

GPIO.setmode(GPIO.BOARD)
GPIO.setup(11,GPIO.OUT)
GPIO.setup(19,GPIO.IN)

GPIO.output(11,False)

while True:
    in_value= GPIO.input(19)
    if in_value == True:
       GPIO.output(11,True)

       v = virtkey.virtkey()
       v.press_keysym(65507) #Ctrl键位
       v.press_unicode(ord('r')) #模拟字母r
       v.release_unicode(ord('r'))
       v.release_keysym(65507)

       while in_value == True:
         in_value = GPIO.input(19)
       GPIO.output(11,False)
