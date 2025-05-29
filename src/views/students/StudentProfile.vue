<template>
  <div class="student-profile-container">
    <h2>个人设置</h2>
    <p>在这里管理您的个人信息和账户安全。</p>

    <el-card header="个人设置" shadow="never" style="margin-top: 20px;">
      <el-tabs v-model="activeTab" tab-position="left" style="min-height: 400px;">
        <el-tab-pane label="基本信息" name="basic">
          <el-form :model="basicInfo" label-width="100px" style="max-width: 500px; margin-top:20px;">
            <el-form-item label="学生姓名">
              <el-input v-model="basicInfo.name" disabled /> </el-form-item>
            <el-form-item label="学号">
              <el-input v-model="basicInfo.studentId" disabled /> </el-form-item>
            <el-form-item label="院系">
              <el-input v-model="basicInfo.department" disabled /> </el-form-item>
            <el-form-item label="专业">
              <el-input v-model="basicInfo.major" disabled /> </el-form-item>
            <el-form-item label="联系邮箱">
              <el-input v-model="basicInfo.email" />
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="basicInfo.phone" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveBasicInfo">保存基本信息</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="修改密码" name="password">
          <el-form :model="passwordForm" label-width="100px" ref="passwordFormRef" :rules="passwordRules" style="max-width: 500px; margin-top:20px;">
            <el-form-item label="当前密码" prop="currentPassword">
              <el-input type="password" v-model="passwordForm.currentPassword" show-password />
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
              <el-input type="password" v-model="passwordForm.newPassword" show-password />
            </el-form-item>
            <el-form-item label="确认新密码" prop="confirmPassword">
              <el-input type="password" v-model="passwordForm.confirmPassword" show-password />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="changePassword">确认修改密码</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="偏好设置" name="preferences">
          <div style="padding: 20px;">
            <el-form label-width="150px">
              <el-form-item label="消息通知">
                <el-switch v-model="preferences.enableNotifications" active-text="接收邮件通知" inactive-text="关闭邮件通知"></el-switch>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="savePreferences">保存偏好设置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>

      </el-tabs>
    </el-card>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { ElMessage } from 'element-plus';

const activeTab = ref('basic');

const basicInfo = ref({
  name: '王同学', // 示例数据
  studentId: 'S20251001', // 示例数据
  department: '计算机科学与技术', // 示例数据
  major: '软件工程', // 示例数据
  email: 'wangtongxue@example.com',
  phone: '13912345678',
  // signature: '好好学习，天天向上！' // 示例数据
});

const passwordFormRef = ref(null);
const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const preferences = ref({
  enableNotifications: true,
  // defaultEditor: 'richText' // 学生端可能不需要
});

// 校验规则 (与教师端类似)
const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入新密码'));
  } else {
    if (passwordForm.value.confirmPassword !== '') {
      if (!passwordFormRef.value) return;
      passwordFormRef.value.validateField('confirmPassword', () => null);
    }
    callback();
  }
};
const validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入新密码'));
  } else if (value !== passwordForm.value.newPassword) {
    callback(new Error("两次输入的新密码不一致!"));
  } else {
    callback();
  }
};

const passwordRules = reactive({
  currentPassword: [{ required: true, message: '请输入当前密码', trigger: 'blur' }],
  newPassword: [
    { required: true, validator: validatePass, trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' } // 根据安全要求调整密码长度
  ],
  confirmPassword: [
    { required: true, validator: validatePass2, trigger: 'blur' }
  ],
});


const saveBasicInfo = () => {
  // TODO: 调用API保存基本信息
  console.log('保存学生基本信息:', basicInfo.value);
  // 模拟 API 调用
  // api.post('/student/profile/basic', basicInfo.value).then(() => {
  //    ElMessage.success('基本信息保存成功!');
  // }).catch(error => {
  //    ElMessage.error('保存失败: ' + error.message);
  // });
  ElMessage.success('基本信息保存成功! (模拟)');
};

const changePassword = async () => {
  if (!passwordFormRef.value) return;
  await passwordFormRef.value.validate((valid) => {
    if (valid) {
      // TODO: 调用API修改密码
      console.log('修改学生密码:', passwordForm.value);
      // 模拟 API 调用
      // api.post('/student/profile/password', {
      //    currentPassword: passwordForm.value.currentPassword,
      //    newPassword: passwordForm.value.newPassword
      // }).then(() => {
      //    ElMessage.success('密码修改成功! 请使用新密码重新登录');
      //    // TODO: 提示用户重新登录，并执行登出操作
      //    // logout(); // 如果你的 logout 方法在父组件，需要通过 emit 或其他方式调用
      // }).catch(error => {
      //    ElMessage.error('修改失败: ' + error.message);
      // });

      ElMessage.success('密码修改成功! (模拟)');
      passwordForm.value = { currentPassword: '', newPassword: '', confirmPassword: '' }; // 清空表单
    } else {
      ElMessage.error('请检查密码表单填写是否正确');
      return false;
    }
  });
};

const savePreferences = () => {
  console.log('保存学生偏好设置:', preferences.value);
  // TODO: 调用API保存偏好设置
  // api.post('/student/profile/preferences', preferences.value).then(() => {
  //    ElMessage.success('偏好设置已保存!');
  // }).catch(error => {
  //    ElMessage.error('保存失败: ' + error.message);
  // });
  ElMessage.success('偏好设置已保存! (模拟)');
};

onMounted(()=> {
  // TODO: 实际应用中，这里应该从API获取当前学生用户数据并填充表单
  // fetchStudentProfile().then(data => {
  //    basicInfo.value = data.basic;
  //    preferences.value = data.preferences;
  // });
  console.log('Fetching student profile data...');
  // 模拟获取数据并填充
  basicInfo.value = {
    name: '王同学',
    studentId: 'S20251001',
    department: '计算机科学与技术',
    major: '软件工程',
    email: 'wangtongxue@example.com',
    phone: '13912345678',
  };
  preferences.value = {
    enableNotifications: true,
  };
})
</script>

<style scoped>
.student-profile-container {
  padding: 20px;
}

/* 引用教师端布局中的卡片头部样式，确保标题可见 */
:deep(.el-card__header) {
  color: #303133; /* 或者使用你的 --custom-text-primary 变量 */
  font-weight: bold;
}

/* 引用教师端个人设置中的 tab 样式 */
:deep(.el-tabs__header.is-left) {
  min-width: 120px; /* 或者你希望的宽度 */
  margin-right: 25px !important;
}
:deep(.el-tab-pane) {
  padding-left: 10px;
}
</style>