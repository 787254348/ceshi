<template>
    <a-modal v-model:visible="visible" wrapClassName="y-modal" :centered="centered" :width="width" :closable="closable">
        <div class="y-modal-body">
            <div class="y-modal-icon" v-if="isIcon">
                <span class="iconfont icon-bg-warning" :class="{'red':danger}"></span>
            </div>
            <div class="width-100">
                <slot name="title">
                    <div class="y-modal-header ant-modal-title">
                        {{title}}
                    </div>
                </slot>
                <slot name="content">
                    <p>{{content}}</p>
                </slot>
            </div>
        </div>

        <template #footer>
            <slot name="button" >
                <div :class="{'center':buttonCentered}">
                    <a-button :type="okType" :danger="danger" @click="handleOk">{{okText}}</a-button>
                    <a-button :type="notOkType" :danger="danger" ghost @click="handleNotOk" v-if="showNotOk">{{notOkText}}</a-button>
                    <a-button :type="cancelType" :class="{'border':buttonBorder}"  @click="handleCancel">{{cancelText}}</a-button>
                </div>

            </slot>
        </template>
    </a-modal>
</template>
<script>
    import {
        defineComponent,
        ref
    } from 'vue';
    export default defineComponent({
        emits: ['ok'],
        name: 'y-modal',
        inheritAttrs: false,
        props: {
            closable:{//是否显示右上角的关闭按钮
                type:Boolean,
                default:true
            },
            width: { //弹窗的宽度
                type: String,
                default: '360px'
            },
            centered:{//是否垂直居中展示 Modal
                type:Boolean,
                default:false
            },
            isIcon:{//是否显示图标
                type:Boolean,
                default:true
            },
            showNotOk:{//是否显示不保存按钮
                type:Boolean,
                default:false
            },
            danger:{//是否设置危险按钮
                type:Boolean,
                default:false
            },
            title: { //标题
                type: String,
                default: '是否保存数据？'
            },
            content: { //内容
                type: String,
                default: '数据已修改，是否保存？'
            },
            okText: { //确定按钮文字
                type: String,
                default: '确定'
            },
            okType: { //确定按钮类型
                type: String,
                default: 'primary'
            },
            notOkText: { //中间不保存按钮文字
                type: String,
                default: '不保存'
            },
            notOkType: { //中间不保存按钮类型
                type: String,
                default: 'primary'
            },
            cancelText: { //取消按钮文字
                type: String,
                default: '取消'
            },
            cancelType: { //取消按钮类型
                type: String,
                default: 'text'
            },
            buttonCentered:{//底部按钮是否居中显示
                type:Boolean,
                default:false
            },
            buttonBorder:{//底部取消按钮是否添加灰色的边框线
                type:Boolean,
                default:false
            },
        },
        setup(props, ctx) {
            const visible = ref(false);

            const open = () => {
                visible.value = true;
            };

            const close = () => {
                visible.value = false;
            };
            //点击确定的方法
            const handleOk = e => {
                visible.value = false;
                ctx.emit('ok', 'ok');
            };
            //点击不保存的方法
            const handleNotOk = e => {
                visible.value = false;
                ctx.emit('notOk', 'notOk');
            };
            //点击取消的方法
            const handleCancel = e => {
                visible.value = false;
            }

            return {
                visible,
                open,
                close,
                handleOk,
                handleNotOk,
                handleCancel
            };
        },

    });
</script>
<style lang="less" scoped>
    .y-modal-body {
        display: flex;
    }

    .y-modal-header {
        padding-bottom: 16px;
        color: rgba(0, 0, 0, 0.85);
        background: #fff;
        border-radius: 2px 2px 0 0;
        font-weight: 900;
    }

    .y-modal-icon .iconfont {
        color: var(--primary-color);
        font-weight: normal;
        font-size: 18px;
        margin-right: 10px;
        position: relative;
        top: -2px;
    }

    .y-modal-icon .red {
        color:#ff4d4f
    }

    .center{
        display: flex;
        justify-content: center;
    }

    .width-100{
        width: 100%;
    }

    .border{
        border: 1px solid #d9d9d9;
    }

    .border:hover{
        border: 1px solid #d9d9d9;
    }

    :global(.y-modal .ant-modal-content .ant-modal-body) {
        padding-bottom: 0;
        color: #8c8c8d;
    }

    :global(.y-modal .ant-modal-content .ant-modal-header) {
        border-bottom: 0;
    }

    :global(.y-modal .ant-modal-content .ant-modal-footer) {
        border-top: 0;
    }

    :global(.y-modal .ant-modal-footer .ant-btn-text) {
        color: #8c8c8d;
    }
</style>
