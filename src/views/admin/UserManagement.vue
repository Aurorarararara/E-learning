<template>
  <div class="admin-user-management-container">
    <h2>用户管理</h2>

    <el-card shadow="never" style="margin-top: 20px;">
      <template #header>
        <div class="card-header">
          <span>用户列表</span>
          <el-button type="primary" size="small" @click="handleCreateUser">新增用户</el-button>
        </div>
      </template>

      <el-table :data="userList" style="width: 100%;" border v-loading="loading">
        <el-table-column prop="userId" label="ID" width="80"></el-table-column>
        <el-table-column prop="name" label="姓名" width="150"></el-table-column>
        <el-table-column prop="role" label="角色" width="100">
          <template #default="scope">
            <el-tag :type="getRoleTagType(scope.row.role)">{{ getRoleDisplayName(scope.row.role) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="phone" label="电话" width="150"></el-table-column>
        <el-table-column label="操作" width="180">
          <template #default="scope">
            <el-button size="small" @click="handleEditUser(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDeleteUser(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </el-card>

    <el-dialog
        :title="dialogTitle"
        v-model="dialogVisible"
        width="500px"
        @close="resetForm(userFormRef)"
    >
      <el-form :model="userForm" :rules="userFormRules" ref="userFormRef" label-width="100px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="userForm.role" placeholder="请选择用户角色">
            <el-option label="管理员" value="admin"></el-option>
            <el-option label="教师" value="teacher"></el-option>
            <el-option label="学生" value="student"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="userForm.phone"></el-input>
        </el-form-item>
        <el-form-item v-if="!isEditing" label="密码" prop="password">
          <el-input type="password" v-model="userForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item v-if="isEditing">
          <el-button type="warning" size="small" @click="handleResetPassword(userForm.userId)">重置密码</el-button>
          <span style="margin-left: 10px; color: #909399;">(重置为初始密码或随机密码)</span>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmitUser">确定</el-button>
      </template>
    </el-dialog>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { ElMessage, ElMessageBox, ElDialog, ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElButton, ElTable, ElTableColumn, ElCard, ElTag, ElLoading } from 'element-plus'; // 确保引入所有用到的组件

const userList = ref([]); // 用户列表数据
const loading = ref(false); // 加载状态

const dialogVisible = ref(false); // 控制对话框显示
const dialogTitle = ref(''); // 对话框标题
const isEditing = ref(false); // 是否处于编辑状态

const userFormRef = ref(null); // 表单引用
const userForm = ref({ // 用户表单数据
  userId: null,
  name: '',
  role: '',
  email: '',
  phone: '',
  password: '', // 用于新增用户
});

// 表单校验规则
const userFormRules = reactive({
  name: [{ required: true, message: '请输入用户姓名', trigger: 'blur' }],
  role: [{ required: true, message: '请选择用户角色', trigger: 'change' }],
  email: [
    { required: true, message: '请输入联系邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱地址', trigger: ['blur', 'change'] }
  ],
  phone: [
    { required: true, message: '请输入联系电话', trigger: 'blur' },
    // TODO: 添加电话号码格式校验
  ],
  password: [{ required: true, message: '请输入密码', trigger: 'blur', trigger: 'blur' }], // 新增时密码必填
});

// 角色显示映射
const roleMap = {
  admin: '管理员',
  teacher: '教师',
  student: '学生'
};

// 角色标签类型映射 (用于 Element Plus Tag 颜色)
const roleTagTypeMap = {
  admin: 'danger',
  teacher: 'warning',
  student: 'success'
};

const getRoleDisplayName = (role) => {
  return roleMap[role] || role;
};

const getRoleTagType = (role) => {
  return roleTagTypeMap[role] || 'info';
};


onMounted(() => {
  // 页面加载时获取用户列表
  fetchUserList();
});

const fetchUserList = async () => {
  loading.value = true;
  console.log('Fetching user list...');
  // TODO: 调用后端 API 获取用户列表数据
  // 模拟 API 调用
  await new Promise(resolve => setTimeout(resolve, 800));

  // 假设 API 返回数据结构如下:
  // const response = await api.get('/admin/users');
  // userList.value = response.data;

  // 示例填充数据
  userList.value = [
    { userId: 1, name: '系统管理员A', role: 'admin', email: 'adminA@example.com', phone: '10000000001' },
    { userId: 2, name: '张老师', role: 'teacher', email: 'zhanglaoshi@example.com', phone: '13800138000' },
    { userId: 3, name: '李老师', role: 'teacher', email: 'lilaoshi@example.com', phone: '13912345678' },
    { userId: 4, name: '王同学', role: 'student', email: 'wangtongxue@example.com', phone: '13987654321' },
    { userId: 5, name: '张同学', role: 'student', email: 'zhangtongxue@example.com', phone: '13011112222' },
  ];
  loading.value = false;
};

const handleCreateUser = () => {
  isEditing.value = false;
  dialogTitle.value = '新增用户';
  userForm.value = { userId: null, name: '', role: '', email: '', phone: '', password: '' }; // 清空表单数据
  dialogVisible.value = true;

  // 移除密码字段的 required 规则，因为它只在新增时需要
  userFormRules.password[0].required = true;
};

const handleEditUser = (row) => {
  isEditing.value = true;
  dialogTitle.value = '编辑用户';
  // 复制当前行数据到表单 (避免直接修改表格数据)
  userForm.value = { ...row };
  // 编辑时不需要密码字段
  userForm.value.password = '';
  dialogVisible.value = true;

  // 移除密码字段的 required 规则
  userFormRules.password[0].required = false;
};

const handleDeleteUser = (row) => {
  ElMessageBox.confirm(`确定要删除用户 "${row.name}" 吗?`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    console.log('执行删除用户操作:', row);
    // TODO: 调用后端 API 删除用户
    // 模拟 API 调用
    await new Promise(resolve => setTimeout(resolve, 500));
    // await api.delete(`/admin/users/${row.userId}`);

    ElMessage.success('用户删除成功!');
    // 删除成功后刷新列表或移除本地数据
    fetchUserList(); // 刷新列表是简单可靠的方式
    // 或者从本地 userList 中移除: userList.value = userList.value.filter(user => user.userId !== row.userId);
  }).catch(() => {
    console.log('取消删除用户');
  });
};

const handleSubmitUser = async () => {
  if (!userFormRef.value) return;
  await userFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true;
      if (isEditing.value) {
        console.log('提交编辑用户:', userForm.value);
        // TODO: 调用后端 API 更新用户
        // 模拟 API 调用
        await new Promise(resolve => setTimeout(resolve, 800));
        // const response = await api.put(`/admin/users/${userForm.value.userId}`, userForm.value);

        ElMessage.success('用户更新成功!');
      } else {
        console.log('提交新增用户:', userForm.value);
        // TODO: 调用后端 API 新增用户
        // 模拟 API 调用
        await new Promise(resolve => setTimeout(resolve, 800));
        // const response = await api.post('/admin/users', userForm.value);

        ElMessage.success('用户新增成功!');
      }
      dialogVisible.value = false; // 关闭对话框
      loading.value = false;
      fetchUserList(); // 刷新用户列表
    } else {
      ElMessage.error('请检查表单填写是否正确');
      return false;
    }
  });
};

const handleResetPassword = (userId) => {
  ElMessageBox.prompt('请输入新密码', '重置密码', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputType: 'password',
    inputPattern: /.+/, // 简单校验非空
    inputErrorMessage: '密码不能为空',
  }).then(async ({ value }) => {
    console.log('重置用户密码:', userId, '新密码:', value);
    // TODO: 调用后端 API 重置用户密码
    // 模拟 API 调用
    await new Promise(resolve => setTimeout(resolve, 500));
    // await api.post(`/admin/users/${userId}/reset-password`, { newPassword: value });

    ElMessage.success('密码重置成功！');
  }).catch(() => {
    console.log('取消重置密码');
  });
};


const resetForm = (formEl) => {
  // 对话框关闭时重置表单验证状态
  if (!formEl) return;
  formEl.resetFields();
};

</script>

<style scoped>
.admin-user-management-container {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
}

/* 确保卡片头部文字颜色可见 */
:deep(.el-card__header) {
  color: #303133; /* 或者使用你的 --custom-text-primary 变量 */
  font-weight: bold;
}
</style>