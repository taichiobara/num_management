from websocket_server import WebsocketServer
import logging
import json

class Websocket_Server():

    def __init__(self, host, port):
        self.server = WebsocketServer(port, host=host, loglevel=logging.DEBUG)

    # クライアント接続時に呼ばれる関数
    def new_client(self, client, server):
        print("new client connected and was given id {}".format(client['id']))
        # 全クライアントにメッセージを送信
        self.server.send_message_to_all("hey all, a new client has joined us")

    # クライアント切断時に呼ばれる関数
    def client_left(self, client, server):
        print("client({}) disconnected".format(client['id']))

    # クライアントからメッセージを受信したときに呼ばれる関数
    def message_received(self, client, server, message):
        # message = message[1:]
        # message = message[:-1]
        file = open('result.json', 'w')
        file.write(message)
        # print(message)
        # print(type(message))
        # #message=open(message)
        # json_data = json.load(message)
        # fw = open('myu_s.json', 'w')
        # json.dump(json_data, fw, indent=4)
        
        # #message = json.dumps(message)
        # with open('result.json', 'w') as fp:
        #     json.dump(message, fp, ensure_ascii=False)
        # #print("client({}) said: {}".format(client['id'], message + "これはテスト"))
        # file = open('result.json', 'w')
        # file.write(message)
        # # print(message+"これはテストです")
        # # 全クライアントにメッセージを送信
        # self.server.send_message_to_all(message)
    
    # サーバーを起動する
    def run(self):
        # クライアント接続時のコールバック関数にself.new_client関数をセット
        self.server.set_fn_new_client(self.new_client)
        # クライアント切断時のコールバック関数にself.client_left関数をセット
        self.server.set_fn_client_left(self.client_left)
    # メッセージ受信時のコールバック関数にself.message_received関数をセット
        self.server.set_fn_message_received(self.message_received) 
        self.server.run_forever()




IP_ADDR = "127.0.0.1" # IPアドレスを指定
PORT=5000 # ポートを指定
ws_server = Websocket_Server(IP_ADDR, PORT)
ws_server.run()



# from socket import *
# from base64 import b64encode
# from hashlib import sha1
# from struct import pack
# from time import sleep

# magicsockey = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"

# soc = socket(AF_INET, SOCK_STREAM)
# soc.setsockopt(SOL_SOCKET, SO_REUSEADDR,1)
# soc.bind(("127.0.0.1", 5000))
# soc.listen(10)
# print("waiting for connection")

# def create_frame(data):
#     status = 129
#     dlen = len(data)
#     pack_f = "BB"
#     return pack(pack_f, status, dlen)+data

# def extract_hreq(req):
#     reqdic = {}
#     lines = req.split("\r\n")
#     for line in lines:
#         if ':' in line:
#             sep = line.split(":")
#             reqdic[sep[0]] = sep[1].replace(" ","")
#     return reqdic

# def send_recv(acc):
#     num = 1
#     while True:
#         data = "echo {0}".format(num)
#         num+=1
#         frame = create_frame(data)
#         acc.send(frame)
#         sleep(1)

# def handshake(acc, addr):
#     req = acc.recv(4096)
#     req = extract_hreq(req)
#     key = b64encode(sha1(req['Sec-WebSocket-Key']+magicsockey).digest())
#     res = "HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: {0}\r\n\r\n"
#     res = res.format(key)
#     acc.send(res)

# while True:
#     acc, addr = soc.accept()
#     print(addr)
#     handshake(acc, addr)
#     send_recv(acc)