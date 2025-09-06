AI做的
可以从 `安工大就业网` 随时获取招聘会开展信息
以及招聘企业的网站

对了分享以下从 `安工大就业网` 中获取信息的接口

### 获取招聘会日期

#### 参数表格

| 参数 | 值 | 说明 | 必填 |
|------|-----|------|------|
| **URL** | `https://ahut.ahbys.com/API/Web/Recruit.ashx` | API接口地址 | 是 |
| **Method** | `POST` | 请求方法 | 是 |
| **Content-Type** | `application/x-www-form-urlencoded` | 请求头 | 是 |
| `action` | `cale` | 操作类型 | 是 |
| `month` | `0`（当前月）、 `1`（下个月）等 | 月份偏移量 | 是 |
| `rand` | 随机小数（0-1之间） | 防缓存参数 | 是 |

#### 示例响应

curl -X POST "https://ahut.ahbys.com/API/Web/Recruit.ashx" -H "Content-Type: application/x-www-form-urlencoded" -d "action=cale&month=0&rand=随机数"

{"r":0,"data":[{"HoldDate":11},{"HoldDate":15},{"HoldDate":16},{"HoldDate":18},{"HoldDate":19},{"HoldDate":22},{"HoldDate":23},{"HoldDate":24},{"HoldDate":25}],"year":2025,"month":8}

---

### 获取具体日期招聘会列表

#### 参数表格

| 参数 | 值 | 说明 | 必填 |
|------|-----|------|------|
| **URL** | `https://ahut.ahbys.com/API/Web/Recruit.ashx` | API接口地址 | 是 |
| **Method** | `POST` | 请求方法 | 是 |
| **Content-Type** | `application/x-www-form-urlencoded` | 请求头 | 是 |
| `action` | `calelist` | 操作类型 | 是 |
| `pagesize` | `15`（默认）、 `99`（最大）等 | 每页数量 | 否 |
| `pageindex` | `1`（起始页码） | 页码 | 否 |
| `year` | `2025`等 | 年份 | 是 |
| `mon` | `10`等（需要补零）或置空设置为当前月份 | 月份 | 是 |
| `day` | `15`等（需要补零）或置空设置为当前日期 | 日期 | 是 |
| `rand` | 随机小数（0-1之间） | 防缓存参数 | 是 |

#### 示例响应

curl -X POST "https://ahut.ahbys.com/API/Web/Recruit.ashx" -H "Content-Type: application/x-www-form-urlencoded" -d "action=calelist&pagesize=3&pageindex=1&year=2025&mon=&day=&rand=随机数"

{"r":0,"RecorderCount":23,"PageCount":8,"PageSize":"3","RowsCount":3,"data":[{"ID":13787,"Theme":"湖南华菱涟源钢铁有限公司","VenuesText":"秀山校区-教D208","HoldDate":"2025-09-11T00:00:00.0000000+08:00","TimeSlotText":"10:00-11:30","VenuesName":"秀山校区-教D208","StatusName":"<span style='color:green'>还有5天<\/span>","HoldDateTxt":"2025-09-11&nbsp;&nbsp;10:00-11:30"},{"ID":13791,"Theme":"中化学土木工程有限公司","VenuesText":"秀山校区-教D112","HoldDate":"2025-09-11T00:00:00.0000000+08:00","TimeSlotText":"14:00-16:00","VenuesName":"秀山校区-教D112","StatusName":"<span style='color:green'>还有5天<\/span>","HoldDateTxt":"2025-09-11&nbsp;&nbsp;14:00-16:00"},{"ID":13804,"Theme":"安徽佳力奇先进复合材料科技股份公司","VenuesText":"秀山校区-教D105","HoldDate":"2025-09-15T00:00:00.0000000+08:00","TimeSlotText":"10:00-11:30","VenuesName":"秀山校区-教D105","StatusName":"<span style='color:green'>还有9天<\/span>","HoldDateTxt":"2025-09-15&nbsp;&nbsp;10:00-11:30"}]}
