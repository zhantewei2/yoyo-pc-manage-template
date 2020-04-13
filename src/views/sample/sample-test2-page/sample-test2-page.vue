<!--
    auto created by @ztwx vue template!!

    @pageAuthor  :  zhan
    @AuthorEmail :  zhantewei@gmail.com
    @pageCreated :  2020-2-17 14:40:1
-->

<template src="./sample-test2-page.html">
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class extends Vue{
    value1:string="";
    data1:string="";
    data2:string="";
     options:any= [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }];
     mounted(){
         console.log("sample-test2 mounted");
     }
}
</script>
<style scoped src="./sample-test2-page.scss" lang="scss"></style>