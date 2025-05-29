<template>
  <div class="student-messages-container">
    <h2>站内信</h2>
    <p>在这里查看和发送站内消息。</p>

    <el-container style="height: 500px; border: 1px solid #eee; margin-top: 20px;">
      <el-aside width="200px" style="background-color: #f9f9f9; padding: 10px;">
        <h4>会话列表</h4>
        <el-scrollbar style="height: calc(100% - 30px);">
          <div v-for="(conversation, index) in conversations" :key="index"
               class="conversation-item"
               :class="{ 'is-active': activeConversationId === conversation.id }"
               @click="selectConversation(conversation)">
            {{ conversation.title }}
            <el-badge v-if="conversation.unreadCount > 0" :value="conversation.unreadCount" class="unread-badge" />
          </div>
        </el-scrollbar>
      </el-aside>
      <el-main style="padding: 10px;">
        <div v-if="activeConversation">
          <h4>{{ activeConversation.title }}</h4>
          <el-scrollbar style="height: 300px; border-bottom: 1px solid #eee; padding: 10px; margin-bottom: 10px;">
            <div v-for="(message, msgIndex) in activeConversation.messages" :key="msgIndex" class="message-item">
              <div :class="{'message-sent': message.sender === 'student', 'message-received': message.sender !== 'student'}">
                <p class="message-content">{{ message.content }}</p>
                <span class="message-time">{{ message.time }}</span>
              </div>
            </div>
          </el-scrollbar>
          <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入回复内容"
              v-model="replyContent"
              style="margin-bottom: 10px;"
          ></el-input>
          <el-button type="primary" @click="sendMessage">发送</el-button>
        </div>
        <div v-else class="select-conversation-placeholder">
          请选择一个会话或新建站内信
          <el-button type="text" @click="showNewMessageDialog = true">新建站内信</el-button>
        </div>
      </el-main>
    </el-container>

    <el-dialog title="新建站内信" v-model="showNewMessageDialog" width="400px">
      <el-form :model="newMessageForm" label-width="80px">
        <el-form-item label="收件人">
          <el-input v-model="newMessageForm.recipient" placeholder="请输入收件人姓名或ID"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" :rows="4" v-model="newMessageForm.content" placeholder="请输入消息内容"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showNewMessageDialog = false">取消</el-button>
        <el-button type="primary" @click="sendNewMessage">发送</el-button>
      </template>
    </el-dialog>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage, ElDialog } from 'element-plus'; // 确保引入 ElDialog

const conversations = ref([
  // 示例会话数据
  // { id: 1, title: '与 张老师 的会话', unreadCount: 2, messages: [
  //     { sender: 'teacher', content: '请提交你的作业', time: '10:00' },
  //     { sender: 'student', content: '好的老师', time: '10:05' },
  //     { sender: 'teacher', content: '请尽快', time: '10:10' },
  // ]},
  // { id: 2, title: '与 李同学 的会话', unreadCount: 0, messages: [
  //      { sender: 'student', content: '请问这道题怎么做？', time: '昨日' },
  // ]}
]);

const activeConversationId = ref(null); // 当前选中的会话 ID
const activeConversation = ref(null); // 当前选中的会话对象
const replyContent = ref(''); // 回复消息内容

const showNewMessageDialog = ref(false); // 控制新建站内信弹窗
const newMessageForm = ref({
  recipient: '',
  content: ''
});


onMounted(() => {
  // TODO: 在组件加载时，调用后端 API 获取站内信会话列表
  fetchConversations();
});

