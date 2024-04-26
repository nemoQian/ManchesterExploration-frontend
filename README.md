# FYP - Manchester Exploration

## 用户中心

Spring + Spring MVC + Mybatis + Mybatis-Plus + SpringBoot + MySQL

### 后端返回和异常处理

#### 通用返回对象

```
{
	"data" : {
	
	},
	"code" : , // 业务状态码
	"message": "", // 业务状态信息
}
```



#### 定义状态码

``` java
SUCCESS(20000, "Success"),

REQUEST_ERROR(40000, "Request error"),
PARAMS_EMPTY_ERROR(40001, "Input params is empty"),
USER_AUTH_ERROR(40002, ""),

NO_RESULTS_ERROR(40100, "No results finding"),

DUPLICATE_USER_ERROR(40200, "User info duplicated"),
USERNAME_LENGTH_ERROR(40201, "Username length need over 4"),
USERNAME_INVALID_ERROR(40202, "Username has special character"),
PASSWORD_LENGTH_ERROR(40203, "Password length need over 8"),
PASSWORD_INVALID_ERROR(40204, "Password needs at least two types of numeric, letter and special character"),
PASSWORD_COMPARED_ERROR(40205, "Checked password is not equal to the original one"),

SYSTEM_ERROR(50000, "Something wrong in the system"),
```



#### 封装业务异常处理与全局异常处理



### 登录/注册

#### 数据库设计

用户表 (user)：

* id (pk) bigint auto_increament
* username (登录名) varchar
* user_password (密码) varchar
* nickname (昵称) varchar
* gender tinyint
* avatar_url varchar
* phone varchar
* email varchar
* account_status (账号状态 0 - 正常) tinyint
* create_time (数据插入时间) datetime
* update_time (数据更新时间) datetime
* delete_state (逻辑删除 0 - 未删除  1 - 删除) 
* role (用户身份 0 - 普通用户 1 - 管理员)
* tags (用户标签) varchar

使用 MybatisX 插件，自动根据数据库生成 pojo 实体对象，mapper，mapper.xml， service 和 serviceImpl



#### 注册逻辑

1. 用户前端输入账户和密码、以及验证码 (账户可以使用邮箱 如果绑定的话  --- 未实现)
2. 校验用户账户密码是否符合要求
   * 所有输入不能为空 (已测试)
   * 账户名不小于 4 位 (已测试)
   * 账户名不能包含特殊符号 (已测试)
   * 账户不能重复 (已测试)
   * 密码至少拥有 数字 字母 特殊字符 中的 2 种 (已测试)
   * 密码长度不少于 8 位 (已测试)
   * 两次密码输入相同 (已测试)
   * 其他校验
3. 密码进行加密 （传输过程中加密 + 后端加密）----------------------------------------------------------------------------- (未实现)
4. 数据库插入用户数据



#### 登录/登出逻辑

1. 用户前端输入账户和密码 (账户可以使用邮箱 --- 未实现)
   1. 接受参数：用户账户，密码
   2. 请求类型：POST
   3. 请求体：JSON 格式的数据
   4. 返回值：基本用户信息（脱敏）
2. 校验用户账户和密码是否合法，要和数据库中的密文密码对比
   * 所有输入不能为空
   * 账户名不小于 4 位
   * 密码至少拥有 数字 小写字母 大写字母 特殊字符 中的 2 种
   * 密码长度不少于 8 位
3. 记录用户的登录态 (session) ，将其存到服务器上
4. 返回用户信息 (脱敏)

#### Controller 封装请求

```
@RestController 适用于编写 restful 风格的 api， 返回值默认位 json 类型
```

序列化 ------------------------------------------------（学习）

#### 用户登出逻辑

将用户的的登录态移除即可，然后返回前端



## 组件设计

1. 用户 profile 设置
2. 用户标签显示
3. 用户图片画廊
4. POI 标签显示
5. 根据标签直接筛选 POI
6. 模糊搜索 POI
7. 地图组件
   * layer 风格切换
   * 显示道路数据
   * 导航 + 定位
   * 天气数据显示 （当前 + 预测）
   * 公共交通数据显示 （公交车 + 火车）
8. 旅游计划指定/验证
9. 过去/目前的旅游计划管理



### Profile 设置  --- 未完



###  标签设计

#### 标签表设计 （分类表）：

* id (pk) bigint auto_increament
* user_id (创建此标签的用户) bigint  ---- 普通索引
* tag_name (标签名) varchar(256)    ---- 唯一索引
* tag_node (标签链表) varchar(256)
* tag_parent_id (标签父标签) bigint (-1 代表是父标签)
* create_time (数据插入时间) datetime
* update_time (数据更新时间) datetime
* delete_state (逻辑删除 0 - 未删除  1 - 删除) 



