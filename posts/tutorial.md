---
title: 'Next.JS Tutorial Notes'
date: '2023-04-01'
use-github-css: True
---

We completed the Next.JS [tutorial](https://nextjs.org/learn/foundations/about-nextjs).
This post contains our notes from the same.

Why Next.JS?
===========

> Next.JS has awesome lego pieces to create fast web applications.

When developers build web apps, in most cases, they need the following basic building blocks:

1. **UI**: How users consume info & interact with the app?

2. **Routing**: Navigation between different parts of the app.

3. **Data Fetching**: Where does the src data live and how to get it to the app?

4. **Rendering**: Generate content (html + css) - static / dynamic.

5. **Integrations**: Interface with 3rd party services / APIs. e.g. auth, CMS, payments etc.

6. **Infra**: Where does the app live and how it is deployed - serverless, CDN, edge, etc.

7. **Performance**: Make the app fast for end-user.

8. **Scalability**: When team / users / data grow, how does the app adapt?

9. **Devx** (Developer Experience): How is easy it is for developers to build and maintain the app.


For each of these, the developers, can one of the following two choice:

- build in-house
- use existing libraries / frameworks

---

React.js
========

### What is React?

React JS is **library** for building **user interfaces**.

### What is UI?

UI (User Interface) refers to the elements of the app users see and interact with. Mostly on-screen.

### React is very unopinionated

This is both a pro and a con.  
It is relatively easy to see why it is a pro.  

#### Why being unopinionated can be counter-productive sometimes? 

Can lead to a lot of time being spend on:
- configuring tools
- reinventing solutions to common app requirements.

---

Next.js
=======

- Provides structure around React.
- Handles tooling and configuration.
- Developers can adopt next.js incrementally.


DOM
====

[Reference on DOM APIs](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents)


#### Interesting Aside: unpkg | umd

- [unpkg.com](https://unpkg.com) is CDN for any node module.
- best to choose UMD (universal module definition)
    - To understand what is UMD, you can checkout the following refs: 
       - <https://dev.to/iggredible/what-the-heck-are-cjs-amd-umd-and-esm-ikm#umd>
       - <https://dontkry.com/posts/code/browserify-and-the-universal-module-definition.html>
       - <https://github.com/umdjs/umd/>



React State
===========

- Apart from `useState` React provides a bunch of APIs to manage state. Examples:
    - `useReducer`
    - `useContext`

Reference: <https://react.dev/learn/managing-state>

---

How Next.js Works
=================

<https://nextjs.org/learn/foundations/how-nextjs-works>

### Basics of how next.js works

React is unopinionated about how to build and structure apps.  
Next.js provides this structure. As a bonus it also adds optimizations to make dev and prod faster.


### Key Concepts

#### env

ENV = Where my code runs?
It can be `dev` or `prod`.

#### `env=dev`

> optimize for developer experience.

- out of the box next.js comes with
    - TypeScript
    - ESLint
    - Fast Refresh
    - ...

#### `env=prod`

> optimize for end user experience.

- transform code to make it more performant
    - { similar to how babel / vite / webpack work }
        - compile
        - bundle
        - minify
        - split

- how does next.js approach it?
    - *next.js compiler*
    - written in Rust
    - > SWC
        - platform that can be used for:
            - compilation, minification, bundling, etc.

#### `env=prod` Key Components

- **Compilation**
    - transpile Typescript + JSX to JS that can be run on browsers
        - happens both during dev and prod build

- **Minification**
    - remove formatting, indenting, etc.
    - reduce file size in prod

- **Bundling**
    - resolve import / export graph
    - { create a single `bundle.js` / `app.js` containing all the code for the app }

- **Code Spliting**
    ```
    { 
        input:  bundle.js
        output: common.js, page1.js / chunk1.js, page2.js / chunk2.js, etc.
    }
    ```
    - each file in `pages/` will be split into its own bundle.
        - code shared between pages is also split into its own
            bundle to avoid downloading duplicate code
        - after initial load njs pre loads bundles that are likely to be used
        - can also control it manually:
            - dynamic imports.

#### When my code run?

- **build time** (build step)
    - njs takes code written by devs and transforms it into different files:
        - static HTML + CSS files
        - js code file(s) that run on the server {to render the page server side}
        - js code file(s) that run on the client (browser) {to make the app interactive}
        

- **runtime** (request time)
    - after app has been built and deployed
        - code that runs on user request
            - { mostly refers to server side code } 
            - { similar to serverless functions }


#### Where does rendering happen?

- **client**
    - { user's device (browser). sends request to server for app code }
    - { also sends requests to server for data }
- **server**
    - { computer that runs in a data center }
    - { stores application code }
    - { request from client => < computation on server > => response to client }

- what is rendering?
    - { dev react code => < rendering process > => UI HTML }

- where does rendering take place?
    - both client and server

- when does rendering take place?
    - both of:
        1. ahead of time (during the build phase)
        2. on demand (on every request) (at runtime)

- types of rendering on next.js
    - server-side rendering (SSR)
    - static site generation (SSG)
    - client-side rendering (CSR)

-  { SSR + SSG => together called **pre-rendering** }
    - why? fetching of external data (server side props)
        and transformation of React components into HTML
            happens before request is sent by client
    - { can be thought of like a caching layer }
        
- client side rendering
    - { in classic react: server sends empty HTML "shell"  + JS code (instructions on how to render HTML) }
        - { rendering happens on user device }

    - next.js also allows for client side rendering:
        - fetch data using -
            - > `useEffect`
            - > `useSWR`
        
    - next.js pre-renders every page by default
        - HTML generated in advance on server
            - { for blog like content: better for SEO }
            - { faster initial page renders }
            - { low time to initial user interactivity }
        
- pre-render: **Server Side Rendering**
    - HTML generation on server for each request
        - generated HTML + JSON data { required for hydration } + JS { to make page interactive } sent to client.
        - **hydration**: react uses generated json data + JS code
            to make the interactive, continuing from the same
            state as the server side generated HTML
    
    - > can opt into SSR by using **`getServerSideProps`**

    - > next 12 + react 18 also include alpha version of *React server components*
        - it does not have any client-side js to render
                
- pre-render: **Static Site Generation**
    - HTML generated, but not on each on each request
        - done ahead of time, during the build phase
        - generated HTML is stored in a CDN
            - reused for each request
        - { sounds much more efficient }
    
    - > can opt to SSG by using **`getStaticProps`**

    - > can also use **Incremental Static Regeneration**
        - can update built static HTML
        - don't have to do full rebuild of entire site
        - { kind of like applying deltas }


#### rendering: "the next.js advantage"

> Developers can choose the best rendering method on a page-by-page basis.
> read more in the *data fetching docs*.
            
#### network

- components
    - origin servers
    - CDNs
    - Edge

- CDN
    - store static content
    - geographically distributed
    - uses benefits of caching
    
- "The Edge"
    - servers / computers part of the network that are closest to the user
    - Technically CDNs are also part of "The Edge"
    - In general Edge servers can also run small snippets of code
    - Essentially reduces latency
    - kind of a perf optimization

---


First Next.js App
================

<https://nextjs.org/learn/basics/create-nextjs-app>

> Goal: to create a simple demo blog using next

> uses [this](https://github.com/vercel/next-learn/tree/main/basics/learn-starter) as the starter code.

```
npx create-next-app@latest nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/main/basics/learn-starter"
```

Navigating Between Pages
========================

- multi page app
    - "file routing system"
- `<Link>` component
- code spliting and prefetching

Page? in Next.js
===============

> A "page" is just a react component exported from the pages/ directory.

> page <=> route association done based on filename

- for app's internal pages prefer `next/Link` component instead of bare `<a>`
    - why?
        - allows to do "client-side navigation"
        > client-side navigation actually refers to a bunch of [optimizations](https://nextjs.org/learn/basics/navigate-between-pages/client-side) done by next.
    - how?
        - similar to the `<a>` tag.
            ```xml
            <Link href="link-target-here">Link text here</Link>
            ```
    - for external pages use `<a>` instead of `<Link>`

Styling
=======

Next has builtin support for CSS and Sass.

[Styling docs](https://nextjs.org/docs/pages/building-your-application/styling)

> how to static files / images ?
> - put em in top level `public` directory
> - files inside this dir can be referenced from app root

- topics covered:
    - customize `<head>` for each page
    - create reusable components styled using CSS Modules
    - adding global css
    - styling tips

- ways of styling:
    - sass: `.css` and `.scss` files
    - postcss: tailwind
    - css in js: styled-jsx, styled-components, emotion
    - etc.

> utility 1st CSS: <https://tailwindcss.com/docs/utility-first>

> more styling tips: <https://nextjs.org/learn/basics/assets-metadata-css/styling-tips>

- out of the box next.js compiles css using PostCSS
- can customize config by creating a top-level `postcss.config.js` file
    - { useful if using tailwind }
    - see [example](https://github.com/vercel/next.js/tree/canary/examples/with-tailwindcss) for getting started with tailwind

Images
======

> Use `next/image` instead of bare `<img>`.
- why? It has a bunch of [optimizations](https://nextjs.org/docs/pages/building-your-application/optimizing/images) built in.

Head
====

<https://nextjs.org/docs/pages/api-reference/components/head>

- Head can also contain [Open Graph](https://ogp.me/) (`og:?`) tags
    - these are used to render preview of the page by apps like twitter, slack, etc.
    - see references:
        - <https://www.freecodecamp.org/news/what-is-open-graph-and-how-can-i-use-it-for-my-website/>
        - <https://seosetups.com/blog/open-graph/>


3rd Party JS
============

<https://nextjs.org/learn/basics/assets-metadata-css/third-party-javascript>

> next.js [recommends against](https://nextjs.org/docs/messages/no-script-tags-in-head-component) directly including script in the head tag.

- should use `next/script` instead.
- can be used anywhere in the page

`_app.js`
========

<https://nextjs.org/docs/pages/building-your-application/routing/custom-app>

- top level component that wraps all pages in the app.
- can be used to:
    - keep state while navigating between pages
    - add global styles


pre-rendering & data fetching
=============================

<https://nextjs.org/docs/pages/building-your-application/data-fetching>

- Topics:
    - next.js pre-rendering feature
        - Static Generation
            - with data
            - without data
        - Server-side Rendering
    - `getStaticProps`


- next.js generates HTML for each page
- so page should be viewable even with js disabled
- by default next will pre-render every page
    - html generation happens in advance
- better for perf and seo
- { hydration }

1. Static Site Generation (ssg)
2. Server Side Rendering (ssr)

- in dev next does ssr
    - in prod it defaults to ssg

- per page basis
    - for each page we can decide
        - ssg vs ssr
        - hybrid app
            - most pages are ssg.
            - some are ssr

- ssg is generally better for perf
    - and benefits from caching at CDN
    - so try to do this whenever possible
    - not good when user / request context is required for rendering
    - ssg with data
        - load data from an external system
        - `getStaticProps`
            - query external system
            - fetch data
            - return props
            - { in dev getStaticProps runs on every request }
            - { in prod runs at build time }
            - { only run server side }
            - { js code is also not shipped to the client }

- ssr
    - required when need to fetch data at request time
        - instead of build time
    - `getServerSideProps`
        - TTFB (time to first byte) will be slower than `getStaticProps`
            - code will run on the server at each request
        - same interface as `getStaticProps`
            - just when the code runs is different

- client side rendering
    - see: swr <https://swr.vercel.app/>


Dynamic Routes
==============

<https://nextjs.org/learn/basics/dynamic-routes>

> dynamic urls: `getStaticPaths`

- `getStaticProps` for each dynamic page
    - [documentation](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths)
    - [`fallback`](https://nextjs.org/docs/pages/api-reference/functions/get-static-paths#fallback-false) param.

- `[id].js` vs `[...id].js`
    
    - `[id].js` => returned `id` is  string
    
        - for example:
            ```
            `pages/posts/[id].js:getStaticProps` returns {
                paths: [
                    {
                        params: {
                            id: "a"
                        }
                    },
                    {
                        params: {
                            id: "b"
                        }
                    },
                    {
                        params: {
                            id: "c"
                        }
                    }
                ]
            }
            ```
            actual paths become something like:
            - `/posts/a`
            - `/posts/a`
            - `/posts/c`

    - `[...id].js` => returned `id` is an array
        
        - for example:
            ```
            `pages/posts/[id].js:getStaticProps` returns {
                paths: [
                    {
                        params: {
                            id: ["a", "b", "c"]
                        }
                    },
                    {
                        params: {
                            id: ["b", "d"]
                        }
                    },
                ]
            }
            ```
            actual paths become something like:
            - `/posts/a/b/c`
            - `/posts/b/d`

- link pages using dynamic routes

- advanced
    - [`useRouter`](https://nextjs.org/docs/pages/api-reference/functions/use-router): access the next.js router inside components

    - [Error Pages](https://nextjs.org/docs/pages/building-your-application/routing/custom-error)
        - `pages/404.js` => for custom 404 page

    - [More examples](https://nextjs.org/learn-pages-router/basics/dynamic-routes/dynamic-routes-details)

API Routes
==========

<https://nextjs.org/learn-pages-router/basics/api-routes>

> Create API endpoints as node.js serverless functions

- create a function in `pages/api` directory

    ```js
    // req = incoming client HTTP request
    // res = outgoing server HTTP response
    export default function handler(req, res) {

    }
    ```

- [reference docs](https://nextjs.org/docs/pages/building-your-application/routing/api-routes)


- api routes code is not included in the client bundle
- fetching api routes from `getStaticProps` or `getStaticPaths` is not recommended
    - instead can directly server-side code in these function
    - these are anyway not included in the client bundle
- good use cases:
    - handling form input
        - client sends post request to api route
            - api route code saves it to db
    - [preview mode](https://nextjs.org/docs/pages/building-your-application/configuring/preview-mode)

Deploying the Next.js App
=========================

<https://nextjs.org/learn-pages-router/basics/deploying-nextjs-app>

- vercel
- other hosting options:
    1. `npm run build`
        - builds the app to `.next` dir
    2. `npm run start`
        - This starts a node.js server. It serves both:
            - statically generated pages
            - server-side rendered pages 

Fin!
====

<https://nextjs.org/learn-pages-router/basics/deploying-nextjs-app/finally>

- [Using next.js with Typescript](https://nextjs.org/docs/pages/building-your-application/configuring/typescript)
- [Data Fetching](https://nextjs.org/docs/pages/building-your-application/data-fetching)
- [Env Variables](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables)
- [SEO](https://nextjs.org/learn-pages-router/seo/introduction-to-seo)
