#!/usr/bin/python3

import pika
import sys

creds = pika.PlainCredentials('dmzUser', 'dzit490-1')

connection = pika.BlockingConnection(pika.ConnectionParameters("192.168.194.219", 5672, "UFCVHost", creds))

channel = connection.channel()


if (sys.argv[1] is None):
    msg = 'Test Message (No argument is set!)'
else:
    msg = sys.argv[1]


channel.basic_publish(exchange='UFCTest',
                      routing_key='UFCQueue',
                      body = msg)
print("Sent: " + msg )

