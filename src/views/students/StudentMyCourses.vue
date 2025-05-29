<template>
  <div class="student-my-courses-container">
    <h2>我的课程</h2>
    <p>这是您当前选修的所有课程。</p>

    <el-table :data="courseList" style="width: 100%; margin-top: 20px;" border>
      <el-table-column prop="courseName" label="课程名称" width="250"></el-table-column>
      <el-table-column prop="teacherName" label="授课教师" width="150"></el-table-column>
      <el-table-column prop="credit" label="学分" width="80"></el-table-column>
      <el-table-column prop="schedule" label="上课时间/地点"></el-table-column>
      <el-table-column label="操作" width="120">
        <template #default="scope">
          <el-button size="small" type="primary" @click="handleViewCourse(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const router = useRouter();

// 示例数据 - 实际应用中从API获取
const courseList = ref([
  // { courseId: 1, courseName: 'Web前端开发基础', teacherName: '张老师', credit: 3, schedule: '周一 8:00-9:30 A教学楼201' },
  // { courseId: 2, courseName: '数据结构与算法', teacherName: '李老师', credit: 4, schedule: '周三 10:00-11:30 B教学楼302' },
  // { courseId: 3, courseName: '数据库系统原理', teacherName: '王老师', credit: 3, schedule: '周五 14:00-15:30 C实验楼101' },
]);

onMounted(() => {
  // TODO: 在组件加载时，调用后端 API 获取学生已选课程列表
  fetchMyCourses();
});

const fetchMyCourses = async () => {
  console.log('Fetching student courses data...');
  // 模拟 API 调用
  await new Promise(resolve => setTimeout(resolve, 500));

  // 假设 API 返回数据结构如下:
  // const response = await api.get('/student/my-courses');
  // courseList.value = response.data;

  // 示例填充数据
  courseList.value = [
    { courseId: 1, courseName: 'Web前端开发基础', teacherName: '张老师', credit: 3, schedule: '周一 8:00-9:30 A教学楼201' },
    { courseId: 2, courseName: '数据结构与算法', teacherName: '李老师', credit: 4, schedule: '周三 10:00-11:30 B教学楼302' },
    { courseId: 3, courseName: '数据库系统原理', teacherName: '王老师', credit: 3, schedule: '周五 14:00-15:30 C实验楼101' },
  ];
};


const handleViewCourse = (row) => {
  console.log('查看课程详情:', row);
  // TODO: 导航到课程详情页面，显示课程介绍、目录、教师信息、课程资源、作业/测试列表等
  // 导航路径可能类似于 /student/courses/:courseId/details
  ElMessage.info(`导航到课程详情页面，课程ID: ${row.courseId}`);
  // router.push(`/student/courses/${row.courseId}/details`);
};
</script>

<style scoped>
.student-my-courses-container {
  padding: 20px;
}
</style>