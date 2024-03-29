# Schort

A simple and fast URL shortener. Check it at: [schort.me](https://schort.me/)

### Motivation

I thought it would be fun to have my own URL shortener.
The good slugs are already gone at [bit.ly](https://bitly.com/) or [tinyurl.com](https://tinyurl.com/), so I get a fresh start here.

The name is a German take on "short", as in "short link".

### Stack

- frontend is [React](https://reactjs.org/) with [Next](https://nextjs.org/)
- data fetching [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)
- fast redirects with [Next Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- hosted on [Vercel](https://vercel.com/)
- database is [Redis](https://redis.io/) on [Vercel KV](https://vercel.com/storage/kv)
