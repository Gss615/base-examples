# 响应式表单
FormControl：跟踪单个表单控件的值和验证状态。
FormGroup：跟踪一组FormControl实例的值和验证状态
FormArray：跟踪一个控件数组的值和有效性状态，控件可以是FormControl、FormGroup和FormArray的实例。
FormBuilder：提供一个语法糖，简化FormControl，FormGroup，FormArray实例的创建过程
```ts
// 单个 FormControl
form1 = new FormControl('initVal')
// 表单组 FormGroup
form2 = new FormGroup({
   first:new FormControl(''),
   last:new FormControl('')
})
// 嵌套表单组
form3 = new FormGroup({
    name:new FormControl('')
    address:new FormGroup({
        street:new FromControl(''),
        city:new FromControl('')
    })
})
  

```
html
```html
<!-- form1 -->
<input [formControl]='form1' .../> //formControl指令关联form1
<!-- form2 -->
<form [formGroup]='form2'>
    <input formControlName='first' />  //formControlName用来关联group中的FormControl
    ...
<!-- form3 -->
<form [formGroup]='form3'>
    <input formControlName='name' />
    <!-- formGroupName 关联子表单组 address -->
    <div formGroupName='address'>
        <input fromControlName='street'>
        ....

```

## FormBuilder
// function
group # 自动生成 formGroup 控件

```ts
constructor(private fb:FormBuilder){}
form = this.fb.group({
    firstName:[''],
    lastName:[''],
    address:this.fb.group({
        street:[''],
        city:['']
    })
})

```

## 表单验证
```ts
this.fb.group({
    firstName['',Validators.required]
})
```
## 动态表单
FormArray
```ts
constructor(private fb: FormBuilder) { }
form = this.fb.group({
    fbFirst:['str'],
    aliases:this.fb.array([
      this.fb.control('') //  FormBuilder.control()返回一个初始控件
    ])
  })
  get aliases(){
    return this.form.get('aliases') as FormArray // FormBuilder实例的get方法返回 aliases 属性的值（值为FormArray的实例）
  }
  addAlias(){
      // FormArray的push方法增加新控件
    this.aliases.push(this.fb.control('')) //  FormBuilder.control()返回一个初始控件
  }
```

一些常用方法：
FormControl FormGroup FromArray
    setValue()  修改值
    patchValue() 更新值
    reset() 重置
    get() 获取表单实例的属性  form.get('firstName')
   

FromArray
    push() 表单末尾添加一个新的表单控件
    insert()  指定位置插入表单控件
    removeAt() 移除指定index处的控件
    setControl()  替换 index...
    clear() 移除FormArray所有控件

FormBuilder
    group() 创建新的FormGroup实例 
    control() 创建新的FormControl实例
    array() 创建新的FormArray实例 
```ts
const control = new FormControl({ value: 'n/a', disabled: true });  // 初始化表单，并禁用
const form = new FormControl('', { updateOn: 'submit' }); // 控件 submit 事件时更新
form.reset({ value: 'Drew', disabled: true }); // 把控件重置并设置为 disabled

```
表单API汇总
https://angular.cn/guide/reactive-forms#reactive-forms-api-summary



## 其他：
updateOn 设置控件什么时候更新值 blur focus change keydown keyup 还有submit...等


## 表单验证

模版驱动 ngModel
```html
<!-- 首先需要 ngModel 支持，这里的ngModel继承自NgControl，有表单控件的属性和方法 -->
<input type="text" id="name" name="name" class="form-control"
      required minlength="4" appForbiddenName="bob"
      [(ngModel)]="hero.name" #name="ngModel">
name.invalid
name.errors
Validators
...
<!-- 添加自定义验证器，除了在构造函数中注入，应该还需要注册 一个指令 -->

providers: [{provide: NG_VALIDATORS, useExisting: ForbiddenValidatorDirective, multi: true}]

```

响应式验证器
```ts
this.heroForm = new FormGroup({
    name: new FormControl(this.hero.name, [
    Validators.required,
    Validators.minLength(4),
    forbiddenNameValidator(/bob/i)
    ]),
    alterEgo: new FormControl(this.hero.alterEgo, {
    asyncValidators: [this.alterEgoValidator.validate.bind(this.alterEgoValidator)],//异步
    updateOn: 'blur'
    }),
    power: new FormControl(this.hero.power, Validators.required)
});
```


内置验证器：Validators
https://angular.cn/api/forms/Validators
```ts
new FormControl('', [Validators.required,Validators.minLength(4),custom(bob/i)]) // custom 自定义验证器

```
自定义验证器：是一个返回函数（闭包），接收一个正则（即验证规则）；返回一个验证函数，表单控件会调用这个验证函数，验证函数内部才是验证逻辑。
```ts
//  通常在验证有效时返回 null 否则返回错误对象
export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isGood = nameRe.test(control.value);
    return isGood ? {error: {value: control.value}} : null;
  };
}
```

表单控件状态类 class 
.ng-valid  // 有效
.ng-invalid // 无效
.ng-pending // 异步验证器进入pending状态
.ng-pristine
.ng-dirty
.ng-untouched
.ng-touched
.ng-submitted (只对 form 元素添加)
```css
.ng-valid[required], .ng-valid.required  {
  border-left: 5px solid #42A948; /* green */
}

.ng-invalid:not(form)  {
  border-left: 5px solid #a94442; /* red */
}

.form-group {
  margin-bottom: 1rem;
}
...
```

交叉验证：
主要用来对表单的不同字段进行比较（联动效果）
```ts
const heroForm = new FormGroup({
  'name': new FormControl(),
  'alterEgo': new FormControl(),
  'power': new FormControl()
}, { validators: identityRevealedValidator }); // FromGroup的第二个参数为验证器
// identityRevealedValidator 接收 表单控件对象作为参数，表单有效时返回null，否则 返回error对象
export const identityRevealedValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const name = control.get('name'); // 通过  FormGroup 的 get 方法 获取自控件
  const alterEgo = control.get('alterEgo');

  return name && alterEgo && name.value === alterEgo.value ? { identityRevealed: true } : null;
};

```

异步验证器
异步验证器在同步验证器成功时才会执行

```ts
// 创建异步验证器，和同步类似，不过需要返回一个promise
@Injectable({ providedIn: 'root' })
export class UniqueAlterEgoValidator implements AsyncValidator {
  constructor(private heroesService: HeroesService) {}

  validate( ctrl: AbstractControl ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.heroesService.isAlterEgoTaken(ctrl.value).pipe(
      map(isTaken => (isTaken ? { uniqueAlterEgo: true } : null)),
      catchError(() => of(null))
    );
  }
}
```

