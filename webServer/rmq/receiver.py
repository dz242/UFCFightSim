#!/usr/bin/python3
import pika

def main():

    creds = pika.PlainCredentials('dmzUser', 'dzit490-1')
    
    connection = pika.BlockingConnection(pika.ConnectionParameters('192.168.194.219', 5672, "UFCVHost", creds))

    channel = connection.channel()


    def callback(ch, method, properties, body):
        body = body.decode('utf-8')
        print("Received: %s" % body)
        print('\nWaiting for more messages...')
        ch.basic_ack(delivery_tag=method.delivery_tag)

    channel.basic_consume(queue='UFCQueue',
                      auto_ack=False,
                      on_message_callback=callback)

    print('Waiting for messages...')
    channel.start_consuming()



if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print('\nReceiver closed')