const fetchConversations = async () => {
  console.log('Fetching student conversations...');
  // 模拟 API 调用
  await new Promise(resolve => setTimeout(resolve, 500));

  // 假设 API 返回数据结构如下:
  // const response = await api.get('/student/messages/conversations');
  // conversations.value = response.data;

  // 示例填充数据
  conversations.value = [
    { id: 1, title: '与 张老师 的会话', unreadCount: 2, messages: [
        { sender: 'teacher', content: '请提交你的作业', time: '10:00' },
        { sender: 'student', content: '好的老师', time: '10:05' },
        { sender: 'teacher', content: '请尽快', time: '10:10' },
        { sender: 'teacher', content: '有疑问可以问我', time: '10:15' },
      ]},
    { id: 2, title: '与 李同学 的会话', unreadCount: 0, messages: [
        { sender: 'student', content: '请问这道题怎么做？', time: '昨日 15:00' },
        { sender: 'other_student', content: '你可以看看课件第二章', time: '昨日 16:00' },
        { sender: 'student', content: '好的，谢谢！', time: '昨日 17:00' },
      ]},
  ];
};

const selectConversation = (conversation) => {
  activeConversationId.value = conversation.id;
  activeConversation.value = conversation;
  // TODO: 调用 API 将当前会话标记为已读
  console.log('Selected conversation:', conversation.title);
  conversation.unreadCount = 0; // 乐观更新未读数
};

const sendMessage = async () => {
  if (!replyContent.value.trim()) {
    ElMessage.warning('发送内容不能为空');
    return;
  }
  if (!activeConversationId.value) {
    ElMessage.warning('请选择一个会话');
    return;
  }

  console.log('Sending message:', replyContent.value, 'to conversation:', activeConversationId.value);
  // TODO: 调用后端 API 发送消息
  // 模拟发送成功
  await new Promise(resolve => setTimeout(resolve, 500));

  const newMessage = {
    sender: 'student', // 当前用户是学生
    content: replyContent.value,
    time: new Date().toLocaleTimeString(), // 简单获取当前时间
  };
  activeConversation.value.messages.push(newMessage); // 乐观添加到当前会话消息列表
  replyContent.value = ''; // 清空输入框
  ElMessage.success('消息发送成功');

  // TODO: 刷新会话列表或更新该会话的最后消息时间
};

const sendNewMessage = async () => {
  if (!newMessageForm.value.recipient || !newMessageForm.value.content.trim()) {
    ElMessage.warning('收件人和内容不能为空');
    return;
  }
  console.log('Sending new message to:', newMessageForm.value.recipient, 'content:', newMessageForm.value.content);

  // TODO: 调用后端 API 发送新站内信
  // 模拟发送成功
  await new Promise(resolve => setTimeout(resolve, 500));

  ElMessage.success('新站内信发送成功');
  showNewMessageDialog.value = false; // 关闭弹窗
  newMessageForm.value = { recipient: '', content: '' }; // 清空表单

  // TODO: 刷新会话列表以显示新会话
  fetchConversations();
};

</script>

<style scoped>
.student-messages-container {
  padding: 20px;
}

.conversation-item {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.2s ease;
}

.conversation-item:hover {
  background-color: #f0f0f0;
}

.conversation-item.is-active {
  background-color: #e6f7ff; /* Element Plus primary color light */
  font-weight: bold;
  color: #409EFF;
}

.unread-badge {
  margin-left: 10px;
}

.select-conversation-placeholder {
  text-align: center;
  padding-top: 50px;
  color: #909399;
}

.message-item {
  margin-bottom: 15px;
}

.message-content {
  background-color: #e9e9eb;
  padding: 8px 12px;
  border-radius: 5px;
  display: inline-block; /* 让背景只包裹内容 */
  max-width: 70%; /* 限制消息宽度 */
  word-break: break-word; /* 自动换行 */
}

.message-time {
  font-size: 0.8em;
  color: #909399;
  margin-top: 5px;
  display: block;
}

.message-sent {
  text-align: right; /* 自己发送的消息靠右 */
}
.message-sent .message-content {
  background-color: #409EFF; /* 自己发送的消息使用主题色 */
  color: white;
}

.message-received {
  text-align: left; /* 接收到的消息靠左 */
}

</style>