import child_process from "node:child_process"
import util from "node:util"

child_process.execSync("ls -l src/", { encoding: "utf-8" })
child_process.execFileSync("ls", ["-l", "src/"], { encoding: "utf-8" })

const execPromisify = util.promisify(child_process.exec)

function parallelExec(commands: string[]) {
  const promises = commands.map((command) =>
    execPromisify(command, { encoding: "utf-8" }),
  )

  return void Promise.all(promises).then((outputs) =>
    outputs.map((out) => out.stdout),
  )
}

const execFile = child_process.execFile("ls -l src/")
const spawn = child_process.spawn("ls -l src/")
