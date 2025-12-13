---
title: GBB优质存储
titleTemplate: 苏柚 Android
description: 使用苏柚的 GBB 优质存储功能进行数据重定向和管理
icon: "hard-drive"
---

<Callout type="tip">
GBB 优质存储仅能在**欢愉模式**使用
</Callout>

<Callout type="tip">
直接修改配置文件属于高阶玩法，请自行探索哦~
</Callout>

## 原理

通过 root 权限与 Zygisk API 重定向目录

## 使用

仅可通过附加模块运行

## 配置

配置页面内有覆盖配置按钮，可用于恢复默认配置或导入指定配置

配置页面内有导出配置按钮，可用于导出当前配置

### 信息配置

信息配置包括以下内容:

- 名称
- 作者
- 版本

<Callout type="note">
信息配置对功能**无任何作用**，仅用于标记配置信息
</Callout>

### 基本配置

基本配置包括以下内容:

- 调试模式
- 多用户支持

<Callout type="note">
<code>多用户支持</code>默认强制执行
</Callout>

#### 调试模式

用于输出更多日志以排查问题

#### 多用户支持

用于处理多个用户上的数据

### 功能配置

功能配置包括以下内容:

- 全局挂载列表
- 软件挂载列表

#### 全局挂载列表

<Callout type="info">
挂载的目录**全局生效** (所有软件**可见**)
</Callout>

<Accordion>
  <AccordionItem title="挂载设置">
    <Tabs>
      <Tab title="源路径">
        要重定向到的路径 (会挂载到<code>目标路径列表</code>)
      </Tab>
      <Tab title="目标路径列表">
        要重定向的路径 (会被<code>源路径</code>挂载)
      </Tab>
    </Tabs>
  </AccordionItem>
</Accordion>

#### 软件挂载列表

<Callout type="info">
挂载的目录**仅指定软件生效** (其他软件**不可见**)
</Callout>

<code>源路径</code>、<code>目标路径列表</code>与<code>全局挂载列表</code>的一致

##### 包名列表

要生效的软件包名
