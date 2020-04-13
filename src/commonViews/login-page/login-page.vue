<!--
    auto created by @ztwx vue template!!

    @pageAuthor  :  zhan
    @AuthorEmail :  zhantewei@gmail.com
    @pageCreated :  2020-2-17 14:1:1
-->

<template src="./login-page.html">
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component} from "vue-property-decorator";
    import {projectName,providerName} from "@config";
    import {Form, rangeLengthValidator,maxLengthValidator,requiredValidator} from "@ztwx/form";

    @Component({
        computed:{
            accountError(this:any){
                return this.form.controllerDict.account.errors[0]||"";
            },
            passwordError(this:any){
                return this.form.controllerDict.password.errors[0]||"";
            }
        }
    })
    export default class extends Vue{
        backgroundBg:string="image/login-bg.jpg";

        projectName:string=projectName;
        providerName:string=providerName;

        loginLoading:boolean=false;

        form:Form=new Form([
            {id:"account",validator:[
                    new requiredValidator("请填写账号"),
                    new maxLengthValidator("账号长度超出限制",20)]
            },
            {id:"password",validator:[
                    new requiredValidator("请填写密码"),
                    new rangeLengthValidator((v:string)=>{
                        if(v&&v.length<3)return "密码长度不能小于3位";
                        if(v&&v.length>20)return "密码长度不能大于20位";
                        return "";
                    },3,20)
                ]}
        ]);

        toLogin(){
            const isPass:boolean=this.form.checkValidators();
            if(!isPass)return;
            this.pageLogin({...this.form.value});
        }
        //
        pageLogin(loginParameter:any){
            this.loginLoading=true;
            this.$store.dispatch("user/loginFromAccount",loginParameter)
        }
        created(){
            this.$store.subscribeAction((action,state)=>{
                if(action.type==="user/loginSuccess"){

                    this.loginLoading=false;
                    this.$router.push("/home/weclome");

                }else if(action.type==="user/loginFailure"){
                    this.loginLoading=false;

                }
            })
        }

    }
</script>
<style scoped src="./login-page.scss" lang="scss"></style>