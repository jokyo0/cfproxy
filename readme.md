# cfproxy #
### A local socks5 proxy server over Cloudflare Worker ###

Cloudflare Worker 代理工具

### 准备工作 ###
* 注册Worker账号，并绑定好域名。

### 安装 ###
* ```npm i cfproxy -g```

### 使用 ###
* 设置参数并发布到Cloudflare：
	* ```cfproxy gen```
* 开启本地代理：
	* ```cfproxy go```

默认将绑定一个本地Socks5代理服务，所有流量经由程序转发到Worker

[提交Bugs](https://github.com/DNetL/cfproxy/issues)
[兴趣群组](https://t.me/DNetLab)

# License #
(The MIT License)

Copyright (c) 2023 DNetL &lt;DNetL@pm.me&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.