export type CombinationType<P, U = { [K in keyof P]: P[K][] }> = U
