<!--
    auto created by @ztwx vue template!!
    @pageAuthor  :  zhan
    @AuthorEmail :  zhantewei@gmail.com
    @pageCreated :  2020-2-27 11:13:49
-->

<template>
    <div>
        test2Component component work!!!
        <input v-model="value" >
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";

@Component({
    name:"test2"
})
export default class extends Vue{
    name:string="test2";
    value:string="";
    created(){

    }

}
</script>
<style scoped src="./test2-component.scss" lang="scss"></style>