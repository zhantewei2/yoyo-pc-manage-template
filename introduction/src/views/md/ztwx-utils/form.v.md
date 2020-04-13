# Form

表单验证

### 新建表单
```javascript
import {
    Form,
    requiredValidator,
    minLengthValidator,
    rangeLengthValidator
} from "@ztwx/form"

const form:Form=new Form([
    {id:"name",validator:[new requiredValidator("必须填写名称")]},
    {id:"length",validator: [new minLengthValidator("不能小于1",1)]},
    {id:"err",validator: [
        new rangeLengthValidator(
            value=>`不能取${value}，需要大于等于1，小于等于10`,
            1,
            10
        )
    ]}
])
```

### Controller
每一被控制元素为一个`controller`

- id: `string;`
- validator: `Validator | Validator[];`
- value?: `ValueType;`
- errors?: `string[];` 错误集合。仅当前`controller`触发错误时，该集合不为空。
- valueChange?: `Subject<Controller>`; 
- reset?:` () => void;`  重设当前controller值
- _value?:` ValueType;`

### Form

- controllers: `Controller[];`
- controllerDict: `{[key:string]:Controller}`
- **reset** 重设所有表单值
- **checkValidators**:`boolean` 手动校验整张表单，返回是否通过。一般在提交动作时，使用。
- valueChange: `Subject<Controller>` 订阅整张表单变化


# Validator
### 预设validator
- requiredValidator  必须值校验
- emailValidator 邮箱
- maxValidator 最大值（数字）
- maxLengthValidator 最大长度 (字符串)
- minValidator 最小值
- minLengthValidator 最小长度
- rangeValidator 数值范围(数字)
- rangeLengthValidator 长度范围(字符串)
- regExpValidator   正则校验

### 自定义校验器:

```typescript
import {Validator} from "@ztwx/form";
export class CustomValidator implements Validator{}
```
现实`Validator`类。主要实现apply方法，和errMessage存放.
