<!--
  - Copyright (c) YumeYuka 2025.
  -->

<template>
  <section class="footer-section">
    <div class="subscribe-card">
      <div class="capsule-toggle">
        <div :class="{ 'slide-right': mode === 'unsubscribe' }" class="capsule-slider"></div>
        <button
            :class="{ active: mode === 'subscribe' }"
            class="capsule-option"
            type="button"
            @click="switchMode('subscribe')">
          <svg class="option-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <span>订阅通知</span>
        </button>
        <button
            :class="{ active: mode === 'unsubscribe' }"
            class="capsule-option"
            type="button"
            @click="switchMode('unsubscribe')">
          <svg class="option-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            <line x1="1" x2="23" y1="1" y2="23"/>
          </svg>
          <span>取消订阅</span>
        </button>
      </div>

      <h3 class="subscribe-title">
        {{ mode === "subscribe" ? "当有新的内容发布时，及时通知我" : "取消订阅通知" }}
      </h3>

      <form v-if="!codeSent" class="subscribe-form" @submit.prevent="handleSendCode">
        <div class="email-input-wrapper">
          <input
              v-model="email"
              :class="{ 'input-error': emailError }"
              :disabled="loading"
              class="email-input"
              placeholder="电子邮件"
              required
              type="email"
              @blur="validateEmail"/>
          <span v-if="emailError" class="error-hint">{{ emailError }}</span>
        </div>
        <button :disabled="loading || !isEmailValid || !email" class="submit-btn" type="submit">
          {{ loading ? "发送中..." : "获取验证码" }}
        </button>
      </form>

      <form v-else class="subscribe-form-vertical" @submit.prevent="handleConfirm">
        <div class="input-group">
          <input
              v-model="code"
              :disabled="loading"
              class="email-input"
              maxlength="6"
              placeholder="请输入验证码"
              required
              type="text"/>
        </div>

        <div class="confirmation-note">
          <p v-if="mode === 'subscribe'"><strong>订阅内容：</strong>全部通知（版本更新、新闻动态、新功能、安全公告）</p>
          <p v-else><strong>取消订阅：</strong>将停止接收所有通知邮件</p>
        </div>

        <div class="action-buttons">
          <button class="back-btn" type="button" @click="resetForm">返回</button>
          <button :disabled="loading || !code" class="submit-btn" type="submit">
            {{ loading ? "处理中..." : mode === "subscribe" ? "确认订阅" : "确认取消" }}
          </button>
        </div>
      </form>

      <p :class="{ 'status-message': statusMessage, 'error-message': isError }" class="privacy-note">
        {{ statusMessage || "我同意接收个人数据提供方进行处理。" }}
        <a v-if="!statusMessage" class="privacy-link" href="#">此处列出的</a>
      </p>
    </div>
  </section>
</template>

<script lang="ts" setup>
import {ref, computed} from "vue";

type Mode = "subscribe" | "unsubscribe";

const mode = ref<Mode>("subscribe");
const email = ref("");
const code = ref("");
const codeSent = ref(false);
const loading = ref(false);
const statusMessage = ref("");
const isError = ref(false);
const emailError = ref("");

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validateEmail = () => {
  if (!email.value) {
    emailError.value = "";
    return false;
  }

  if (!emailRegex.test(email.value)) {
    emailError.value = "邮箱格式不正确";
    return false;
  }

  if (email.value.length > 254) {
    emailError.value = "邮箱地址过长";
    return false;
  }

  const localPart = email.value.split("@")[0];
  if (localPart.length > 64) {
    emailError.value = "邮箱用户名过长";
    return false;
  }

  emailError.value = "";
  return true;
};

const isEmailValid = computed(() => {
  if (!email.value) return false;
  return emailRegex.test(email.value) && email.value.length <= 254;
});

const switchMode = (newMode: Mode) => {
  if (mode.value !== newMode) {
    mode.value = newMode;
    resetForm();
  }
};

const handleSendCode = async () => {
  if (!validateEmail()) {
    return;
  }

  loading.value = true;
  statusMessage.value = "";
  isError.value = false;

  try {
    console.log("发送POST请求:", {email: email.value});
    const response = await fetch("http://oom-notice.api.770995.xyz/subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email: email.value}),
    });

    console.log("响应状态:", response.status, response.statusText);

    let responseData;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    console.log("响应内容:", responseData);

    if (response.ok) {
      codeSent.value = true;
      const message =
          typeof responseData === "string" ? responseData : responseData.message || "验证码已发送到您的邮箱，请查收";
      statusMessage.value = `✓ ${message}`;
      isError.value = false;
    } else {
      const errorMsg =
          typeof responseData === "string" ? responseData : responseData.message || responseData.error || "请稍后重试";
      statusMessage.value = `✗ 发送失败：${errorMsg}`;
      isError.value = true;
    }
  } catch (error) {
    console.error("发送验证码失败，详细错误:", error);
    if (error.message && error.message.includes("NetworkError")) {
      statusMessage.value = "✗ 服务暂时不可用，API 正在进行安全验证。请联系管理员配置 Cloudflare CORS。";
    } else {
      statusMessage.value = `✗ 网络错误：${error.message || "请检查连接后重试"}`;
    }
    isError.value = true;
  } finally {
    loading.value = false;
  }
};

