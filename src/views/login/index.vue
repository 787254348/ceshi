<template>
  <div
    :class="[
      'login-wrapper',
      ['', 'login-form-right', 'login-form-left'][1]
    ]"
  >
    <a-form
	  v-if="!moreCompany"
      ref="formRef"
      :model="form"
      :rules="rules"
      class="login-form ele-bg-white"
    >
      <!-- <h4>{{ t('login.title') }}</h4> -->
			<h5>欢迎使用纺织轻OA</h5>
			<h4>纺织赋能，轻松协同</h4>
      <!-- <a-form-item name="username">
        <a-input
          allow-clear
          size="large"
          v-model:value="form.username"
          :placeholder="t('login.username')"
        >
          <template #prefix>
            <user-outlined />
          </template>
        </a-input>
      </a-form-item> -->
			<a-form-item name="phone">
			  <a-input
			    placeholder="请输入您的手机号"
			    v-model:value="form.phone"
			    allow-clear
			    size="large"
			  >
			    <template #prefix>
			      +86
			    </template>
			  </a-input>
			</a-form-item>
			<a-form-item name="code">
			  <div class="login-input-group">
			    <a-input
			      placeholder="请输入验证码"
			      v-model:value="form.code"
			      allow-clear
			      size="large"
			    >
			    </a-input>
			    <!-- <a-button
			      class="login-captcha"
			      :disabled="!!countdownTime"
			      @click="openImgCodeModal"
			    >
			      <span v-if="!countdownTime">发送验证码</span>
			      <span v-else>已发送 {{ countdownTime }} s</span>
			    </a-button> -->
				<a-button
				  block
				  class="login-captcha"
				  size="large"
				  type="primary"
				  :disabled="!!countdownTime"
				  :loading="codeLoading"
				  @click="sendCode"
				>
				  <span v-if="!countdownTime">获取验证码</span>
				  <span v-else>已发送 {{ countdownTime }} s</span>
				</a-button>
			  </div>
			</a-form-item>
<!--      <a-form-item name="password">
        <a-input-password
          size="large"
          v-model:value="form.password"
          :placeholder="t('login.password')"
        >
          <template #prefix>
            <lock-outlined />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item name="code">
        <div class="login-input-group">
          <a-input
            allow-clear
            size="large"
            v-model:value="form.code"
            :placeholder="t('login.code')"
          >
            <template #prefix>
              <safety-certificate-outlined />
            </template>
          </a-input>
          <a-button class="login-captcha" @click="changeCaptcha">
            <img v-if="captcha" :src="captcha" alt="" />
          </a-button>
        </div>
      </a-form-item>
      <a-form-item>
        <a-checkbox v-model:checked="form.remember">
          {{ t('login.remember') }}
        </a-checkbox>
        <router-link
          to="/forget"
          class="ele-pull-right"
          style="line-height: 22px"
        >
          {{ t('login.forget') }}
        </router-link>
      </a-form-item> -->
      <a-form-item>
        <a-button
		  style="margin-top: 90px;"
          block
          size="large"
          type="primary"
          :loading="loading"
          @click="submit"
        >
          {{ loading ? t('login.loading') : t('login.login') }}
        </a-button>
      </a-form-item>
<!--      <div class="ele-text-center" style="padding-bottom: 32px">
        <qq-outlined class="login-oauth-icon" style="background: #3492ed" />
        <wechat-outlined class="login-oauth-icon" style="background: #4daf29" />
        <weibo-outlined class="login-oauth-icon" style="background: #cf1900" />
      </div> -->
	  <div class="copyright">广州鸿翼智能科技有限公司版权所有粤ICP备xxxxxxxx号</div>
    </a-form>
	<!-- 多企业选择登陆页面 -->
	<div class="login-form ele-bg-white" v-if="moreCompany">
		<div class="margin-top-20 pointer" @click="moreCompany=!moreCompany">
			<left-outlined />
			<span class="margin-left-10">返回</span>
		</div>
		<div class="title">你可以进入以下企业</div>
		<div class="padding-bottom-30"><b>+86134*********92</b><span class="gray">已在以下企业或组织绑定了账号，你可进入以下任一企业或组织</span></div>
		
		<div class="ele-cell company-info pointer">
			<div class="ele-cell abbreviation">广</div>
			<div class="ele-cell-content">
				<div class="ele-cell-title"><b>广东九三二科技有限公司</b></div>
				<div class="ele-cell-desc">易军</div>
			</div>
			<right-outlined />
		</div>
		<div class="ele-cell company-info pointer">
			<div class="ele-cell abbreviation">广</div>
			<div class="ele-cell-content">
				<div class="ele-cell-title"><b>广东九三二科技有限公司</b></div>
				<div class="ele-cell-desc">易军</div>
			</div>
			<right-outlined />
		</div>
	</div>
    <div class="login-copyright">
      copyright © 2022 eleadmin.com all rights reserved.
    </div>
    <!-- 多语言切换 -->
    <div style="position: absolute; right: 30px; top: 20px; z-index: 999">
      <i18n-icon
        placement="bottomLeft"
        :style="{ fontSize: '18px', color: '#fff' }"
      />
    </div>
    <!-- 实际项目去掉这段 -->
