import Vue,{CreateElement} from "vue";
import {Component,Prop,Watch} from "vue-property-decorator";
import {PageChangeFn} from "../types/types";
import {of, Subject} from "rxjs";
import {concatMap, delay} from "rxjs/operators";


@Component({
    render(h:CreateElement){
        const self:any=this;
        return (
            <div class="rel">
                <yo-mini-loader show={self.showLoader}></yo-mini-loader>
                <div class={["yo-loading-bg",self.showLoader?"active":""]}>
                    {
                        h("el-table",{
                            props:Object.assign(self.$attrs,self.$props,self.elementTableProps),
                            scopedSlots:self.$scopedSlots,
                            on:self.$listeners
                        },[])
                    }
                    <div class="yo-pagination-container">
                        {
                            h("el-pagination",{
                                on:{
                                    "size-change":self.sizeChange,
                                    "current-change":self.currentChange
                                },
                                props:{
                                    pageSizes:self.page_sizes,
                                    layout:self.pagination_layout,
                                    total:self.total
                                }
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
})
export default class extends Vue{
    elementTableProps:any={
        pageChange:undefined,
        total:undefined,
        border:true,
        background:true,
        loading:undefined
    };
    @Prop({default:250})loaderDebounceTime:number; //loader 最小间隔时间
    @Prop({})pageChange:PageChangeFn;
    @Prop({default:0})total:number;
    @Prop({default:false})loading:boolean;
    pagination_layout="total,sizes,prev,pager,next,jumper";
    page_sizes=[10,20,30,40,50];
    pageSize:number=10; //每页条目数
    currentPage:number=1; //当前页

    /**
     * loader控制
     */
    showLoaderSubject:Subject<boolean>;
    showLoader:boolean=false;
    currentChange(currentPage:number){
        this.currentPage=currentPage;
        this.tableChange();
    }
    sizeChange(size:number){
        this.pageSize=size;
        if(this.currentPage*this.pageSize>this.total)return;
        this.tableChange();
    }

    /**
     * 统一触发
     */
    tableChange(){
        this.pageChange&&this.pageChange({
            pageSize:this.pageSize,
            currentPage:this.currentPage
        })
    }

    @Watch("loading")
    watchShow(value:boolean){
        this.showLoaderSubject.next(value);
    }

    created(){
        this.showLoaderSubject=new Subject<boolean>();
        this.showLoaderSubject
            .pipe(
                concatMap((v:boolean)=> {
                    return this.showLoader ? of(v).pipe(delay(this.loaderDebounceTime)) : of(v)
                })
            )
            .subscribe((show:boolean)=>{
                this.showLoader=show;
            });
    }




}