const handleConfirm = async () => {
  loading.value = true;
  statusMessage.value = "";
  isError.value = false;

  const method = mode.value === "subscribe" ? "POST" : "DELETE";

  try {
    console.log(`发送${method}请求:`, {email: email.value, code: code.value, list: "all"});
    const response = await fetch("http://oom-notice.api.770995.xyz/subscription", {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        code: code.value,
        list: "all",
      }),
    });

    console.log("响应状态:", response.status, response.statusText);

    let responseData;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    console.log("响应内容:", responseData);

    if (response.ok) {
      const serverMsg = typeof responseData === "string" ? responseData : responseData.message;
      const successMsg = serverMsg || (mode.value === "subscribe" ? "订阅成功！您将接收所有通知" : "取消订阅成功");
      statusMessage.value = `✓ ${successMsg}`;
      isError.value = false;

      setTimeout(() => {
        resetForm();
        statusMessage.value = "";
      }, 3000);
    } else {
      const errorMsg =
          typeof responseData === "string"
              ? responseData
              : responseData.message || responseData.error || "验证码错误或已过期";
      const prefix = mode.value === "subscribe" ? "订阅失败" : "取消失败";
      statusMessage.value = `✗ ${prefix}：${errorMsg}`;
      isError.value = true;
    }
  } catch (error) {
    console.error("操作失败，详细错误:", error);
    if (error.message && error.message.includes("NetworkError")) {
      statusMessage.value = "✗ 服务暂时不可用，API 正在进行安全验证。请联系管理员配置 Cloudflare CORS。";
    } else {
      statusMessage.value = `✗ 网络错误：${error.message || "请检查连接后重试"}`;
    }
    isError.value = true;
  } finally {
    loading.value = false;
  }
};

const resetForm = () => {
  email.value = "";
  code.value = "";
  codeSent.value = false;
  loading.value = false;
  statusMessage.value = "";
  isError.value = false;
  emailError.value = "";
};
</script>

<style scoped>
.footer-section {
  width: 100%;
  max-width: 1440px;
  margin: 40px auto 0;
  padding: 0 48px 80px;
}

.subscribe-card {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 40px;
  background: var(--vp-c-bg);
  border: none;
  border-radius: 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.capsule-toggle {
  position: relative;
  display: inline-flex;
  align-items: center;
  background: var(--vp-c-bg-soft);
  border-radius: 50px;
  padding: 4px;
  gap: 4px;
  margin: 0 auto;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.06);
}

.capsule-slider {
  position: absolute;
  top: 4px;
  left: 4px;
  width: calc(50% - 4px);
  height: calc(100% - 8px);
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  border-radius: 50px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 0;
}

.capsule-slider.slide-right {
  transform: translateX(calc(100% + 4px));
  background: linear-gradient(135deg, #e74c3c, #c0392b);
}

.capsule-option {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 24px;
  background: transparent;
  border: none;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  min-width: 120px;
}

.capsule-option.active {
  color: white;
}

.capsule-option:not(.active):hover {
  color: var(--vp-c-text-1);
}

.option-icon {
  width: 18px;
  height: 18px;
  transition: all 0.3s ease;
}

.capsule-option.active .option-icon {
  transform: scale(1.1);
}

.subscribe-title {
  font-size: 24px;
  font-weight: 700;
  line-height: 1.3;
  margin: 0;
  color: var(--vp-c-text-1);
  min-height: 62px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.subscribe-form {
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: flex-start;
}

.subscribe-form-vertical {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: stretch;
}

.input-group {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.email-input-wrapper {
  flex: 1;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.email-input {
  width: 100%;
  padding: 12px 16px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  color: var(--vp-c-text-1);
  font-size: 15px;
  outline: none;
  transition: border-color 0.3s ease;
}

.email-input::placeholder {
  color: var(--vp-c-text-3);
}

.email-input:focus {
  border-color: var(--vp-c-brand-1);
}

.email-input.input-error {
  border-color: #e74c3c;
}

.email-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-hint {
  font-size: 12px;
  color: #e74c3c;
  margin-top: -2px;
}

.confirmation-note {
  min-height: 60px;
  padding: 16px 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.confirmation-note p {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.confirmation-note strong {
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.action-buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.submit-btn {
  padding: 12px 32px;
  background: var(--vp-c-text-1);
  color: var(--vp-c-bg);
  border: none;
  border-radius: 50px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.submit-btn:hover:not(:disabled) {
  opacity: 0.85;
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.back-btn {
  padding: 12px 24px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
  border-radius: 50px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.back-btn:hover {
  background: var(--vp-c-bg-mute);
}

.privacy-note {
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.6;
  transition: color 0.3s ease;
}

.status-message {
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

.error-message {
  color: #e74c3c;
}

.privacy-link {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
}

@media (max-width: 768px) {
  .footer-section {
    padding: 0 24px 60px;
    margin-top: 40px;
  }

  .subscribe-card {
    padding: 32px 24px;
  }

  .capsule-toggle {
    width: 100%;
    max-width: 340px;
  }

  .capsule-option {
    padding: 8px 16px;
    font-size: 13px;
    min-width: 100px;
    gap: 6px;
  }

  .option-icon {
    width: 16px;
    height: 16px;
  }

  .subscribe-title {
    font-size: 20px;
    min-height: 52px;
  }

  .subscribe-form,
  .input-group {
    flex-direction: column;
  }

  .email-input-wrapper {
    max-width: 100%;
  }

  .email-input {
    max-width: 100%;
  }

  .submit-btn {
    padding: 10px 24px;
    font-size: 14px;
    width: 100%;
  }

  .back-btn {
    padding: 10px 24px;
    font-size: 14px;
    width: 100%;
  }

  .action-buttons {
    flex-direction: column-reverse;
  }

  .confirmation-note {
    min-height: 80px;
  }

  .confirmation-note p {
    font-size: 13px;
  }
}
</style>
