#!/usr/bin/python coding:utf-8
import RPi.GPIO as GPIO
import time

import virtkey

GPIO.setmode(GPIO.BOARD)
GPIO.setup(19,GPIO.IN)

while True:
    in_value= GPIO.input(19)
    if in_value == True:
        v = virtkey.virtkey()
        v.press_keysym(65507) #Ctrl键位
        v.press_unicode(ord('r')) #模拟字母r
        v.release_unicode(ord('r'))
        v.release_keysym(65507)

        while in_value == True:
            in_value = GPIO.input(19)
