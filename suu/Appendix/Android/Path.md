---
title: 路径对照
titleTemplate: 苏柚 Android
description: 苏柚 Android 版路径变量对照表
icon: "folder-open"
---

## 路径变量对照表

下方表格展示了苏柚中使用的各种路径变量及其对应的实际路径：

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>变量</TableHead>
      <TableHead>单用户</TableHead>
      <TableHead>多用户</TableHead>
      <TableHead>需要 root</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell><code>{id}</code></TableCell>
      <TableCell><code>0</code></TableCell>
      <TableCell><code>&lt;用户ID&gt;</code></TableCell>
      <TableCell>仅多用户</TableCell>
    </TableRow>
    <TableRow>
      <TableCell><code>{storage}</code></TableCell>
      <TableCell><code>/sdcard</code></TableCell>
      <TableCell><code>/storage/emulated/{id}</code></TableCell>
      <TableCell>仅多用户</TableCell>
    </TableRow>
    <TableRow>
      <TableCell><code>{androidData}</code></TableCell>
      <TableCell><code>{storage}/Android/data</code></TableCell>
      <TableCell><code>{storage}/Android/data</code></TableCell>
      <TableCell>是</TableCell>
    </TableRow>
    <TableRow>
      <TableCell><code>{androidMedia}</code></TableCell>
      <TableCell><code>{storage}/Android/media</code></TableCell>
      <TableCell><code>{storage}/Android/media</code></TableCell>
      <TableCell>是</TableCell>
    </TableRow>
    <TableRow>
      <TableCell><code>{androidObb}</code></TableCell>
      <TableCell><code>/storage/Android/obb</code></TableCell>
      <TableCell><code>/storage/Android/obb</code></TableCell>
      <TableCell>是</TableCell>
    </TableRow>
    <TableRow>
      <TableCell><code>{userData}</code></TableCell>
      <TableCell><code>/data/data</code></TableCell>
      <TableCell><code>/data/user/{id}</code></TableCell>
      <TableCell>是</TableCell>
    </TableRow>
    <TableRow>
      <TableCell><code>{dataMedia}</code></TableCell>
      <TableCell><code>/data/media/0</code></TableCell>
      <TableCell><code>/data/media/{id}</code></TableCell>
      <TableCell>是</TableCell>
    </TableRow>
  </TableBody>
</Table>

<Callout type="note">
在多用户环境中，<code>{id}</code> 变量会自动替换为当前用户的 ID。
</Callout>