<!--    <div style="position: absolute; left: 30px; top: 20px; z-index: 999">
      <a-radio-group v-model:value="direction" size="small">
        <a-radio-button :value="2">居左</a-radio-button>
        <a-radio-button :value="0">居中</a-radio-button>
        <a-radio-button :value="1">居右</a-radio-button>
      </a-radio-group>
    </div> -->
  </div>
</template>

<script setup>
  import { ref, reactive, computed, unref,onBeforeUnmount  } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';
  import { message } from 'ant-design-vue/es';
  import {
	RightOutlined,
	LeftOutlined,
    UserOutlined,
    LockOutlined,
    SafetyCertificateOutlined,
    QqOutlined,
    WechatOutlined,
    WeiboOutlined
  } from '@ant-design/icons-vue';
  import I18nIcon from '@/layout/components/i18n-icon.vue';
  import { getToken } from '@/utils/token-util';
  import { goHomeRoute, cleanPageTabs } from '@/utils/page-tab-util';
  import { login, getCaptcha } from '@/api/login';

  const { currentRoute } = useRouter();
  const { t } = useI18n();
  //更多企业
  const moreCompany = ref(false);

  //
  const formRef = ref(null);

  // 加载状态
  const loading = ref(false);

  // 表单数据
  const form = reactive({
    username: 'admin',
    password: 'admin',
	//phone:'',
    code: '',
    remember: true
  });

  // 验证码 base64 数据
  const captcha = ref('');

  // 验证码内容, 实际项目去掉
  const text = ref('');

  // 表单验证规则
  const rules = computed(() => {
    return {
	phone: [
	  {
		required: true,
		message: '请输入有效的电话号码',
		type: 'string',
		trigger: 'blur'
	  }
	],
      // username: [
      //   {
      //     required: true,
      //     message: t('login.username'),
      //     type: 'string',
      //     trigger: 'blur'
      //   }
      // ],
      // password: [
      //   {
      //     required: true,
      //     message: t('login.password'),
      //     type: 'string',
      //     trigger: 'blur'
      //   }
      // ],
      code: [
        {
          required: true,
          message: '请输入正确的六位验证码',
          type: 'string',
          trigger: 'blur'
        }
      ]
    };
  });

  /* 跳转到首页 */
  const goHome = () => {
    const { query } = unref(currentRoute);
    goHomeRoute(query.from);
  };

  /* 提交 */
  const submit = () => {
	  //moreCompany.value = true;
    if (!formRef.value) {
      return;
    }
    formRef.value.validate().then(() => {
		//moreCompany.value = true;

      // if (form.code.toLowerCase() !== text.value) {
      //   message.error('验证码错误');
      //   return;
      // }
      loading.value = true;
      login(form)
        .then((msg) => {
          message.success(msg);
          cleanPageTabs();
          goHome();
        })
        .catch((e) => {
          message.error(e.message);
          loading.value = false;
        });
    });
  };

  /* 获取图形验证码 */
  const changeCaptcha = () => {
    // 这里演示的验证码是后端返回base64格式的形式, 如果后端地址直接是图片请参考忘记密码页面
    getCaptcha()
      .then((data) => {
        captcha.value = data.base64;
        // 实际项目后端一般会返回验证码的key而不是直接返回验证码的内容, 登录用key去验证, 你可以根据自己后端接口修改
        text.value = data.text;
        // 自动回填验证码, 实际项目去掉这个
        form.code = data.text;
        formRef.value?.clearValidate();
      })
      .catch((e) => {
        message.error(e.message);
      });
  };

  if (getToken()) {
    goHome();
  } else {
    changeCaptcha();
  }
  
  // 发送验证码按钮loading
  const codeLoading = ref(false);
  // 验证码倒计时时间
  const countdownTime = ref(0);
  // 验证码倒计时定时器
  let countdownTimer = null;
  /* 发送短信验证码 */
  const sendCode = () => {
    // if (!imgCode.value) {
    //   message.error('请输入图形验证码');
    //   return;
    // }
    codeLoading.value = true;
    setTimeout(() => {
      message.success('短信验证码发送成功, 请注意查收!');
      codeLoading.value = false;
      countdownTime.value = 5;
      // 开始对按钮进行倒计时
      countdownTimer = window.setInterval(() => {
        if (countdownTime.value <= 1) {
          countdownTimer && clearInterval(countdownTimer);
          countdownTimer = null;
        }
        countdownTime.value--;
      }, 1000);
    }, 1000);
  };
  onBeforeUnmount(() => {
    countdownTimer && clearInterval(countdownTimer);
  });
