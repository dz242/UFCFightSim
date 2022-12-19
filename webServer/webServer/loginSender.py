#!/usr/bin/python3

import pika
import json
import cgi

creds = pika.PlainCredentials('dmzUser', 'dzit490-1')

connection = pika.BlockingConnection(pika.ConnectionParameters("192.168.194.219", 5672, "UFCVHost", creds))

channel = connection.channel()


form = cgi.FieldStorage()

uname = form.getValue('uname')
password = form.getValue('password')


msg = {'uname': uname,
        'password': password
        }

msg = json.dumps(msg)

channel.basic_publish(exchange='UFCTest',
                      routing_key='UFCQueue',
                      body = msg)
print("Sent: " + msg )

