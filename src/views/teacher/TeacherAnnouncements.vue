// src/views/teacher/TeacherAnnouncements.vue
<template>
  <div class="teacher-announcements-page">
    <el-card header="公告通知管理" shadow="never">
      <div style="margin-bottom: 20px;">
        <el-button type="primary" :icon="IEpPlus" @click="handleCreateAnnouncement">发布新公告</el-button>
      </div>

      <el-table :data="announcements" v-loading="loading" style="width: 100%">
        <el-table-column prop="title" label="公告标题" width="300" />
        <el-table-column prop="publishDate" label="发布日期" width="180" sortable />
        <el-table-column prop="author" label="发布人" width="150" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.status === '已发布' ? 'success' : 'info'">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="scope">
            <el-button size="small" type="primary" link @click="handleViewAnnouncement(scope.row)">查看</el-button>
            <el-button size="small" type="warning" link @click="handleEditAnnouncement(scope.row)">编辑</el-button>
            <el-popconfirm
                title="确定删除该公告吗?"
                @confirm="handleDeleteAnnouncement(scope.row.id)"
            >
              <template #reference>
                <el-button size="small" type="danger" link>删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          v-if="announcements.length > 0"
          style="margin-top: 20px; display: flex; justify-content: flex-end;"
          :current-page="1" :page-size="10" layout="total, prev, pager, next" :total="announcements.length"
      />
      <el-empty v-if="!loading && announcements.length === 0" description="暂无公告" />
    </el-card>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="700px">
      <el-form :model="currentAnnouncement" label-width="100px" ref="announcementFormRef">
        <el-form-item label="公告标题" prop="title" :rules="[{ required: true, message: '请输入公告标题', trigger: 'blur' }]">
          <el-input v-model="currentAnnouncement.title" />
        </el-form-item>
        <el-form-item label="公告内容" prop="content" :rules="[{ required: true, message: '请输入公告内容', trigger: 'blur' }]">
          <el-input type="textarea" :rows="6" v-model="currentAnnouncement.content" />
        </el-form-item>
        <el-form-item label="发布范围" prop="scope">
          <el-checkbox-group v-model="currentAnnouncement.scope">
            <el-checkbox label="全体学生">全体学生</el-checkbox>
            <el-checkbox label="三年级">三年级</el-checkbox>
            <el-checkbox label="教职工">教职工</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitAnnouncement">确定发布</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="viewDialogVisible" :title="viewAnnouncementData.title" width="600px">
      <div style="padding: 10px;">
        <p><strong>发布人:</strong> {{ viewAnnouncementData.author }}</p>
        <p><strong>发布日期:</strong> {{ viewAnnouncementData.publishDate }}</p>
        <p><strong>发布范围:</strong> {{ viewAnnouncementData.scope?.join(', ') }}</p>
        <el-divider/>
        <div v-html="viewAnnouncementData.content?.replace(/\n/g, '<br>')"></div>
      </div>
      <template #footer>
        <el-button type="primary" @click="viewDialogVisible = false">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { Plus as IEpPlus } from '@element-plus/icons-vue';

const announcements = ref([]);
const loading = ref(false);
const dialogVisible = ref(false);
const viewDialogVisible = ref(false);
const dialogTitle = ref('');
const currentAnnouncement = ref({});
const viewAnnouncementData = ref({});
const announcementFormRef = ref(null); // Form ref

const fetchAnnouncements = () => {
  loading.value = true;
  setTimeout(() => {
    announcements.value = [
      { id: 'AN001', title: '关于五一劳动节放假通知', publishDate: '2025-04-28', author: '校办', status: '已发布', content: '根据国家规定，我校五一劳动节放假安排如下...', scope: ['全体学生', '教职工']},
      { id: 'AN002', title: '教学楼消防演练通知', publishDate: '2025-05-05', author: '保卫处', status: '已发布', content: '为增强师生消防安全意识，定于本周五下午举行消防演练...', scope: ['全体学生', '教职工']},
    ];
    loading.value = false;
  }, 300);
};

const handleCreateAnnouncement = () => {
  currentAnnouncement.value = { title: '', content: '', scope: ['全体学生'] }; // 重置表单
  dialogTitle.value = '发布新公告';
  dialogVisible.value = true;
};

const handleEditAnnouncement = (announcement) => {
  currentAnnouncement.value = { ...announcement }; // 复制数据到表单
  dialogTitle.value = '编辑公告';
  dialogVisible.value = true;
};

const handleViewAnnouncement = (announcement) => {
  viewAnnouncementData.value = { ...announcement };
  viewDialogVisible.value = true;
}

const submitAnnouncement = async () => {
  if (!announcementFormRef.value) return;
  await announcementFormRef.value.validate((valid) => {
    if (valid) {
      // TODO: 调用API保存或更新公告
      if (currentAnnouncement.value.id) { // 编辑
        const index = announcements.value.findIndex(a => a.id === currentAnnouncement.value.id);
        if (index !== -1) {
          announcements.value[index] = { ...currentAnnouncement.value, publishDate: new Date().toLocaleDateString().replace(/\//g, '-'), author: '我 (张老师)' };
        }
        ElMessage.success('公告更新成功!');
      } else { // 新增
        announcements.value.unshift({
          id: `AN${String(announcements.value.length + 100).padStart(3,'0')}`,
          ...currentAnnouncement.value,
          publishDate: new Date().toLocaleDateString().replace(/\//g, '-'),
          author: '我 (张老师)',
          status: '已发布'
        });
        ElMessage.success('公告发布成功!');
      }
      dialogVisible.value = false;
    } else {
      ElMessage.error('请检查表单填写是否正确');
    }
  });
};

const handleDeleteAnnouncement = (id) => {
  // TODO: 调用API删除公告
  announcements.value = announcements.value.filter(a => a.id !== id);
  ElMessage.success('公告删除成功!');
};

onMounted(() => {
  fetchAnnouncements();
});
</script>

<style scoped>
.teacher-announcements-page {
  padding: 0;
}
</style>