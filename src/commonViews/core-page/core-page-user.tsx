import {Vue,Component} from "vue-property-decorator";
import {mapState,mapActions} from "vuex";
@Component({
    render:function(h:any){
        const self:any=this;
        return (
        <cmIce-dropdown triggerType="click">
            <div class="core-header-avatar ">
                <i class="za za-user"></i>
            </div>
            <main slot="dropdown" class="yo-header-dropdown-main" >
                <div class="ice-line between core-header-dropdown-content" style={{padding:"2rem"}}>
                    <div class="ice-avatar medium">
                        <i class="fa fa-user"></i>
                    </div>
                    <div>
                        <div class="_name">{self.username}</div>
                        <div class="_position">{self.positionName}</div>
                    </div>
                </div>

                <div class="ice-line between" v-cm-ripple>
                    <i class="fa fa-changeKey"></i>
                    <b>修改密码</b>
                </div>
                <div onclick={self.logout} class="ice-line between" v-cm-ripple>
                    <i class="fa fa-exit"></i>
                    <b>退出</b>
                </div>
            </main>
        </cmIce-dropdown>
    )
    },
    computed:{
        ...mapState({
            "username":(state:any)=>state.user.username,
            "positionName":(state:any)=>state.user.positionName,
        })
    }
})
export class UserHeader extends Vue{
    username:string;
    positionName:string;
    created(){
    }
    logout(){
        this.$confirm("确认退出")
            .then(()=>{
                this.$message({
                    message:"退出成功",
                    type:"success"
                });
                this.$router.push("/login")
            })
            .catch(()=>{

            })
    }
}
