# 接口文档


### 获取用户列表
```
GET /users
```
参数为空

返回:

```
示例url：
登录：https://www.jomsou.cn/users


[{
  "gender": "male",
  "_id": "5e6ccd7061c3441c39f4e68a",
  "name": "李雷1"
},
{
  "gender": "male",
  "_id": "5e722925a20a2c3b27ea8aa5",
  "name": "蔡镇泉111"
}]
```

### 获取特定用户
```
GET /users:id?fields=business;educations;following
```

| 参数 | 意义 | 备注
| --- | --- | ---
| fields|过滤出的字段|

返回:

```
示例url：
登录：https://www.jomsou.cn/users/5e6cd0f18b0d7a1da6a56ed1?fields=business;educations;following


{
    "gender": "male",
    "following": [
        "5e6cd0f18b0d7a1da6a56ed1"
    ],
    "_id": "5e6cd0f18b0d7a1da6a56ed1",
    "name": "张三丰",
    "educations": [
        {
            "_id": "5e72299aa20a2c3b27ea8aa7",
            "school": "华南理工大学",
            "major": "计算机科学",
            "diploma": 3,
            "enterance_year": 2001,
            "graduation_year": 2004
        }
    ],
    "business": "互联网",
    "headline": "Just do it",
    "avatar_url": "http://127.0.0.1:3000/uploads/upload_4508aafd19b2d8cbfe82e62bd8dadd15.png"
}
```

### 新建用户
```
POST /users
```
| 参数 | 意义 | 备注
| --- | --- | ---
| name |姓名|
| password |密码|

返回:

```
示例url：
登录：https://www.jomsou.cn/users

{
    "gender": "male",
    "locations": [],
    "following": [],
    "_id": "5e8159805976ab72f11d4c8c",
    "name": "蔡镇泉222",
    "password": "123",
    "employments": [],
    "educations": [],
    "__v": 0
}
```

### 用户登录
```
POST /users/login
```
| 参数 | 意义 | 备注
| --- | --- | ---
| name |姓名|
| password |密码|

返回:

```
示例url：
登录：https://www.jomsou.cn/users/login

{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTZjZDBmMThiMGQ3YTFkYTZhNTZlZDEiLCJuYW1lIjoi5byg5LiJ5LiwIiwiaWF0IjoxNTg1NTM1MzMwLCJleHAiOjE1ODU2MjE3MzB9.nq17uBrBtE7RJSuJyCwSZ8IALGN8j5i4x1hMFmk9fis"
}
```

### 修改用户
```
PATCH /users/:id
```
| 参数 | 意义 | 备注
| --- | --- | ---
| name |姓名|
| avatar_url |头像url|
| gender |性别|
| headline |签名|
| locations |所在城市|
| business |行业|
| employments |职业|
| educations |教育背景|


返回:

```
示例url：
登录：https://www.jomsou.cn/users/5e6cd0f18b0d7a1da6a56ed1

{
    "gender": "male",
    "_id": "5e6cd0f18b0d7a1da6a56ed1",
    "name": "张三丰",
    "headline": "Just do it",
    "avatar_url": "http://127.0.0.1:3000/uploads/upload_4508aafd19b2d8cbfe82e62bd8dadd15.png"
}
```

### 删除用户
```
DELETE /users/:id
```
参数为空

返回:

```
示例url：
登录：https://www.jomsou.cn/users/5e5c63ad1ca23822b682e13b

{
  "message": "删除成功"  
}
```

### 图片上传
```
POST /upload
```
| 参数 | 意义 | 备注
| --- | --- | ---
| file |图片文件|

返回:

```
示例url：
登录：https://www.jomsou.cn/users/5e5c63ad1ca23822b682e13b

{
    "url": "http://shopapi/uploads/upload_d2e0906fc7e52a4acf71437a0f592352.png"
}
```

### 关注
```
PUT /users/follow/:id
```
参数为空

返回:

```
示例url：
登录：https://www.jomsou.cn/users/follow/5e6cd0f18b0d7a1da6a56ed

{
  "message": "关注成功"  
}
```

### 取消关注
```
DELETE /users/unfollow/:id
```
参数为空

返回:

```
示例url：
登录：https://www.jomsou.cn/users/unfollow/5e6cce47c917181c7371d57b

{
  "message": "已取消关注"  
}
```

### 获取特定粉丝列表
```
GET /users/:id/listenFollower
```
参数为空

返回:

```
示例url：
登录：https://www.jomsou.cn/users/5e6cd0f18b0d7a1da6a56ed1/listenFollower

[
    {
        "gender": "male",
        "_id": "5e6cd0f18b0d7a1da6a56ed1",
        "name": "张三丰",
        "headline": "Just do it",
        "avatar_url": "http://127.0.0.1:3000/uploads/upload_4508aafd19b2d8cbfe82e62bd8dadd15.png"
    },
    {
        "gender": "male",
        "_id": "5e6ccd7061c3441c39f4e68a",
        "name": "李雷1"
    }
]
```

### 获取特定关注列表
```
GET /users/:id/listenFollowing
```
参数为空

返回:

```
示例url：
登录：https://www.jomsou.cn/users/5e6cd0f18b0d7a1da6a56ed1/listenFollowing

[
    {
        "gender": "male",
        "_id": "5e6cd0f18b0d7a1da6a56ed1",
        "name": "张三丰",
        "headline": "Just do it",
        "avatar_url": "http://127.0.0.1:3000/uploads/upload_4508aafd19b2d8cbfe82e62bd8dadd15.png"
    }
]
```