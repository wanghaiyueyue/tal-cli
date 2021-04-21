#!/usr/bin/env bash
npm config get registry
npm config set registry = http://registry.npmjs.org
echo '请登录'
npm login
echo '发布'
npm publish
npm config set registry = http://registry.npmjs.org # 设置为淘宝镜像
echo '发布完成'
exit
