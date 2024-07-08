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
          { text: 'Что такое RPM-пакет?', link: '/packaging-software.md' },
          { text: 'Что такое SPEC-файл?', link: '/alt_spec.md' },
          { text: 'RPM Макросы', link: '/alt-macro.md' },
          { text: 'Инструмент Gear', link: '/gear.md' },
          { text: 'Hasher start', link: '/hasher.md' },
          { text: 'Примеры сборки пакетов с использованием инструментов Альт', link: '/example.md' },
          { text: 'Примеры сборки пакетов с исходными текстами на Python, Bash, С++', link: '/hello-world_example.md' },
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
