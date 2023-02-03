<template>
  <div>
      <table class="ele-table ele-table-border ele-table-stripe ele-table-medium">
          <colgroup>
              <col width="200" />
              <col width="140" />
              <col />
              <col width="140" />
              <col width="120" />
          </colgroup>
          <thead>
              <tr>
                  <th>文件名称</th>
                  <th class="text-center">大小</th>
                  <th class="text-center">上传时间</th>
                  <th class="text-center">上传人</th>
                  <th class="text-center">操作</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(item,i) in list" :key="i" :class="{'ele-table-active' : i%2==1}">
                  <td class="ele-cell">
                    <span v-if="item.type=='img'" class="iconfont icon-tp margin-right-5" style="color:#ffa415"></span>
                    <span v-if="item.type=='excel'" class="iconfont icon-excel margin-right-5" style="color:#36b85a"></span>
                    <span v-if="item.type=='word'" class="iconfont icon-word margin-right-5" style="color:#5595f2"></span>
                    <span v-if="item.type=='other'" class="iconfont icon-wzwj margin-right-5" style="color:#838a93"></span>
                    {{item.name}}
                  </td>
                  <td class="text-center">{{item.size}}</td>
                  <td class="text-center">
                    <span v-if="item.status=='sucess'">{{item.time}}</span>
                    <div v-if="item.status=='uploading'" class="ele-cell"><a-progress class="ele-cell-content" :percent="item.percent" size="small" :showInfo="false"/><span class="margin-left-10 progress-tips">上传中{{item.percent}}%</span></div>
                    <div v-if="item.status=='error'" class="ele-cell"><a-progress class="ele-cell-content" :percent="item.percent" size="small" status="exception" :showInfo="false"/><span class="margin-left-10 ele-text-danger progress-tips">上传失败{{item.percent}}%</span></div>
                  </td>
                  <td class="text-center">{{item.operator}}</td>
                  <td>
                    <div v-if="item.status=='sucess'" class="ele-cell space-between">
                      <span class="iconfont icon-browse pointer" @click="preview(i)"></span>
                      <span class="iconfont icon-xz pointer" @click="download(i)"></span>
                      <span class="iconfont icon-shanchu font-size-14 pointer" @click="del(i)"></span>
                    </div>
                    <div v-if="item.status=='uploading'" class="ele-cell flex-end">
                      <span class="iconfont icon-close font-size-14 pointer" @click="dlt(i)"></span>
                    </div>
                    <div v-if="item.status=='error'" class="ele-cell flex-end">
                      <a-upload
                        name="file"
                        action="/upload/v2/5cc8019d300000980a055e76"
                        :headers="headers"
                        :showUploadList="false"
                        :before-upload="beforeUpload1"
                        @change="handleChange"
                      >
                        <span class="iconfont icon-a-zujian31115 font-size-14 pointer margin-right-28" @mousedown="upload(i)"></span>
                      </a-upload>
                      <span class="iconfont icon-close font-size-14 pointer" @click="dlt(i)"></span>
                    </div>
                  </td>
              </tr>
          </tbody>
      </table>
      <div class="flex justify-center margin-top-30">
        <a-upload
          name="file"
          action="/upload/v2/5cc8019d300000980a055e76"
          :headers="headers"
          :showUploadList="false"
          :before-upload="beforeUpload"
          @change="handleChange"
        >
          <a-button class="padding-left-50 padding-right-50" size="large" type="dashed">
            <div style="margin-top: -3px;">
              <span class="iconfont icon-jiahao font-size-14 margin-right-5"></span>
              <span class="font-size-14">添加附件</span>
            </div>
          </a-button>
        </a-upload>
      </div>
      <!-- 图片预览 -->
      <a-image
        :width="200"
        :style="{ display: 'none' }"
        :preview="{
          visible,
          onVisibleChange: setVisible,
        }"
        :src="previewSrc"
      />
      <!-- 删除提示弹窗 -->
      <yModal ref="delModal" title="删除提示" :closable="false" content="确定删除附件？" okText="删除" :danger="true" :centered="true" @ok="ok"></yModal>
  </div>
