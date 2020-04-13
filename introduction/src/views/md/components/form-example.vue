<!--
    auto created by @ztwx vue template!!
    @pageAuthor  :  zhantewei
    @AuthorEmail :  zhantewei@gmail.com
    @pageCreated :  2020-3-26 17:20:22
-->

<template>
    <div class="cm-search-card">
        <Form :form="form">
            <Row>
                <Cell>
                    <Label>
                        名称
                    </Label>
                    <Value v-form-controller="'name'">
                        <el-input v-model="form.value.name"/>
                    </Value>
                </Cell>

                <Cell>
                    <Label>
                        公司
                    </Label>
                    <Value v-form-controller="'company'">
                        <el-input v-model="form.value.company"/>
                    </Value>
                </Cell>
            </Row>
            <Row>
                <Cell>
                    <Label>性别</Label>
                    <Value v-form-controller="'gender'">
                        <el-select v-model="form.value.gender" clearable>
                            <el-option :value="0" label="男"/>
                            <el-option :value="1" label="女"/>
                        </el-select>
                    </Value>
                </Cell>
                <Cell>
                    <Label>邮箱</Label>
                    <Value v-form-controller="'email'">
                        <el-input v-model="form.value.email"/>
                    </Value>
                </Cell>
            </Row>
            <Row>
                <Cell>
                    <Label>只能输入a和b</Label>
                    <Value v-form-controller="'regexp'">
                        <el-input v-model="form.value.regexp" />
                    </Value>
                </Cell>
                <Cell>
                    <Label>不需要校验</Label>
                    <Value>
                        <el-input v-model="form.value.optinal"/>
                    </Value>
                </Cell>
            </Row>
        </Form>
        <Aside class="text-right">
            <el-button type="primary" @click="submit">提交检查</el-button>
            <el-button @click="form.reset()">重置</el-button>
        </Aside>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component} from "vue-property-decorator";
    import {Form,
        requiredValidator,
        rangeLengthValidator,
        emailValidator,
        regExpValidator
    } from "@ztwx/form";
    @Component({})
    export default class extends Vue{
        form:Form=new Form([
            {id:"name",validator:[new requiredValidator("不可为空")]},
            {id:"company",validator:[
                new rangeLengthValidator("10>=字符长度需要>=2",2,10),
                new requiredValidator("满足长度的同时，也不能为空。")
            ]},
            {id:"gender",validator:[
                new requiredValidator("性别必须选")
            ]},
            {id:"email",validator:[
                new emailValidator("这是预设的邮箱校验器")
            ]},
            {id:"regexp",validator:[
                new regExpValidator("自定义正则校验",/^[a-b]+$/)
            ]},
            {id:"optional",validator:[]} //不需要做校验
        ]);
        submit(){
           const isPass=this.form.checkValidators();
           if(!isPass)return;
           const result=this.form.value;
           alert(`
通过校验,表单值为：
    ${JSON.stringify(result,null,4)};
            `);
        }
    }
</script>