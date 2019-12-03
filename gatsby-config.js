module.exports = {
  siteMetadata: {
    title: `サクっとプログラミング`,
    siteUrl: `https://saku-program.com`,
    description: `開発のあれこれがまとまるwebサイト`,
    topics: [`IT`,`プログラミング`,],
    menu: [
      {
        name: 'ホーム',
        path: '/'
      },
      {
        name: '当サイトについて',
        path: '/about'
      },
    ],
    footerMenu: [
      {
        name: 'プライバシーポリシー',
        path: '/privacy-policy'
      },
      {
        name: '免責事項',
        path: '/law'
      },
      {
        name: 'サイトマップ',
        path: '/sitemap.xml'
      }
    ],
    search: true,
    author: {
      name: `サクプロ`,
      description: `プログラミング初心者に向けて、体系的なサイト作りを心がけて情報発信していくよ<br>当サイト、あるいは僕に興味のある人は<a href="./about">このページ</a>を見て欲しいよ`,
      social: {
        facebook: ``,
        twitter: `https://twitter.com/sakuprogram`,
        linkedin: ``,
        instagram: ``,
        youtube: ``,
        github: ``,
        twitch: ``
      }
    },
  },
  plugins: [
    `gatsby-plugin-netlify-cms`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
        exclude: [`/404`],
      }
    },
    {
      resolve: `@pipinosuke/gatsby-theme-nehalem`,
      options: {
        manifest: {
          name: `nehalem - A Gatsby theme`,
          short_name: `nehalem`,
          start_url: ``,
          background_color: `#a4cbb8`,
          theme_color: `#a4cbb8`,
          display: `minimal-ui`,
          icon: `${__dirname}/content/assets/images/logo.png`
        }
      }
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-84084422-10",
        head: true
      }
    },
  ]
};
