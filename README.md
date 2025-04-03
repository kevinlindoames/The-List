
```
The List
├─ docker-compose.yml
├─ licitalab-backend2
│  ├─ .dockerignore
│  ├─ .env
│  ├─ .env.docker
│  ├─ .prettierrc
│  ├─ dist
│  │  ├─ prisma
│  │  │  ├─ seed.d.ts
│  │  │  ├─ seed.js
│  │  │  └─ seed.js.map
│  │  ├─ src
│  │  │  ├─ app.controller.d.ts
│  │  │  ├─ app.controller.js
│  │  │  ├─ app.controller.js.map
│  │  │  ├─ app.module.d.ts
│  │  │  ├─ app.module.js
│  │  │  ├─ app.module.js.map
│  │  │  ├─ app.service.d.ts
│  │  │  ├─ app.service.js
│  │  │  ├─ app.service.js.map
│  │  │  ├─ main.d.ts
│  │  │  ├─ main.js
│  │  │  ├─ main.js.map
│  │  │  ├─ opportunities
│  │  │  │  ├─ dto
│  │  │  │  │  ├─ filter-opportunity.dto.d.ts
│  │  │  │  │  ├─ filter-opportunity.dto.js
│  │  │  │  │  └─ filter-opportunity.dto.js.map
│  │  │  │  ├─ entities
│  │  │  │  │  ├─ opportunity.entity.d.ts
│  │  │  │  │  ├─ opportunity.entity.js
│  │  │  │  │  └─ opportunity.entity.js.map
│  │  │  │  ├─ opportunities.controller.d.ts
│  │  │  │  ├─ opportunities.controller.js
│  │  │  │  ├─ opportunities.controller.js.map
│  │  │  │  ├─ opportunities.module.d.ts
│  │  │  │  ├─ opportunities.module.js
│  │  │  │  ├─ opportunities.module.js.map
│  │  │  │  ├─ opportunities.service.d.ts
│  │  │  │  ├─ opportunities.service.js
│  │  │  │  └─ opportunities.service.js.map
│  │  │  └─ prisma
│  │  │     ├─ prisma.module.d.ts
│  │  │     ├─ prisma.module.js
│  │  │     ├─ prisma.module.js.map
│  │  │     ├─ prisma.service.d.ts
│  │  │     ├─ prisma.service.js
│  │  │     └─ prisma.service.js.map
│  │  └─ tsconfig.build.tsbuildinfo
│  ├─ Dockerfile
│  ├─ eslint.config.mjs
│  ├─ nest-cli.json
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ prisma
│  │  ├─ schema.prisma
│  │  ├─ seed.d.ts
│  │  ├─ seed.js
│  │  ├─ seed.js.map
│  │  └─ seed.ts
│  ├─ README.md
│  ├─ src
│  │  ├─ app.controller.spec.ts
│  │  ├─ app.controller.ts
│  │  ├─ app.module.ts
│  │  ├─ app.service.ts
│  │  ├─ main.ts
│  │  ├─ opportunities
│  │  │  ├─ dto
│  │  │  │  └─ filter-opportunity.dto.ts
│  │  │  ├─ entities
│  │  │  │  └─ opportunity.entity.ts
│  │  │  ├─ opportunities.controller.spec.ts
│  │  │  ├─ opportunities.controller.ts
│  │  │  ├─ opportunities.module.ts
│  │  │  ├─ opportunities.service.spec.ts
│  │  │  └─ opportunities.service.ts
│  │  └─ prisma
│  │     ├─ prisma.module.ts
│  │     └─ prisma.service.ts
│  ├─ test
│  │  ├─ app.e2e-spec.ts
│  │  └─ jest-e2e.json
│  ├─ tsconfig.build.json
│  ├─ tsconfig.build.tsbuildinfo
│  └─ tsconfig.json
├─ licitalab-opportunities
│  ├─ .dockerignore
│  ├─ .env
│  ├─ .env.docker
│  ├─ .next
│  │  ├─ app-build-manifest.json
│  │  ├─ app-path-routes-manifest.json
│  │  ├─ build
│  │  │  └─ chunks
│  │  │     ├─ postcss_config_mjs_transform_ts_f0ffbaad._.js
│  │  │     ├─ postcss_config_mjs_transform_ts_f0ffbaad._.js.map
│  │  │     ├─ [root of the server]__04d7a048._.js
│  │  │     ├─ [root of the server]__04d7a048._.js.map
│  │  │     ├─ [root of the server]__05f88b00._.js
│  │  │     ├─ [root of the server]__05f88b00._.js.map
│  │  │     ├─ [turbopack]_runtime.js
│  │  │     └─ [turbopack]_runtime.js.map
│  │  ├─ build-manifest.json
│  │  ├─ BUILD_ID
│  │  ├─ cache
│  │  │  ├─ .rscinfo
│  │  │  ├─ .tsbuildinfo
│  │  │  ├─ eslint
│  │  │  │  └─ .cache_5ubcao
│  │  │  ├─ swc
│  │  │  │  └─ plugins
│  │  │  │     └─ v7_windows_x86_64_8.0.0
│  │  │  └─ webpack
│  │  │     ├─ client-production
│  │  │     │  ├─ 0.pack
│  │  │     │  ├─ 1.pack
│  │  │     │  ├─ 2.pack
│  │  │     │  ├─ 3.pack
│  │  │     │  ├─ 4.pack
│  │  │     │  ├─ 5.pack
│  │  │     │  ├─ 6.pack
│  │  │     │  ├─ 7.pack
│  │  │     │  ├─ index.pack
│  │  │     │  └─ index.pack.old
│  │  │     ├─ edge-server-production
│  │  │     │  ├─ 0.pack
│  │  │     │  ├─ 1.pack
│  │  │     │  ├─ index.pack
│  │  │     │  └─ index.pack.old
│  │  │     └─ server-production
│  │  │        ├─ 0.pack
│  │  │        ├─ 1.pack
│  │  │        ├─ 2.pack
│  │  │        ├─ 3.pack
│  │  │        ├─ 4.pack
│  │  │        ├─ 5.pack
│  │  │        ├─ index.pack
│  │  │        └─ index.pack.old
│  │  ├─ diagnostics
│  │  │  ├─ build-diagnostics.json
│  │  │  └─ framework.json
│  │  ├─ export-marker.json
│  │  ├─ fallback-build-manifest.json
│  │  ├─ images-manifest.json
│  │  ├─ next-minimal-server.js.nft.json
│  │  ├─ next-server.js.nft.json
│  │  ├─ package.json
│  │  ├─ prerender-manifest.json
│  │  ├─ react-loadable-manifest.json
│  │  ├─ required-server-files.json
│  │  ├─ routes-manifest.json
│  │  ├─ server
│  │  │  ├─ app
│  │  │  │  ├─ analytics
│  │  │  │  │  ├─ page.js
│  │  │  │  │  ├─ page.js.nft.json
│  │  │  │  │  └─ page_client-reference-manifest.js
│  │  │  │  ├─ analytics.html
│  │  │  │  ├─ analytics.meta
│  │  │  │  ├─ analytics.rsc
│  │  │  │  ├─ api
│  │  │  │  │  ├─ auth
│  │  │  │  │  │  ├─ register
│  │  │  │  │  │  │  ├─ route
│  │  │  │  │  │  │  │  ├─ app-build-manifest.json
│  │  │  │  │  │  │  │  ├─ app-paths-manifest.json
│  │  │  │  │  │  │  │  ├─ build-manifest.json
│  │  │  │  │  │  │  │  ├─ next-font-manifest.json
│  │  │  │  │  │  │  │  ├─ react-loadable-manifest.json
│  │  │  │  │  │  │  │  └─ server-reference-manifest.json
│  │  │  │  │  │  │  ├─ route.js
│  │  │  │  │  │  │  ├─ route.js.map
│  │  │  │  │  │  │  ├─ route.js.nft.json
│  │  │  │  │  │  │  └─ route_client-reference-manifest.js
│  │  │  │  │  │  └─ [...nextauth]
│  │  │  │  │  │     ├─ route
│  │  │  │  │  │     │  ├─ app-build-manifest.json
│  │  │  │  │  │     │  ├─ app-paths-manifest.json
│  │  │  │  │  │     │  ├─ build-manifest.json
│  │  │  │  │  │     │  ├─ next-font-manifest.json
│  │  │  │  │  │     │  ├─ react-loadable-manifest.json
│  │  │  │  │  │     │  └─ server-reference-manifest.json
│  │  │  │  │  │     ├─ route.js
│  │  │  │  │  │     ├─ route.js.map
│  │  │  │  │  │     ├─ route.js.nft.json
│  │  │  │  │  │     └─ route_client-reference-manifest.js
│  │  │  │  │  └─ opportunities
│  │  │  │  │     ├─ followed
│  │  │  │  │     │  ├─ route.js
│  │  │  │  │     │  ├─ route.js.nft.json
│  │  │  │  │     │  └─ route_client-reference-manifest.js
│  │  │  │  │     ├─ route.js
│  │  │  │  │     ├─ route.js.nft.json
│  │  │  │  │     ├─ route_client-reference-manifest.js
│  │  │  │  │     └─ [code]
│  │  │  │  │        └─ follow
│  │  │  │  │           ├─ route.js
│  │  │  │  │           ├─ route.js.nft.json
│  │  │  │  │           └─ route_client-reference-manifest.js
│  │  │  │  ├─ auth
│  │  │  │  │  ├─ login
│  │  │  │  │  │  ├─ page
│  │  │  │  │  │  │  ├─ app-build-manifest.json
│  │  │  │  │  │  │  ├─ app-paths-manifest.json
│  │  │  │  │  │  │  ├─ build-manifest.json
│  │  │  │  │  │  │  ├─ next-font-manifest.json
│  │  │  │  │  │  │  ├─ react-loadable-manifest.json
│  │  │  │  │  │  │  └─ server-reference-manifest.json
│  │  │  │  │  │  ├─ page.js
│  │  │  │  │  │  ├─ page.js.map
│  │  │  │  │  │  ├─ page.js.nft.json
│  │  │  │  │  │  └─ page_client-reference-manifest.js
│  │  │  │  │  ├─ login.html
│  │  │  │  │  ├─ login.meta
│  │  │  │  │  ├─ login.rsc
│  │  │  │  │  ├─ register
│  │  │  │  │  │  ├─ page
│  │  │  │  │  │  │  ├─ app-build-manifest.json
│  │  │  │  │  │  │  ├─ app-paths-manifest.json
│  │  │  │  │  │  │  ├─ build-manifest.json
│  │  │  │  │  │  │  ├─ next-font-manifest.json
│  │  │  │  │  │  │  ├─ react-loadable-manifest.json
│  │  │  │  │  │  │  └─ server-reference-manifest.json
│  │  │  │  │  │  ├─ page.js
│  │  │  │  │  │  ├─ page.js.map
│  │  │  │  │  │  ├─ page.js.nft.json
│  │  │  │  │  │  └─ page_client-reference-manifest.js
│  │  │  │  │  ├─ register.html
│  │  │  │  │  ├─ register.meta
│  │  │  │  │  └─ register.rsc
│  │  │  │  ├─ favicon.ico
│  │  │  │  │  ├─ route
│  │  │  │  │  │  ├─ app-build-manifest.json
│  │  │  │  │  │  ├─ app-paths-manifest.json
│  │  │  │  │  │  ├─ build-manifest.json
│  │  │  │  │  │  ├─ next-font-manifest.json
│  │  │  │  │  │  ├─ react-loadable-manifest.json
│  │  │  │  │  │  └─ server-reference-manifest.json
│  │  │  │  │  ├─ route.js
│  │  │  │  │  ├─ route.js.map
│  │  │  │  │  ├─ route.js.nft.json
│  │  │  │  │  └─ route_client-reference-manifest.js
│  │  │  │  ├─ favicon.ico.body
│  │  │  │  ├─ favicon.ico.meta
│  │  │  │  ├─ followed
│  │  │  │  │  ├─ page.js
│  │  │  │  │  ├─ page.js.nft.json
│  │  │  │  │  └─ page_client-reference-manifest.js
│  │  │  │  ├─ followed.html
│  │  │  │  ├─ followed.meta
│  │  │  │  ├─ followed.rsc
│  │  │  │  ├─ index.html
│  │  │  │  ├─ index.meta
│  │  │  │  ├─ index.rsc
│  │  │  │  ├─ opportunity
│  │  │  │  │  └─ [code]
│  │  │  │  │     ├─ page.js
│  │  │  │  │     ├─ page.js.nft.json
│  │  │  │  │     └─ page_client-reference-manifest.js
│  │  │  │  ├─ page
│  │  │  │  │  ├─ app-build-manifest.json
│  │  │  │  │  ├─ app-paths-manifest.json
│  │  │  │  │  ├─ build-manifest.json
│  │  │  │  │  ├─ next-font-manifest.json
│  │  │  │  │  ├─ react-loadable-manifest.json
│  │  │  │  │  └─ server-reference-manifest.json
│  │  │  │  ├─ page.js
│  │  │  │  ├─ page.js.map
│  │  │  │  ├─ page.js.nft.json
│  │  │  │  ├─ page_client-reference-manifest.js
│  │  │  │  ├─ _not-found
│  │  │  │  │  ├─ page
│  │  │  │  │  │  ├─ app-build-manifest.json
│  │  │  │  │  │  ├─ app-paths-manifest.json
│  │  │  │  │  │  ├─ build-manifest.json
│  │  │  │  │  │  ├─ next-font-manifest.json
│  │  │  │  │  │  ├─ react-loadable-manifest.json
│  │  │  │  │  │  └─ server-reference-manifest.json
│  │  │  │  │  ├─ page.js
│  │  │  │  │  ├─ page.js.map
│  │  │  │  │  ├─ page.js.nft.json
│  │  │  │  │  └─ page_client-reference-manifest.js
│  │  │  │  ├─ _not-found.html
│  │  │  │  ├─ _not-found.meta
│  │  │  │  └─ _not-found.rsc
│  │  │  ├─ app-paths-manifest.json
│  │  │  ├─ chunks
│  │  │  │  ├─ 112.js
│  │  │  │  ├─ 190.js
│  │  │  │  ├─ 239.js
│  │  │  │  ├─ 243.js
│  │  │  │  ├─ 329.js
│  │  │  │  ├─ 374.js
│  │  │  │  ├─ 424.js
│  │  │  │  ├─ 425.js
│  │  │  │  ├─ 491.js
│  │  │  │  ├─ 497.js
│  │  │  │  ├─ 514.js
│  │  │  │  ├─ 548.js
│  │  │  │  ├─ 610.js
│  │  │  │  ├─ 658.js
│  │  │  │  ├─ 768.js
│  │  │  │  ├─ 876.js
│  │  │  │  ├─ 88.js
│  │  │  │  ├─ ssr
│  │  │  │  │  ├─ src_951d2e4c._.js
│  │  │  │  │  ├─ src_951d2e4c._.js.map
│  │  │  │  │  ├─ src_app_a4430781._.js
│  │  │  │  │  ├─ src_app_a4430781._.js.map
│  │  │  │  │  ├─ src_bb6f8e2f._.js
│  │  │  │  │  ├─ src_bb6f8e2f._.js.map
│  │  │  │  │  ├─ [root of the server]__0db99b79._.js
│  │  │  │  │  ├─ [root of the server]__0db99b79._.js.map
│  │  │  │  │  ├─ [root of the server]__29912de3._.js
│  │  │  │  │  ├─ [root of the server]__29912de3._.js.map
│  │  │  │  │  ├─ [root of the server]__97e0e1e6._.js
│  │  │  │  │  ├─ [root of the server]__97e0e1e6._.js.map
│  │  │  │  │  ├─ [root of the server]__f4ac0da3._.js
│  │  │  │  │  ├─ [root of the server]__f4ac0da3._.js.map
│  │  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_2f2ff716._.js
│  │  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_2f2ff716._.js.map
│  │  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_59fa4ecd._.js
│  │  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_59fa4ecd._.js.map
│  │  │  │  │  ├─ [turbopack]_runtime.js
│  │  │  │  │  ├─ [turbopack]_runtime.js.map
│  │  │  │  │  ├─ _2766182a._.js
│  │  │  │  │  ├─ _2766182a._.js.map
│  │  │  │  │  ├─ _30d712a9._.js
│  │  │  │  │  ├─ _30d712a9._.js.map
│  │  │  │  │  ├─ _339403e8._.js
│  │  │  │  │  ├─ _339403e8._.js.map
│  │  │  │  │  ├─ _5f904819._.js
│  │  │  │  │  ├─ _5f904819._.js.map
│  │  │  │  │  ├─ _c00ed5e4._.js
│  │  │  │  │  └─ _c00ed5e4._.js.map
│  │  │  │  ├─ [root of the server]__73749f46._.js
│  │  │  │  ├─ [root of the server]__73749f46._.js.map
│  │  │  │  ├─ [root of the server]__b9eb8923._.js
│  │  │  │  ├─ [root of the server]__b9eb8923._.js.map
│  │  │  │  ├─ [root of the server]__dea3772b._.js
│  │  │  │  ├─ [root of the server]__dea3772b._.js.map
│  │  │  │  ├─ [turbopack]_runtime.js
│  │  │  │  └─ [turbopack]_runtime.js.map
│  │  │  ├─ edge
│  │  │  │  └─ chunks
│  │  │  │     ├─ edge-wrapper_c5b81110.js
│  │  │  │     ├─ edge-wrapper_c5b81110.js.map
│  │  │  │     ├─ [root of the server]__860be4f0._.js
│  │  │  │     ├─ [root of the server]__860be4f0._.js.map
│  │  │  │     ├─ _8a964027._.js
│  │  │  │     └─ _8a964027._.js.map
│  │  │  ├─ edge-runtime-webpack.js
│  │  │  ├─ edge-runtime-webpack.js.map
│  │  │  ├─ functions-config-manifest.json
│  │  │  ├─ interception-route-rewrite-manifest.js
│  │  │  ├─ middleware
│  │  │  │  └─ middleware-manifest.json
│  │  │  ├─ middleware-build-manifest.js
│  │  │  ├─ middleware-manifest.json
│  │  │  ├─ middleware-react-loadable-manifest.js
│  │  │  ├─ next-font-manifest.js
│  │  │  ├─ next-font-manifest.json
│  │  │  ├─ pages
│  │  │  │  ├─ 404.html
│  │  │  │  ├─ 500.html
│  │  │  │  ├─ _app.js
│  │  │  │  ├─ _app.js.nft.json
│  │  │  │  ├─ _document.js
│  │  │  │  ├─ _document.js.nft.json
│  │  │  │  ├─ _error.js
│  │  │  │  └─ _error.js.nft.json
│  │  │  ├─ pages-manifest.json
│  │  │  ├─ server-reference-manifest.js
│  │  │  ├─ server-reference-manifest.json
│  │  │  ├─ src
│  │  │  │  ├─ middleware.js
│  │  │  │  └─ middleware.js.map
│  │  │  └─ webpack-runtime.js
│  │  ├─ static
│  │  │  ├─ 5MCza-Wie6k36iwl77lAB
│  │  │  │  ├─ _buildManifest.js
│  │  │  │  └─ _ssgManifest.js
│  │  │  ├─ chunks
│  │  │  │  ├─ 108-5d75714986c9f461.js
│  │  │  │  ├─ 121.7560c80c038f73cc.js
│  │  │  │  ├─ 164f4fb6-69a77c80738c9314.js
│  │  │  │  ├─ 173-da42c4a28a321d6a.js
│  │  │  │  ├─ 179-e1bd42a1b310c0f5.js
│  │  │  │  ├─ 183-f17ebe1039e82289.js
│  │  │  │  ├─ 2170a4aa-f220f188891353c6.js
│  │  │  │  ├─ 274-0cc4dad823ad4d06.js
│  │  │  │  ├─ 305-31f8ecd8f6fbb31b.js
│  │  │  │  ├─ 341.83c7160615e02660.js
│  │  │  │  ├─ 406-9e4384acfe0b8d71.js
│  │  │  │  ├─ 461-053d2f26dd874f19.js
│  │  │  │  ├─ 464-37a05c6389e28d77.js
│  │  │  │  ├─ 472-f68023ff5710beb4.js
│  │  │  │  ├─ 494-56b1a3da367ddd8b.js
│  │  │  │  ├─ 4bd1b696-9b862d84471e6930.js
│  │  │  │  ├─ 572-4ea035b1eb8db9f2.js
│  │  │  │  ├─ 684-30e9ab8a55445af8.js
│  │  │  │  ├─ 817-efbce7d2707d487c.js
│  │  │  │  ├─ 822.fedcd3b1c0fa3981.js
│  │  │  │  ├─ 901-ebfddbc89dba672b.js
│  │  │  │  ├─ 91.2497c949d451347f.js
│  │  │  │  ├─ ad2866b8.be40dcaf005a4da1.js
│  │  │  │  ├─ app
│  │  │  │  │  ├─ analytics
│  │  │  │  │  │  └─ page-7b5a9fcd6caccb85.js
│  │  │  │  │  ├─ api
│  │  │  │  │  │  ├─ auth
│  │  │  │  │  │  │  ├─ register
│  │  │  │  │  │  │  │  └─ route-fed9cab7006893f7.js
│  │  │  │  │  │  │  └─ [...nextauth]
│  │  │  │  │  │  │     └─ route-51fa107f7cd6984d.js
│  │  │  │  │  │  └─ opportunities
│  │  │  │  │  │     ├─ followed
│  │  │  │  │  │     │  └─ route-d2d3823b86986b9e.js
│  │  │  │  │  │     ├─ route-76ed245209445c61.js
│  │  │  │  │  │     └─ [code]
│  │  │  │  │  │        └─ follow
│  │  │  │  │  │           └─ route-18b3363cb89636d4.js
│  │  │  │  │  ├─ auth
│  │  │  │  │  │  ├─ login
│  │  │  │  │  │  │  └─ page-73fa4e327c58a432.js
│  │  │  │  │  │  └─ register
│  │  │  │  │  │     └─ page-a6fdf7b4809d9327.js
│  │  │  │  │  ├─ followed
│  │  │  │  │  │  └─ page-cf40e7a5de224879.js
│  │  │  │  │  ├─ layout-1a73c188754464a5.js
│  │  │  │  │  ├─ opportunity
│  │  │  │  │  │  └─ [code]
│  │  │  │  │  │     └─ page-a0657acb86667621.js
│  │  │  │  │  ├─ page-48004b6d8de4f344.js
│  │  │  │  │  └─ _not-found
│  │  │  │  │     └─ page-8d91a6ddd1481cb7.js
│  │  │  │  ├─ bc98253f.d21a5b1e2e1a8f86.js
│  │  │  │  ├─ framework-52167c1502110d79.js
│  │  │  │  ├─ main-app-9530f76274772535.js
│  │  │  │  ├─ main-b29797f4d2e753ff.js
│  │  │  │  ├─ pages
│  │  │  │  │  ├─ _app-1ac1c657a7b10107.js
│  │  │  │  │  └─ _error-da855ac378341690.js
│  │  │  │  ├─ polyfills-42372ed130431b0a.js
│  │  │  │  ├─ src_7db598c1._.js
│  │  │  │  ├─ src_7db598c1._.js.map
│  │  │  │  ├─ src_868ca3a0._.js
│  │  │  │  ├─ src_868ca3a0._.js.map
│  │  │  │  ├─ src_942e9c48._.js
│  │  │  │  ├─ src_942e9c48._.js.map
│  │  │  │  ├─ src_app_auth_login_page_tsx_c1782edf._.js
│  │  │  │  ├─ src_app_auth_register_page_tsx_c1782edf._.js
│  │  │  │  ├─ src_app_favicon_ico_mjs_79b6a596._.js
│  │  │  │  ├─ src_app_globals_b52d8e88.css
│  │  │  │  ├─ src_app_globals_b52d8e88.css.map
│  │  │  │  ├─ src_app_globals_b805903d.css
│  │  │  │  ├─ src_app_globals_b805903d.css.map
│  │  │  │  ├─ src_app_layout_tsx_f0e4c1a2._.js
│  │  │  │  ├─ src_app_page_tsx_c1782edf._.js
│  │  │  │  ├─ src_f7d59bfa._.js
│  │  │  │  ├─ src_f7d59bfa._.js.map
│  │  │  │  ├─ webpack-8171d950198a3ef3.js
│  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_0b12fe98._.js
│  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_0b12fe98._.js.map
│  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_49a6ea35._.js
│  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_49a6ea35._.js.map
│  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_5160d576._.js
│  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_61dcf9ba._.js
│  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_61dcf9ba._.js.map
│  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_6897b283._.js
│  │  │  │  ├─ _be317ff2._.js
│  │  │  │  ├─ _be317ff2._.js.map
│  │  │  │  └─ _e69f0d32._.js
│  │  │  ├─ css
│  │  │  │  └─ 6b249937a0996124.css
│  │  │  ├─ development
│  │  │  │  ├─ _buildManifest.js
│  │  │  │  ├─ _clientMiddlewareManifest.json
│  │  │  │  └─ _ssgManifest.js
│  │  │  └─ media
│  │  │     └─ favicon.45db1c09.ico
│  │  ├─ trace
│  │  ├─ transform.js
│  │  ├─ transform.js.map
│  │  └─ types
│  │     ├─ app
│  │     │  ├─ analytics
│  │     │  │  └─ page.ts
│  │     │  ├─ api
│  │     │  │  ├─ auth
│  │     │  │  │  ├─ register
│  │     │  │  │  │  └─ route.ts
│  │     │  │  │  └─ [...nextauth]
│  │     │  │  │     └─ route.ts
│  │     │  │  └─ opportunities
│  │     │  │     ├─ followed
│  │     │  │     │  └─ route.ts
│  │     │  │     ├─ route.ts
│  │     │  │     └─ [code]
│  │     │  │        └─ follow
│  │     │  │           └─ route.ts
│  │     │  ├─ auth
│  │     │  │  ├─ login
│  │     │  │  │  └─ page.ts
│  │     │  │  └─ register
│  │     │  │     └─ page.ts
│  │     │  ├─ followed
│  │     │  │  └─ page.ts
│  │     │  ├─ opportunity
│  │     │  │  └─ [code]
│  │     │  │     └─ page.ts
│  │     │  └─ page.ts
│  │     ├─ cache-life.d.ts
│  │     └─ package.json
│  ├─ components.json
│  ├─ Dockerfile
│  ├─ eslint.config.mjs
│  ├─ next-env.d.ts
│  ├─ next.config.ts
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ postcss.config.mjs
│  ├─ public
│  │  ├─ file.svg
│  │  ├─ globe.svg
│  │  ├─ next.svg
│  │  ├─ vercel.svg
│  │  └─ window.svg
│  ├─ README.md
│  ├─ src
│  │  ├─ app
│  │  │  ├─ analytics
│  │  │  │  └─ page.tsx
│  │  │  ├─ api
│  │  │  │  ├─ auth
│  │  │  │  │  ├─ register
│  │  │  │  │  │  └─ route.ts
│  │  │  │  │  └─ [...nextauth]
│  │  │  │  │     └─ route.ts
│  │  │  │  └─ opportunities
│  │  │  │     ├─ followed
│  │  │  │     │  └─ route.ts
│  │  │  │     ├─ route.ts
│  │  │  │     └─ [code]
│  │  │  │        └─ follow
│  │  │  │           └─ route.ts
│  │  │  ├─ auth
│  │  │  │  ├─ login
│  │  │  │  │  └─ page.tsx
│  │  │  │  └─ register
│  │  │  │     └─ page.tsx
│  │  │  ├─ favicon.ico
│  │  │  ├─ followed
│  │  │  │  └─ page.tsx
│  │  │  ├─ globals.css
│  │  │  ├─ layout.tsx
│  │  │  ├─ opportunity
│  │  │  │  └─ [code]
│  │  │  │     └─ page.tsx
│  │  │  └─ page.tsx
│  │  ├─ components
│  │  │  ├─ CalendarModal.tsx
│  │  │  ├─ ExportData.tsx
│  │  │  ├─ OpportunityCharts.tsx
│  │  │  ├─ OpportunityFilters.tsx
│  │  │  ├─ OpportunityStats.tsx
│  │  │  ├─ OpportunityTable.tsx
│  │  │  ├─ PageTransition.tsx
│  │  │  ├─ ThemeProvider.tsx
│  │  │  ├─ ThemeToggle.tsx
│  │  │  ├─ ui
│  │  │  │  ├─ breadcrumb.tsx
│  │  │  │  ├─ button.tsx
│  │  │  │  ├─ card.tsx
│  │  │  │  ├─ dialog.tsx
│  │  │  │  ├─ dropdown-menu.tsx
│  │  │  │  ├─ form.tsx
│  │  │  │  ├─ input.tsx
│  │  │  │  ├─ label.tsx
│  │  │  │  └─ select.tsx
│  │  │  └─ UserNav.tsx
│  │  ├─ lib
│  │  │  ├─ calendar-utils.ts
│  │  │  └─ utils.ts
│  │  ├─ middleware.ts
│  │  ├─ providers
│  │  │  └─ AuthProvider.tsx
│  │  ├─ redux
│  │  │  ├─ hooks.ts
│  │  │  ├─ provider.tsx
│  │  │  ├─ slices
│  │  │  │  └─ opportunitiesSlice.ts
│  │  │  └─ store.ts
│  │  ├─ services
│  │  │  ├─ authService.ts
│  │  │  └─ opportunityService.ts
│  │  └─ types
│  │     ├─ next-auth.d.ts
│  │     └─ Opportunity.ts
│  └─ tsconfig.json
├─ README.md
└─ The List.code-workspace

```