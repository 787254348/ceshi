<template>
    <a-popover  trigger="click" v-model:visible="visible">
      <template #content>
        <yBackgroundColor @ok="getColor" :color="color" :background="background"></yBackgroundColor>
      </template>
      <slot>
          <a-button type="link" :style="colorStyle" style="margin-left: 200px;">A</a-button>
      </slot>
    </a-popover>
</template>

<script>
    import yBackgroundColor from '../y-background-color/y-background-color.vue'
    import {
        defineComponent,
        ref
    } from 'vue';
    export default defineComponent({
        components: {
            yBackgroundColor,
        },
        props:{
            color:{
                type:String,
                default:'#000000'
            },
            background:{
                type:String,
                default:'none'
            }
        },
        setup(props, ctx) {
          const colorStyle = ref(`color:${props.color};background:${props.background};`);
          const visible = ref(false);
          const getColor= (obj) => {
              colorStyle.value = `color:${obj.color};background:${obj.background};`
              visible.value = false;
              ctx.emit('ok',obj)
          }
          return {
            colorStyle,
            visible,
            getColor
          }
        }
    })
</script>

<style lang="less" scoped>
</style>