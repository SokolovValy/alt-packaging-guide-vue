import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ALT Packaging Guide",
  description: "Guide to building RPM packages for ALT distributions",
  srcDir: './docs',
  base: '/alt-packaging-guide-vue',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],
    outlineTitle: 'Оглавление',
    outline: {
      level: [2, 3],
    },
    sidebar: [
      {
        text: 'Тестовое поле',
        items: [
          { text: 'Вступление', link: '/introduction.md' },
          { text: 'Введение в пакетные менеджеры', link: '/why-package-rpm.md' },
          { text: 'Вступление', link: '/introduction.md' },
          { text: 'Вступление', link: '/introduction.md' },
          { text: 'Вступление', link: '/introduction.md' },
          { text: 'Вступление', link: '/introduction.md' },
          { text: 'Вступление', link: '/introduction.md' },
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
