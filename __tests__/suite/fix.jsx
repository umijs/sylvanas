/**
 * title: test
 * title.zh-CN: 测试
 * desc: test css in dependencies，[Link](https://d.umijs.org)
 * desc.zh-CN: 测试依赖中的 CSS，[链接](https://d.umijs.org)
 */
import React from 'react';
import katex from 'katex';

export default () => <h1>Hello {typeof katex}!</h1>;
