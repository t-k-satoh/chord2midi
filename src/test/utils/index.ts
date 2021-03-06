export const generateTitle = (macroPaths: string, isSingles: boolean): string => {
  const split = macroPaths.split('/')
  const prefix = isSingles ? 'singles' : 'combinations'

  return `${prefix}/${split[3]}/${split[4]}/${split[5]}`
}

export const generateContainerTitle = (macroPaths: string): string => {
  const split = macroPaths.split('/')

  return `containers/${split[3]}/${split[4]}/${split[5]}`
}
