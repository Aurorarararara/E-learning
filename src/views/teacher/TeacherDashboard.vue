<template>
  <div class="dashboard-container">
    <h2>仪表盘</h2>
    <p>欢迎来到 E-learning 平台教师端仪表盘！</p>

    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="8">
        <el-card class="box-card">
          <div class="card-header">
            <span>我的课程总数</span>
          </div>
          <div class="card-content">
            <p class="count">{{ courseCount }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div class="card-header">
            <span>我的学生总数</span>
          </div>
          <div class="card-content">
            <p class="count">{{ studentCount }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div class="card-header">
            <span>待处理作业/测试</span>
          </div>
          <div class="card-content">
            <p class="count">{{ pendingAssignments }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script setup>
import { ref } from 'vue';

// Placeholder data - in a real application, you'd fetch this from your backend API
const courseCount = ref(15);
const studentCount = ref(120);
const pendingAssignments = ref(5);

// You would typically fetch real data in the onMounted lifecycle hook
// import { onMounted } from 'vue';
// onMounted(() => {
//   fetchDashboardData();
// });
//
// const fetchDashboardData = async () => {
//   // Call your API to get dashboard statistics
//   // const response = await api.get('/teacher/dashboard/stats');
//   // courseCount.value = response.data.courseCount;
//   // studentCount.value = response.data.studentCount;
//   // pendingAssignments.value = response.data.pendingAssignments;
// };

</script>

<style scoped>
.dashboard-container {
  padding: 20px;
}

.card-header {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}

.card-content {
  text-align: center;
}

.count {
  font-size: 28px;
  color: #409EFF; /* Element Plus primary color */
  font-weight: bold;
}

.box-card {
  border-radius: 8px;
}
</style>