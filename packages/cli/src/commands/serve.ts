import path from 'path'
import { Command } from 'commander'
import serve from '@js-pustak/local-api'

const isProd = process.env.NODE_ENV === 'production'

export const serveCommand = new Command()
    .command('serve [filename]')
    .description('Open file for editing')
    .option('-p, --port <number>', 'port to run server on', '4000')
    .action(async (filename = 'notebook.js', options: { port: string }) => {
        try {
            const dir = path.join(process.cwd(), path.dirname(filename))
            filename = path.basename(filename)
            await serve(parseInt(options.port), filename, dir, !isProd)
            console.log(
                `Opened ${filename}. Navigate to https://localhost:${options.port} to edit the file`
            )
        } catch (err: any) {
            if (err.code === 'EADDRINUSE') {
                console.log('Port is in use. Try to run the program on another port')
            }
            else console.log("Error", err.message)

            process.exit(1)
        }
    })
