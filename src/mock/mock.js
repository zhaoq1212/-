import Mock from "mockjs"
const menuList = [
    {
        name: "首页",
        icon: "el-icon-s-home",
        url: "/index",
    },
    {
        name: "账户管理",
        icon: "el-icon-coin",
        url: "/account",
        children: [
            {
                name: "所有人员",
                icon: "el-icon-user",
                url: "/account/all",
            },
            {
                name: "业务人员",
                icon: "el-icon-phone-outline",
                url: "/account/business",
            },
            {
                name: "审核人员",
                icon: "el-icon-s-check",
                url: "/account/audit",
            },
            {
                name: "风控经理",
                icon: "el-icon-s-finance",
                url: "/account/risk",
            },
            {
                name: "管理员",
                icon: "el-icon-s-custom",
                url: "/account/admin",
            }
        ]
    },
    {
        name: "产品管理",
        icon: "el-icon-menu",
        url: "/product",
        children: [
            {
                name: "全部产品",
                icon: "el-icon-notebook-2",
                url: "/product/all",
            },
            {
                name: "汽车消费",
                icon: "el-icon-truck",
                url: "/product/carConsumption",
            },
            {
                name: "房产消费",
                icon: "el-icon-office-building",
                url: "/product/estate",
            },
            {
                name: "抵押贷款",
                icon: "el-icon-money",
                url: "/product/mortgage",
            },
        ]
    },
    {
        name: "订单管理",
        icon: "el-icon-s-order",
        url: "/order",
        children: [
            {
                name: "所有订单",
                icon: "el-icon-tickets",
                url: "/orders/all",
            },
            {
                name: "货前管理",
                icon: "el-icon-document",
                url: "/before",
            },
            {
                name: "货中管理",
                icon: "el-icon-document-checked",
                url: "/ing",
            },
            {
                name: "货后管理",
                icon: "el-icon-document-remove",
                url: "/after",
            },
        ]
    },
    {
        name: "客户管理",
        icon: "el-icon-user",
        url: "/client",
        children: [
            {
                name: "基本信息",
                icon: "el-icon-chat-square",
                url: "/info",
            },
            {
                name: "资金记录",
                icon: "el-icon-bank-card",
                url: "/record",
            },
        ]
    },
    {
        name: "待办事项",
        icon: "el-icon-chat-dot-square",
        url: "/todo",
    },
    {
        name: "个人中心",
        icon: "el-icon-user",
        url: "/my",
    }
]
//左侧菜单接口
Mock.mock('localhost:8080/menu', 'get', () => {
    return {
        code: 200,
        success: true,
        message: "成功",
        data: menuList
    }
});
//登录接口
Mock.mock('localhost:8080/login', 'post', (req) => {
    const { password, username } = JSON.parse(req.body)
    if (username === 'user' && password === '123456') {
        return {
            code: 200,
            success: true,
            message: "登录成功",
            token: "3arc9h0vhcr0f8iprpnscmfo8s",
            nickname: "赵铁柱"
        }
    } else {
        return {
            code: 100,
            success: false,
            message: "账号或者密码有误",

        }
    }
})
//记录入职时间
Mock.mock('localhost:8080/in', 'get', () => {
    return {
        code: 200,
        success: true,
        message: "登录成功",
        time: "2020-07-01 00:00:00"
    }
})
//账户管理接口
//所有人员
Mock.mock('localhost:8080/all', 'get', () => {
    // const { password, username } = JSON.parse(req.body)
    return {
        code: 205,
        success: true,
        message: "成功",
        data: Mock.mock({
            "list|5-10": [{
                'account|100000-999999': 1,
                'id|+1': 1,
                'name': "@cname",
                'character|1': ["业务人员", "审核人员", "风控经理", "管理员"],
                'remark|5-20': '@cword',
                'reason|1': ["需要进系统录入进件补充资料", "对进件进行风险审核", "对放款进行风险审核"],
                'status|1': [1, 2],
               
            }],
            "total|1":[10,20,30,40,50]
        })
    }
})

//产品管理--全部产品   
Mock.mock('localhost:8080/productList', 'get', () => {
    // const { password, username } = JSON.parse(req.body)
    return {
        code: 200,
        success: true,
        message: "成功",
        data: Mock.mock({
            "list|8-20": [{
                'id|+1': 10000,
                'type|1': ["汽车消费","房产消费","抵押贷款"],
                'name|1':["巴贝拉贷款","麦穗金融","日借款","爱猫借贷","樱花分期","小熊金融","借乐花","星星钱袋"],
                'limit|1': [100,200,300],
                'rate|1':[4.1,4.3,3.8,3.9,5,3] ,
                'number':Mock.Random.integer(30,200),
                'total': Mock.Random.integer(10000000,500000000),
                'average': Mock.Random.integer(10000000,250000000),
                'status|1':[1,2],
                'highest|1':[36,60,24,360],
                'date':Mock.Random.date()
            }],
            "total|1":[10,20,30,40,50]
        })
    }
})
//订单管理--所有订单
Mock.mock('localhost:8080/allOrders', 'get', () => {
    // const { password, username } = JSON.parse(req.body)
    return {
        code: 200,
        success: true,
        message: "成功",
        data: Mock.mock({
            "list|8-20": [{
                'no|100000000-999999999': 1,
                'id|+1': 1,
                'status|1': [1,2,3,41,5,6,7],//1初审通过   2.复审拒绝  3.放款成功  4.复审通过  5.终审通过 6.终审拒绝  7.初审驳回
                'productName|1':["网约车分期","房屋贷款"],
                'number|1':[13718502079,18752365487,13365459874,15698744456,16789544456],
                'name|1':"@cname",
                'idcard|1':['511010199012039863'],//1高   2普通   3低
                'applyMoney|1': [10000,300000,540000,1000000],
                'endMoney|1': [10000,50000,8000,5000],
                'applyDate|1':[1593576000000,1590984000000,1591329600000,1592625600000],
                'way|1':["重庆真牛汽车有限公司","安家房地产金融有限公司"],
                "first|1":"@cname",
                "second|1":"@cname",
                "third|1":"@cname",
               
            }],
            "total|1":[10,20,30,40,50]
        })
    }
})