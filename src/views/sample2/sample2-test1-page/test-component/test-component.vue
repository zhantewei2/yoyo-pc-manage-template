<!--
    auto created by @ztwx vue template!!
    @pageAuthor  :  zhan
    @AuthorEmail :  zhantewei@gmail.com
    @pageCreated :  2020-2-27 11:11:28
-->
<template>
        <div>
            <div class="cm-search-card">
                <Row>
                    <Cell>
                        <Label>父级绑定</Label>
                        <Value>
                            <el-input type="text" v-model="iceParentData.value"/>
                        </Value>
                    </Cell>
                </Row>
                <el-button @click="back()">back</el-button>
            </div>

            <div>
                <el-button @click="toTest2()">to test2</el-button>
            </div>
        </div>
</template>

<script lang="ts">
import Vue,{CreateElement,RenderContext} from "vue";
import {Component,Prop} from "vue-property-decorator";
import Test2Component from "../test2-component/test2-component.vue";

@Component({})
export default class extends Vue{
    @Prop({})iceParentData:Record<string, any>;
    @Prop({})iceParent:any;
    name:string="222222212124";
    constructor(props:any) {
        super(props);
    }
    click(){
        this.iceParentData.value="4556";
    }


    back(){
        this.$iceSub.back();
    }
    toTest2(){
        this.$iceSub.push("test2");
    }

}
</script>
<style scoped src="./test-component.scss" lang="scss"></style>