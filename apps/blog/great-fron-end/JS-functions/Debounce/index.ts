
export default function debounce(func: Function, wait?: number) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined
  return function (this: unknown, ...args: unknown[]) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      timeoutId = undefined
      func.apply(this, args)
    }, wait)

    /**
     * const context = this
     * timeoutId = setTimeout(function () {
     *   timeoutId = undefined
     *   func.apply(context, args)
     * }, wait)
     */
  }
}
