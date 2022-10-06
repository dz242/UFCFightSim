#!/usr/bin/python3

import pika

creds = pika.PlainCredentials('dmzUser', 'dzit490-1')

connection = pika.BlockingConnection(pika.ConnectionParameters("192.168.194.219", 5672, "UFCVHost", creds))

channel = connection.channel()

msg = 'Test Message'

channel.basic_publish(exchange='UFCTest',
                      routing_key='UFCQueue',
                      body = msg)
print("Sent: " + msg )

