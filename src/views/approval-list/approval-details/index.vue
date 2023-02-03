<template>
	<a-drawer :width="1300" placement="right" :closable="false" :visible="visible" class="approval-details">
		<template #title>
			<div class="ele-cell">
				<img class="user-img" src="/src/assets/user.png" />
				<div class="ele-cell-content">
					<div class="ele-cell-title ele-cell">
						<span>采购订单-单价审批</span>
						<yPrioritySelect v-model:value="priority" tagStyle="padding: 0 10px;font-size: 12px;margin-left: 10px;" @change="onchange"></yPrioritySelect>
						<span class="status">审核中</span>
					</div>
					<div class="ele-cell-desc">
						<span>采购部：刘亦菲</span>
						<span class="margin-left-20">发起时间：2022/04/08 09:44</span>
						<span class="margin-left-20">期望完成时间：2022/04/08 09:44</span>
					</div>
				</div>
			</div>
		</template>
		<template #extra>
			<a-tooltip placement="top" v-for="(item,i) in iconData" :key="item.key">
			    <template #title>{{item.tips}}</template>
				<span v-if="item.key=='gz' && isStar" class="iconfont icon-star-filled pointer margin-left-20 text-color-secondary" style="color:#ffc614" @click="operation(item.key)"></span>
			    <span v-else class="iconfont pointer margin-left-20 text-color-secondary" :class="item.icon" @click="operation(item.key)"></span>
			</a-tooltip>
		</template>
		<div class="flex space-between" style="height: 100%;">
			<div class="content-left">
				<div class="content">
					<h4><b>任务详情</b></h4>
					<div class="margin-left-10">
						<div class="margin-top-20"><span
								class="text-color-secondary margin-right-10">任务标题</span><span>这是任务标题</span></div>
						<div class="margin-top-20"><span
								class="text-color-secondary margin-right-10">任务描述</span><span>这是任务描述</span></div>
						<div class="margin-top-20"><span
								class="text-color-secondary margin-right-10">预计开始</span><span>2022-10-08 15:30</span>
						</div>
						<div class="margin-top-20"><span
								class="text-color-secondary margin-right-10">截止时间</span><span>2022-10-08 15:30</span>
						</div>
					</div>
					<h4 class="margin-top-20"><b>关联信息</b></h4>
					<div class="margin-left-10">
						<div class="margin-top-20"><span
								class="iconfont icon-xiaoxi margin-right-10"></span><span>关联单据</span><span
								class="ele-text-primary"><ins>【采购订单】CDD2204070011</ins></span></div>
						<div class="wldw-box margin-top-20">
							<div class="margin-top-10"><span
									class="iconfont icon-xiaoxi margin-right-10"></span><span>往来单位</span></div>
							<div class="wldw-content">
								<div class="ele-cell">
									<div class="tabs-item ele-text-primary">客户</div>
									<div class="tabs-item ele-bg-base">供应商</div>
									<div class="tabs-item ele-bg-base">加工商</div>
									<div class="tabs-item ele-bg-base">物流</div>
								</div>
								<div class="margin-left-10">
									<div class="margin-top-20"><span
											class="text-color-secondary">客户：</span><span>丰源布行</span></div>
									<div class="margin-top-20"><span
											class="text-color-secondary">联系人：</span><span>张三</span><span
											class="text-color-secondary margin-left-20">手机号：</span><span>18700010745</span>
									</div>
									<div class="margin-top-20"><span
											class="text-color-secondary">提货方式：</span><span>自提</span></div>
									<div class="margin-top-20 margin-bottom-20"><span
											class="text-color-secondary">地址：</span><span>广东省广州市海珠区中大布匹市场</span></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 底部按钮 -->
				<div class="ele-cell bottom-button space-between">
					<div class="ele-cell">
						<div class="margin-right-20 pointer" v-for="(item,i) in bottomButton" :key="item.key" @click="bottomClick(item.key)"><span
								class="iconfont margin-right-5" :class="item.icon"></span>{{item.name}}</div>
					</div>
					<div>
						<a-button type="primary" ghost @click="agree"><span
								class="iconfont icon-Check ele-text-small"></span>同意</a-button>
						<a-button class="margin-left-8" type="primary" ghost danger @click="refuse"><span
								class="iconfont icon-close ele-text-small margin-right-5"></span>拒绝</a-button>
					</div>
				</div>
			</div>
			<div class="y-bg-gray-1 content-right">
				<a-tabs v-model:activeKey="activeKey">
					<a-tab-pane key="1" tab="流程">
						<a-collapse class="process-collapse" v-model:activeKey="activeKey1" ghost
							expandIconPosition="right">
							<a-collapse-panel key="1">
								<template #header>
									<div class="ele-cell">
										<span class="iconfont icon-wode1 ele-text-small process-icon"
											style="background: #75c84d;"></span>
										申请人<span class="dot"></span>已提交
									</div>
								</template>
								<div class="collapse-panel-content-box" style="border-color:var(--primary-color)">
									<div class="ele-cell ">
										<a-badge :offset="[-12,30]">
											<img src="/src/assets/user.png" class="process-user-img margin-right-10" />
											<template #count>
												<span class="iconfont icon-correct badge-icon"></span>
											</template>
										</a-badge>
										<div class="flex-1">
											<div class="flex space-between">
												<div class="">张三</div>
												<div class="text-color-secondary">2020/08/23 21:14</div>
											</div>
										</div>
									</div>
								</div>
							</a-collapse-panel>
							<a-collapse-panel key="2">
								<template #header>
									<div class="ele-cell">
										<span class="iconfont icon-wode1 ele-text-small process-icon"
											style="background: #e6a23c;"></span>
										申请人<span class="dot"></span>已提交
									</div>
								</template>
								<div class="collapse-panel-content-box">
									<div class="flex">
										<a-badge :offset="[-12,30]">
											<img src="/src/assets/user.png" class="process-user-img margin-right-10" />
											<template #count>
												<span class="iconfont icon-correct badge-icon"></span>
											</template>
										</a-badge>

										<div class="flex-1">
											<div class="flex space-between">
												<div class="">李四</div>
												<div class="text-color-secondary">2020/08/23 21:14</div>
											</div>
											<div class="margin-top-3 margin-bottom-5" style="color:#75c84d">已提交</div>
											<span class="process-tag ele-bg-info">尽快处理，方便后续工作！</span>
										</div>
									</div>
								</div>
							</a-collapse-panel>
							<a-collapse-panel key="3">
								<template #header>
									<div class="ele-cell">
										<span class="iconfont icon-wode1 ele-text-small process-icon"></span>
										执行人<span class="dot"></span>待确认
									</div>
								</template>
								<div class="collapse-panel-content-box">
									<div class="ele-cell">
										<a-badge :offset="[-12,30]">
											<img src="/src/assets/user.png" class="process-user-img margin-right-10" />
										</a-badge>
										<div class="flex-1">
											<div class="flex space-between">
												<div class="">王老五</div>
											</div>
										</div>
									</div>
									<div class="ele-cell margin-top-10">
										<a-badge :offset="[-12,30]">
											<img src="/src/assets/user.png" class="process-user-img margin-right-10" />
										</a-badge>
										<div class="flex-1">
											<div class="flex space-between">
												<div class="">王老五1</div>
											</div>
										</div>
									</div>
								</div>
							</a-collapse-panel>
						</a-collapse>
					</a-tab-pane>
					<a-tab-pane key="2" tab="评论">

					</a-tab-pane>
					<template #rightExtra>
						<span class="iconfont icon-browse-off" style="font-size: 26px;"></span>
					</template>
				</a-tabs>
			</div>
		</div>
    <!-- 是否保存数据弹窗 -->
    <yModal ref="modal" title="是否保存数据" :showNotOk="true" okText="保存" notOkType="link" :centered="true" @ok="save"
    	@notOk="notOk"></yModal>
    <!-- 同意确认弹窗 -->
    <agreeModal ref="agreeEditModal"></agreeModal>
    <!-- 拒绝确认弹窗 -->
    <refuseModal ref="refuseEditModal"></refuseModal>
    <!-- 转交确认弹窗 -->
    <deliverModal ref="deliverEditModal" :title="deliverModalTitle"></deliverModal>
    <!-- 撤销确认弹窗 -->
    <cancelModal ref="cancelEditModal"></cancelModal>
    <!-- 加签确认弹窗 -->
    <signConfirmationModal ref="signConfirmationEditModal"></signConfirmationModal>
    <!-- 退回确认弹窗 -->
    <returnModal ref="returnEditModal"></returnModal>
    <!-- 提交确认弹窗 -->
    <submitModal ref="submitEditModal"></submitModal>
    <!-- 再次确认页面 -->
    <approvalSubmit ref="approvalSubmitEdit"></approvalSubmit>
    <!-- 申请部门选择窗口-->
    <selectDepartment ref="selectDepartmentModal"></selectDepartment>
    <!-- 群聊窗口 -->
    <GroupChat ref="groupChatModal"></GroupChat>
	</a-drawer>

