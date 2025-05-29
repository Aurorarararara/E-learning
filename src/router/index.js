// router/index.js
import { createRouter, createWebHistory } from 'vue-router';


// 引入布局组件
import TeacherLayout from '../layouts/TeacherLayout.vue';
import StudentLayout from '../layouts/StudentLayout.vue';
import AdminLayout from '../layouts/AdminLayout.vue';

// 引入教师端内容页面组件 (之前设计的或占位符)
import login from "@/views/login.vue";
import Dashboard from "@/views/teacher/TeacherDashboard.vue";
import MyCourses from "@/views/teacher/MyCourses.vue";
import MyStudents from "@/views/teacher/MyStudents.vue";
import TeacherAssignments from "@/views/teacher/TeacherAssignments.vue";
import InternalMessages from "@/views/teacher/InternalMessages.vue";
import TeacherAnnouncements from "@/views/teacher/TeacherAnnouncements.vue";
import TeacherProfile from "@/views/teacher/TeacherProfile.vue";
import TeacherDashboard from "@/views/teacher/TeacherDashboard.vue";
import StudentDashboard from "@/views/students/StudentDashboard.vue";
import StudentMyCourses from "@/views/students/StudentMyCourses.vue";
import StudentAssignments from "@/views/students/StudentAssignments.vue";
import StudentResources from "@/views/students/StudentResources.vue";
import StudentMessages from "@/views/students/StudentMessages.vue";
import StudentAnnouncements from "@/views/students/StudentAnnouncements.vue";
import StudentProfile from "@/views/students/StudentProfile.vue";
import UserManagement from "@/views/admin/UserManagement.vue";


const routes = [
  // 登录页
  {
    path: '/login',
    name: 'login',
    component: login,
  },

  // 教师端布局及子路由
  {
    path: '/teacher',
    name: 'TeacherLayout',
    component: TeacherLayout,
    redirect: '/teacher/dashboard', // 访问 /teacher 时重定向到仪表盘
    meta: { requiresAuth: true, role: 'teacher' }, // 标记需要认证且角色是 teacher
    children: [
      {
        path: 'dashboard', // 完整路径为 /teacher/dashboard
        name: 'Dashboard',
        component: TeacherDashboard,
        meta: { title: '教师仪表盘' } // 页面标题
      },
      {
        path: 'courses', // 完整路径为 /teacher/courses
        name: 'MyCourses',
        component: MyCourses, // 教师课程列表组件
        meta: { title: '我的课程' }
      },{
            path: 'students', // 完整路径为 /teacher/students
            name: 'TeacherStudents',
            component: MyStudents, // 教师我的学生组件
            meta: { title: '我的学生' }
        },
        {
            path: 'assignments', // 完整路径为 /teacher/assignments
            name: 'TeacherAssignments',
            component: TeacherAssignments, // 教师测试/作业组件
            meta: { title: '测试/作业' }
        },
        {
            path: 'messages', // 完整路径为 /teacher/messages
            name: 'TeacherMessages',
            component: InternalMessages, // 教师站内信组件
            meta: { title: '站内信' }
        },
        {
            path: 'announcements', // 完整路径为 /teacher/announcements
            name: 'TeacherAnnouncements',
            component: TeacherAnnouncements, // 教师公告通知组件
            meta: { title: '公告通知' }
        },
        {
            path: 'profile', // 完整路径为 /teacher/profile
            name: 'TeacherProfile',
            component: TeacherProfile, // 教师个人设置组件
            meta: { title: '个人设置' }
        },

    ]
  },
  {
        path: '/student',
        name: 'StudentLayout',
        component: StudentLayout, // 你提供的学生布局组件
        redirect: '/student/dashboard', // 默认进入仪表盘
        meta: { requiresAuth: true, role: 'student', title: '学生端' }, // 标记需要认证且角色是 student
        children: [
            {
                path: 'dashboard',
                name: 'StudentDashboard',
                component: StudentDashboard,
                meta: { title: '学生仪表盘' }
            },
            {
                path: 'courses',
                name: 'StudentMyCourses',
                component: StudentMyCourses,
                meta: { title: '我的课程' }
            },
            {
                path: 'assignments',
                name: 'StudentAssignments',
                component: StudentAssignments,
                meta: { title: '我的作业/测试' }
            },
            {
                path: 'resources',
                name: 'StudentResources',
                component: StudentResources,
                meta: { title: '课程资源' }
            },
            {
                path: 'messages',
                name: 'StudentMessages',
                component: StudentMessages,
                meta: { title: '站内信' }
            },
            {
                path: 'announcements',
                name: 'StudentAnnouncements',
                component: StudentAnnouncements,
                meta: { title: '公告通知' }
            },
            {
                path: 'profile',
                name: 'StudentProfile',
                component: StudentProfile,
                meta: { title: '个人设置' }
            },
        ]
  },
    {
        path: '/admin',
        name: 'AdminLayout',
        component: AdminLayout,
        redirect: '/admin/users',
        meta: { requiresAuth: true, role: 'admin', title: '管理员端' }, // 标记需要认证且角色是 student
        children: [
            {
                path: 'users',
                name: 'AdminUsers',
                component: UserManagement
            }
        ]
    },
  // 默认重定向到登录页 (或者首页，取决于你的设计)
  {
    path: '/',
    redirect: '/login'
  },
];

// 检查 process 是否存在，如果不存在则使用默认值 '/'
// 注意：在标准的 Vue 项目构建中，process.env.BASE_URL 会被正确注入
// 这个修改主要是为了避免在非构建环境下报错，不是推荐的生产环境做法
const base = typeof process !== 'undefined' && process.env && process.env.BASE_URL ? process.env.BASE_URL : '/';

const router = createRouter({
  // 使用检查后的 base 变量
  history: createWebHistory(base), // 使用 history 模式
  routes
});


export default router;
