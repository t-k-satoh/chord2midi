import Reuse from '@spectrum-icons/workflow/Reuse'
import { ExcludeInitObject, MergeInit } from '../../types'

export const convertExcludeObject = <T extends Record<string, MergeInit<unknown>>>(
  object: T
): ExcludeInitObject<T> => object as ExcludeInitObject<T>
