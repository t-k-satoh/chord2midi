export const addZero = (value: string | number, limit: number): string => {
  const barLength = String(value).length
  const addZero: string[] = []

  for (let index = 0; index < limit - barLength; index++) {
    addZero.push('0')
  }

  return `${addZero.join('')}`
}
