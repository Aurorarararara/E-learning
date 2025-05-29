<template>
  <div class="login-container-wrapper">
    <div class="login-container">
      <div class="left-column">
        <h1>E-learning</h1>
        <p class="subtitle">欢迎使用 E-learning 系统</p>

        <div class="role-selection">
          <p>请选择您的身份:</p>
          <div class="role-options">
            <div
                class="role-option-card"
                :class="{ selected: selectedUserType === 'teacher' }"
                @click="selectedUserType = 'teacher'"
            >
              <input type="radio" id="teacher" value="teacher" v-model="selectedUserType" class="visually-hidden">
              <label for="teacher">
                <span class="role-icon">👨‍🏫</span> <span class="role-text">教师端</span>
              </label>
            </div>

            <div
                class="role-option-card"
                :class="{ selected: selectedUserType === 'student' }"
                @click="selectedUserType = 'student'"
            >
              <input type="radio" id="student" value="student" v-model="selectedUserType" class="visually-hidden">
              <label for="student">
                <span class="role-icon">📚</span> <span class="role-text">学生端</span>
              </label>
            </div>

            <div
                class="role-option-card"
                :class="{ selected: selectedUserType === 'admin' }"
                @click="selectedUserType = 'admin'"
            >
              <input type="radio" id="admin" value="admin" v-model="selectedUserType" class="visually-hidden">
              <label for="admin">
                <span class="role-icon">👑</span> <span class="role-text">管理员端</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="right-column">
        <form @submit.prevent="handleLogin"> <h2>用户登录</h2> <div class="form-group">
          <label for="username">用户名/账号:</label>
          <input type="text" id="username" v-model="username" required autocomplete="username">
        </div>

          <div class="form-group">
            <label for="password">密码:</label>
            <input type="password" id="password" v-model="password" required autocomplete="current-password">
          </div>

          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>

          <button type="submit">登录</button>
        </form>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'; // 从 vue 导入 ref 函数
// 如果需要使用路由导航，可以导入 useRouter
// import { useRouter } from 'vue-router';

// 使用 ref 创建响应式变量
const selectedUserType = ref('teacher'); // 默认选中教师端
const username = ref('');
const password = ref('');
const errorMessage = ref(''); // 用于存储和显示错误信息

// 如果使用 useRouter
// const router = useRouter();

// 处理登录逻辑的函数
const handleLogin = async () => {
  // 清空之前的错误信息
  errorMessage.value = '';

  // 简单的客户端非空验证
  if (!username.value || !password.value) {
    errorMessage.value = '请输入用户名和密码。';
    return; // 停止执行后续逻辑
  }

  // 准备要发送到后端的数据
  const loginData = {
    user_type: selectedUserType.value, // 用户选择的身份
    username: username.value,
    password: password.value,
  };

  console.log('尝试登录:', loginData); // 用于调试，可以看到发送的数据

  // TODO: 在这里执行后端 API 调用
  // 示例使用 Fetch API
  try {
    // 替换 '/api/login' 为你的实际后端登录接口地址
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData), // 将数据转换为 JSON 字符串发送
    });

    // 检查响应状态码，即使是错误状态（如 401）也尝试解析 JSON
    const result = await response.json();

    if (response.ok) { // HTTP 状态码在 200-299 范围内表示成功
      // 登录成功
      console.log('登录成功:', result);

      // TODO: 根据后端返回的数据进行重定向或状态管理
      // 后端通常会在成功时返回一个重定向URL或用户/token信息
      // 示例：假设后端返回 { success: true, message: "登录成功", redirectUrl: "/teacher/dashboard" }
      if (result.success && result.redirectUrl) {
        // 使用原生重定向
        window.location.href = result.redirectUrl;
        // 如果使用 Vue Router，可以使用 router.push(result.redirectUrl);
      } else {
        // 成功但后端返回数据格式不正确或缺少重定向信息
        console.warn('登录成功，但后端返回数据异常:', result);
        errorMessage.value = result.message || '登录成功，但未能获取到后续页面信息。';
        // 可以考虑重定向到某个默认页面
        // window.location.href = '/default-dashboard';
      }

    } else { // HTTP 状态码表示失败 (如 400, 401, 500 等)
      // 登录失败
      console.error('登录失败:', result);
      // 显示后端返回的错误信息
      errorMessage.value = result.message || `登录失败 (${response.status})。请检查用户名、密码或身份。`;
    }

  } catch (error) {
    // 捕获网络请求错误或其他异常
    console.error('登录请求出错:', error);
    errorMessage.value = '网络请求失败，请稍后再试。';
  }
};
</script>

