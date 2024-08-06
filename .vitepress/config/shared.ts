import { defineConfigWithTheme } from 'vitepress'

export const shared = defineConfigWithTheme({
    srcDir: './docs',
    base: '/alt-packaging-guide-vue',
    cleanUrls: true,
    vite: {
        optimizeDeps: {
            exclude: ['@nolebase/vitepress-plugin-enhanced-readabilities/client']
        },
        ssr: {
            noExternal: [
                '@nolebase/vitepress-plugin-enhanced-readabilities',
            ]
        },
    },
    themeConfig: {
        search: {
            provider: 'local'
        },
        outline: {
            level: [2, 3],
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/SokolovValy/alt-packaging-guide-vue' }
        ]
    }
})