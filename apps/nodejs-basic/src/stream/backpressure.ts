function write(stream: NodeJS.WriteStream, chunk: Buffer) {
  const hasMoreRoom = stream.write(chunk)
  if (hasMoreRoom) {
    return Promise.resolve(null)
  } else {
    return new Promise((resolve) => {
      stream.on("drain", () => {
        resolve(null)
      })
    })
  }
}

async function copy(
  source: NodeJS.ReadStream,
  destination: NodeJS.WriteStream,
) {
  destination.on("error", (err) => {
    console.error(err)
  })

  for await (const chunk of source) {
    await write(destination, chunk as Buffer)
  }
}

void copy(process.stdin, process.stdout)
