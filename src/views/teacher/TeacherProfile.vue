// src/views/teacher/TeacherProfile.vue
<template>
  <div class="teacher-profile-page">
    <el-card header="个人设置" shadow="never">
      <el-tabs v-model="activeTab" tab-position="left" style="min-height: 400px;">
        <el-tab-pane label="基本信息" name="basic">
          <el-form :model="basicInfo" label-width="100px" style="max-width: 500px; margin-top:20px;">
            <el-form-item label="教师姓名">
              <el-input v-model="basicInfo.name" disabled />
            </el-form-item>
            <el-form-item label="教师工号">
              <el-input v-model="basicInfo.teacherId" disabled />
            </el-form-item>
            <el-form-item label="联系邮箱">
              <el-input v-model="basicInfo.email" />
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="basicInfo.phone" />
            </el-form-item>
            <el-form-item label="个人简介">
              <el-input type="textarea" :rows="3" v-model="basicInfo.bio" />
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
              <el-form-item label="默认编辑器">
                <el-radio-group v-model="preferences.defaultEditor">
                  <el-radio label="markdown">Markdown</el-radio>
                  <el-radio label="richText">富文本编辑器</el-radio>
                </el-radio-group>
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
  name: '张老师', // 假设从store或API获取
  teacherId: 'T2025001',
  email: 'zhanglaoshi@example.com',
  phone: '13800138000',
  bio: '资深语文教师，热爱教学。'
});

const passwordFormRef = ref(null);
const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const preferences = ref({
  enableNotifications: true,
  defaultEditor: 'richText'
});

// 校验规则
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
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, validator: validatePass2, trigger: 'blur' }
  ],
});


const saveBasicInfo = () => {
  // TODO: 调用API保存基本信息
  console.log('保存基本信息:', basicInfo.value);
  ElMessage.success('基本信息保存成功!');
};

const changePassword = async () => {
  if (!passwordFormRef.value) return;
  await passwordFormRef.value.validate((valid) => {
    if (valid) {
      // TODO: 调用API修改密码
      console.log('修改密码:', passwordForm.value);
      ElMessage.success('密码修改成功! (请重新登录以生效部分系统)');
      passwordForm.value = { currentPassword: '', newPassword: '', confirmPassword: '' }; // 清空表单
    } else {
      ElMessage.error('请检查密码表单填写是否正确');
      return false;
    }
  });
};

const savePreferences = () => {
  console.log('保存偏好设置:', preferences.value);
  ElMessage.success('偏好设置已保存!');
};

onMounted(()=> {
  // TODO: 实际应用中，这里应该从API获取用户数据并填充表单
  // fetchUserProfile().then(data => { basicInfo.value = data.basic; preferences.value = data.preferences; });
})
</script>

<style scoped>
.teacher-profile-page {
  padding: 0;
}
/* 如果需要，可以为 el-tabs[tab-position="left"] 的 .el-tabs__header.is-left 设置一个固定宽度 */
:deep(.el-tabs__header.is-left) {
  min-width: 120px; /* 或者你希望的宽度 */
  margin-right: 25px !important;
}
:deep(.el-tab-pane) {
  padding-left: 10px;
}
</style>