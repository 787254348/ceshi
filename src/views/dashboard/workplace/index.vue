<template>
  <div class="ele-body">
	  <div class="ant-card ant-card-body">
    <!-- <y-tree width="200px"></y-tree> -->
    <!-- <SchemeSettings></SchemeSettings> -->

      <yTable
        ref="grid1"
        v-model:listData="listData"
        v-model:columnData="columnData"
        :defalutData="defalutData"
        :focusedRow="true"
      >
        <!-- 自定义表格方法  FirstName是自定义字段名称-->
        <template #FirstName="{data}">
          <div class="ele-text-primary">{{data.value}}</div>
        </template>
      </yTable>

      <!-- 简单档案 -->
     <!-- <div @click="open">简单档案</div>
      <SimpleArchives ref="showModal"></SimpleArchives> -->
      <!-- 优先级档案 -->
      <div @click="open1">优先级档案</div>
       <PriorityFile ref="showModal1"></PriorityFile>
    </div>
  </div>
</template>
<script setup>
  import { ref,watch,defineProps,computed,toRefs } from 'vue';
  import SimpleArchives from '@/components/SimpleArchives/index.vue';
  import PriorityFile from '@/components/PriorityFile/index.vue';
  import SchemeSettings from '@/components/SchemeSettings/index.vue';
  import yTable from '@/components/y-table/index.vue';
  //列表数据
  const listData = ref([{
          id: 1,
          FirstName: 'John',
          LastName: 'Heart',
          Position: 'CEO',
          BirthDate: '1964/03/16',
          Address: '351 S Hill St.',
          Email: 'jheart@dx-email.com',
          num:2,
          money:2
        }, {
          id: 2,
          FirstName: 'Olivia',
          LastName: 'Peyton',
          Position: 'Sales Assistant',
          BirthDate: '1981/06/03',
          Address: '807 W Paseo Del Mar',
          Email: 'oliviap@dx-email.com',
          num:2,
          money:2
        }, {
          id: 3,
          FirstName: 'Robert',
          LastName: 'Reagan',
          Position: 'CMO',
          BirthDate: '1974/09/07',
          Address: '4 Westmoreland Pl.',
          Email: 'robertr@dx-email.com',
          num:2,
          money:2
        }]);
    //表头数据
    const columnData = ref([
        { id: 1, type:'string', fieldName:'FirstName', columnName: '姓名', visible: true,bold:true,width:100,fixed:false,alignment:'left' },
        { id: 2, type:'date', fieldName:'BirthDate', columnName: '生日', visible: true,bold:false,width:100,fixed:false,alignment:'left' },
        { id: 3, type:'string',fieldName:'Position', columnName: '职位', visible: true,bold:false,width:100,fixed:false,alignment:'left' },
        { id: 4, type:'string',fieldName:'Address', columnName: '地址', visible: true,bold:false,width:100,fixed:false,alignment:'left' },
        { id: 5, type:'number',fieldName:'num', columnName: '数量', visible: true,bold:false,width:100,fixed:false,alignment:'left' },
        { id: 6, type:'number',fieldName:'money', columnName: '金额', visible: true,bold:false,width:100,fixed:false,alignment:'left' },
      ])
    const defalutData = ref([
        { id: 1, type:'string',fieldName:'FirstName', columnName: '姓名', visible: true,bold:true,width:100,fixed:false,alignment:'left' },
        { id: 2,type:'date', fieldName:'BirthDate', columnName: '生日', visible: true,bold:false,width:100,fixed:false,alignment:'left' },
        { id: 3, type:'string',fieldName:'Position', columnName: '职位', visible: true,bold:false,width:100,fixed:false,alignment:'left' },
        { id: 4, type:'string',fieldName:'Address', columnName: '地址', visible: true,bold:false,width:100,fixed:false,alignment:'left' },
        { id: 5, type:'number',fieldName:'num', columnName: '数量', visible: true,bold:false,width:100,fixed:false,alignment:'left' },
        { id: 6, type:'number',fieldName:'money', columnName: '金额', visible: true,bold:false,width:100,fixed:false,alignment:'left' },
      ])

      for(let i=4;i<300;i++){
        let obj = {
          id: i,
          FirstName: 'John'+i,
          LastName: 'Heart',
          Position: 'CEO',
          BirthDate: '1964/03/16',
          Address: '351 S Hill St.',
          Email: 'jheart@dx-email.com',
          num:i,
          money:i
        }
        listData.value.push(obj)
      }
    const grid1 = ref(null);
    const showModal = ref(null);
    const open = ()=>{
      showModal.value.open();
    }
    const showModal1 = ref(null);
    const open1 = ()=>{
      showModal1.value.open();
    }
</script>
