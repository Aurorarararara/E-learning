<template>
  <div class="student-assignments-container">
    <h2>我的作业/测试</h2>
    <p>在这里查看您的作业和测试列表。</p>

    <el-tabs v-model="activeAssignmentTab" style="margin-top: 20px;">
      <el-tab-pane label="待完成" name="pending">
        <el-table :data="pendingAssignments" style="width: 100%;" border>
          <el-table-column prop="title" label="名称" width="200"></el-table-column>
          <el-table-column prop="courseName" label="所属课程" width="150"></el-table-column>
          <el-table-column prop="dueDate" label="截止日期" width="150"></el-table-column>
          <el-table-column prop="status" label="状态" width="100"></el-table-column>
          <el-table-column label="操作" width="120">
            <template #default="scope">
              <el-button size="small" type="primary" @click="handleStartAssignment(scope.row)">开始作答</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已提交/已评分" name="completed">
        <el-table :data="completedAssignments" style="width: 100%;" border>
          <el-table-column prop="title" label="名称" width="200"></el-table-column>
          <el-table-column prop="courseName" label="所属课程" width="150"></el-table-column>
          <el-table-column prop="submitDate" label="提交日期" width="150"></el-table-column>
          <el-table-column prop="grade" label="得分" width="100"></el-table-column>
          <el-table-column prop="status" label="状态" width="100"></el-table-column>
          <el-table-column label="操作" width="120">
            <template #default="scope">
              <el-button size="small" @click="handleViewSubmission(scope.row)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const router = useRouter();
const activeAssignmentTab = ref('pending'); // 默认显示待完成列表

// 示例数据 - 实际应用中从API获取
const pendingAssignments = ref([
  // { id: 1, title: '链表实现作业', courseName: '数据结构与算法', dueDate: '2025-05-15 23:59', status: '待完成' },
  // { id: 2, title: '牛顿力学测试', courseName: '大学物理', dueDate: '2025-05-10 23:59', status: '待完成' },
]);

const completedAssignments = ref([
  // { id: 3, title: 'HTML基础测试', courseName: 'Web前端开发基础', submitDate: '2025-05-01 10:00', grade: 95, status: '已评分' },
  // { id: 4, title: 'CSS布局作业', courseName: 'Web前端开发基础', submitDate: '2025-05-03 15:30', grade: null, status: '已提交待批改' },
]);


onMounted(() => {
  // TODO: 在组件加载时，调用后端 API 获取学生的作业/测试列表
  fetchStudentAssignments();
});

const fetchStudentAssignments = async () => {
  console.log('Fetching student assignments data...');
  // 模拟 API 调用
  await new Promise(resolve => setTimeout(resolve, 500));

  // 假设 API 返回数据结构如下:
  // const response = await api.get('/student/assignments'); // 可能需要参数区分待完成/已完成
  // pendingAssignments.value = response.data.pending;
  // completedAssignments.value = response.data.completed;

  // 示例填充数据
  pendingAssignments.value = [
    { id: 1, title: '链表实现作业', courseName: '数据结构与算法', dueDate: '2025-05-15 23:59', status: '待完成' },
    { id: 2, title: '牛顿力学测试', courseName: '大学物理', dueDate: '2025-05-10 23:59', status: '待完成' },
  ];

  completedAssignments.value = [
    { id: 3, title: 'HTML基础测试', courseName: 'Web前端开发基础', submitDate: '2025-05-01 10:00', grade: 95, status: '已评分' },
    { id: 4, title: 'CSS布局作业', courseName: 'Web前端开发基础', submitDate: '2025-05-03 15:30', grade: null, status: '已提交待批改' },
  ];
};


const handleStartAssignment = (row) => {
  console.log('开始作答:', row);
  // TODO: 导航到作业/测试作答页面
  // 导航路径可能类似于 /student/assignments/:assignmentId/start
  ElMessage.info(`开始作答功能待实现，作业/测试ID: ${row.id}`);
  // router.push(`/student/assignments/${row.id}/start`);
};

const handleViewSubmission = (row) => {
  console.log('查看提交详情:', row);
  // TODO: 导航到已提交作业/测试的查看页面，显示题目、我的答案、得分、教师评语等
  ElMessage.info(`查看提交详情功能待实现，作业/测试ID: ${row.id}`);
  // router.push(`/student/assignments/${row.id}/view`);
};
</script>

<style scoped>
.student-assignments-container {
  padding: 20px;
}
</style>