<template>
  <el-container class="common-layout">
    <el-header class="common-header">
      <div class="header-content">
        <div class="logo-area">
          <span class="app-title">E-learning 平台 (教师端)</span>
        </div>
        <div class="user-actions">
          <el-dropdown @command="handleUserCommand">
            <span class="el-dropdown-link">
              欢迎您，张老师
              <el-avatar size="small" style="margin-left: 8px; vertical-align: middle;">张</el-avatar>
              <el-icon class="el-icon--right"><IEpArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">个人中心</el-dropdown-item>
                <el-dropdown-item command="settings">系统设置</el-dropdown-item>
                <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </el-header>
    <el-container class="main-container">
      <el-aside :width="isAsideCollapsed ? '64px' : '220px'" class="common-aside">
        <div class="aside-toggle-button" @click="toggleAside">
          <el-icon>
            <IEpExpand v-if="isAsideCollapsed" />
            <IEpFold v-else />
          </el-icon>
        </div>
        <el-scrollbar>
          <el-menu
              :default-active="$route.path"
              router
              class="el-menu-vertical-custom"
              :collapse="isAsideCollapsed"
              :collapse-transition="true"
          >
            <el-menu-item index="/teacher/dashboard">
              <el-icon><IEpHomeFilled /></el-icon>
              <template #title><span>仪表盘</span></template>
            </el-menu-item>
            <el-menu-item index="/teacher/courses">
              <el-icon><IEpTickets /></el-icon>
              <template #title><span>我的课程</span></template>
            </el-menu-item>
            <el-menu-item index="/teacher/students">
              <el-icon><IEpUserFilled /></el-icon>
              <template #title><span>我的学生</span></template>
            </el-menu-item>
            <el-menu-item index="/teacher/assignments">
              <el-icon><IEpReading /></el-icon>
              <template #title><span>测试/作业</span></template>
            </el-menu-item>
            <el-menu-item index="/teacher/messages">
              <el-icon><IEpMessage /></el-icon>
              <template #title><span>站内信</span></template>
            </el-menu-item>
            <el-menu-item index="/teacher/announcements">
              <el-icon><IEpBell /></el-icon>
              <template #title><span>公告通知</span></template>
            </el-menu-item>
            <el-menu-item index="/teacher/profile">
              <el-icon><IEpSetting /></el-icon>
              <template #title><span>个人设置</span></template>
            </el-menu-item>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-main class="common-main">
        <router-view v-slot="{ Component }">
          <transition name="fade-transform" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref } from 'vue';
import {
  HomeFilled as IEpHomeFilled,
  Tickets as IEpTickets,
  UserFilled as IEpUserFilled,
  Reading as IEpReading,
  Message as IEpMessage,
  Bell as IEpBell,
  Setting as IEpSetting,
  ArrowDown as IEpArrowDown,
  Expand as IEpExpand,
  Fold as IEpFold,
} from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';

const router = useRouter();
const isAsideCollapsed = ref(false); // 控制侧边栏折叠

const toggleAside = () => {
  isAsideCollapsed.value = !isAsideCollapsed.value;
};

const logout = () => {
  ElMessageBox.confirm('您确定要退出登录吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    console.log('执行登出操作');
    // 模拟 API 调用
    await new Promise(resolve => setTimeout(resolve, 500));

    // TODO: 调用后端 API 清除登录状态 (session/token)
    // 例如: await authApi.logout();

    // TODO: 清除前端存储的认证信息 (localStorage/sessionStorage/Pinia state)
    localStorage.removeItem('userToken'); // 示例

    ElMessage.success('已成功退出登录');
    router.push('/login');
  }).catch(() => {
    // 用户取消操作
    console.log('取消退出');
  });
};

const handleUserCommand = (command) => {
  if (command === 'logout') {
    logout();
  } else if (command === 'profile') {
    router.push('/teacher/profile'); // 假设有个人中心路由
  } else if (command === 'settings') {
    // router.push('/teacher/settings'); // 假设有系统设置路由
    ElMessage.info('系统设置功能待开发');
  }
};

// TODO: 可以在这里获取当前用户信息并显示在 header 中 (例如从 Pinia store 或 API)
// const userName = ref('张老师'); // 可以从 store 中获取
</script>

