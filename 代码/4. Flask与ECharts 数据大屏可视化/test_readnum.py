import json

# 读取广东.json文件
with open(r"C:\Users\qiqi\Desktop\广东省.json", 'r', encoding='utf-8') as f:
    data = json.load(f)

# 将json数据转换为echarts支持的js格式
js_data = 'var geoCoordMap = {\n'
for feature in data['features']:
    name = feature['properties']['name']
    coordinates = feature['geometry']['coordinates'][0]
    js_data += f"    '{name}': [{coordinates[0][0]}, {coordinates[0][1]}],\n"
js_data += '}'

# 将转换后的js数据保存到文件中
with open('static/js/guangdong.js', 'w', encoding='utf-8') as f:
    f.write(js_data)
