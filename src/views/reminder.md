关于Views文件夹的一些说明：
1、根据用户角色的不同功能建立了student和teacher文件夹，其中的页面文件有文件名重复但功能有较大区别，故拆分
2、本文件夹直接目录下的vue文件为共有功能，但具体实现时需要通过meta传入用户信息并使用v-if根据不同角色渲染相应功能
3、由于后端以及axios接口暂未完成，router中暂无数据传递（meta、props），待相关功能完成后需要完善本部分相关功能
4、路由配置见@/router/index.js（全文简称其为router文件）
5、关于layouts中的两个vue，在刚开始写路由的时候我认为它们是有必要存在以区分登录后的用户的，后续开发中如果不需要相关基础布局，请将router中所有StudentLayout、TeacherLayout相关的component替换为新的根布局文件
6、由于时间较晚，编写本路由文件时难免存在疏漏，后续请根据实际需要修改


TeacherTeam：教师分组界面
数据：teams列表，元素包括 teamID，studentID，studentName，character
例如：
teams:[
{teamID:"5",studentID:"2035060301",studentName: "张三",character:"小组长"},
{teamID:"5",studentID:"2035060302",studentName: "李四",character:"计划经理"}
]

TeacherGrade：教师成绩界面
数据：gradeData列表，元素包括 id，studentID，studentName，GroupGrade，totalGrade。
其中，totalGrade如果尚未生成（期末成绩尚未输入），就传递"Null"过来
例如：
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