</script>

<style lang="less" scoped>
  .margin-top-20{
	  margin-top: 20px;
  }
  .margin-left-10{
	  margin-left: 10px;
  }
  .gray{
	  color: #969799;
  }
  .padding-bottom-30{
	  padding-bottom: 30px;
  }
  .pointer{
	  cursor: pointer;
  }
  .company-info{
	  border: 1px solid #DCDFE6;
	  border-radius: 8px;
	  margin-bottom: 25px;
	  padding: 20px;
	  opacity: 0.6;
	  .abbreviation{
		  width: 52px;
		  height: 52px;
		  background: #409EFF 0% 0% no-repeat padding-box;
		  border-radius: 4px;
		  color:#fff;
		  font-size: 24px;
		  justify-content: center;
	  }
  }
  .company-info:hover{
	  opacity: 1;
  }
  .title{
	  font-size: 20px;
	  font-weight: 600;
	  padding: 20px 0;
  }
  /* 背景 */
  .login-wrapper {
    padding: 48px 16px 0 16px;
    position: relative;
    box-sizing: border-box;
    background-image: url('@/assets/bg-login.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 100vh;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.2);
    }
  }

  /* 卡片 */
  .login-form {
    // width: 360px;
    margin: 0 auto;
    max-width: 100%;
    padding: 0 28px;
    box-sizing: border-box;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
    border-radius: 2px;
    position: relative;
    z-index: 2;

	width: 534px;
	height: 732px;
	h5{
		font-size: 28px;
		font-weight: 600;
		margin-top: 70px;
	}
    h4 {
      padding: 20px 0 40px;
	  font-size: 20px;
	  color: #646566;
    }
  }

  .login-form-right .login-form {
    // margin: 0 15% 0 auto;
  }

  .login-form-left .login-form {
    // margin: 0 auto 0 15%;
  }

  /* 验证码 */
  .login-input-group {
    display: flex;
    align-items: center;

    :deep(.ant-input-affix-wrapper) {
      flex: 1;
    }

    .login-captcha {
      width: 120px;
      height: 40px;
      margin-left: 10px;
      padding: 0;

      & > img {
        width: 100%;
        height: 100%;
      }
    }
  }
  
  .copyright{
	  color: #969799;
	  margin-top: 210px;
  }

  /* 第三方登录图标 */
  .login-oauth-icon {
    color: #fff;
    padding: 5px;
    margin: 0 12px;
    font-size: 18px;
    border-radius: 50%;
    cursor: pointer;
  }

  /* 底部版权 */
  .login-copyright {
    color: #eee;
    text-align: center;
    padding: 48px 0 22px 0;
    position: relative;
    z-index: 1;
  }

  /* 响应式 */
  @media screen and (min-height: 640px) {
    .login-wrapper {
      padding-top: 0;
    }

    .login-form {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%);
	  transform: translateY(-50%);
      // margin-top: -230px;
    }

    .login-form-right .login-form,
    .login-form-left .login-form {
      left: auto;
      right: 15%;
      // transform: translateX(0);
      // margin: -230px auto auto auto;
    }

    .login-form-left .login-form {
      right: auto;
      left: 15%;
    }

    .login-copyright {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }

  @media screen and (max-width: 768px) {
    .login-form-right .login-form,
    .login-form-left .login-form {
      left: 50%;
      right: auto;
      margin-left: 0;
      margin-right: auto;
      transform: translateX(-50%);
    }
  }
</style>
