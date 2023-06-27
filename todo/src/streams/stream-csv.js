import fs from 'node:fs'
import { parse } from 'csv-parse'

const csvPath = new URL('../../tasks.csv', import.meta.url)

const stream = fs.createReadStream(csvPath)

const csvParse = parse({
  delimiter: ',',
  skipEmptyLines: true,
  fromLine: 2
})

async function sendStreamCsv() {
  const parser = stream.pipe(csvParse)

  for await (const line of parser) {
    const [title, description] = line

    await new Promise((resolve) => setTimeout(resolve, 500))
    
    await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description })
    })
  }
}

sendStreamCsv()