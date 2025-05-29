// src/views/teacher/MyStudents.vue
<template>
  <div class="my-students-page">
    <el-card header="我的学生" shadow="never">
      <div class="actions-bar" style="margin-bottom: 20px;">
        <el-input
            v-model="searchQuery"
            placeholder="搜索学生姓名或学号"
            style="width: 300px; margin-right: 10px;"
            clearable
            @keyup.enter="handleSearch"
            @clear="fetchStudents"
        >
          <template #append>
            <el-button :icon="IEpSearch" @click="handleSearch" />
          </template>
        </el-input>
        <el-button type="primary" :icon="IEpPlus" @click="handleAddStudent">添加学生</el-button>
      </div>

      <el-table :data="students" v-loading="loading" style="width: 100%">
        <el-table-column prop="id" label="学号" width="150" sortable />
        <el-table-column prop="name" label="姓名" width="150" sortable />
        <el-table-column prop="class" label="班级" width="180" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="enrollmentDate" label="入学日期" width="180" sortable>
          <template #default="scope">
            {{ formatDate(scope.row.enrollmentDate) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="scope">
            <el-button size="small" type="primary" link :icon="IEpView" @click="handleViewDetails(scope.row)">详情</el-button>
            <el-button size="small" type="warning" link :icon="IEpEdit" @click="handleEditStudent(scope.row)">编辑</el-button>
            <el-popconfirm
                title="确定删除该学生吗?"
                confirm-button-text="确定"
                cancel-button-text="取消"
                @confirm="handleDeleteStudent(scope.row.id)"
            >
              <template #reference>
                <el-button size="small" type="danger" link :icon="IEpDelete">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
          v-if="totalStudents > 0"
          style="margin-top: 20px; display: flex; justify-content: flex-end;"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalStudents"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />

      <el-empty v-if="!loading && students.length === 0" description="暂无学生数据" />

    </el-card>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="50%">
      <el-form :model="currentStudent" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="currentStudent.name" />
        </el-form-item>
        <el-form-item label="班级">
          <el-input v-model="currentStudent.class" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="currentStudent.email" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveStudent">保存</el-button>
        </span>
      </template>
    </el-dialog>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { ElMessage } from 'element-plus';
import {
  Search as IEpSearch,
  Plus as IEpPlus,
  View as IEpView,
  Edit as IEpEdit,
  Delete as IEpDelete,
} from '@element-plus/icons-vue';

const searchQuery = ref('');
const students = ref([]);
const loading = ref(false);
const currentPage = ref(1);
const pageSize = ref(10);
const totalStudents = ref(0);

// 对话框相关
const dialogVisible = ref(false);
const dialogTitle = ref('');
const currentStudent = ref({}); // 用于表单编辑或添加
const isEditMode = ref(false);

// 模拟学生数据
const allStudentsData = ref(
    Array.from({ length: 53 }, (_, i) => ({
      id: `S2025${String(i + 1).padStart(3, '0')}`,
      name: `学生${String.fromCharCode(65 + (i % 26))}${i + 1}`,
      class: `三年级 (${(i % 3) + 1}班)`,
      email: `student${i + 1}@example.com`,
      enrollmentDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
    }))
);

const fetchStudents = () => {
  loading.value = true;
  // 模拟 API 调用
  setTimeout(() => {
    const filtered = allStudentsData.value.filter(s =>
        s.name.includes(searchQuery.value) || s.id.includes(searchQuery.value)
    );
    totalStudents.value = filtered.length;
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    students.value = filtered.slice(start, end);
    loading.value = false;
  }, 500);
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const handleSearch = () => {
  currentPage.value = 1; // 重置到第一页
  fetchStudents();
};

const handleAddStudent = () => {
  isEditMode.value = false;
  currentStudent.value = { name: '', class: '', email: '' }; // 清空表单
  dialogTitle.value = '添加新学生';
  dialogVisible.value = true;
};

const handleViewDetails = (student) => {
  // 实际应用中可能会跳转到学生详情页或打开更复杂的模态框
  currentStudent.value = { ...student };
  dialogTitle.value = `学生详情 - ${student.name}`;
  // 为了演示，这里也使用同一个对话框，但内容可能只读
  dialogVisible.value = true;
  console.log('查看学生详情:', student);
  ElMessage.info(`查看 ${student.name} 的详情 (实际应有专门的展示)`);
};

const handleEditStudent = (student) => {
  isEditMode.value = true;
  currentStudent.value = { ...student }; // 复制学生数据到表单
  dialogTitle.value = '编辑学生信息';
  dialogVisible.value = true;
};

const saveStudent = () => {
  // TODO: 表单验证
  loading.value = true;
  setTimeout(() => { // 模拟API保存
    if (isEditMode.value) {
      const index = allStudentsData.value.findIndex(s => s.id === currentStudent.value.id);
      if (index !== -1) {
        allStudentsData.value[index] = { ...currentStudent.value };
      }
      ElMessage.success('学生信息更新成功!');
    } else {
      // 添加新学生
      const newId = `S2025${String(allStudentsData.value.length + 1).padStart(3, '0')}`;
      allStudentsData.value.unshift({ ...currentStudent.value, id: newId, enrollmentDate: new Date() });
      ElMessage.success('学生添加成功!');
    }
    dialogVisible.value = false;
    fetchStudents(); // 重新加载数据
    loading.value = false;
  }, 300);
};

const handleDeleteStudent = (studentId) => {
  loading.value = true;
  setTimeout(() => { // 模拟API删除
    allStudentsData.value = allStudentsData.value.filter(s => s.id !== studentId);
    ElMessage.success('学生删除成功!');
    fetchStudents(); // 重新加载数据
    loading.value = false;
  }, 300);
};

const handleSizeChange = (newSize) => {
  pageSize.value = newSize;
  currentPage.value = 1; // 页码大小改变时回到第一页
  fetchStudents();
};

const handleCurrentChange = (newPage) => {
  currentPage.value = newPage;
  fetchStudents();
};

onMounted(() => {
  fetchStudents();
});
</script>

<style scoped>
.my-students-page {
  padding: 0; /* 由 common-main 提供 padding */
}
.actions-bar {
  display: flex;
  align-items: center;
  gap: 10px; /* 元素间距 */
}
/* 可以添加更多自定义样式 */
</style>