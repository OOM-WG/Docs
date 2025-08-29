---
title: 二周目: SukiSU Ultra 项目中的逆天操作
date: 2025-08-29
summary: SukiSU Ultra 为何如此千疮百孔？
category: 白彩恋
tags: [SukiSU Ultra, root, 开发, C/C++]
---

> [一周目请见此处](go4-sukisu-ultra)

## 前言

SukiSU Ultra 在 [v3.1.9 的一次提交](https://github.com/SukiSU-Ultra/SukiSU-Ultra/commit/48d7a130283ade2b671565e49bf4485906a1cc26)中添加了让人感到莫名其妙的**模块签名验证**，验证了什么在**提交**里面没写，在**仓库**里面也没写，在**发布**里面也没写，在**文档**里面更没有写

就这么一个莫名其妙的验证，添加进去了也**没有任何说明**，细翻了一下源码也**没有开源**，只有一个 10MB 大小的共享库文件，这种大小一看就是没有剥离符号的（或者是真的代码量巨大的，但是 SukiSU Ultra 可能吗？），不过在构建正式版的时候会被自动剥离成 1.5MB 的共享库了

```plaintext
libzakosign.so: ELF 64-bit LSB shared object, ARM aarch64, version 1 (SYSV), dynamically linked, with debug_info, not stripped
```

> 虽然在此处并没有涉及，但是还是要稍微提一下
>
> 部分对 C/C++ 一无所知的“开发者”往往会构建出 **未剥离符号**、**依赖C++共享库** 的“神仙”产物，归根结底是因为“开发者”连构建都不知道怎么构建导致的

没有开源，也没有具体说明，还能怎么办呢？只能逆向一下了

在翻的过程中，SukiSU Ultra 的“**杂鱼文学**”真的让人震惊，v3.1.9 的安装包里面有五个以 `zako` 命名的共享库文件（其中部分实际上是可执行文件），它们具体都是什么呢？

- `libzako.so`: KernelSU 的 JNI 共享库（原本是 `libkernelsu.so`）
- `libzakoboot.so`: Magisk 的 boot 工具可执行（原本是 `libmagiskboot.so`/`magiskboot`）
- `libzakosign.so`: 本期主角，SukiSU Ultra 自己的莫名其妙的模块验证共享库
- `libzakozako.so`: KernelSU 的 CLI 可执行（原本是 `libksud.so`/`libksud_magic.so`/`ksud`）
- `libzakozakozako.so`: SuSFS 的 CLI 可执行（原本是 `libsusfsd.so`/`susfsd`）

把自己的和第三方的都命名成这么莫名其妙的毫无意义的名字，生怕别人知道某个文件是干什么的吗？

## 模块验证具体内容

> 以下代码均为逆向出的**伪代码**，**不等同于源码**，但**与源码较为相似**

把这个 arm64 的 `libzakosign.so` 逆向后，真的非常令人感到莫名其妙，一直用莫名其妙这个词是因为这些东西真的令人非常疑惑，下面就大概看看吧

```c
void *zako_allocate_safe(size_t size)
{
  return calloc(1uLL, size);
}

int64_t zako_syscall0(void *a1, void *a2, void *a3, void *a4, void *a5, void *a6, void *a7)
{
  return linux_eabi_syscall((int64_t)a1, a1, a2, a3, a4, a5, a6, a7);
}

int64_t zako_syscall1(int64_t a1, void *a2, void *a3, void *a4, void *a5, void *a6, void *a7)
{
  return linux_eabi_syscall(a1, a2, a2, a3, a4, a5, a6, a7);
}

int64_t zako_syscall2(int64_t a1, void *a2, void *a3, void *a4, void *a5, void *a6, void *a7)
{
  return linux_eabi_syscall(a1, a2, a3, a3, a4, a5, a6, a7);
}

int64_t zako_syscall3(int64_t a1, void *a2, void *a3, void *a4, void *a5, void *a6, void *a7)
{
  return linux_eabi_syscall(a1, a2, a3, a4, a4, a5, a6, a7);
}

int64_t zako_syscall4(int64_t a1, void *a2, void *a3, void *a4, void *a5, void *a6, void *a7)
{
  return linux_eabi_syscall(a1, a2, a3, a4, a5, a5, a6, a7);
}

int64_t zako_syscall5(int64_t a1, void *a2, void *a3, void *a4, void *a5, void *a6, void *a7)
{
  return linux_eabi_syscall(a1, a2, a3, a4, a5, a6, a6, a7);
}

int64_t zako_syscall6(int64_t a1, void *a2, void *a3, void *a4, void *a5, void *a6, void *a7)
{
  return linux_eabi_syscall(a1, a2, a3, a4, a5, a6, a7, a7);
}

bool zako_sys_file_exist(const char *a1)
{
  return access(a1, 0) == 0;
}

int64_t zako_sys_file_open(const char *a1)
{
  int64_t result;

  result = open(a1, 0);
  if ( (uint32_t)result == -1 )
  {
    printf("[-] ");
    printf("Failed to open %s", a1);
    putchar(10);
    return 0xFFFFFFFFLL;
  }
  return result;
}

ssize_t zako_sys_file_append_end(int fd, const void *buf, size_t n)
{
  return write(fd, buf, n);
}

int64_t zako_sys_file_close(int fd)
{
  return close(fd);
}

off_t zako_sys_file_sz(int a1)
{
  struct stat _0;

  fstat(a1, &_0);
  return _0.st_size;
}

off_t zako_sys_file_szatpath(const char *a1)
{
  struct stat _0;

  stat(a1, &_0);
  return _0.st_size;
}

void *zako_sys_file_map(int fd, size_t a2)
{
  return mmap(0LL, a2, 1, 1, fd, 0LL);
}

void *zako_sys_file_map_rw(int fd, size_t a2)
{
  return mmap(0LL, a2, 3, 1, fd, 0LL);
}

int64_t zako_sys_file_unmap(void *addr, size_t len)
{
  return munmap(addr, len);
}

bool zako_esign_set_publickey(int64_t a1, const EVP_PKEY *a2)
{
  return zako_get_public_raw(a2, (uint8_t *)(a1 + 3680));
}

char *zako_esign_verrcidx2str(uint8_t a1)
{
  if ( a1 <= 0x1Eu )
    return error_messages[a1];
  else
    return 0LL;
}

EVP_PKEY *zako_load_private(const uint8_t *a1, void *a2)
{
  return zako_load_anykey(a1, a2);
}

EVP_PKEY *zako_parse_private(const char *a1, void *a2)
{
  return zako_parse_anykey(a1, a2);
}

int64_t zako_load_public(int64_t a1)
{
  return zako_load_anykey(a1, 0LL);
}

int64_t zako_parse_public(int64_t a1)
{
  return zako_parse_anykey(a1, 0LL);
}

EVP_PKEY *zako_parse_public_raw(const uint8_t *a1)
{
  return EVP_PKEY_new_raw_public_key(949, 0LL, a1, 0x20uLL);
}

bool zako_get_public_raw(const EVP_PKEY *a1, uint8_t *a2)
{
  size_t out_len;

  out_len = 32LL;
  return EVP_PKEY_get_raw_public_key(a1, a2, &out_len) != 0;
}

int64_t zako_trustchain_add_intermediate_str(int64_t a1, int64_t a2)
{
  OPENSSL_STACK *v2;
  void *v3;

  v2 = *(OPENSSL_STACK **)(a1 + 8);
  v3 = (void *)zako_x509_parse_pem(a2);
  OPENSSL_sk_push(v2, v3);
  return 1LL;
}

int64_t zako_trustchain_add_intermediate_der(int64_t a1, int64_t a2, int64_t a3)
{
  OPENSSL_STACK *v3;
  void *v4;

  v3 = *(OPENSSL_STACK **)(a1 + 8);
  v4 = (void *)zako_x509_parse_der(a2, a3);
  OPENSSL_sk_push(v3, v4);
  return 1LL;
}

int64_t zako_trustchain_add_intermediate(int64_t a1, void *a2)
{
  OPENSSL_sk_push(*(OPENSSL_STACK **)(a1 + 8), a2);
  return 1LL;
}

int64_t zako_trustchain_set_leaf_str(int64_t a1, int64_t a2)
{
  int64_t v3;
  int64_t result;

  v3 = zako_x509_parse_pem(a2);
  result = 1LL;
  *(uint64_t *)(a1 + 16) = v3;
  return result;
}

int64_t zako_trustchain_set_leaf_der(int64_t a1, int64_t a2, int64_t a3)
{
  int64_t v4;
  int64_t result;

  v4 = zako_x509_parse_der(a2, a3);
  result = 1LL;
  *(uint64_t *)(a1 + 16) = v4;
  return result;
}

int64_t zako_trustchain_set_leaf(int64_t a1, int64_t a2)
{
  int64_t result;

  result = 1LL;
  *(uint64_t *)(a1 + 16) = a2;
  return result;
}
```

以上便是整个 `libzakosign.so` 中**几乎没有封装什么的函数**，也许部分是有用的，但是**绝大部分都是毫无意义的**

然后是具体的验证内容

```c
// 入口函数
int64_t zako_file_verify_esig(int a1, unsigned int a2)
{
  uint64_t v4;
  int64_t v5;
  uint64_t v6;
  uint64_t v7;
  int64_t v8;
  int64_t v9;
  int64_t v10;
  unsigned int v11;

  v4 = zako_sys_file_sz();
  v5 = zako_sys_file_map(a1);
  if ( !v5 )
    return 0x10000LL;
  v6 = v4 + v5;
  if ( *(uint64_t *)(v4 + v5 - 8) != 'zakosign' )
    return 0x20000LL;
  v9 = *(uint64_t *)(v6 - 16);
  v7 = v6 - 16;
  v8 = v9;
  if ( v9 - 1 >= v4 )
    return 0x20000LL;
  v10 = v5;
  v11 = zako_esign_verify(v7 - v8, v5, v4 - v8 - 16, a2);
  zako_sys_file_unmap(v10, v4);
  return v11;
}

int64_t zako_esign_verify(int64_t a1, int64_t a2, int64_t a3, char a4)
{
  int64_t v4;
  int64_t v5;
  int64_t v6;
  unsigned int v7;
  int64_t v11;
  int64_t v12;
  void *v13;
  int64_t v14;
  int64_t v15;
  uint64_t *v16;
  int64_t v17;
  int64_t v18;
  int64_t v19;
  int64_t v20;
  int64_t v21;
  int64_t v22;
  int64_t v23;
  int64_t v24;
  int64_t v25;
  int v26;
  int v27;
  EVP_PKEY *pubkey;
  EVP_PKEY *v29;
  int64_t v30;
  EVP_PKEY *v31;
  uint8_t v32;
  unsigned int v33;
  uint64_t v34;
  uint64_t v35;
  uint64_t v37[202];

  if ( *(uint64_t *)a1 != 'zakosign' )
    return 2147483649LL;
  v6 = *(uint64_t *)(a1 + 8);
  v7 = -2147483644;
  if ( v6 != 1 )
  {
    if ( !v6 )
      return (unsigned int)-2147483640;
    return v7;
  }
  v37[200] = v4;
  v37[201] = v5;
  if ( (a4 & 2) != 0 )
    goto LABEL_25;
  v11 = a1;
  v12 = *(uint8_t *)(a1 + 160);
  v13 = memset(v37, 0, 0x640uLL);
  if ( v12 )
  {
    v14 = 0LL;
    v15 = v11 + 162;
    v16 = v37;
    do
    {
      --v12;
      v17 = *(uint64_t *)(v14 + v15 + 8);
      *v16++ = v14 + v15;
      v14 += v17 + 16;
    }
    while ( v12 );
  }
  v18 = zako_trustchain_new(v13);
  v19 = *(uint8_t *)(v11 + 48);
  v20 = v18;
  if ( v19 == 255 )
  {
    v21 = 0LL;
    v22 = *(uint8_t *)(v11 + 49);
    a1 = v11;
    if ( v22 != 255 )
    {
LABEL_13:
      v23 = v37[v22];
      v24 = *(uint8_t *)(a1 + 50);
      if ( v24 != 255 )
        goto LABEL_14;
LABEL_24:
      v25 = 0LL;
      if ( (uint32_t)v19 != 255 )
        goto LABEL_15;
      goto LABEL_25;
    }
  }
  else
  {
    v21 = v37[v19];
    v22 = *(uint8_t *)(v11 + 49);
    a1 = v11;
    if ( v22 != 255 )
      goto LABEL_13;
  }
  v23 = 0LL;
  v24 = *(uint8_t *)(a1 + 50);
  if ( v24 == 255 )
    goto LABEL_24;
LABEL_14:
  v25 = v37[v24];
  if ( (uint32_t)v19 != 255 )
  {
LABEL_15:
    zako_trustchain_set_leaf_der(v20, v21 + 16, *(uint64_t *)(v21 + 8));
    if ( v23 )
      zako_trustchain_add_intermediate_der(v20, v23 + 16, *(uint64_t *)(v23 + 8));
    if ( v25 )
      zako_trustchain_add_intermediate_der(v20, v25 + 16, *(uint64_t *)(v25 + 8));
    v26 = zako_trustchain_verify(v20);
    if ( v26 )
    {
      if ( v26 == 27 )
        v27 = -2147483616;
      else
        v27 = 512;
    }
    else
    {
      pubkey = X509_get_pubkey(*(const X509 **)(v20 + 16));
      v29 = (EVP_PKEY *)zako_parse_public_raw(v11 + 16);
      if ( EVP_PKEY_cmp(pubkey, v29) )
        v27 = 0;
      else
        v27 = -2147482624;
      EVP_PKEY_free(pubkey);
      EVP_PKEY_free(v29);
    }
    zako_trustchain_free(v20);
    a1 = v11;
    goto LABEL_32;
  }
LABEL_25:
  v27 = 0;
LABEL_32:
  v30 = a1;
  v31 = (EVP_PKEY *)zako_parse_public_raw(a1 + 16);
  v32 = zako_hash_verify(a2, a3, v30 + 51);
  if ( ((uint8_t)zako_verify_buffer(v31, v30 + 51, 32LL, v30 + 83) & v32 & 1) != 0 )
    v33 = v27;
  else
    v33 = v27 | 0x80000100;
  EVP_PKEY_free(v31);
  v34 = time(0LL);
  v35 = *(uint64_t *)(v30 + 152);
  if ( v35 )
  {
    if ( v35 >= v34 )
      return v33 | 0x80000080;
    else
      return v33;
  }
  else
  {
    return v33 | 0x40;
  }
}

X509_STORE **zako_trustchain_new()
{
  X509_STORE **safe;
  X509_STORE *v1;
  X509 *v2;

  safe = (X509_STORE **)zako_allocate_safe(0x18uLL);
  *safe = X509_STORE_new();
  safe[1] = (X509_STORE *)OPENSSL_sk_new_null();
  v1 = *safe;
  v2 = (X509 *)zako_x509_parse_pem(
                 "-----BEGIN CERTIFICATE-----\n"
                 "MIIB3zCCAZGgAwIBAgIUOa4KF6KfAg/Jerrx7AX1opSdNLEwBQYDK2VwMHExCzAJ\n"
                 "BgNVBAYTAkNIMRIwEAYDVQQHDAlHdWFuZ3pob3UxEjAQBgNVBAgMCUd1YW5nZG9u\n"
                 "ZzESMBAGA1UECgwJc2hpcmtuZWtvMRIwEAYDVQQLDAlzaGlya25la28xEjAQBgNV\n"
                 "BAMMCXNoaXJrbmVrbzAeFw0yNTA4MTAxNTU2MTRaFw0zNTA4MDgxNTU2MTRaMHEx\n"
                 "CzAJBgNVBAYTAkNIMRIwEAYDVQQHDAlHdWFuZ3pob3UxEjAQBgNVBAgMCUd1YW5n\n"
                 "ZG9uZzESMBAGA1UECgwJc2hpcmtuZWtvMRIwEAYDVQQLDAlzaGlya25la28xEjAQ\n"
                 "BgNVBAMMCXNoaXJrbmVrbzAqMAUGAytlcAMhAKyLThabZFGUsW/deKhLcmwlTF+H\n"
                 "KQ78bO6ohwzcgncWozswOTAPBgNVHRMBAf8EBTADAQH/MA4GA1UdDwEB/wQEAwIC\n"
                 "pDAWBgNVHSUBAf8EDDAKBggrBgEFBQcDAzAFBgMrZXADQQB1T6vftHjoaBNTBk85\n"
                 "E/HVR6jZZwq4UFJMRWpxpJ0JvGn27tLKYB2ZoXhoUbuCIoYa8e892hRoRB2xG4Jk\n"
                 "iU4A\n"
                 "-----END CERTIFICATE-----\n");
  X509_STORE_add_cert(v1, v2);
  return safe;
}
```

显而易见，这些代码用于验证 SukiSU Ultra 自己的给压缩包文件末尾上的一种签名格式

这么个**没说明**、**没开源**而且还有**兼容性问题**的东西却已经添加到 v3.1.9 中发布了，用户用出问题了也没地方得到解释

一个还在**测试**的东西却被直接添加到了**正式版**中，而且还**没有任何说明**，也不知道作者脑子里是怎么想的

## 总结

一个不知道定位不知道具体用途的东西就这么稀里糊涂地被端上来了，想标新立异还不如先把自己的问题一个一个都修好，然后把开发文档维护好，那么抽象的东西还要靠我们帮你修