</template>

<script setup>
  import { ref,reactive,watch,defineProps,computed,toRefs,nextTick,provide } from 'vue';
  import { message } from 'ant-design-vue';
  import dayjs from 'dayjs'
  const list = ref([
    {type:'img',src:'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',name:'13131.jpg',size:'100k',time:'2020-08-03 12:00',operator:'张三',percent:100,status:'sucess'},
    {type:'excel',name:'13131.xsl',size:'100k',time:'2020-08-03 12:00',operator:'张三',percent:10,status:'uploading'},
    {type:'word',name:'13131.doc',size:'100k',time:'2020-08-03 12:00',operator:'张三',percent:10,status:'error'},
    {type:'other',src:'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp',name:'13131.txt',size:'100k',time:'2020-08-03 12:00',operator:'张三',percent:100,status:'sucess'}
  ])
  const visible = ref(false);
  const previewSrc = ref('');
  const delModal = ref(null);
  const dltIndex = ref(-1);
  //预览图片
  const setVisible = value => {
    visible.value = value;
  };
  const preview = (i)=>{
    previewSrc.value = list.value[i].src;
    setVisible(true)
  }
  //下载文件
  const download = (i)=> {
    window.open(list.value[i].src,'_blank')
  }
  //删除图片
  const del = (i)=> {
    dltIndex.value = i;
    delModal.value.open();
  }
  const ok = ()=> {
    dlt(dltIndex.value);
  }
  const dlt = (i)=> {
    list.value.splice(i,1);
  }
  //更新图片
  const upload = (i)=> {
    console.log(111,i)
    dltIndex.value = i;
  }
  const beforeUpload1 = (file)=> {
    dlt(dltIndex.value);
    beforeUpload(file);
  }
  //文件上传请求头部信息
  const headers = reactive({
    authorization: 'authorization-text',
  })
  //文件上传前回调方法
  const beforeUpload = (file) => {
    console.log(2,file)
    let size,file_type = 'other';
    let type = file.name.split('.')[1];
    if(['jpg','jpeg','png','gif'].includes(type)){
      file_type = 'img';
    }
    if(['xls','xlsx'].includes(type)){
      file_type = 'excel';
    }
    if(['doc','docx'].includes(type)){
      file_type = 'word';
    }

    if(file.size>1024*1024){
      size = parseFloat((file.size/1024*1024).toFixed(1))+'M';
    }else{
      size = parseFloat((file.size/1024).toFixed(1))+'K';
    }
    let obj = {
      type:file_type,
      name:file.name,
      size:size,
      time:'',
      operator:'张三',
      percent:0,
      status:'uploading',
      uid:file.uid
    }
    list.value.push(obj)
    return file;
  };
  //文件上传事件
  const handleChange = info => {
    console.log(11,info.file)
    setTimeout(()=>{
      let i = list.value.findIndex(item=>{
        return item.uid==info.file.uid
      })
      if (info.file.status === 'uploading') {
        list.value[i].percent = info.file.percent==100 ? 99 : info.file.percent;
      }
      if (info.file.status === 'done') {
        list.value[i].status = 'sucess';
        list.value[i].time = dayjs(dayjs()).format('YYYY-MM-DD HH:mm');
        message.success(`上传成功`);
      } else if (info.file.status === 'error') {
        list.value[i].status = 'error';
        message.error(`上传失败`);
      }
    },1000)

  };

</script>

<style lang="less" scoped>
  :deep(.ele-table thead tr th){
    background: var(--component-background);
  }
  :deep(.ele-table.ele-table-border th),
  :deep(.ele-table.ele-table-border td){
    border-width: 0;
  }
  :deep(.ele-table tbody tr.ele-table-active td){
    background: var(--table-row-hover-bg);
  }
  .text-center{
    text-align: center !important;
  }
  .progress-tips{
    width: 83px;
    text-align: left;
  }
</style>
