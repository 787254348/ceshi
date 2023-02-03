<template>
	<a-drawer :width="1300" placement="right" :closable="false" :visible="visible" class="approval-details">
		<template #title>
			<div class="ele-cell">
				<img class="user-img" src="/src/assets/user.png" />
				<div class="ele-cell-content">
					<div class="ele-cell-title ele-cell">
						<span>采购订单-单价审批</span>
            <span class="priority-text" :style="'background-color:'+ priority.color">{{priority.value}}</span>
					</div>
					<div class="ele-cell-desc">
						<span>采购部：刘亦菲</span>
						<span class="margin-left-20" v-show="completionTime">期望完成时间：{{completionTime}} <span class="iconfont icon-close pointer" style="font-size: 13px;" @click="completionTime=''"></span></span>
					</div>
				</div>
			</div>
		</template>
		<template #extra>
				<span class="iconfont icon-close pointer margin-left-20 text-color-secondary" @click="close"></span>
		</template>
		<div class="flex space-between" style="height: 100%;">
			<div class="content-left">
				<div class="content">
					<h4><b>任务详情</b></h4>
					<div class="margin-left-10">
						<div class="margin-top-20"><span
								class="text-color-secondary margin-right-7">任务标题</span> <a-input style="width:calc(100% - 70px);padding:0" v-model:value="title" :bordered="false" placeholder="--" /></div>
						<div class="margin-top-20"><span
								class="text-color-secondary margin-right-10">任务描述</span><a-input style="width:calc(100% - 70px);padding:0" v-model:value="value" :bordered="false" placeholder="--" /></div>
						<div class="margin-top-20"><span
								class="text-color-secondary margin-right-10">预计开始</span><y-date :showTime="true" dateFormat="YYYY-MM-DD HH:mm" :date="startTime" @confirm="changeStartTime"><span class="pointer">{{!!startTime ? startTime : '--'}}</span></y-date>
						</div>
						<div class="margin-top-20"><span
								class="text-color-secondary margin-right-10">截止时间</span><y-date :showTime="true" dateFormat="YYYY-MM-DD HH:mm" :date="endTime" @confirm="changeEndTime"><span class="pointer">{{!!endTime ? endTime : '--'}}</span></y-date>
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
            <!-- <div>期望完成时间</div> -->
            <y-date :showTime="true" dateFormat="YYYY-MM-DD HH:mm" :date="completionTime" @confirm="changeTime"><div class="pointer text-color-secondary"><span class="iconfont icon-qw margin-right-5 text-color-secondary"></span>期望完成时间</div></y-date>
            <yPrioritySelect v-model:value="priority.value" @change="onchange">
              <div class="margin-left-20 pointer text-color-secondary"><span class="iconfont icon-yxj margin-right-4 text-color-secondary"></span>优先级</div>
            </yPrioritySelect>
					</div>
					<div>
						<a-button type="primary" ghost @click="agree"><span
								class="iconfont icon-Check ele-text-small"></span>提交</a-button>
					</div>
				</div>
			</div>
			<div class="y-bg-gray-1 content-right">
        <div class="ant-tabs-nav"><b>流程预览</b></div>
        <a-collapse class="process-collapse" v-model:activeKey="activeKey1" ghost
          expandIconPosition="right">
          <a-collapse-panel v-for="(item,key) in processData" :key="key">
            <template #header>
              <div class="ele-cell">
                <span class="iconfont icon-wode1 ele-text-small process-icon"
                  style="background: #75c84d;"></span>
                {{item.title}}
              </div>
            </template>
            <div class="collapse-panel-content-box" style="border-color:var(--primary-color)">
              <div class="ele-cell ">
                <div class="collapse-panel-content-item" v-for="(childrenItem,i) in item.data" :key="i" @mouseenter="mouseenter(key,i)" @mouseleave="mouseleave(key,i)">
                  <div class="process-user-img-box">
                    <img :src="childrenItem.img" class="process-user-img" />
                    <span v-show="mouseentKey==key&&mouseentIndex==i" class="iconfont icon-guanbi-shi" @click="dlt(key,i)"></span>
                  </div>
                  <div class="margin-top-5">{{childrenItem.name}}</div>
                </div>
                <div class="add-button"><span class="iconfont icon-jiahao"></span></div>
              </div>
            </div>
          </a-collapse-panel>

        </a-collapse>
			</div>
		</div>
	</a-drawer>
	<!-- 是否保存数据弹窗 -->
	<yModal ref="modal" title="是否保存数据" :showNotOk="true" okText="保存" notOkType="link" :centered="true" @ok="save"
		@notOk="notOk"></yModal>
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
	const visible = ref(false);
	const modal = ref(null);
  const completionTime = ref('');//期望完成时间
  const startTime = ref('');//预计开始时间
  const endTime = ref('');//截止时间
	const priority = reactive({
    value:'紧急',
    color:'#ff3333'
  });
  const activeKey1 = ref(['approval', 'executor', 'copy']);
  const processData = reactive({
    approval:{
      title:'审批人',
      data:[
        {name:'张三',img:'/src/assets/user.png'},
        {name:'张三',img:'/src/assets/user.png'},
      ]
    },
    executor:{
      title:'执行人',
      data:[
        {name:'张三',img:'/src/assets/user.png'},
        {name:'张三',img:'/src/assets/user.png'},
      ]
    },
    copy:{
      title:'抄送人',
      data:[
        {name:'张三',img:'/src/assets/user.png'},
        {name:'张三',img:'/src/assets/user.png'},
      ]
    }
  });
  const mouseentKey = ref('');//鼠标经过的节点
  const mouseentIndex = ref('');//鼠标经过的下标值
  const mouseenter = (key,i)=>{
    mouseentKey.value = key;
    mouseentIndex.value = i;
  }
  const mouseleave = (key,i)=>{
    mouseentKey.value = '';
    mouseentIndex.value = '';
  }
  const dlt = (key,i)=>{
    processData[key].data.splice(i,1);
  }
  //优先级选择回调
  const onchange = (e)=>{
    priority.value = e.name;
    priority.color = e.color;
  }
  //点击期望完成时间
  const changeTime=(e)=>{
    completionTime.value = e.date
  }
  //点击预计开始时间
  const changeStartTime=(e)=>{
    startTime.value = e.date
  }
  //点击截止时间
  const changeEndTime=(e)=>{
    endTime.value = e.date
  }
	//点击同意方法
  const agreeEditModal = ref(null);
	const agree = () => {
		agreeEditModal.value.open();
	}
	//点击拒绝方法
  const refuseEditModal = ref(null);
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

  .approval-details .ant-tabs-nav {
		background-color: var(--drawer-bg);
		padding: 12px 20px;
		margin-left: 1px;
    font-size: 16px;
    margin-bottom: 16px;
	}
  .priority-text{
    color: #fff;
    display: inline-block;
    border-radius: 2px;
    text-align: center;
    padding: 0 10px;
    font-size: 12px;
    margin-left: 10px;
  }

	.user-img {
		width: 50px;
		height: 50px;
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

	.process-user-img {
		width: 35px;
		height: 35px;
    border-radius: 50%;
	}
  .collapse-panel-content-item{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 20px;
  }
  .process-user-img-box{
    position: relative;
  }
  .process-user-img-box span{
    top: -3px;
    position: absolute;
    right: -8px;
    color: #969799;
    cursor: pointer;
  }
  .add-button{
    width: 40px;
    height: 40px;
    border: 1px dashed #ccc;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ccc;
    cursor: pointer;
  }
</style>
