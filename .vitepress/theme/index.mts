import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import 'uno.css'

import APWHomeSponsors from './components/APWHomeSponsors.vue'
import APWHomeTeam from './components/APWHomeTeam.vue'
import APWPageTeam from './components/APWTeamPage.vue'

import {
  NolebaseEnhancedReadabilitiesMenu,
  NolebaseEnhancedReadabilitiesScreenMenu
} from '@nolebase/vitepress-plugin-enhanced-readabilities/client'
import { NolebaseEnhancedReadabilitiesPlugin } from '@nolebase/vitepress-plugin-enhanced-readabilities/client'

/* Nolebase Gitlog */

import { NolebaseGitChangelogPlugin } from '@nolebase/vitepress-plugin-git-changelog/client'
import { data as team } from './loaders/gitlogDataLoader.data'


import '@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css'

import {
  NolebaseGitChangelogOptions
} from '../config/plugins/index'

import '@nolebase/vitepress-plugin-git-changelog/client/style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'home-features-after': () => [h(APWHomeTeam), h(APWHomeSponsors)],
      'nav-bar-content-after': () => h(NolebaseEnhancedReadabilitiesMenu),
      'nav-screen-content-after': () => h(NolebaseEnhancedReadabilitiesScreenMenu),
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.use(NolebaseEnhancedReadabilitiesPlugin)
    app.component('Contribution', APWPageTeam)
    app.use(NolebaseGitChangelogPlugin, { mapAuthors: team['root'] })
  }
} satisfies Theme
