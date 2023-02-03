<template>
    <div class="y-tree" :style="'width:'+ width">
        <div class="y-tree-title" v-if="showTitle">
            <span v-show="!searchInputState">{{title}}</span>
            <div>
                <span v-show="!searchInputState && showSearch" class="iconfont icon-search1"
                    @click="searchInputState = !searchInputState"></span>
                <a-popover placement="bottom" trigger="hover">
                    <template #content>
                        <div class="pointer" @click="expand('open')">展开</div>
                        <div class="pointer" style="margin-top: 5px;" @click="expand('close')">收拢</div>
                    </template>
                    <span v-show="!searchInputState" class="iconfont icon-more2 y-tree-title-more"></span>
                </a-popover>
            </div>
            <div v-show="searchInputState" class="search-input">
                <a-input v-model:value="searchValue" size="small" :bordered="false" :placeholder="placeholder">
                    <template #prefix>
                        <span class="iconfont icon-search1"></span>
                    </template>
                </a-input>
            </div>
            <span v-show="searchInputState" class="cancel-search" @click="cancelSearch">取消</span>
        </div>

        <a-tree v-model:expandedKeys="expandedKeys" :tree-data="gData" class="draggable-tree" :draggable="draggable"
            block-node @drop="onDrop" @select="select">
            <template #title="{ key: treeKey, title ,totalNumber}">
                <span class="y-tree-item" :data-key="treeKey">
                    <span v-if="isIcon" class="iconfont icon-check-circle"></span>
                    <span v-if="title.indexOf(searchValue) > -1">
                        {{ title.substr(0, title.indexOf(searchValue)) }}<span style="color: #f50">{{ searchValue }}</span>{{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
                    </span>
                    <span v-else>{{ title }}</span>
                    <span v-if="totalNumber" class="total-num">({{totalNumber}})</span>

                </span>
            </template>
        </a-tree>
        <span class="iconfont icon-zu40 y-drag-icon" v-show="isShow" ref="show"></span>
        <!-- 菜单栏弹窗 -->
        <a-popover placement="bottomLeft" arrowPointAtCenter trigger="click" v-model:visible="visible">
            <template #content>
                <div class="pointer" style="padding: 3px 0;" v-for="(item,i) in menuList" :key="i" @click="addNode(item.key)">{{item.name}}</div>
            </template>
            <span class="iconfont icon-more2" v-show="isShowDropdown" ref="dropdown" @click="dropdown"></span>
        </a-popover>
        <!-- 操作弹窗 -->
        <yModal ref="modal" title="创建类别" okText="保存" width="360px" :centered="true" :isIcon="false" :buttonCentered="true" cancelType="" @ok="ok($event,'add')" >
            <template #content>
                <div class="modal-item" style="margin-bottom: 30px;">
                    <div class="modal-item-title">
                        <span class="red">*</span><span>类别名称:</span>
                    </div>
                    <a-input ref="input" v-model:value="cateValue"  placeholder="请输入" />
                </div>
            </template>
        </yModal>

        <yModal ref="childrenModal" title="创建子类别" okText="保存" width="360px" :centered="true" :isIcon="false" :buttonCentered="true" cancelType="" @ok="ok($event,'addChildren')" >
            <template #content>
                <div class="modal-item">
                    <div class="modal-item-title">
                        <span >上一级类别:</span>
                    </div>
                    <a-input v-model:value="fatherCateValue" disabled placeholder="请输入" />
                </div>
                <div class="modal-item" style="margin: 20px 0;">
                    <div class="modal-item-title">
                        <span class="red">*</span><span>类别名称:</span>
                    </div>
                    <a-input ref="childrenInput" v-model:value="cateValue" placeholder="请输入" />
                </div>
            </template>
        </yModal>

        <yModal ref="deleteModal" title="删除提示" :content="'您确定要删除:'+cateValue+'吗？'" :centered="true" :danger="true" :buttonBorder="true"  okText="确认删除"  @ok="ok($event,'delete')" ></yModal>
    </div>
</template>
<script>
    import yModal from '../y-modal/index.vue'
    import {
        defineComponent,
        watch,
        ref
    } from 'vue';
    //搜索筛选相关数据
    function getNavs(arr, value) {
        function getlist(ar) {
            let newArr = []
            ar.map((obj, i) => {
                if (hasSon(obj.children)) { //子级url匹配
                    obj.children = getlist(obj.children)
                    newArr.push(obj);
                } else if (obj.key.indexOf(value) > -1) { //当前层级url匹配
                    newArr.push(obj);
                }
            })
            return newArr
        }
        //递归子级 只需要返回true 或false  表示子级url匹配 所以当前层级也应该存在
        function hasSon(arr) {
            if (!arr || (arr.length == 0)) return false
            return arr.some(item => item.key.indexOf(value) > -1 || hasSon(item.children))
        }
        return getlist(arr)
    }
    //找寻树目录中目标key值所在对象数据
    const loop = (data, key, callback) => {
        data.forEach((item, index) => {
            if (item.key === key) {
                return callback(item, index, data);
            }

            if (item.children) {
                return loop(item.children, key, callback);
            }
        });
    };
    //获取所有树目录父节点key值
    function getNodes(arr) {
        let newArr = []
        function getlist(ar) {
            ar.map((obj, i) => {
                if (hasSon(obj.children)) { //子级url匹配
                    newArr.push(obj.key);
                    getlist(obj.children)
                }
            })
            return newArr
        }
        //递归子级 只需要返回true 或false  表示子级url匹配 所以当前层级也应该存在
        function hasSon(arr) {
            if (!arr || arr.length == 0) return false
            return true;
        }
        return getlist(arr)
    }
    export default defineComponent({
        components: {
            yModal
        },
        props: {
            width:{//宽度
                type:String,
                default:'300px'
            },
            showTitle: { //是否显示顶部标题栏
                type: Boolean,
                default: true
            },
            title: { //标题名称
                type: String,
                default: '类别'
            },
            showSearch: { //是否显示搜索功能
                type: Boolean,
                default: true
            },
            placeholder: { //搜索框内容为空时显示的字样
                type: String,
                default: '搜索类别'
            },
            isIcon: { //是否左侧图标
                type: Boolean,
                default: true
            },
            draggable: { //是否显示拖动功能
                type: Boolean,
                default: true
            },
            showMenu: { //是否显示菜单栏功能
                type: Boolean,
                default: true
            },
            expandedKeys:{//展开指定的树节点
                 type:Array,
                 default () {
                     return ['所有的', '0-0-0', '0-0-0-0']//树目录的key值
                 }
            },
            menuList:{//菜单栏内容
                 type:Array,
                 default () {
                     return [
                         {key:'add',name:'创建分类'},
                         {key:'addChlidren',name:'创建子分类'},
                         {key:'delete',name:'删除分类'},
                         {key:'edit',name:'修改分类'}
                     ]
                 }
            },
            list: {//数目录列表数据
                type: Array,
                default () {
                    return [{
                        title: '所有的',
                        key: '所有的',
                        totalNumber: 10,
                        children: [{
                            title: '0-0-0',
                            key: '0-0-0',
                            totalNumber: 10,
                            children: [{
                                title: '0-0-0-0',
                                key: '0-0-0-0',
                                totalNumber: 10,
                                children: [{
                                    title: 'sada',
                                    key: 'sada',
                                    totalNumber: 10,
                                }, {
                                    title: 'sada2',
                                    key: 'sada2',
                                    totalNumber: 10,
                                }]
                            }, {
                                title: '0-0-0-1',
                                key: '0-0-0-1',
                                totalNumber: 10,
                            }, {
                                title: '0-0-0-2',
                                key: '0-0-0-2',
                                totalNumber: 10,
                            }],
                        }, {
                            title: '0-0-1',
                            key: '0-0-1',
                            totalNumber: 10,
                            children: [{
                                title: '0-0-1-0',
                                key: '0-0-1-0',
                                totalNumber: 10,
                            }, {
                                title: '0-0-1-1',
                                key: '0-0-1-1',
                            }, {
                                title: '0-0-1-2',
                                key: '0-0-1-2',
                            }],
                        }],
                    }]
                }
            },
        },
        data() {
            return {
                searchInputState: false, //搜索框显示状态
                isShow: false, //是否显示拖动按钮
                isShowDropdown: false, //是否显示更多按钮
                treeDataKey: [], //树目录数据的key值数据
                mouseenterKey: '', //鼠标经过的key值
                clickKey:'',//鼠标点击时的key值
            }
        },
        watch: {
            gData(value) {
                this.treeDataKey = [];
                this.getDateKey(value);
                this.eventListener();
            },
            expandedKeys() {
                this.eventListener();
            },
            searchValue(value) {
                this.eventListener();
            }
        },
        created() {

        },
        mounted() {
            let node_arr = document.querySelectorAll('.ant-tree-treenode'); //获取节点数据
            node_arr.forEach((d, i) => {
                d.addEventListener('mouseenter', this.mouseenter)
                d.addEventListener('mouseleave', this.mouseleave)
            })
            this.getDateKey(this.yData);
        },
        methods: {
            //点击取消按钮事件
            cancelSearch() {
                this.searchInputState = false;
                this.searchValue = '';
            },
            ok(e,type){
               var key = this.clickKey;
               loop(this.yData, key, (item, index, arr) => {
                    item.children = item.children || [];
                    let dragObj = {
                       title: this.cateValue,
                       key: this.cateValue,
                    }
                    if(type=="add"){//添加类别
                       arr.push(dragObj)
                    }else if(type=="addChildren"){//添加子类别
                       item.children.push(dragObj);
                    }else if(type=="delete"){//删除类别
                       arr.splice(index, 1);
                    }
               });
               let dataList = JSON.parse(JSON.stringify(this.yData));
               this.gData = getNavs(dataList, this.searchValue);
               this.$emit('change',this.yData);
            },
            //点击添加节点的方法
            addNode(type) {
                this.visible = false;
                var key = this.clickKey;

                loop(this.yData, key, (item, index, arr) => {
                    console.log(key,item)
                    if (type == 'add') { //添加分类
                        this.cateValue = '';
                        this.$refs['modal'].open();
                        this.$nextTick(() => {
                            this.$refs.input.focus()
                        })
                    }else if (type == 'addChlidren') { //添加子分类
                        this.cateValue = '';
                        this.fatherCateValue = item.title;
                        this.$refs['childrenModal'].open();
                        this.$nextTick(() => {
                            this.$refs.childrenInput.focus()
                        })
                    } else if (type == 'delete') { //删除
                        this.cateValue = item.title;
                        this.$refs['deleteModal'].open();
                    } else if (type == 'edit') { //修改
                        item.title = '333';
                    }
                });
            },
            //添加节点的鼠标经过事件
            eventListener() {
                setTimeout(() => {
                    let node_arr = document.body.querySelectorAll('.ant-tree-treenode'); //获取节点数据
                    node_arr.forEach((d, i) => {
                        d.removeEventListener('mouseenter', this.mouseenter,
                            true); //先移除之前的监听事件，防止触发多次
                        d.removeEventListener('mouseleave', this.mouseleave, true);
                        d.addEventListener('mouseenter', this.mouseenter)
                        d.addEventListener('mouseleave', this.mouseleave)
                    })
                }, 300)
            },
            //点击显示操作栏事件
            dropdown() {
                if(this.clickKey != this.mouseenterKey){
                  setTimeout(()=>{
                    this.visible = true;
                  },200)
                }
                this.clickKey = this.mouseenterKey;
            },
            //获取数据的key值方法
            getDateKey(data) {
                for (let i = 0; i < data.length; i++) {
                    let item = data[i];
                    this.treeDataKey.push(item.key)
                    if (item.children && item.children.length > 0) {
                        this.getDateKey(item.children);
                    }
                }
            },
            //鼠标经过元素事件
            mouseenter(e) {
                let target = e.target
                this.mouseenterKey = target.querySelector('.y-tree-item').dataset.key;
                let index = this.tabIndex(target); //当前元素下标值
                if (index != 1 && this.draggable) { //第一个不显示移动的图标，因为会挡住下拉图标
                    this.isShow = true;
                    let html = this.$refs.show;
                    target.append(html);
                }
                if (this.showMenu) { //是否显示右边更多操作栏
                    this.isShowDropdown = true;
                    let dropdown = this.$refs.dropdown;
                    target.append(dropdown);
                }
            },
            //鼠标离开元素事件
            mouseleave(d) {
                this.isShow = false;
                this.isShowDropdown = false;
            },
            //获取当前元素下标值
            tabIndex(target) {
                let nodeList = document.body.querySelectorAll('.ant-tree-treenode'); //获取节点数据
                let index = 1;
                nodeList.forEach((e, i) => {
                    if (e == target) {
                        index = i
                    }
                })
                return index;
            }
        },
        setup(props, ctx) {
            const treeData = props.list;
            const onContextMenuClick = (treeKey, menuKey) => {
                console.log(`treeKey: ${treeKey}, menuKey: ${menuKey}`);
            };
            const visible = ref(false);//是否显示操作栏菜单
            const cateValue = ref('');//添加类别名称的值
            const fatherCateValue = ref('');//添加父类别名称的值
            const searchValue = ref('');
            const gData = ref(treeData);
            const yData = ref(treeData);
            const autoExpandParent = ref(true);
            const expandedKeys = ref(props.expandedKeys);

            watch(expandedKeys, () => {
                //console.log('expandedKeys', expandedKeys.value);
                //eventListener();
            });
            watch(searchValue, value => {

                autoExpandParent.value = true;
                searchValue.value = value;
                const dataList = JSON.parse(JSON.stringify(yData.value));
                gData.value = getNavs(dataList, value)
                //this.eventListener();
                //eventListener();
            });
            //全展开、收拢的方法
            const expand = value => {
                if(value=='open'){//展开
                   expandedKeys.value = getNodes(gData.value);
                }else{//收拢
                    expandedKeys.value = [];
                }
            };
            //点击树节点事件
            const select = (selectedKeys,e) =>{
                ctx.emit('select',selectedKeys,e);
            }

            const onDrop = info => {
                if(info.dropPosition==-1) return;//不让拖动超过顶级节点
                const data = [...gData.value]; // Find dragObject
                gData.value = changeDropData(info, data); //当前展示数据
                const ysData = [...yData.value];
                yData.value = changeDropData(info, ysData); //原始所有数据
                ctx.emit('change',yData.value);
            };
            const changeDropData = (info, data) => {
                const dropKey = info.node.key;
                const dragKey = info.dragNode.key;
                const dropPos = info.node.pos.split('-');
                const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
                let dragObj;
                loop(data, dragKey, (item, index, arr) => {
                    arr.splice(index, 1);
                    dragObj = item;
                });

                if (!info.dropToGap) {
                    // Drop on the content
                    loop(data, dropKey, item => {
                        item.children = item.children || []; /// where to insert 示例添加到头部，可以是随意位置

                        item.children.unshift(dragObj);
                    });
                } else if ((info.node.children || []).length > 0 && // Has children
                    info.node.expanded && // Is expanded
                    dropPosition === 1 // On the bottom gap
                ) {
                    loop(data, dropKey, item => {
                        item.children = item.children || []; // where to insert 示例添加到头部，可以是随意位置

                        item.children.unshift(dragObj);
                    });
                } else {
                    let ar = [];
                    let i = 0;
                    loop(data, dropKey, (_item, index, arr) => {
                        ar = arr;
                        i = index;
                    });

                    if (dropPosition === -1) {
                        ar.splice(i, 0, dragObj);
                    } else {
                        ar.splice(i + 1, 0, dragObj);
                    }
                }
                return data;
            }
            return {
                onContextMenuClick,
                expandedKeys,
                searchValue,
                gData,
                yData,
                autoExpandParent,
                select,
                onDrop,
                cateValue,
                fatherCateValue,
                visible,
                expand
            };
        },

    });
</script>
<style lang="less" scoped>
    :global(.y-tree .ant-tree .ant-tree-node-content-wrapper) {
        text-align: left;
        overflow: hidden;
        white-space: nowrap;
        word-break: break-all;
        text-overflow: ellipsis;
        display: block;
    }

    :global(.y-tree .ant-tree .ant-tree-treenode) {
        position: relative;
    }

    :global(.y-tree .ant-tree .ant-tree-treenode:hover) {
        background-color: #f5f5f5;
        padding:4px 0;
    }

    :global(.y-tree .ant-tree .ant-tree-node-content-wrapper.ant-tree-node-selected) {
        background: none;
        color: var(--primary-color);
    }

    .y-tree-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;
    }

    .y-tree-title-more{
        color: #bbb;
        margin-left: 5px;
    }

    .icon-search1 {
        font-size: 18px;
        color: #bbb;
        cursor: pointer;
    }

    .search-input {
        width: calc(100% - 40px);
        background: rgba(0, 0, 0, .05);
        border-radius: 14px;
    }

    .cancel-search {
        color: #5075b6;
        cursor: pointer;
    }

    .y-drag-icon {
        position: absolute;
        left: 4px;
        cursor: move;
    }

    .pointer,
    .icon-more2 {
        cursor: pointer;
    }
    .total-num{
        color: #b3b3b3;
        margin-left: 5px;
    }

    // 弹窗样式
    .modal-item{
        display: flex;
        width: 100%;
        align-items: center;
    }
    .red{
        color:red;
    }
    .modal-item-title{
        flex-shrink: 0;
        margin-right: 10px;
        width: 75px;
        text-align: right;
    }
</style>
