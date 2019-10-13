module.exports = {
  siteMetadata: {
    title: `サクっとプログラミング`,
    siteUrl: `https://saku-program.com`,
    description: `サクッと気軽にITに詳しくなれるメディア`,
    topics: [`プログラミング`],
    menu: [
      {
        name: 'ホーム',
        path: '/'
      },
      {
        name: '当サイトとサクプロについて',
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
    ],
    search: true,
    author: {
      name: `サクプロ`,
      description: `プログラミング初心者に向けて、体系的なサイト作りを心がけて情報発信していくよ。<br>当サイト、あるいは僕に興味のある人は<a href="./about">このページ</a>を見て欲しいよ`,
      social: {
        facebook: ``,
        twitter: ``,
        linkedin: ``,
        instagram: ``,
        youtube: ``,
        github: ``,
        twitch: ``
      }
    },
    adsense: {
      title: `vimfoiv`
    },
  },
  plugins: [
    `gatsby-plugin-netlify-cms`,
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
    }
  ]
};
