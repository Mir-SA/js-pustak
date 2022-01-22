import path from 'path'
import fs from 'fs/promises'
import express from 'express'

interface Cell {
    id: string,
    content: string,
    type: string
}

export const createCellsRouter = (filename: string, dir: string) => {
    const router = express.Router()
    router.use(express.json())
    const fullPath = path.join(dir, filename)

    router.get('/cells', async (req, res) => {
        try {
            // Read the file
            const result = await fs.readFile(fullPath, { encoding: 'utf-8' })

            res.send(JSON.parse(result))
        } catch (err: any) {
            if (err.code === 'ENOENT') {
                await fs.writeFile(fullPath, '[]', 'utf-8')
                res.send([])
            }
            else throw err

        }
        // Parse a list of cells out of it
        // Send list of cells back to browser
    })

    router.post('/cells', async (req, res) => {

        // take list of cells from req obj
        // serialize them
        const { cells }: { cells: Cell[] } = req.body

        // write cells into the file
        await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8')

        res.send({ status: 'ok' })
        // res.status(200)
    })

    return router
}