<style scoped>
/* 全局字体和基础变量 (可选，但推荐) */
:root {
  --custom-primary-color: #4a90e2; /* 更现代的蓝色 */
  --custom-primary-color-light: #72aee6;
  --custom-header-bg: linear-gradient(135deg, #4a90e2 0%, #2e67a7 100%); /* 渐变头部 */
  --custom-aside-bg: #ffffff;
  --custom-main-bg: #f5f7fa; /* 更柔和的背景 */
  --custom-text-primary: #303133;
  --custom-text-regular: #606266;
  --custom-border-color: #e4e7ed;
  --custom-menu-hover-bg: #eaf2fb;
  --custom-menu-active-bg: #ddeafd;
  --custom-menu-active-text: var(--custom-primary-color);
}

.common-layout {
  height: 100vh;
  overflow: hidden; /* 防止出现双滚动条 */
}

.common-header {
  background: var(--custom-header-bg); /* 使用渐变 */
  color: white; /* 这个样式设置了 header 内所有元素的默认文本颜色为白色 */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 25px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  height: 60px;
  transition: background-color 0.3s ease;
}

.header-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-area {
  display: flex;
  align-items: center;
}

/* Fix: 确保 app-title 标题颜色可见 */
.app-title {
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: #303133; /* 将标题颜色改为深色，覆盖 common-header 的白色 */
  /* 或者使用 var(--custom-text-primary); 如果这个变量适合这里 */
}

.user-actions {
  display: flex;
  align-items: center;
}

.el-dropdown-link {
  cursor: pointer;
  color: white; /* 用户名、头像和箭头颜色保持白色 */
  display: flex;
  align-items: center;
  font-size: 0.95rem;
}
.el-dropdown-link:hover {
  color: rgba(255, 255, 255, 0.85);
}
.el-icon--right {
  margin-left: 5px;
}


.main-container {
  height: calc(100vh - 60px); /* 减去头部高度 */
}

.common-aside {
  background-color: var(--custom-aside-bg);
  box-shadow: 2px 0 8px rgba(0,0,0,0.05);
  transition: width 0.3s ease-in-out;
  position: relative;
  display: flex;
  flex-direction: column;
}

.aside-toggle-button {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--custom-text-regular);
  border-bottom: 1px solid var(--custom-border-color);
}
.aside-toggle-button:hover {
  background-color: var(--custom-menu-hover-bg);
}
.aside-toggle-button .el-icon {
  font-size: 20px;
}

.el-scrollbar {
  flex-grow: 1;
  height: 0;
}

.el-menu-vertical-custom {
  border-right: none;
  height: 100%;
}
/* 折叠时，让图标居中 */
.el-menu--collapse > .el-menu-item [class^=el-icon],
.el-menu--collapse > .el-sub-menu > .el-sub-menu__title [class^=el-icon] {
  margin: 0;
  vertical-align: middle;
  width: 24px;
  text-align: center;
}
.el-menu--collapse .el-menu-item .el-tooltip__trigger {
  justify-content: center;
}


.el-menu-item {
  color: var(--custom-text-primary);
  transition: background-color 0.2s ease, color 0.2s ease;
}
.el-menu-item:hover {
  background-color: var(--custom-menu-hover-bg) !important;
  color: var(--custom-primary-color) !important;
}
.el-menu-item.is-active {
  background-color: var(--custom-menu-active-bg) !important;
  color: var(--custom-menu-active-text) !important;
  border-right: 3px solid var(--custom-primary-color);
  box-sizing: border-box;
}
.el-menu-item.is-active .el-icon,
.el-menu-item.is-active span {
  color: var(--custom-menu-active-text) !important;
}
.el-menu-item span {
  margin-left: 8px;
}

.common-main {
  background-color: var(--custom-main-bg);
  padding: 25px;
  overflow-y: auto;
}

/* 路由切换动画 */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.3s ease-out;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(20px);
}


/* 响应式调整 */
@media (max-width: 768px) {
  .common-aside {
    position: absolute;
    z-index: 1001;
    height: calc(100vh - 60px);
    top: 60px;
  }
  /* 如果侧边栏是展开状态，可以给 main 添加一个遮罩层 */
  /* 需要 JS 动态添加 is-aside-open-on-mobile 类到 common-main */
  .common-main.is-aside-open-on-mobile::before {
    content: '';
    position: fixed;
    top: 60px;
    left: 220px; /* 侧边栏展开时的宽度 */
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.3);
    z-index: 999;
  }

  .app-title {
    font-size: 1.2rem; /* 响应式字体大小 */
    color: #303133; /* 确保小屏幕下颜色也正确 */
  }
  .user-actions .el-dropdown-link span:first-child {
    display: none; /* 小屏幕下隐藏 "欢迎您，张老师" 文字 */
  }
}

</style>