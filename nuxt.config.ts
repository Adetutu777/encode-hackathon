// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
     app: {
      
        head: {          
            title: 'chainWrite',
            htmlAttrs: {
              lang: 'en'
            },
            meta: [
              { charset: 'utf-8' },
              { name: 'viewport', content: 'width=device-width, initial-scale=1' },
              { hid: 'description', name: 'description', content: '' },
              { name: 'format-detection', content: 'telephone=no' }
            ],
            link: [       
              
              { rel:"stylesheet", type:"text/css", href:'https://unicons.iconscout.com/release/v4.0.0/css/line.css' },
              // { rel:"stylesheet", type:"text/css", href:"https://api.fontshare.com/v2/css?f[]=satoshi@1,900,700,500,301,701,300,501,401,901,400&display=swap"},
              { rel:"stylesheet", type:"text/css", href:"https://fonts.cdnfonts.com/css/euclid-circular-a" },
              { rel: "stylesheet", type: "text/css", href: "path/to/font-awesome/css/font-awesome.min.css" },
              { rel: 'icon', type: 'image/png', href: '/favicon-.png' },
              
            ]
          },

          
          
      },
      css: [
        "bootstrap/dist/css/bootstrap.css",
        "bootstrap-vue-3/dist/bootstrap-vue-3.css",     
        '~/styles/main.css',      
    ],

    

        // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/bootstrap.client.ts",
  
  ],
  // runtimeConfig: {
  //   mongoUrl: process.env.DB_CREDENTIALS,
  // },
  // nitro: {
  //   plugins: ["~/server/index.ts"],
  // },
  modules: [
    // ...
    [
      '@pinia/nuxt',
      {
        autoImports: [
          // automatically imports `defineStore`
          'defineStore', // import { defineStore } from 'pinia'
          // automatically imports `defineStore` as `definePiniaStore`
          ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
        ],
      },
    ],
  ],
  

  build: {
    // Need to transpile otherwise SSR fails.
    transpile: [/bootstrap-vue-3/ ],
  },
  
 
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,  
  vite: {
    server: {
      hmr: {
        overlay: false,
      },
    },
  }  
})
