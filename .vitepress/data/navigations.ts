import { type DefaultTheme } from 'vitepress'

export const nav: Record<string, Array<DefaultTheme.NavItem>> = {
    'ru-RU': [
        { text: 'Главная', link: '/' },
        { text: 'Документация', link: '/start/introduction/' },
        {
            text: 'О проекты', items: [
                { text: 'О проекте', link: '/projects/about/' },
                { text: 'Для авторов', link: '/projects/reference/' },
                { text: 'Участники', link: '/projects/contributions/' }
            ]
        }
    ]
}

export const sidebar: Record<string, DefaultTheme.Sidebar> = {
    'ru-RU': [
        {
            text: 'Общие понятия',
            base: '/start/',
            items: [
                { text: 'Вступление', link: 'introduction/' },
                { text: 'Введение в пакетные менеджеры', link: 'why-package-rpm/' },
            ]
        }, {
            text: 'RPM',
            base: '/rpm/',
            items: [
                { text: 'Что такое RPM-пакет?', link: 'packaging-software/' },
                { text: 'Что такое SPEC-файл?', link: 'alt_spec/' },
                { text: 'RPM Макросы', link: 'alt-macro/' },
            ]
        }, {
            text: 'Сборка пакетов',
            base: '/build/',
            items: [
                { text: 'Инструмент Gear', link: 'gear/' },
                { text: 'Hasher start', link: 'hasher/' },
            ]
        }, {
            text: 'Примеры',
            base: '/case/',
            items: [
                { text: 'Примеры сборки пакетов с использованием инструментов Альт', link: 'example/' },
                { text: 'Примеры сборки пакетов с исходными текстами на Python, Bash, С++', link: 'hello-world_example/' }
            ]
        }
    ]
}