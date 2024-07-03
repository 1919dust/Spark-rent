import json
from flask import Flask, render_template
from flask_socketio import SocketIO
from kafka import KafkaConsumer


app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)
thread = None
consumer = KafkaConsumer('result')


# 计算AQI平均值
def calculate_average_aqi(data):
    total_affordable_rooms = 0
    total_luxury_house = 0
    count = 0
    for item in data:
        affordable_rooms = int(item['Affordable_rooms'])
        luxury_house = int(item['Luxury_house'])
        total_affordable_rooms += affordable_rooms
        total_luxury_house += luxury_house
        count += 1
    if count > 0:
        average_affordable_rooms = total_affordable_rooms / count
        average_luxury_house = total_luxury_house / count
        return average_affordable_rooms, average_luxury_house
    return 0, 0


# 后台线程处理消息
def background_thread():
    data = []
    for msg in consumer:
        data_json = msg.value.decode('utf8')
        data_list = json.loads(data_json)
        data.extend(data_list)
        average_affordable_rooms, average_luxury_house = calculate_average_aqi(data)
        socketio.emit('aqi_message', {'affordable_rooms': average_affordable_rooms, 'luxury_house': average_luxury_house})


@socketio.on('test_connect')
def connect(message):
    print(message)
    global thread
    if thread is None:
        thread = socketio.start_background_task(target=background_thread)
    socketio.emit('connected', {'data': 'Connected'})


@app.route("/")
def handle_mes():
    return render_template("index.html")


if __name__ == '__main__':
    socketio.run(app, debug=True, allow_unsafe_werkzeug=True)
