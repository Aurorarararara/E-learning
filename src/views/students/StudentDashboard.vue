<template>
  <div class="student-dashboard-container">
    <h2>学生仪表盘</h2>
    <p>欢迎您回到平台，[学生姓名]！这是您的学习概况。</p>

    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="8">
        <el-card class="box-card" shadow="hover">
          <div class="card-header">
            <span>已选课程数</span>
          </div>
          <div class="card-content">
            <p class="count">{{ enrolledCourseCount }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card" shadow="hover">
          <div class="card-header">
            <span>待完成作业/测试</span>
          </div>
          <div class="card-content">
            <p class="count">{{ pendingAssignments }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card" shadow="hover">
          <div class="card-header">
            <span>近期公告 (未读)</span>
          </div>
          <div class="card-content">
            <p class="count">{{ unreadAnnouncements }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-card style="margin-top: 20px;" shadow="never">
      <template #header>
        <div class="card-header">
          <span>近期活动</span>
        </div>
      </template>
      <div class="recent-activity-list">
        <p v-if="recentActivities.length === 0">暂无近期活动。</p>
        <el-timeline v-else>
          <el-timeline-item
              v-for="(activity, index) in recentActivities"
              :key="index"
              :timestamp="activity.timestamp"
              :type="activity.type"
          >
            {{ activity.content }}
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-card>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// 可能需要引入时间线相关的 Element Plus 组件

// 示例数据 - 实际应用中从API获取
const enrolledCourseCount = ref(0);
const pendingAssignments = ref(0);
const unreadAnnouncements = ref(0);
const recentActivities = ref([
  // { timestamp: '2023/01/08', content: '“数据结构”发布了新的作业：链表实现', type: 'primary' },
  // { timestamp: '2023/01/06', content: '您有一条新的站内信', type: 'success' },
  // { timestamp: '2023/01/05', content: '系统发布了新公告：平台维护通知', type: 'info' },
]);

onMounted(() => {
  // TODO: 在组件加载时，调用后端 API 获取学生仪表盘数据
  fetchStudentDashboardData();
});

const fetchStudentDashboardData = async () => {
  console.log('Fetching student dashboard data...');
  // 模拟 API 调用
  await new Promise(resolve => setTimeout(resolve, 500));

  // 假设 API 返回数据结构如下:
  // const response = await api.get('/student/dashboard');
  // enrolledCourseCount.value = response.data.enrolledCourseCount;
  // pendingAssignments.value = response.data.pendingAssignments;
  // unreadAnnouncements.value = response.data.unreadAnnouncements;
  // recentActivities.value = response.data.recentActivities;

  // 示例填充数据
  enrolledCourseCount.value = 8;
  pendingAssignments.value = 3;
  unreadAnnouncements.value = 2;
  recentActivities.value = [
    { timestamp: '2025/05/07', content: '“高等数学”发布了新的课程资源：微积分笔记', type: 'primary' },
    { timestamp: '2025/05/06', content: '您有一个新的站内信', type: 'success' },
    { timestamp: '2025/05/05', content: '“大学物理”发布了新的测试：牛顿力学', type: 'warning' },
    { timestamp: '2025/05/04', content: '平台发布了新公告：期末考试安排', type: 'info' },
  ];
};

</script>

<style scoped>
.student-dashboard-container {
  padding: 20px;
}

.card-header {
  font-size: 16px;
  font-weight: bold;
}

.card-content {
  text-align: center;
  padding: 15px 0;
}

.count {
  font-size: 28px;
  color: #409EFF; /* Element Plus primary color */
  font-weight: bold;
}

.box-card {
  border-radius: 8px;
}

.recent-activity-list {
  padding: 0 10px;
}
</style>