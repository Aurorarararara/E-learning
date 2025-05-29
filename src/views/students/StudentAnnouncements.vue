<template>
  <div class="student-announcements-container">
    <h2>公告通知</h2>
    <p>在这里查看平台和您课程的相关公告。</p>

    <el-collapse v-model="activeNames" style="margin-top: 20px;">
      <el-collapse-item v-for="announcement in announcements" :key="announcement.id" :name="announcement.id">
        <template #title>
          <span class="announcement-title">{{ announcement.title }}</span>
          <el-tag size="small" :type="announcement.type === 'System' ? 'info' : 'success'" style="margin-left: 15px;">
            {{ announcement.type === 'System' ? '系统' : '课程' }}
          </el-tag>
          <span class="announcement-date">{{ announcement.publishDate }}</span>
        </template>
        <div class="announcement-content">
          <p>{{ announcement.content }}</p>
        </div>
      </el-collapse-item>
    </el-collapse>

    <el-empty v-if="announcements.length === 0" description="暂无公告"></el-empty>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// 可能需要引入 el-tag 等 Element Plus 组件

const announcements = ref([
  // 示例公告数据
  // { id: 1, title: '平台维护通知', content: '平台将于今晚10点进行维护...', type: 'System', publishDate: '2025-05-07' },
  // { id: 2, title: '数据结构课程暂停通知', content: '原定于周三的数据结构课程暂停一次...', type: 'Course', publishDate: '2025-05-06' },
]);

const activeNames = ref([]); // 默认展开的面板

onMounted(() => {
  // TODO: 在组件加载时，调用后端 API 获取学生可见的公告列表（系统公告 + 已选课程的公告）
  fetchAnnouncements();
});

const fetchAnnouncements = async () => {
  console.log('Fetching student announcements...');
  // 模拟 API 调用
  await new Promise(resolve => setTimeout(resolve, 500));

  // 假设 API 返回数据结构如下:
  // const response = await api.get('/student/announcements');
  // announcements.value = response.data;

  // 示例填充数据
  announcements.value = [
    { id: 1, title: '平台维护通知', content: '尊敬的用户：<br> 平台将于今晚22:00-24:00进行系统维护，期间部分服务可能受影响，请错峰使用。给您带来的不便敬请谅解！<br> E-learning平台运营团队', type: 'System', publishDate: '2025-05-07' },
    { id: 2, title: '数据结构课程：关于链表作业的补充说明', content: '同学们好，关于本次链表作业，请注意除了实现基本功能外，还需要考虑异常情况的处理...', type: 'Course', publishDate: '2025-05-06' },
    { id: 3, title: '大学物理课程：本周课堂调整通知', content: '本周三的大学物理课程将调整到B教学楼305教室，时间不变。请大家相互转告。', type: 'Course', publishDate: '2025-05-05' },
  ];
};

</script>

<style scoped>
.student-announcements-container {
  padding: 20px;
}

.announcement-title {
  font-weight: bold;
  margin-right: 10px;
}

.announcement-date {
  font-size: 0.9em;
  color: #909399;
  margin-left: 15px;
}

.announcement-content {
  padding: 10px 20px;
  line-height: 1.6;
  color: #606266;
}

/* 可以根据需要为不同的公告类型添加额外样式 */
.el-tag--info {
  /* 系统公告的标签样式 */
}
.el-tag--success {
  /* 课程公告的标签样式 */
}
</style>