---
title: 回忆溢出开发参考
description: 在团队项目中，我们应该如何保持一致性？
author: 白彩恋
published: 2025-08-22
tags: [回忆溢出工作组, 团队开发, C-C++, Dart, FVV, Go, Kotlin, Rust, Shell, Git, 代码规范]
category: 开发
---

## 前言

回忆溢出所开发的项目，大多是**多语言**项目。要用哪些语言，主要写哪些语言，怎么写一致性，是一个需要明确的问题，在此进行多方面概述

## 多语言方针

首先要实现例如 **0 Python**、**0 Java** 等，尽可能不去写**非常用语言**

把语言限制在 `C/C++`、`Dart`、`Go`、`Kotlin`、`Rust` 几种内，也要尽可能不去写 `Shell`

写配置文件时也要尽可能使用 `FVV`，`FVV` 作为一个重点项目，虽然仍不完善，但使用它是十分必要的

### 尾随空行

能不加就不加，留着没什么用

### 命名规范

为了确保一致性，统一值/函数/类等命名是比较必要的，下面大概说说

> 部分语言可能会冲突，可以适当"入乡随俗"
>
> `Go` 的公开定义注意大写

命名时应当**简写但不能过简**，避免任何直接的 `i`、`j` 等单字母命名，而是使用 `idx` 或与用途相关的名字

> 仅用一个词时可以写为 `target`、`index`，组合时可写为 `tgt_idx`

但是写公开定义时，应当注重可读性，尽量不简写，除非实在是太长

```c
// 用 idx 而不是 i
for (int idx = 1; idx <= 10; ++idx)

// 用 uid 表明用途而不是 i
for (int uid = 1; uid <= 10; ++uid)


// 公开定义的命名应当适中长度，不能过短或过长
int const user_id = 114514;
```

#### 命名规则

> 公开定义应当注重可读性，可以不遵从此规则

- **全局**: 以 `gl` 开头
- **循环当前**: 以 `idx` 开头
- **引用**: 以 `ref` 开头
- **当前/目标**: 以 `tgt` 开头
- **临时**: 以 `tmp` 开头
- **测试**: 以 `x` 开头

```kotlin
// 全局值以 gl 开头
lateinit var glAppCtx: Application

// 循环中的当前值以 idx 开头
list.forEach { idxVal ->
    // ...
}

// 测试方法以 x 开头
fun xRunDebug()
```

#### 值定义

值应当小写开头，下划线命名，并且私有值应当以下划线开头

函数内部、传入或返回不属于私有，但 `Go` 的结构体方法的结构体属于

```go
type Struct struct {
    _stringValue  string
}

func (_struct *Struct) isEmpty() bool {
    return _struct._stringValue == ""
}
```

#### 函数定义

函数应当小写开头，驼峰命名

```c
void cFunc(void)
```

#### 类定义

类应当大写开头，驼峰命名

```cpp
class CppClass
```

#### 宏定义

尽量不用宏定义，命名规则看情况

```c
// 类函数宏定义使用函数规则
#define glMacroFunc(/*...*/)

// 常量宏定义使用全大写下划线命名
#define PKG_NAME "dev.oom_wg"
```

### 总体指南

减少不必要定义，如果没有重复使用则向上合并

## 各语言细则

### C/C++

#### 修饰符

修饰符的顺序应当是 `type` -> `static` -> `friend` -> `constexpr` -> `const` -> `volatile` -> `inline` -> `restrict`

因为一个值的类型是相对重要的，所以把它排在了最前面

#### 基本逻辑

在习惯上，应当实现以下内容

- 尽可能减少变量定义或放进判断/循环
- 善用逗号运算符
- 尽可能使用隐式转换
- 尽可能使用左增/减

```cpp
// 把定义放进判断，并且使用隐式判断 (opendir(/*...*/) 相当于 opendir(/*...*/) != nullptr)
if (DIR* dir = opendir(/*...*/))

// 把定义放进循环，并且使用隐式判断 (readdir(/*...*/) 相当于 readdir(/*...*/) != nullptr)
while (struct dirent const* entry =  readdir(/*...*/))

// 隐式判断 (!access(/*...*/, /*...*/) 相当于 access(/*...*/, /*...*/) == 0)
if (!access(/*...*/, /*...*/))

// 使用逗号运算符减少代码行数
return func1(/*...*/), func2(/*...*/);

// 使用左增/减
--num; ++num;
```

