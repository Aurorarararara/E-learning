<template>
  <div class="my-courses-container">
    <h2>我的课程</h2>

    <el-table :data="courseList" style="width: 100%; margin-top: 20px;" border>
      <el-table-column prop="courseName" label="课程名称" width="200"></el-table-column>
      <el-table-column prop="courseCode" label="课程代码" width="120"></el-table-column>
      <el-table-column prop="students" label="学生人数" width="100"></el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template #default="scope">
          <el-tag :type="scope.row.status === 'Active' ? 'success' : 'info'">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleViewCourse(scope.row)">查看详情</el-button>
          <el-button size="small" type="primary" @click="handleManageResources(scope.row)">管理资源</el-button>
          <el-button size="small" type="danger" @click="handleDeleteCourse(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';

const router = useRouter();

// Placeholder data - in a real application, you'd fetch this from your backend API
const courseList = ref([
  { courseId: 1, courseName: 'Web前端开发基础', courseCode: 'WEB101', students: 55, status: 'Active' },
  { courseId: 2, courseName: '数据结构与算法', courseCode: 'DSA201', students: 40, status: 'Active' },
  { courseId: 3, courseName: '数据库系统原理', courseCode: 'DBS301', students: 30, status: 'Inactive' },
  // Add more courses here
]);

// You would typically fetch real data in the onMounted lifecycle hook
// import { onMounted } from 'vue';
// onMounted(() => {
//   fetchCourses();
// });
//
// const fetchCourses = async () => {
//   // Call your API to get the list of courses
//   // const response = await api.get('/teacher/courses');
//   // courseList.value = response.data;
// };

const handleViewCourse = (row) => {
  console.log('查看课程详情:', row);
  // TODO: Navigate to a detailed course view page, e.g., router.push(`/teacher/courses/${row.courseId}`);
  ElMessage.info(`查看课程详情功能待实现，课程ID: ${row.courseId}`);
};

const handleManageResources = (row) => {
  console.log('管理课程资源:', row);
  // TODO: Navigate to a resource management page for this course, e.g., router.push(`/teacher/courses/${row.courseId}/resources`);
  ElMessage.info(`管理课程资源功能待实现，课程ID: ${row.courseId}`);
};

const handleDeleteCourse = (row) => {
  ElMessageBox.confirm(`确定要删除课程 "${row.courseName}" 吗?`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    console.log('执行删除课程操作:', row);
    // TODO: Call your API to delete the course
    // await api.delete(`/teacher/courses/${row.courseId}`);
    // After successful deletion, you might want to refresh the list
    // fetchCourses();
    courseList.value = courseList.value.filter(course => course.courseId !== row.courseId); // Optimistic update
    ElMessage.success('课程删除成功！');
  }).catch(() => {
    // User canceled deletion
    console.log('取消删除课程');
  });
};
</script>

<style scoped>
.my-courses-container {
  padding: 20px;
}
</style>