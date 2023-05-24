关于Views文件夹的一些说明：
1、根据用户角色的不同功能建立了student和teacher文件夹，其中的页面文件有文件名重复但功能有较大区别，故拆分
2、本文件夹直接目录下的vue文件为共有功能，但具体实现时需要通过meta传入用户信息并使用v-if根据不同角色渲染相应功能
3、由于后端以及axios接口暂未完成，router中暂无数据传递（meta、props），待相关功能完成后需要完善本部分相关功能
4、路由配置见@/router/index.js（全文简称其为router文件）
5、关于layouts中的两个vue，在刚开始写路由的时候我认为它们是有必要存在以区分登录后的用户的，后续开发中如果不需要相关基础布局，请将router中所有StudentLayout、TeacherLayout相关的component替换为新的根布局文件
6、由于时间较晚，编写本路由文件时难免存在疏漏，后续请根据实际需要修改


TeacherTeam：教师分组界面
数据：teams列表，元素包括 teamID，studentID，studentName，character
数据示例：
teams:[
{teamID:"5",studentID:"2035060301",studentName: "张三",character:"小组长"},
{teamID:"5",studentID:"2035060302",studentName: "李四",character:"计划经理"}
]

TeacherGrade：教师成绩界面
数据：gradeData列表，元素包括 id，studentID，studentName，GroupGrade，totalGrade。
其中，totalGrade如果尚未生成（期末成绩尚未输入），就传递"Null"过来
数据示例：
gradeData: [{
id: '1',
studentId: '2035060301',
studentName: '王小虎',
GroupGrade: '87',
totalGrade: 'N/A'
},{
id: '2',
studentId: '2035060301',
studentName: '王小虎',
GroupGrade: '87',
totalGrade: '78'
}]


TeacherTask：教师任务界面
数据：tasks列表，元素包括 id，title，deadline，character，handledTotal，status。
其中，handledTotal表示“已交/未交”。例如“4/7”
数据示例：
tasks: [{
id: '101',
title: '撰写需求分析报告，绘制用例图',
deadline: '2023.5.1',
character: '产品经理',
handledTotal: '6/6',
status: '已截止'
},{
id: '102',
title: '撰写系统设计报告，绘制活动图',
deadline: '2023.6.1',
character: '开发经理',
handledTotal: '5/6',
status: '进行中'
}]

TeacherDataBank：教师资料界面
数据：tasks列表，元素包括 id，title，deadline，character，handledTotal，status。
其中，handledTotal表示“已交/未交”。例如“4/7”
数据示例：
tasks: [{
id: '101',
title: '撰写需求分析报告，绘制用例图',
deadline: '2023.5.1',
character: '产品经理',
handledTotal: '6/6',
status: '已截止'
},{
id: '102',
title: '撰写系统设计报告，绘制活动图',
deadline: '2023.6.1',
character: '开发经理',
handledTotal: '5/6',
status: '进行中'
}]



StudentTask里面的任务分配是用循环写的，对应不同角色一个input，但是输入的时候每个input都是一样的（184行）
然后截止时间采用的是组件，它读出的格式不满足YYYY-MM-DD HH:MM:SS，需要修改
