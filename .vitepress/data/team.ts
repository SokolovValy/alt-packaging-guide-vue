import { gitflic } from './icons'

/* Параметры страницы участников */

const homeSorting = 'month, commits'
const teamSorting = 'role, commits, month'
const leader = {
  'root': 'Олег Щавелев',
  'en': 'Oleg Shchavelev'
}
const limit = 6
const developersSection = {
  'root': {
    title: 'Разработчики',
    description:
      'Люди, которые активно участвуют не только в расширении базы знаний, но и в улучшении её функционала.'
  },
  'en': {
    title: 'Developers',
    description:
      'People who are actively involved not only in expanding the knowledge base, but also in improving its functionality.'
  }
}
const membersSection = {
  'root': {
    title: 'Авторы',
    description: 'Люди, которые участвуют в улучшении и создании новых статей.'
  }
}

export { homeSorting, teamSorting, leader, limit, membersSection, developersSection }


/* Информация об участниках */

export const contributions = [

  {
    avatar: 'https://github.com/OlegShchavelev.png',
    name: 'Олег Щавелев',
    mapByNameAliases: ['OlegShchavelev', 'Oleg Shchavelev', 'Олег Щавелев'],
    title: 'Разработчик, Участник',
    links: [
      { icon: 'github', link: 'https://github.com/OlegShchavelev' },
      {
        icon: {
          svg: gitflic
        },
        link: 'https://gitflic.ru/user/olegshchavelev'
      }
    ]
  }
]