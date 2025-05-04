import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/blog/',
  title: "Skyunix",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    outlineTitle: '目录',
    outline: [2, 6], // 目录深度
    nav: [
      // { text: 'Home', link: '/' },
      { text: '博客', link: '/uup-to-iso' }
    ],

    sidebar: [
      {
        text: "操作系统镜像", // 主分类
        items: [
          {
            text: "镜像下载",  // 子项标题（可折叠）
            collapsed: false,  // 默认展开
            items: [
              { text: "UUP to ISO", link: "/uup-to-iso" } 
            ]
          }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/skyunix' }
    ],
    footer: {
      copyright: 'Copyright © 2025 skyunix'
  }}
})