#### C++ 文件命名

统一采用 `cc` 和 `hh` 后缀

### Dart

#### 简化定义

能用 `=>` 就不用 `return`

```dart
void func() => /*...*/;
```

#### 避免完整声明

在 Dart 中，应当主要提供 IDE 得知一个值或函数的类型，需要尽可能简化代码中的声明

```dart
// 完整声明
final Object obj = /*...*/;

// 简化声明
final obj = /*...*/;

// 完整声明
final List</*...*/> list = </*...*/>[/*...*/];

// 简化声明
final list = [/*...*/];
```

### FVV

编写 FVV 时应当确保名称是以大写开头的驼峰命名

```fvv
HelloYa = <...>
```

### Go

在编写 Go 时需要尽量利用好语法特性，一次性变量可直接写在 `if` 里使用，兜底写在 `defer`，以及善用**字段标签**特性等

#### 编译

编译时用 [garble](https://github.com/burrowers/garble) 是比较重要的，毕竟 Go 的体积是比较大的，能小一点就小一点

### Kotlin

善用标准库的 Lambda 非常重要，像写 Java 一样写 Kotlin 和善用 Kotlin 语法写出来的代码完全是两种境界

#### 简化声明

与 Dart 相似，尽可能简化各类操作

```dart
fun func() = /*...*/
```

#### 避免声明类型

在 Kotlin 中，应当主要提供 IDE 得知一个值或函数的类型，需要尽可能简化代码中的声明

```kotlin
// 完整声明
val obj: Object = /*...*/

// 简化声明
val obj = /*...*/

// 完整声明
val list: List</*...*/> = listOf</*...*/>(/*...*/)

// 简化声明
val list = listOf(/*...*/)

// 完整声明
fun func(): /*...*/ = /*...*/

// 简化声明
fun func() = /*...*/
```

在定义可 `null` 值时，也应当避免声明类型，改用 `as` 进行声明

```kotlin
// 常规声明
val obj: Object? = null

// 避免声明
val obj = null as Object?
```

#### 善用 lazy

当一个值不会变动且开销较大，可以使用 `lazy` 来实现懒加载，使其只在使用时才会获取，而不是在启动时就获取

```kotlin
// 常规定义
val obj = /*...*/

// lazy 定义
val obj by lazy { /*...*/ }
```

#### 善用标准库 Lambda

善用标准库的 Lambda 可以很大地提升对 Kotlin 的理解以及代码质量

```kotlin expandable icon="code"
// 常规判断
if (/*...*/) {
    // ...
}

// Lambda 判断
obj.takeIf { /*...*/ }?.let {
    // ...
}

// 常规判断
if (obj == null) {
    // ...
}

// Lambda 判断
obj?.let {
    // ...
}

// 常规判断
val value = if (/*...*/) obj else null
val value = if (/*...*/) obj1 else obj2

// Lambda 判断
val value = obj.takeIf { /*...*/ }
val value = obj1.takeIf { /*...*/ } ?: obj2

// 常规异常捕获
try {
    // ...
} catch (/*...*/) {
    // ...
}
try {
    obj
} catch (/*...*/) {
    null
}
try {
    obj1
} catch (/*...*/) {
    obj2
}

// Lambda 异常捕获
/*obj.*/runCatching {
    // ...
}.onFailure {
    // ...
}
runCatching {
    obj
}.getOrNull()
runCatching {
    obj1
}.getOrDefault(obj2)

// 常规循环
for (it in list) {
    // ...
}

// Lambda 循环
list.forEach { /*it ->*/
    // ...
}

// 常规操作
obj.func1()
obj.func2()
obj.val1 = /*...*/
obj.val2 = /*...*/

// Lambda 操作
obj.apply {
    func1()
    func2()
    val1 = /*...*/
    val2 = /*...*/
}

// 常规构造字符串
val sb = StringBuilder()
sb.append(/*...*/)
val str = sb.toString()

// Lambda 构造字符串
val str = buildString {
    append(/*...*/)
}

// 常规构造列表
val list = mutableListOf</*...*/>()
list.add(/*...*/)

// Lambda 构造列表
val str = buildList {
    add(/*...*/)
}
```

#### 规范使用 with 与 run

`with` 与 `run` 的作用相同，为了统一，只在使用 `this` 的内容时使用 `with`，要修改 `this` 的内容或要返回内容时使用 `run`

```kotlin
// with
with(context) {
    startActivity(/*...*/)
}

// run
obj1.run {
    obj2
}
```

#### 善用 fast Lambda

`androidx.compose.ui:ui-util` 提供了一些 List 的辅助函数 `fastXXX`，善用它们来实现优化 List 性能

```kotlin
// 标准库
list.forEach { /*...*/ }
// ui-util
list.fastForEach { /*...*/ }

// 标准库
list.map { /*...*/ }
// ui-util
list.fastMap { /*...*/ }

// 标准库
list.joinToString()
// ui-util
list.fastJoinToString()
```

`ui-util` 包里缺少了部分 Lambda 的 fast 版本，可以使用其他 fast Lambda 替代实现或者不使用 fast Lambda

#### 善用 Sequence

通常的可遍历对象的 Lambda 会生成中间 List 然后再执行下一步，如果 List 过大，会很影响性能与开销

Sequence 可以解决这个问题，它不会生成中间临时值，不过 List 太小的话没必要用

```kotlin
// List 方法，会先执行 filter 生成一个中间 List，然后这个中间 List 再执行 map
list.filter { /*...*/ }.map { /*...*/ }

// Sequence 方法，不会立即执行 filter，调用 toList 的时候才会依次执行 filter、map，不会生成中间临时值
list.asSequence().filter { /*...*/ }.map { /*...*/ }.toList()
```

#### 转换 List

当遇到非标准 List 时，可以将其转为 List 再使用

```kotlin
// 通过 for 使用
for (idx in 0 until /*size*/) {
    val it = list[idx]
    // ...
}

// 转换为正常 List 后再使用
list.run { List(/*size*/) { this[it] } }.forEach {
    // ...
}
```

#### 善用 firstNotNullOfOrNull

`firstNotNullOfOrNull` 是一个比较长的拓展函数，用于返回第一个符合条件的内容，没有符合条件的内容时将返回 `null`，符合条件的要求是传入的 Lambda 中的返回内容不为 `null`

其返回的内容是传入的 Lambda 中的返回内容，因此可以直接在传入的 Lambda 中直接返回值中需要的内容或者值本身

```kotlin
// 获取列表里面可 null 值中第一个非 null 的
list.firstNotNullOfOrNull { it?.obj }?.let {
    // 在此直接使用 obj
    // ...
}

// 获取列表里面第一个符合条件的
list.firstNotNullOfOrNull { it.takeIf { /*...*/ } }?.let {
    // 在此使用值
    // ...
}
```

### Rust

Rust 在代码风格上就能有比较大的差异，在细节上把各处都明确好是很有必要的

在 workspace 应该配置好 lint 规则，默认使用 clippy 进行检查，并且多开规则并按需禁用，很多优化方法通过 lint 就能发现了

:::tip
很多优化例如 **链式调用** 等都可以通过 lint 来获得更好的写法，所以这里就不再提了
:::

#### 分号省略

由于 rustfmt 没有提供一个统一的风格，所以对于分号应当能省则省

使用 `return`/`break`/`continue` 这些关键词时可以不加分号

> `anyhow::bail` 这种内部调用了 `return` 的宏定义同样可以不加

`std::process::exit` 这种返回 `!` 类型的操作也可以不加分号

#### 简化使用

在定义变量时可以使用 `vec![]` 来代替 `Vec::new()`

在转换值时也可以把 `to_xxx()`/`into_xxx()` 改为 `into()` 来自动推导

#### 善用类型推导

Rust 的类型推导是比较优秀的，它能够通过上下文使用来推断出合适的类型，所以以下场景用起来都可以不声明类型:

```rust
// 通过赋值类型推导定义类型
let mut value;
value = 114514;

// 通过传入类型推导定义类型
let mut values = vec![];
values.push((value, value));

// 通过定义类型推导返回类型
let values = values.into_iter().collect::<Vec<(_, _)>>();
```

如果类型无法推导出来，也应该尽量把类型传给函数而不是 `let`

#### 错误忽略

在错误忽略时，用 `.ok()` 忽略 `Result` 错误而不使用 `let _ =`，避免在视觉上与常规的变量定义造成混淆

#### let 语法

在定义一次性变量或者必要变量时，通过 `if let` 与 `let else` 两个语法来简化逻辑是很必要的，前者减少行数，后者展平嵌套

#### match 使用

Rust 的 `match` 在一些方面不如其他语言方便，所以使用频率会较低，不过在匹配非 `enum` 值的类型时也可以用用:

```rust
match () {
    () if value.is_a() => { /* ... */ }
    () if value.is_b() => { /* ... */ }
    () => unreachable!()
}
```

#### 借用与消耗

在定义函数时，如果要在传参中定义例如 `PathBuf` 这种无 `Copy` 但**没有实际消耗意义**的类型

那么无论该值在实际上下文中被使用了多少次，都应该优先**借用**

如果定义了例如用于解析命令行的类型，那么无论在使用时是否消耗了里面的值，都应该**消耗**整个值，依此代表一次性执行或执行后会退出

#### 兜底策略

在兜底时避免写 `let _guard =` 这种不使用的变量来等它自动 `drop`

应该写嵌套函数，给壳函数传递 `FnOnce` 来执行主要逻辑，在壳函数里完成兜底

如果是复杂值，也可以包装一个类型为它写一个 `Drop` 更方便

#### feature 使用

一般来说 **nightly** 工具链用的比较多，一些比较实用的 feature 例如 `try` 都可以打开来用用

不过毕竟只是 feature，难免有些欠缺，只能说是有点用才去开

#### 三方 crate 使用

Rust 的标准库在大部分情况下已经足够丰富，很多老代码在部分地方都可以把三方 crate 换为标准库（例如 `lazy_static` 换成 `LazyLock` 等）

不过有些地方仍然需要三方 crate 来辅助，例如使用 `anyhow` 来兼容不同 `Error` 类型
（不过当 `Error` 类型一致或已经为 `Result` 传入 `Error` 类型时，应当避免用它）

> 打印 `anyhow::Error` 时应当优先用 `:#` 打印必要信息，调试情况下则可以用 `:?` 打印更多信息，但是应当避免默认打印导致无法输出错误信息

`camino` 提供的 UTF8 路径类型能够很好地避免标准库路径类型转换成 UTF8 字符串时的额外判断，也能比较方便地直接拿它对 UTF8 字符串进行操作

`const_format` 能在宏定义中使用已有常量来拼接常量，能简化一些硬编码

`rustix`/`nix` 之类的能在 Unix 平台上提供很多标准库没有的函数，不过还是应当优先使用标准库的 Unix 函数，没有的再去用三方 crate 的

> 对于类型，标准库基本上都已经标了废弃，应当优先使用 `libc`/`linux-raw-sys` 的而不是复制标准库定义，因为很多类型在不同平台/架构上都有差异

### Shell

#### 简化逻辑

编写 Shell 时应当求简避繁

```shell
# 使用 : 替代 true
while :; do
    # ...
done

# 使用 && 与 || 替代 if
[ : ] && {
    # ...
    # 如果需要出错时不走 else 分支，应当在末尾添加 true
    true
} || {
    # ...
}

# 用 . 替代 source
. shell.sh
```

#### 多写 POSIX，避免 Bash

`BusyBox` 的 `Ash` 并不支持 `Bash` 语法，应当避免任何 `Bash` 语法，以免出现兼容性问题，但是可以写一写 `Mksh` 语法

## Git

在使用 Git 时也要注意一些事情

### 提交描述

在编写 Git 提交时，如果要省事，也要能表达大概的意思

- `Up`/`Update`: 较杂的变动，或者内容更新等
- `Fix`: 修复
- `Opt`/`Optimize`: 优化

### 尽可能避免合并

新建提交前一定要先拉取，再提交，避免掉任何不必要的合并是相当重要的