#你的mysql数据库
myuser='root'
mypassword='20020516'

import warnings

warnings.filterwarnings('ignore')




import pymysql

from flask import Flask, render_template, jsonify
import random


app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False



#----------------------------数据读取-----------------------------------------
import math
import pandas as pd

basenum=100#初始读100条
nowt=-1#初始设置为负一
df=''
# 打开文件并读取现有行
def return_t():
    with open('static/puttime.txt', 'r+') as f:
        nowt = int(f.readline())
        temp=[]
        temp.append(nowt)
        # 在现有行的基础上加 1 并将游标移到开头
        if nowt != 60:
            nowt += 1
        else:
            nowt = 15

        f.seek(0)
        # 将修改后的数值写入文件并清空之后的内容
        f.write(str(nowt))
        f.truncate()
    # 关闭文件
    f.close()
    return temp[0]
#慢开始阶段-》对数
def slow_start(nowt):#0-15s
    return int(100+math.log(nowt,2)*200)
#print(slow_start(math.pow(2,15)))#->3100
#拥塞控制阶段-》线性
def curd(nowt):#16-60s
    return int(211.8*nowt-80)
#print(curd(60))#12628->为本次数据的总大小

#----------------------------数据读取-----------------------------------------




@app.route('/')
def index():
    return render_template('index.html')


@app.route('/l1')
def get_l1_data():
    # 统计 area 的均值
    order = len(df)#订单数量
    profit = int(df['area'].mean())#租房面积均值
    customer = int(df['room'].sum())#房间数量
    ATV =int(df['rent'].mean())#租房均价
    #print('ATV:',ATV)
    return jsonify({"order": order, "profit": profit, "customer": customer, "ATV": ATV})



@app.route('/l2')
def get_l2_data():
    # 过滤district为佛山和深圳的数据
    dfnew = df[df['district'].isin(['佛山', '深圳'])]
    print('dfnew\n',dfnew)
    # 分别计算两地的平均值
    mean_df = dfnew.groupby('district').mean().round(2)
    print('1\n')
    print('mean_df',mean_df)
    # 转换为列表输出
    mean_list = mean_df[['area', 'room', 'living', 'floor', 'rent']].values.tolist()
    columns_list = ['area平均值', 'room平均值', 'living平均值', 'floor平均值', 'rent平均值']

    print('mean_list0\n',mean_list)
    print('mean_list1\n',mean_list)
    return jsonify({"new_customer": mean_list[0], "old_customer": mean_list[1]})


@app.route('/l3')
def get_l3_data():#have done
    # 分组并计算均值
    result = df.groupby(['orientation'])[['room', 'floor']].mean().reset_index().round(0)
    index = result["orientation"].tolist()
    old_customer = result["room"].tolist()
    new_customer = result["floor"].tolist()
    #print('l3_result\n',result)
    return jsonify({"index": index, "new_customer": new_customer, "old_customer": old_customer})

#中上覆盖率
@app.route('/c1')
def get_c1_data():#have done
    #省覆盖率
    # 统计 district 的数量
    district_count = df['district'].nunique()
    achieving_rate = str(int(round(district_count / 21 * 100, 0))) + '%'
    #区覆盖率
    address_count=df["address"].nunique()
    year_achieving_rate = str(int(round(address_count / 121 * 100, 0))) + '%'

    return jsonify({"sales": district_count, "target": 21, "achieving_rate": achieving_rate,
                    "year_sales": address_count, "year_target": 121, "year_achieving_rate": year_achieving_rate})

#中间地图
@app.route('/map')
def get_map_data():
    # 按district聚合，并统计出现次数
    count_df = df.groupby(['district']).size().reset_index(name='count')

    def add_suffix(s):
        return s + "市"

    count_df['district'] = count_df['district'].apply(add_suffix)
    count_df['count'] = count_df['count'].astype(int)
    #print(type(count_df.iloc[1][1]))
    #print(int(count_df.iloc[1][1]))
    data = [{'name': count_df.iloc[i][0], 'value': int(count_df.iloc[i][1])} for i in range(len(count_df))]
    return jsonify({"data": data})


@app.route('/r1')#have done
def get_r1_data():
    nowt=return_t()
    basenum=100
    if nowt<=15:
        basenum=slow_start(nowt)
    else:
        basenum=curd(nowt)
    # 建立 MySQL 数据库连接
    connection = pymysql.connect(
        host='localhost',
        user=myuser,
        password=mypassword,
        db='flask_data'
    )
    # 使用 pandas 读取 MySQL 数据库中的数据
    global df
    #读取的数据条数可变
    query = 'SELECT * FROM rent LIMIT {}'.format(basenum)
    df = pd.read_sql(query, con=connection)
    #print("now len is:",len(df))
    connection.close()
    result = df.groupby('address')[['rent', 'area']].mean().reset_index().round(2)
    #print(type(df))  # 输出DataFrame的类型
    index = result['address'].tolist()[:10]  # 获取address列并转换为列表
    sales = result['rent'].tolist()[:10]  # 获取rent列并转换为列表
    profit = result['area'].tolist()[:10]  # 获取area列并转换为列表
    return jsonify({"index": index, "sales": sales, "profit": [0 for _ in range(10)], "profit_rate": profit})


def get_product():
    product = [chr(i) for i in range(97, 123)]
    sales = [random.randint(10, 300) for i in range(len(product)-2)]
    profit = [random.randint(-2000, 10000) for i in range(len(product) - 2)]
    product_type = ['AA', 'BB', 'CC']*int((len(product)-2)/3)
    product_df = pd.DataFrame([product[:-2], product_type, sales, profit],
                              index=['product', 'product_type', 'sales', 'profit']).T
    return product_df

#top10
@app.route('/r21')
def get_r21_data():#have done
    top_10 = df.groupby('address').size().reset_index(name='count').sort_values('count', ascending=False).head(10)
    #print(top_10)
    #product_df = get_product().sort_values('sales', ascending=False).head(10)
    return jsonify({"product": top_10['address'].tolist(), "sales": top_10['count'].tolist()[::-1]})

#产品四象限图
@app.route('/r22')
def get_r22_data():
    product_df = get_product()
    sales_avg = product_df.sales.mean()
    profit_avg = product_df.profit.mean()
    product_type_value_list = []
    product_type_list = []
    for i in product_df.product_type.unique():
        product_type_value_list.append(product_df.query("product_type == @i")[['sales', 'profit']].values.tolist())
        product_type_list.append(i)
    return jsonify({"data": product_type_value_list, "type": product_type_list,
                       "sales_avg": sales_avg, "profit_avg": profit_avg})

#房屋类型对比
@app.route('/r3')#have done
def get_r3_data():
    # 将rent字段分成三个区间
    bins = [0, 5000, 10000, float('inf')]
    labels = ['平价租房', '轻奢房源', '至尊套房']
    df['rent_category'] = pd.cut(df['rent'], bins=bins, labels=labels)

    # 分组计算
    result = df.groupby('rent_category').agg({
        'rent': ['count', 'mean'],
        'area': 'mean'
    }).round(2)
    # 修改列名
    result.columns = ['_'.join(col).strip() for col in result.columns.values]
    result['rent_mean'] = round(result['rent_mean'] / result['rent_mean'].sum(), 3)
    result['rent_count'] = round(result['rent_count'] / result['rent_count'].sum(), 3)
    result['area_mean'] = round(result['area_mean'] / result['area_mean'].sum(), 3)
    return jsonify({"data": result.values.tolist(),})


if __name__ == '__main__':
    app.run()


