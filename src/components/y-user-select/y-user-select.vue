<template>
        <!-- <span v-if="!isSelect" @click="isSelect=!isSelect">{{value.join(';') || '-----'}}</span> -->
        <a-select  ref="yUserSelect" :value="value" :style="{'width': width}" :placeholder="placeholder"
            :mode="mode"
            :getPopupContainer="isBody ? false : triggerNode => {
            return triggerNode.parentNode}"
            @dropdownVisibleChange="dropdownVisibleChange"
            @blur="blur"
            @focus="focus"
            @change="handleChange"
            dropdownClassName="y-user-select"
            label-in-value
            showSearch
            :defaultOpen="defaultOpen"
            :showArrow="showArrow"
            :bordered="bordered"
            :searchValue="searchValue"
            :filter-option="false"
            @search="fetchUser"
            @select="selectUser"
            @deselect="deselect"
            v-bind="$attrs">
            <a-select-option v-if="isLately && isLatelySearch" value="disabled" disabled label="disabled">{{latelySearchText}}</a-select-option>
            <a-select-option v-for="(item,i) in options" :value="item.value" :label="item.label">
                <img v-if="showImg && item.img" class="user-img" :src="item.img">
                <span v-if="item.label.indexOf(searchValue) > -1">
                    {{ item.label.substr(0, item.label.indexOf(searchValue)) }}<span class="active">{{ searchValue }}</span>{{ item.label.substr(item.label.indexOf(searchValue) + searchValue.length) }}
                </span>
                <span v-else>{{ item.label }}</span>
            </a-select-option>
            <a-select-option v-if="options.length==0" value="no" disabled>暂无数据</a-select-option>
        </a-select>
        <!-- 底部操作栏 -->
        <div class="add-box" ref="addBox" v-show="isShow">
            <div v-if="inputValue" class="add-button main-color" @click="add"><span class="iconfont icon-jiahao"></span>{{inputValue}}</div>
            <div v-else class="add-button" ><span class="iconfont icon-jiahao"></span>输入值点击新增</div>
            <div class="add-record" ><span class="iconfont icon-dangan"></span>档案</div>
        </div>

