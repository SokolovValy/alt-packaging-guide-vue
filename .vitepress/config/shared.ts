import { defineConfigWithTheme } from 'vitepress'
import UnoCSS from 'unocss/vite'

export const shared = defineConfigWithTheme({
    srcDir: './docs',
    base: '/alt-packaging-guide-vue',
    cleanUrls: true,
    vite: {
        plugins: [
            UnoCSS()
        ],
        optimizeDeps: {
            exclude: ['@nolebase/vitepress-plugin-enhanced-readabilities/client']
        },
        ssr: {
            noExternal: [
                '@nolebase/vitepress-plugin-enhanced-readabilities',
                '@nolebase/ui'
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