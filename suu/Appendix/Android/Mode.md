---
title: 模式对照
titleTemplate: 苏柚 Android
description: 苏柚 Android 版运行模式对照表
icon: "settings-2"
---

## 运行模式对照表

下方表格展示了苏柚中各种运行模式及其对应的实际权限和 root 需求：

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>名称</TableHead>
      <TableHead>实际权限</TableHead>
      <TableHead>需要 root</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>良民模式</TableCell>
      <TableCell>普通用户(user)</TableCell>
      <TableCell>否</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>僭越模式</TableCell>
      <TableCell>adb(shell)</TableCell>
      <TableCell>否</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>欢愉模式</TableCell>
      <TableCell>root(su)</TableCell>
      <TableCell>是</TableCell>
    </TableRow>
  </TableBody>
</Table>

<Info>
不同模式下，苏柚的功能范围和权限级别会有所不同。欢愉模式提供最完整的功能，但需要 root 权限。
</Info>