</template>
<script setup>
  import {
      defineComponent,
      ref,
      watch
  } from 'vue';

  const props = defineProps({
      width:{//宽度
          type:String,
          default:'200px'
      },
      showImg:{//是否显示名称前面的图片
          type:Boolean,
          default:true
      },
      isBody:{//下拉菜单渲染父节点，是否渲染到 body 上
          type:Boolean,
          default:false
      },
      isAdd:{//是否显示底部新增按钮
          type:Boolean,
          default:true
      },
      defaultOpen:{//是否默认展开下拉菜单
          type:Boolean,
          default:false
      },
      showArrow:{//是否显示下拉小箭头
          type:Boolean,
          default:true
      },
      bordered:{//是否显示边框
          type:Boolean,
          default:true
      },
      placeholder:{//选择框默认文字
         type:String,
         default:'请输入关键字搜索'
      },
      latelySearchText:{//最近搜索的文字
         type:String,
         default:'最近输入'
      },
      isLatelySearch:{//是否显示最近搜索
          type:Boolean,
          default:true
      },
      latelyLength: { //记忆长度个数
          type: Number,
          default: 5
      },
      mode:{//模式，默认单选，multiple多选
          type:String,
          default:''
      },
      value:{//选中的值
         type:[Array,String]
         // default(){
         //     return []
         // }
      },
      latelySearch:{//最近搜索记录列表
          type:Array,
          default(){
              return [
                  {
                      value: '张三1',
                      label: '张三1',
                      img: '/src/assets/user.png',
                  }, {
                      value: '李四1',
                      label: '李四1',
                      img: '/src/assets/user.png',
                  }, {
                      value: '王老五2',
                      label: '王老五2',
                      img: '/src/assets/user.png',
                  }
              ]
          }
      },
      list:{//下拉列表数据
          type:Array,
          default(){
              return [
                  {
                      value: '11',
                      label: '11',
                      img: '/src/assets/user.png',
                  }, {
                      value: '112',
                      label: '112',
                      img: '/src/assets/user.png',
                  }, {
                      value: '223',
                      label: '223',
                      img: '/src/assets/user.png',
                  }, {
                      value: '张三1',
                      label: '张三1',
                      img: '/src/assets/user.png',
                  }, {
                      value: '李四1',
                      label: '李四1',
                      img: '/src/assets/user.png',
                  }, {
                      value: '王老五2',
                      label: '王老五2',
                      img: '/src/assets/user.png',
                  }, {
                      value: '张三7',
                      label: '张三7',
                      img: '/src/assets/user.png',
                  }, {
                      value: '李四8',
                      label: '李四8',
                      img: '/src/assets/user.png',
                  }, {
                      value: '王老五9',
                      label: '王老五9',
                      img: '/src/assets/user.png',
                  }
              ]
          }
      }
  })

  const emit = defineEmits(['update:value','handleChange','selectUser']);
  const isSelect = ref(false);
  const yUserSelect = ref(null);
  const isShow = ref(false);
  const mode = props.mode;
  const isLatelySearch = props.isLatelySearch;//是否显示最近搜索功能
  const isLately = ref(true); //是否显示最近输入
  const value = ref(props.value || []);//选中的值
  const searchValue = ref('');//搜索的值
  const inputValue = ref('');//底部添加的值的值
  const addBox = ref(null);
  const dropdownVisibleChange = (open)=>{
      isSelect.value = open;
      if(!props.isAdd) return;
      if(open){
        //插入底部操作栏
        setTimeout(()=> {
            //let node = this.$refs.yUserSelect.$el.querySelector('.rc-virtual-list')
            //let html = addBox;
            isShow.value = true;
            //这样写是为了兼容下拉框内容渲染在 body 上时能插入底部按钮
            let node_arr = document.body.querySelectorAll('.y-user-select .rc-virtual-list') //获取节点数据
            node_arr.forEach((d, i) => {
              if(d.parentNode.parentNode.style.display==''){
                d.append(addBox.value);
              }
            })
            //node.append(html);
        }, 10)
      }else{
          isShow.value  = false;
      }
  }
  watch(searchValue, value => {
      inputValue.value = value;
  });
  const latelySearch = props.latelySearch; //最近搜索的记忆数据
  const searchData = props.list;//搜索目标数据
  const options = ref(isLatelySearch ? latelySearch : searchData);
  const focus = () => {
      console.log('focus');
      isLately.value = true;
      options.value = isLatelySearch ? latelySearch : searchData;
  };
  const blur = ()=>{

  };
  const handleChange = (e,option) => {
      console.log(e)
      if(e==undefined) value.value = [];//解决点击清空按钮时数据没有清除的问题
      emit('update:value',e.value);
      emit('handleChange',option);
  };
  //清空方法
  const clear = ()=> {
	  value.value = [];
	  emit('update:value',value.value);
  }
  //取消选中事件
  const deselect = e=>{
      if(mode!=''){//多选
          value.value = value.value.filter(item=>{
              return item != e.value
          })
      }

  };
  //选中事件
  const selectUser = e => {
      console.log(e)
      let index = latelySearch.findIndex(item => {
          return item.value == e.value
      })
      if (index < 0) { //没有在最近搜索记忆中的就添加
          let obj = searchData.find(item => {
              return item.value == e.value
          })
          latelySearch.unshift(obj)
          if (latelySearch.length > props.latelyLength) { //如果超过记忆个数据就删除了
              latelySearch.splice(latelySearch.length - 1, 1)
          }
      }
      //选中的数据
      let obj1 = options.value.find(item => {
          return item.value == e.value
      })
      if(mode==''){//单选
          isLately.value = true;
          options.value = isLatelySearch ? latelySearch : searchData;
          yUserSelect.value.blur();
          value.value = [obj1.value];
      }else{//多选
          value.value.push(obj1.value)
      }
      searchValue.value = '';
      emit('selectUser',latelySearch);
  };

  const fetchUser = value => {
      let val = value.trim();
      searchValue.value = val;
      if (val == '') {
          isLately.value = true;
          options.value = isLatelySearch ? latelySearch : searchData;
      } else {
          isLately.value = false;
          let data = searchData.filter((item) => {
              return item.label.toLowerCase().indexOf(value.toLowerCase()) >= 0;
          })
          options.value = data;
      }

  };
  const add = ()=>{
      let value = searchValue.value;
      if(value!=''){
          console.log(666)
          let obj = {
              value: value,
              label: value,
              img: '',
          }
          let search_index = searchData.findIndex(item => {
              return item.label == obj.label
          })
          if(search_index==-1){
              searchData.unshift(obj)
              options.value.unshift(obj)
              selectUser(obj)
              inputValue.value = '';
          }
      }
  }
  //暴露函数，给通过ref绑定的dom元素使用
  defineExpose({
  	clear
  })



</script>
<style lang="less" scoped>
    :global(.y-user-select .ant-select-item-option-disabled) {
        cursor: default;
    }
    :global(.y-user-select .ant-select-item-option-content .active){
        color: #f50;
    }

    .user-img {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        vertical-align: sub;
        margin-right: 5px;
    }
    .add-box{
        border-top: 1px dashed rgba(0, 0, 0, 0.06);
        display: flex;
        padding: 5px 12px;
        cursor: pointer;
        color: #D9D9D9;
    }
    .add-box .iconfont{
        font-size: 14px;
        margin-right:5px;
    }
    .main-color{
        color: var(--primary-color);
    }
    .add-button{
       width: calc(100% - 50px);
       white-space:nowrap;
       overflow:hidden;
       text-overflow:ellipsis;
    }
    .add-record{
        width: 50px;
    }

</style>
