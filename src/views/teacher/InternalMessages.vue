// src/views/teacher/InternalMessages.vue
<template>
  <div class="internal-messages-page">
    <el-card header="站内信" shadow="never">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-menu default-active="inbox" class="message-menu" @select="handleMenuSelect">
            <el-menu-item index="compose">
              <el-icon><IEpEditPen /></el-icon> 写邮件
            </el-menu-item>
            <el-menu-item index="inbox">
              <el-icon><IEpMessageBox /></el-icon> 收件箱 ({{ unreadCount }})
            </el-menu-item>
            <el-menu-item index="sent">
              <el-icon><IEpPromotion /></el-icon> 已发送
            </el-menu-item>
            <el-menu-item index="drafts">
              <el-icon><IEpDocument /></el-icon> 草稿箱
            </el-menu-item>
            <el-menu-item index="trash">
              <el-icon><IEpDelete /></el-icon> 回收站
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="18">
          <div v-if="activeMenu === 'compose'" class="message-compose">
            <h3>撰写新消息</h3>
            <el-form label-width="80px" :model="newMessage">
              <el-form-item label="收件人">
                <el-input v-model="newMessage.to" placeholder="请输入收件人学号或姓名"></el-input>
              </el-form-item>
              <el-form-item label="主题">
                <el-input v-model="newMessage.subject" placeholder="请输入消息主题"></el-input>
              </el-form-item>
              <el-form-item label="内容">
                <el-input type="textarea" :rows="8" v-model="newMessage.content" placeholder="请输入消息内容"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="sendMessage">发送</el-button>
                <el-button @click="saveDraft">存草稿</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div v-else-if="activeMenu === 'inbox'">
            <h3>收件箱</h3>
            <el-table :data="inboxMessages" @row-click="viewMessage" style="cursor:pointer;">
              <el-table-column prop="from" label="发件人" width="150"></el-table-column>
              <el-table-column prop="subject" label="主题">
                <template #default="scope">
                  <span :style="{fontWeight: scope.row.isRead ? 'normal' : 'bold'}">{{ scope.row.subject }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="date" label="日期" width="180"></el-table-column>
            </el-table>
            <el-empty v-if="inboxMessages.length === 0" description="收件箱为空" />
          </div>
          <div v-else-if="activeMenu === 'sent'">
            <h3>已发送</h3>
            <el-table :data="sentMessages" @row-click="viewMessage" style="cursor:pointer;">
              <el-table-column prop="to" label="收件人" width="150"></el-table-column>
              <el-table-column prop="subject" label="主题"></el-table-column>
              <el-table-column prop="date" label="日期" width="180"></el-table-column>
            </el-table>
            <el-empty v-if="sentMessages.length === 0" description="已发送邮件为空" />
          </div>
          <div v-else>
            <el-empty :description="`${activeMenu} 功能正在建设中...`" />
          </div>

          <el-dialog v-model="messageDetailVisible" :title="currentMessage.subject" width="60%">
            <p><strong>发件人:</strong> {{ currentMessage.from || '我' }}</p>
            <p><strong>收件人:</strong> {{ currentMessage.to || '我' }}</p>
            <p><strong>日期:</strong> {{ currentMessage.date }}</p>
            <el-divider />
            <div v-html="currentMessage.contentPreview"></div> <template #footer>
            <el-button type="primary" @click="messageDetailVisible = false">关闭</el-button>
            <el-button v-if="activeMenu === 'inbox'" @click="replyMessage">回复</el-button>
          </template>
          </el-dialog>

        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import {
  EditPen as IEpEditPen,
  MessageBox as IEpMessageBox,
  Promotion as IEpPromotion,
  Document as IEpDocument,
  Delete as IEpDelete,
} from '@element-plus/icons-vue';

const activeMenu = ref('inbox'); // inbox, sent, drafts, trash, compose
const newMessage = ref({ to: '', subject: '', content: '' });
const inboxMessages = ref([]);
const sentMessages = ref([]);
const messageDetailVisible = ref(false);
const currentMessage = ref({});

const unreadCount = computed(() => inboxMessages.value.filter(msg => !msg.isRead).length);

const handleMenuSelect = (index) => {
  activeMenu.value = index;
  if (index === 'inbox') fetchInboxMessages();
  if (index === 'sent') fetchSentMessages();
};

const fetchInboxMessages = () => {
  // 模拟API
  setTimeout(() => {
    inboxMessages.value = [
      { id: 'M001', from: '教务处', subject: '关于期末考试安排的通知', date: '2025-05-07 10:00', contentPreview: '各位老师，现将期末考试安排通知如下...', isRead: false },
      { id: 'M002', from: '学生李雷', subject: '关于数学作业问题的请教', date: '2025-05-06 15:30', contentPreview: '张老师您好，关于上次的数学作业第三题...', isRead: true },
    ];
  }, 200);
};

const fetchSentMessages = () => {
  setTimeout(() => {
    sentMessages.value = [
      { id: 'M003', to: '全体三年级学生', subject: '下周三语文课调课通知', date: '2025-05-05 09:00', contentPreview: '同学们，原定于下周三的语文课调整至周四...' },
    ];
  }, 200);
}

const sendMessage = () => {
  if (!newMessage.value.to || !newMessage.value.subject || !newMessage.value.content) {
    ElMessage.error('收件人、主题和内容不能为空');
    return;
  }
  // TODO: 实现发送逻辑
  console.log('发送消息:', newMessage.value);
  ElMessage.success('消息发送成功!');
  // 模拟发送后添加到已发送列表
  sentMessages.value.unshift({
    id: `M${Date.now()}`,
    to: newMessage.value.to,
    subject: newMessage.value.subject,
    date: new Date().toLocaleString(),
    contentPreview: newMessage.value.content.substring(0, 100) + '...'
  });
  newMessage.value = { to: '', subject: '', content: '' }; // 清空
  activeMenu.value = 'sent'; // 跳转到已发送
};

const saveDraft = () => {
  // TODO: 实现保存草稿逻辑
  ElMessage.info('消息已保存至草稿箱 (功能待实现)');
};

const viewMessage = (message) => {
  currentMessage.value = message;
  messageDetailVisible.value = true;
  if (activeMenu.value === 'inbox' && !message.isRead) {
    const msg = inboxMessages.value.find(m => m.id === message.id);
    if (msg) msg.isRead = true; // 标记为已读
  }
};

const replyMessage = () => {
  messageDetailVisible.value = false;
  activeMenu.value = 'compose';
  newMessage.value.to = currentMessage.value.from; // 假设回复给发件人
  newMessage.value.subject = `回复: ${currentMessage.value.subject}`;
  newMessage.value.content = `\n\n--- 原邮件 ---\n${currentMessage.value.contentPreview}\n`; // 引用原邮件
};


onMounted(() => {
  fetchInboxMessages();
});
</script>

<style scoped>
.internal-messages-page {
  padding: 0;
}
.message-menu .el-menu-item.is-active {
  background-color: var(--custom-menu-active-bg) !important; /* 使用之前定义的变量 */
  color: var(--custom-menu-active-text) !important;
}
.message-menu .el-menu-item {
  height: 45px;
}
.message-compose h3, .message-list h3 {
  margin-bottom: 20px;
  font-size: 1.3rem;
  color: #303133;
}
</style>