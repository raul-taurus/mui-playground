export namespace SvgPathCommandProp {
  export type M = [x: number, y: number]
  export type m = [dx: number, dy: number]
  export type L = [x: number, y: number]
  export type l = [dx: number, dy: number]
  export type H = { x: number }
  export type h = { dx: number }
  export type V = { y: number }
  export type v = { dy: number }
  export type C = { x1: number, y1: number, x2: number, y2: number, x: number, y: number }
  export type c = { dx1: number, dy1: number, dx2: number, dy2: number, dx: number, dy: number }
  export type S = { x2: number, y2: number, x: number, y: number }
  export type s = { dx2: number, dy2: number, dx: number, dy: number }
  export type Q = { x1: number, y1: number, x: number, y: number }
  export type q = { dx1: number, dy1: number, dx: number, dy: number }
  export type T = { x: number, y: number }
  export type t = { dx: number, dy: number }
  export type A = { rx: number, ry: number, angle: number, large_arc_flag: number, sweep_flag: number, x: number, y: number }
  export type a = { rx: number, ry: number, angle: number, large_arc_flag: number, sweep_flag: number, dx: number, dy: number }
}

// const p = (x: number, y: number) => `${x},${y}`;
const p = (x: number, y: number) => `${Math.round(x * 100) / 100},${Math.round(y * 100) / 100}`;
const join = <T>(arr: T[], format: (a: T) => string) => arr.map(format).join(' ')

const SvgPathCommandTemplate = {
  M: (...a: SvgPathCommandProp.M[]) => join(a, a => p(a[0], a[1])),
  m: (...a: SvgPathCommandProp.m[]) => join(a, a => p(a[0], a[1])),
  L: (...a: SvgPathCommandProp.L[]) => join(a, a => p(a[0], a[1])),
  l: (...a: SvgPathCommandProp.l[]) => join(a, a => p(a[0], a[1])),
  H: (a: SvgPathCommandProp.H[]) => join(a, a => `${a.x}`),
  h: (a: SvgPathCommandProp.h[]) => join(a, a => `${a.dx}`),
  V: (a: SvgPathCommandProp.V[]) => join(a, a => `${a.y}`),
  v: (a: SvgPathCommandProp.v[]) => join(a, a => `${a.dy}`),
  C: (a: SvgPathCommandProp.C[]) => join(a, a => `${p(a.x1, a.y1)} ${p(a.x2, a.y2)} ${p(a.x, a.y)}`),
  c: (a: SvgPathCommandProp.c[]) => join(a, a => `${p(a.dx1, a.dy1)} ${p(a.dx2, a.dy2)} ${p(a.dx, a.dy)}`),
  S: (a: SvgPathCommandProp.S[]) => join(a, a => `${p(a.x2, a.y2)} ${p(a.x, a.y)}`),
  s: (a: SvgPathCommandProp.s[]) => join(a, a => `${p(a.dx2, a.dy2)} ${p(a.dx, a.dy)}`),
  Q: (a: SvgPathCommandProp.Q[]) => join(a, a => `${p(a.x1, a.y1)} ${p(a.x, a.y)}`),
  q: (a: SvgPathCommandProp.q[]) => join(a, a => `${p(a.dx1, a.dy1)} ${p(a.dx, a.dy)}`),
  T: (a: SvgPathCommandProp.T[]) => join(a, a => `${p(a.x, a.y)}`),
  t: (a: SvgPathCommandProp.t[]) => join(a, a => `${p(a.dx, a.dy)}`),
  A: (a: SvgPathCommandProp.A[]) => join(a, a => `${a.rx} ${a.ry} ${a.angle} ${a.large_arc_flag} ${a.sweep_flag} ${p(a.x, a.y)}`),
  a: (a: SvgPathCommandProp.a[]) => join(a, a => `${a.rx} ${a.ry} ${a.angle} ${a.large_arc_flag} ${a.sweep_flag} ${p(a.dx, a.dy)}`),
}

export {
  SvgPathCommandTemplate,
}