</template>

<script setup>
	import {
		ref,
		reactive,
		watch,
		defineProps,
		computed,
		toRefs,
		nextTick,
		provide
	} from 'vue';
	import agreeModal from './components/agree-modal.vue';
	import refuseModal from './components/refuse-modal.vue';
	import deliverModal from './components/deliver-modal.vue';
  import cancelModal from './components/cancel-modal.vue';
  import signConfirmationModal from './components/sign-confirmation-modal.vue';
  import returnModal from './components/return-modal.vue';
  import submitModal from './components/submit-modal.vue';
  import approvalSubmit from './approval-submit.vue';
  import selectDepartment from './components/select-department.vue';
	const visible = ref(false);
	const modal = ref(null);
	const priority = ref('紧急');
	const iconData = ref([
		{key:'lj',icon:'icon-lianjie',tips:'复制链接'},
		{key:'ql',icon:'icon-xiaoxi',tips:'发起群聊'},
		{key:'gz',icon:'icon-star',tips:'关注'},
		{key:'sx',icon:'icon-a-zujian31115',tips:'刷新'},
		{key:'gb',icon:'icon-close',tips:'关闭'},
	]);
	const isStar = ref(false);//是否关注
	const bottomButton = ref([{
			icon: 'icon-zhuan-jiao',
			name: '转交',
			key: 'zj'
		},
		{
			icon: 'icon-a-zu7336',
			name: '抄送',
			key: 'cs'
		},
		{
			icon: 'icon-cx',
			name: '撤销',
			key: 'cx'
		},
		{
			icon: 'icon-zc',
			name: '再次提交',
			key: 'zctj'
		},
		{
			icon: 'icon-zx',
			name: '执行确认',
			key: 'zxqr'
		},
		{
			icon: 'icon-jq',
			name: '加签',
			key: 'jq'
		},
		{
			icon: 'icon-th',
			name: '退回',
			key: 'th'
		},
		{
			icon: 'icon-more',
			name: '更多',
			key: 'gd'
		}
	])
	//底部按钮点击事件
  const deliverModalTitle = ref('转交');
	const deliverEditModal = ref(null);
  const cancelEditModal = ref(null);
  const signConfirmationEditModal = ref(null);
  const returnEditModal = ref(null);
  const submitEditModal = ref(null);
  const approvalSubmitEdit = ref(null);
  const selectDepartmentModal = ref(null);
	const bottomClick = async (key)=>{
		switch(key){
			case 'zj'://转交
        deliverModalTitle.value = '转交';
        await nextTick();
				deliverEditModal.value.open();
				break;
			case 'cs'://抄送
        deliverModalTitle.value = '抄送';
        await nextTick();
        deliverEditModal.value.open();
				break;
      case 'cx'://撤销
        cancelEditModal.value.open();
      	break;
      case 'zctj'://再次提交
        selectDepartmentModal.value.open();
        //approvalSubmitEdit.value.open();
      	break;
      case 'zxqr'://执行确认
        agreeEditModal.value.open();
      	break;
      case 'jq'://加签
        signConfirmationEditModal.value.open();
      	break;
      case 'th'://退回
        returnEditModal.value.open();
      	break;
		}
	}
	const activeKey1 = ref(['1', '2', '3']);
	//右上角的复制链接、群聊等点击事件
  const groupChatModal = ref(null);
	const operation = (key)=> {
		switch(key){
			case 'lj'://复制链接

				break;
			case 'ql'://群聊
        groupChatModal.value.open();
				break;
			case 'gz'://关注
				isStar.value = !isStar.value;
				break;
			case 'sx'://刷新

				break;
			case 'gb'://关闭
				close();
				break;
		}
	}
	const agreeEditModal = ref(null);
	//点击同意方法
	const agree = () => {
		agreeEditModal.value.open();
	}
	const refuseEditModal = ref(null);
	//点击拒绝方法
	const refuse = () => {
		refuseEditModal.value.open();
	}
	//保存
	const save = () => {
		visible.value = false;
	}
	//不保存
	const notOk = () => {
		visible.value = false;
	}
	const open = () => {
		visible.value = true;
	};
	const close = () => {
		// if (JSON.stringify(data) != JSON.stringify(defalutData)) {
		// 	modal.value.open();
		// } else {
			visible.value = false;
		//}
	};
	//暴露函数，给通过ref绑定的dom元素使用
	defineExpose({
		open,
		close
	})