<style scoped>
/* 页面入场动画 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


/* 外层容器用于实现整体居中 */
.login-container-wrapper {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  min-height: 100vh; /* 保证容器至少占满整个视口高度 */
  background-color: #f4f7f6; /* 稍微柔和的背景色 */
  padding: 20px; /* 添加一些内边距防止内容紧贴边缘 */
  box-sizing: border-box;
}

/* 登录框容器 - 现在它是 Flex 容器 */
.login-container {
  background-color: #fff;
  border-radius: 12px; /* 增加圆角 */
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1); /* 增加阴影强度 */
  width: 100%;
  max-width: 800px; /* 增加最大宽度以适应更宽的设计 */
  display: flex; /* 启用 Flexbox 布局 */
  overflow: hidden; /* 防止子元素溢出圆角 */
  animation: fadeInUp 0.6s ease-out; /* 应用入场动画 */
}

/* 左侧区域样式 */
.left-column {
  flex: 1; /* 占据可用空间的比例 */
  background: linear-gradient(135deg, #4a90e2, #50e3c2); /* 更新为更现代的渐变色 */
  color: white;
  padding: 50px 40px; /* 增加内边距 */
  display: flex; /* 内部使用 Flexbox */
  flex-direction: column; /* 子元素垂直排列 */
  justify-content: center; /* 垂直居中内容 */
  align-items: flex-start; /* 左侧内容靠左 */
  text-align: left;
  position: relative; /* 用于伪元素或绝对定位元素 */
  overflow: hidden; /* 隐藏溢出的伪元素 */
}

/* 左侧装饰性伪元素 */
.left-column::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="%23ffffff" fill-opacity=".1"><circle cx="25" cy="25" r="25"/><circle cx="75" cy="75" r="25"/></svg>'); /* 添加一个简单的背景纹理 */
  background-repeat: repeat;
  opacity: 0.3;
  pointer-events: none; /* 让伪元素不影响鼠标事件 */
  z-index: 0;
}

.left-column > * {
  position: relative; /* 确保内容在伪元素之上 */
  z-index: 1;
}


.left-column h1 {
  color: white;
  margin-bottom: 10px; /* 减小标题下方间距 */
  font-size: 2.8rem; /* 进一步增大标题字号 */
  font-weight: bold;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2); /* 添加文本阴影 */
}

.left-column .subtitle {
  color: rgba(255, 255, 255, 0.9); /* 副标题颜色 */
  font-size: 1.2rem;
  margin-bottom: 40px; /* 增加副标题下方间距 */
}

.left-column .role-selection {
  background-color: rgba(255, 255, 255, 0.15); /* 半透明白色背景更低 */
  padding: 25px; /* 增加内边距 */
  border-radius: 10px; /* 增加圆角 */
  width: 100%;
  max-width: 300px; /* 限制身份选择区域的最大宽度 */
  box-sizing: border-box;
  backdrop-filter: blur(5px); /* 添加背景模糊效果 */
}

.left-column .role-selection p {
  color: white;
  margin-top: 0;
  margin-bottom: 20px; /* 增加下方间距 */
  font-weight: bold;
  font-size: 1rem;
}

.left-column .role-options {
  display: flex;
  flex-direction: column; /* 选项垂直排列 */
  gap: 15px; /* 选项之间的间距 */
}

/* 身份选项卡片样式 */
.role-option-card {
  background-color: rgba(255, 255, 255, 0.1); /* 未选中时的背景 */
  border: 1px solid rgba(255, 255, 255, 0.3); /* 边框 */
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease, transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center; /* 内容居中 */
}

.role-option-card label {
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  display: flex; /* 使 label 内部的 icon 和 text 水平排列 */
  align-items: center;
}

.role-option-card .role-icon {
  font-size: 1.5rem;
  margin-right: 10px;
}
.role-option-card .role-text {
  /* font-weight: bold; */
}


.role-option-card:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-3px); /* 鼠标悬停时上移 */
}

/* 选中状态样式 */
.role-option-card.selected {
  background-color: rgba(255, 255, 255, 0.95); /* 选中时变为接近白色 */
  border-color: #007bff; /* 选中时边框变色 */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* 选中时添加阴影 */
}
.role-option-card.selected label {
  color: #007bff; /* 选中时文字变色 */
}

/* 隐藏原生 radio button */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}


/* 右侧区域样式 */
.right-column {
  flex: 1.8; /* 右侧占据更多空间 */
  padding: 50px 40px; /* 增加内边距 */
  display: flex;
  flex-direction: column;
  justify-content: center; /* 垂直居中内容 */
}

.right-column h2 {
  margin-top: 0;
  margin-bottom: 35px;
  color: #333;
  font-size: 1.8rem;
  text-align: center;
  font-weight: 600; /* 加粗一点 */
}

