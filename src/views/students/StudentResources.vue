<template>
  <div class="student-resources-container">
    <h2>课程资源</h2>
    <p>在这里查找您课程的学习资源。</p>

    <el-select v-model="selectedCourseId" placeholder="请选择课程" style="width: 200px; margin-bottom: 20px;" @change="fetchCourseResources">
      <el-option
          v-for="item in coursesForResourceSelect"
          :key="item.courseId"
          :label="item.courseName"
          :value="item.courseId"
      ></el-option>
    </el-select>

    <el-table v-if="resourceList.length > 0" :data="resourceList" style="width: 100%;" border>
      <el-table-column prop="fileName" label="文件名"></el-table-column>
      <el-table-column prop="fileType" label="类型" width="100"></el-table-column>
      <el-table-column prop="uploadDate" label="上传日期" width="150"></el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="scope">
          <el-button size="small" type="primary" @click="handlePreviewResource(scope.row)">预览/观看</el-button>
          <el-button size="small" @click="handleDownloadResource(scope.row)">下载</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-empty v-else description="请选择课程或当前课程暂无资源"></el-empty>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';

const selectedCourseId = ref(null); // 当前选中的课程
const coursesForResourceSelect = ref([
  // { courseId: 1, courseName: 'Web前端开发基础' },
  // { courseId: 2, courseName: '数据结构与算法' },
]); // 学生已选的课程列表，用于下拉选择

const resourceList = ref([
  // { id: 1, fileName: '链表概念讲解.mp4', fileType: '视频', uploadDate: '2025-05-06', url: '/resources/video/linklist.mp4' },
  // { id: 2, fileName: '数组基础知识.pdf', fileType: '文档', uploadDate: '2025-05-05', url: '/resources/doc/array.pdf' },
]); // 当前课程的资源列表

onMounted(() => {
  // TODO: 在组件加载时，获取学生已选的课程列表，用于填充下拉选择框
  fetchStudentCoursesForSelect();
});

const fetchStudentCoursesForSelect = async () => {
  console.log('Fetching student courses for resource select...');
  // 模拟 API 调用
  await new Promise(resolve => setTimeout(resolve, 500));

  // 假设 API 返回数据结构如下:
  // const response = await api.get('/student/my-courses-simple'); // 可能是一个简化的接口，只返回 id 和 name
  // coursesForResourceSelect.value = response.data;

  // 示例填充数据
  coursesForResourceSelect.value = [
    { courseId: 1, courseName: 'Web前端开发基础' },
    { courseId: 2, courseName: '数据结构与算法' },
    { courseId: 3, courseName: '数据库系统原理' },
  ];
};


const fetchCourseResources = async () => {
  if (!selectedCourseId.value) {
    resourceList.value = [];
    return;
  }
  console.log('Fetching resources for course ID:', selectedCourseId.value);
  // 模拟 API 调用
  await new Promise(resolve => setTimeout(resolve, 500));

  // TODO: 调用后端 API 获取指定课程的资源列表
  // 假设 API 返回数据结构如下:
  // const response = await api.get(`/student/courses/${selectedCourseId.value}/resources`);
  // resourceList.value = response.data;

  // 示例填充数据
  if (selectedCourseId.value === 1) {
    resourceList.value = [
      { id: 101, fileName: 'HTML基础.pdf', fileType: '文档', uploadDate: '2025-04-20', url: '/resources/web/html.pdf' },
      { id: 102, fileName: 'CSS入门.mp4', fileType: '视频', uploadDate: '2025-04-25', url: '/resources/web/css.mp4' },
    ];
  } else if (selectedCourseId.value === 2) {
    resourceList.value = [
      { id: 201, fileName: '链表概念讲解.mp4', fileType: '视频', uploadDate: '2025-05-06', url: '/resources/dsa/linklist.mp4' },
      { id: 202, fileName: '数组基础知识.pdf', fileType: '文档', uploadDate: '2025-05-05', url: '/resources/dsa/array.pdf' },
    ];
  } else {
    resourceList.value = [];
  }
};

const handlePreviewResource = (row) => {
  console.log('预览/观看资源:', row);
  // TODO: 根据文件类型，打开预览弹窗或跳转到新页面进行播放/预览
  ElMessage.info(`预览/观看功能待实现，资源: ${row.fileName}`);
  // if (row.fileType === '视频') {
  //    // 打开视频播放弹窗或页面
  // } else if (row.fileType === '文档') {
  //    // 打开文档预览弹窗或页面
  // }
};

const handleDownloadResource = (row) => {
  console.log('下载资源:', row);
  // TODO: 调用后端 API 或直接使用文件 URL 进行下载
  // 通常后端提供一个下载接口，可以记录下载日志和进行权限检查
  ElMessage.success(`开始下载资源: ${row.fileName}`);
  // 示例：直接通过链接下载 (可能需要后端认证)
  // window.open(row.url, '_blank');
};

</script>

<style scoped>
.student-resources-container {
  padding: 20px;
}
</style>