</script>

<style lang="less" scoped>
	:global(.approval-details .ant-drawer-body) {
		padding: 0;
	}

	:global(.approval-details .ant-tabs-nav) {
		background-color: var(--drawer-bg);
		padding: 0 20px;
		margin-left: 1px;
	}

	.user-img {
		width: 50px;
		height: 50px;
	}

	.priority {
		padding: 0px 6px;
		color: #fff;
		border-radius: 2px;
		background: #ff3333;
		margin-left: 10px;
		font-size: 12px;
	}

	.status {
		padding: 0px 6px;
		border-radius: 2px;
		color: #e8a849;
		background: #faecd8;
		margin-left: 10px;
		font-size: 12px;
	}

	.content {
		padding: 24px;
	}

	.content-right {
		width: 400px;
		height: 100%;
	}

	.wldw-box {
		width: 600px;
		border-top: 1px solid var(--layout-body-background);
		border-bottom: 1px solid var(--layout-body-background);
	}

	.wldw-content {
		width: calc(100% - 12px);
		border: 1px solid var(--layout-body-background);
		margin: 10px 0 20px 10px;
		border-radius: 2px;
	}

	.tabs-item {
		width: 80px;
		height: 30px;
		line-height: 30px;
		text-align: center;
	}

	.bottom-button {
		padding: 10px 20px;
		position: fixed;
		bottom: 0;
		width: 900px;
		border-top: 1px solid var(--layout-body-background);
	}

	// 流程的样式
	:global(.process-collapse > .ant-collapse-item > .ant-collapse-header) {
		padding: 0px 16px;
	}

	:global(.process-collapse > .ant-collapse-item > .ant-collapse-content > .ant-collapse-content-box) {
		padding: 0;
		margin-left: 27px;
	}

	.collapse-panel-content-box {
		border-left: 3px solid #ccc;
		padding: 16px 16px 16px 20px;
	}

	.process-icon {
		width: 25px;
		height: 25px;
		background: #ccc;
		text-align: center;
		line-height: 25px;
		color: #fff;
		border-radius: 50%;
		margin-right: 10px;
	}

	.dot {
		width: 2px;
		height: 2px;
		background: var(--text-color);
		border-radius: 50%;
		margin: 0 3px;
	}

	.process-user-img {
		width: 35px;
		height: 35px;
	}

	.process-tag {
		padding: 3px 10px;
		border-radius: 2px;
	}

	.badge-icon {
		width: 15px;
		height: 15px;
		line-height: 15px;
		background: #75c84d;
		border-radius: 50%;
		text-align: center;
		color: #fff;
		font-size: 12px;
	}

	.opacity-4 {
		opacity: 0.4;
	}
</style>
