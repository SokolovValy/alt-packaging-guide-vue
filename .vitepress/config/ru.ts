import { defineConfigWithTheme } from 'vitepress'
import { nav, sidebar } from '../data/navigations'
import { packages } from '../../package-lock.json'
import { vitepressSearchOptions } from './plugins'

export const ru = defineConfigWithTheme({
    title: "ALT Packaging Guide",
    description: "Guide to building RPM packages for ALT distributions",
    lang: 'ru-RU',
    themeConfig: {
        outlineTitle: 'Оглавление',
        nav: nav['ru-RU'],
        sidebar: sidebar['ru-RU'],
        returnToTopLabel: 'Наверх',
        sidebarMenuLabel: 'Меню',
        editLink: {
            pattern: 'https://github.com/SokolovValy/alt-packaging-guide-vue/edit/main/docs/:path',
            text: 'Предложить изменения на этой странице'
        },
        search: {
            options: vitepressSearchOptions
        },
        docFooter: {
            prev: 'Предыдущая страница',
            next: 'Следующая страница'
        },
        darkModeSwitchLabel: 'Тема',
        notFound: {
            title: 'Страница не найдена',
            quote: 'Похоже, что вы перешли по неверной или устаревшей ссылке. Вы можете воспользоваться поиском.',
            linkText: 'Вернуться на главную'
        },
        footer: {
            message: 'Содержание доступно <a href="/licence.html">по лицензии MIT</a>',
            copyright: `
                    ${new Date().getFullYear()} ALT Packaging Guide,
                    разработано на платформе <a href="//vitepress.dev/">VitePress ${packages['node_modules/vitepress'].version}</a>
                  `
        },
    }
})