/* 表单内部元素样式 */
.form-group {
  margin-bottom: 25px; /* 增加下方间距 */
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 10px; /* 增加标签下方间距 */
  font-weight: bold;
  font-size: 0.95rem;
  color: #555;
}

.form-group input[type="text"],
.form-group input[type="password"] {
  width: 100%;
  padding: 14px; /* 增加内边距 */
  border: 1px solid #ced4da;
  border-radius: 5px; /* 微调圆角 */
  font-size: 1rem;
  box-sizing: border-box;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.form-group input[type="text"]:focus,
.form-group input[type="password"]:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.error-message {
  color: #dc3545;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  padding: 12px; /* 增加内边距 */
  margin-bottom: 25px; /* 增加下方间距 */
  border-radius: 5px;
  font-size: 0.9rem;
  text-align: left;
}

button {
  width: 100%;
  padding: 14px; /* 增加内边距 */
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px; /* 微调圆角 */
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.1s ease, box-shadow 0.3s ease;
  margin-top: 20px; /* 增加上方间距 */
  box-shadow: 0 2px 5px rgba(0, 123, 255, 0.3); /* 添加按钮阴影 */
}

button:hover {
  background-color: #0056b3;
  box-shadow: 0 4px 10px rgba(0, 123, 255, 0.4);
}

button:active {
  transform: translateY(1px);
  box-shadow: 0 1px 3px rgba(0, 123, 255, 0.3);
}

/* 可选：忘记密码链接样式 */
.forgot-password-link {
  margin-top: 20px;
  font-size: 0.95rem;
  text-align: center; /* 居中链接 */
}

.forgot-password-link a {
  color: #007bff;
  text-decoration: none;
  transition: text-decoration 0.2s ease;
}

.forgot-password-link a:hover {
  text-decoration: underline;
}


/* 响应式调整：小屏幕下堆叠显示 */
@media (max-width: 768px) { /* 在屏幕宽度小于等于 768px 时应用 */
  .login-container {
    flex-direction: column; /* 将 Flex 方向改为垂直 */
    max-width: 400px; /* 调整最大宽度 */
  }

  .left-column,
  .right-column {
    flex: none; /* 取消 flex 伸缩 */
    width: 100%; /* 宽度占满 */
    padding: 30px; /* 调整内边距 */
    text-align: center; /* 内容居中 */
    align-items: center; /* 内容居中 */
  }

  .left-column {
    padding-bottom: 20px; /* 左侧底部留点空间 */
    border-bottom-left-radius: 0; /* 移除底部左侧圆角 */
    border-bottom-right-radius: 0; /* 移除底部右侧圆角 */
    border-top-left-radius: 12px; /* 保持顶部圆角 */
    border-top-right-radius: 12px; /* 保持顶部圆角 */
    /* 移除伪元素或调整其样式，使其在堆叠时不突兀 */
    /* .left-column::before { display: none; } */
  }

  .right-column {
    padding-top: 20px; /* 右侧顶部留点空间 */
    border-top-left-radius: 0; /* 移除顶部左侧圆角 */
    border-top-right-radius: 0; /* 移除顶部右侧圆角 */
    border-bottom-left-radius: 12px; /* 保持底部圆角 */
    border-bottom-right-radius: 12px; /* 保持底部圆角 */
  }

  .left-column h1 {
    margin-bottom: 10px; /* 调整间距 */
    font-size: 2.2rem;
  }
  .left-column .subtitle {
    margin-bottom: 20px;
    font-size: 1rem;
  }


  .left-column .role-selection {
    max-width: none; /* 取消最大宽度限制 */
    padding: 20px;
    backdrop-filter: none; /* 小屏幕下取消模糊 */
    background-color: rgba(255, 255, 255, 0.2); /* 使用统一的半透明背景 */
  }

  .left-column .role-selection p {
    margin-bottom: 15px;
  }


  .left-column .role-options {
    flex-direction: row; /* 选项改为水平排列 */
    flex-wrap: wrap; /* 允许换行 */
    justify-content: center; /* 水平居中 */
    gap: 10px; /* 选项之间的间距 */
  }

  .role-option-card {
    flex: 1 1 auto; /* 允许伸缩和基础大小自动 */
    min-width: 100px; /* 设置最小宽度 */
    padding: 12px; /* 调整内边距 */
  }
  .role-option-card label {
    flex-direction: column; /* 图标和文字改为垂直排列 */
  }
  .role-option-card .role-icon {
    margin-right: 0;
    margin-bottom: 5px; /* 图标下方加间距 */
  }

  .right-column h2 {
    margin-bottom: 25px;
    font-size: 1.6rem;
  }

  .form-group {
    margin-bottom: 20px;
  }
  .error-message {
    margin-bottom: 20px;
  }
  button {
    margin-top: 15px;
  }
  .forgot-password-link {
    margin-top: 15px;
  }

}
</style>