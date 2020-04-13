import {VNode} from "vue";
import {DirectiveBinding} from "vue/types/options";
import {Controller} from "@ztwx/form";

const findFormComponent = (parent: any): any => {
    // console.log(parent.$data.for)
    if (!parent) return null;
    if (parent.$data.formName === "ice-form") return parent;
    return findFormComponent(parent.$parent);
};
const ControllerIDKEY = "iceControllerId";
const ControllerErrKEY = "iceControllerErrKey";
const attachElement = (containerEl: HTMLElement, attachEl: HTMLElement) => {
    const targetEl: any = containerEl.children[0];
    const h = targetEl.offsetTop + targetEl.offsetHeight;
    attachEl.style.top = h + "px";
}

export const formControlDirective = {
    bind: function (el: any, binding: DirectiveBinding, vnode: VNode) {
        el[ControllerIDKEY] = binding.value;
        // (this as any)["ice-binding-id"] = binding.value;
    },
    inserted(el: any, binding: DirectiveBinding, vnode: VNode) {
        const id = el[ControllerIDKEY];
        const instance: any = vnode.componentInstance;
        const form: any = findFormComponent(instance.$parent);
        const controller: Controller = form.$data.controllerDict[id];
        el[ControllerErrKEY] = false;
        const errorDiv = document.createElement("div");
        el.classList.add("ice-form-controller");
        errorDiv.className = "alert";

        if (!controller) return;
        (controller.valueChange as any).subscribe((controller: Controller) => {
            if (controller.errors && controller.errors.length) {
                errorDiv.innerText = controller.errors.join("。");
                attachElement(el, errorDiv);
                if (!el[ControllerErrKEY]) {
                    el.appendChild(errorDiv);
                    el.classList.add("ice-form-error-block");
                }
                el[ControllerErrKEY] = true;
            } else {
                if (el[ControllerErrKEY]) {
                    el.removeChild(errorDiv);
                    el.classList.remove("ice-form-error-block")
                }
                el[ControllerErrKEY] = false;
            }
        })
    },
    componentUpdated(el: any) {
        el.classList.add("ice-form-controller");
    }
};