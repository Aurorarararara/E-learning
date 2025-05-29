// src/views/teacher/TeacherAssignments.vue
<template>
  <div class="teacher-assignments-page">
    <el-card header="测试 / 作业管理" shadow="never">
      <el-tabs v-model="activeTab" @tab-click="handleTabClick">
        <el-tab-pane label="已发布" name="published">
          <div style="margin-bottom: 16px;">
            <el-button type="primary" :icon="IEpPlus" @click="createNewAssignment">发布新作业/测试</el-button>
          </div>
          <el-table :data="publishedAssignments" v-loading="loading" style="width: 100%">
            <el-table-column prop="title" label="标题" width="250" />
            <el-table-column prop="course" label="所属课程" width="180" />
            <el-table-column prop="type" label="类型" width="100">
              <template #default="scope">
                <el-tag :type="scope.row.type === '作业' ? 'success' : 'warning'">{{ scope.row.type }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="dueDate" label="截止日期" width="180" sortable />
            <el-table-column prop="submissions" label="提交数/总数" width="150" />
            <el-table-column label="操作" width="200" fixed="right">
              <template #default="scope">
                <el-button size="small" @click="viewSubmissions(scope.row)">查看提交</el-button>
                <el-button size="small" type="danger" link @click="deleteAssignment(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
              v-if="publishedAssignments.length > 0"
              style="margin-top: 20px; display: flex; justify-content: flex-end;"
              :current-page="1" :page-size="10" layout="total, prev, pager, next" :total="publishedAssignments.length"
          />
        </el-tab-pane>

        <el-tab-pane label="待批改" name="pending_review">
          <el-table :data="pendingReviewAssignments" v-loading="loading" style="width: 100%">
            <el-table-column prop="title" label="作业标题" width="250" />
            <el-table-column prop="studentName" label="学生" width="150" />
            <el-table-column prop="submissionDate" label="提交日期" width="180" />
            <el-table-column label="操作" width="150" fixed="right">
              <template #default="scope">
                <el-button size="small" type="primary" @click="gradeAssignment(scope.row)">去批改</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
              v-if="pendingReviewAssignments.length > 0"
              style="margin-top: 20px; display: flex; justify-content: flex-end;"
              :current-page="1" :page-size="10" layout="total, prev, pager, next" :total="pendingReviewAssignments.length"
          />
          <el-empty v-if="!loading && pendingReviewAssignments.length === 0" description="暂无待批改的作业" />
        </el-tab-pane>

        <el-tab-pane label="草稿箱" name="drafts">
          <el-empty description="草稿箱功能正在建设中..." />
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <el-dialog v-model="assignmentDialogVisible" title="发布新作业/测试" width="60%">
      <el-form :model="newAssignmentForm" label-width="100px">
        <el-form-item label="标题">
          <el-input v-model="newAssignmentForm.title" placeholder="请输入作业或测试标题"></el-input>
        </el-form-item>
        <el-form-item label="所属课程">
          <el-select v-model="newAssignmentForm.course" placeholder="请选择课程">
            <el-option label="语文" value="语文"></el-option>
            <el-option label="数学" value="数学"></el-option>
            <el-option label="英语" value="英语"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="newAssignmentForm.type">
            <el-radio label="作业">作业</el-radio>
            <el-radio label="测试">测试</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="截止日期">
          <el-date-picker
              v-model="newAssignmentForm.dueDate"
              type="datetime"
              placeholder="选择截止日期和时间"
              value-format="YYYY-MM-DD HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="内容详情">
          <el-input type="textarea" :rows="5" v-model="newAssignmentForm.description" placeholder="请输入作业或测试的具体内容和要求"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="assignmentDialogVisible = false">取消</el-button>
          <el-button @click="saveAsDraft">存为草稿</el-button>
          <el-button type="primary" @click="publishAssignment">立即发布</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { Plus as IEpPlus } from '@element-plus/icons-vue';

const activeTab = ref('published');
const loading = ref(false);
const assignmentDialogVisible = ref(false);
const newAssignmentForm = ref({
  title: '',
  course: '',
  type: '作业',
  dueDate: '',
  description: ''
});

const publishedAssignments = ref([]);
const pendingReviewAssignments = ref([]);

const fetchPublishedAssignments = () => {
  loading.value = true;
  // 模拟API
  setTimeout(() => {
    publishedAssignments.value = [
      { id: 'A001', title: '第一单元作文', course: '语文', type: '作业', dueDate: '2025-05-15 23:59', submissions: '30/45' },
      { id: 'T001', title: '期中数学测验', course: '数学', type: '测试', dueDate: '2025-05-20 10:00', submissions: '40/45' },
    ];
    loading.value = false;
  }, 300);
};

const fetchPendingReviewAssignments = () => {
  loading.value = true;
  setTimeout(() => {
    pendingReviewAssignments.value = [
      { id: 'S001', assignmentId: 'A001', title: '第一单元作文', studentName: '李明', submissionDate: '2025-05-14 10:20' },
      { id: 'S002', assignmentId: 'A001', title: '第一单元作文', studentName: '王芳', submissionDate: '2025-05-15 09:00' },
    ];
    loading.value = false;
  }, 300);
}

const createNewAssignment = () => {
  newAssignmentForm.value = { title: '', course: '', type: '作业', dueDate: '', description: ''};
  assignmentDialogVisible.value = true;
};

const saveAsDraft = () => {
  // TODO: 实现保存草稿逻辑
  ElMessage.info('作业已保存为草稿 (功能待实现)');
  assignmentDialogVisible.value = false;
};

const publishAssignment = () => {
  // TODO: 表单验证 和 发布逻辑
  console.log('发布作业:', newAssignmentForm.value);
  // 模拟API调用
  publishedAssignments.value.unshift({
    id: `A${String(publishedAssignments.value.length + 100).padStart(3,'0')}`,
    ...newAssignmentForm.value,
    submissions: `0/${Math.floor(Math.random()*10+40)}` // 模拟总人数
  });
  ElMessage.success('作业发布成功!');
  assignmentDialogVisible.value = false;
};


const viewSubmissions = (assignment) => {
  console.log('查看提交:', assignment);
  ElMessage.info(`查看作业 [${assignment.title}] 的提交情况 (功能待实现)`);
  // 实际应导航到提交列表页或打开新模态框
};

const deleteAssignment = (assignment) => {
  console.log('删除作业:', assignment);
  ElMessage.success(`作业 [${assignment.title}] 已删除 (模拟)`);
  publishedAssignments.value = publishedAssignments.value.filter(a => a.id !== assignment.id);
};

const gradeAssignment = (submission) => {
  console.log('批改作业:', submission);
  ElMessage.info(`开始批改学生 [${submission.studentName}] 的作业 [${submission.title}] (功能待实现)`);
  // 实际应导航到批改页面或打开批改界面
};


const handleTabClick = (tab) => {
  if (tab.paneName === 'published') {
    fetchPublishedAssignments();
  } else if (tab.paneName === 'pending_review') {
    fetchPendingReviewAssignments();
  }
};

onMounted(() => {
  fetchPublishedAssignments(); // 默认加载第一个tab的数据
});
</script>

<style scoped>
.teacher-assignments-page {
  padding: 0;
}
</style>