module.exports = {
  siteMetadata: {
    title: `サクっとプログラミング`,
    siteUrl: `https://saku-programing.com`,
    description: `ITに詳しくなれるメディア`,
    topics: [`dfkmfp`,`fdniofdoinf`],
    menu: [
      {
        name: 'Home',
        path: '/'
      },
      {
        name: 'About',
        path: '/about'
      },
    ],
    footerMenu: [
      {
        name: 'About',
        path: '/about'
      },
    ],
    search: true,
    author: {
      name: `nehalem`,
      description: `サクプロです。`,
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
