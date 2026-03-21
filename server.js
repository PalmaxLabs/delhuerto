import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import express from 'express'
import { createServer as createViteServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isProd = process.argv.includes('--prod') || process.env.NODE_ENV === 'production'
const portArgIndex = process.argv.indexOf('--port')
const portFromArg =
  portArgIndex !== -1 ? Number(process.argv[portArgIndex + 1]) : undefined

async function createServer() {
  const app = express()

  let vite

  if (!isProd) {
    vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: {
          port: 3005,
        },
      },
      appType: 'custom',
    })
    app.use(vite.middlewares)
  } else {
    app.use('/server', (_req, res) => res.status(404).end())
    app.use(
      express.static(path.resolve(__dirname, 'dist'), {
        index: false,
      }),
    )
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template
      let render

      if (!isProd) {
        template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        ;({ render } = await vite.ssrLoadModule('/src/entry-server.tsx'))
      } else {
        template = fs.readFileSync(path.resolve(__dirname, 'dist/index.html'), 'utf-8')
        ;({ render } = await import(
          pathToFileURL(
            path.resolve(__dirname, 'dist/server/entry-server.js'),
          ).href
        ))
      }

      const { html: appHtml } = await render(url)
      const html = template.replace(`%APP_HTML%`, appHtml)
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      if (!isProd && vite) {
        vite.ssrFixStacktrace(e)
      }
      next(e)
    }
  })

  const port = portFromArg ?? (process.env.PORT ? Number(process.env.PORT) : 5173)
  const server = app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
  })
  server.on('error', (err) => {
    console.error(err)
    process.exit(1)
  })
}

createServer()
