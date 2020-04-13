/* el-dialog头部拖拽
* 例:<el-dialog v-elDialogDrag></el-dialog>
*/
Vue.directive('elDialogDrag', {
    inserted: function (el, binding, vnode) {
        let dialogEl: any = el.getElementsByClassName("el-dialog")[0];
        let headerEl = el.getElementsByClassName("el-dialog__header")[0];
        let x = 0;
        let y = 0;
        let l = 0;
        let t = 0;
        let isDown = false;
        //鼠标按下事件
        headerEl.addEventListener("mousedown", (e: any) => {
            //获取x坐标和y坐标
            x = e.clientX;
            y = e.clientY;

            //获取左部和顶部的偏移量
            l = dialogEl.offsetLeft;
            t = dialogEl.offsetTop;
            //开关打开
            isDown = true;
            //设置样式  
            dialogEl.style.cursor = 'move';
        })

        //鼠标抬起事件
        el.addEventListener("mouseup", (e: any) => {
            isDown = false;
            dialogEl.style.cursor = 'default';
        })

        //鼠标移动
        window.onmousemove = function (e: any) {
            if (isDown == false) {
                return;
            }
            //获取x和y
            let nx = e.clientX;
            let ny = e.clientY;
            //计算移动后的左偏移量和顶部的偏移量
            let nl = nx - x;
            let nt = ny - y;
            dialogEl.style.left = nl + 'px';
            dialogEl.style.top = nt + 'px';
        }
    }
})