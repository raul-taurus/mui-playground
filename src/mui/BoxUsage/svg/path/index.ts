import { SvgPathCommandProp as p, SvgPathCommandTemplate as f, } from "./command"

class SvgPath {

  private commands: string[] = []

  private add = (command: string) => this.commands.push(command);

  // MoveTo: M, m
  M = (...args: p.M[]) => this.add(`M ${f.M(...args)}`);
  m = (...args: p.m[]) => this.add(`m ${f.m(...args)}`);
  // LineTo: L, l, H, h, V, v
  L = (...args: p.L[]) => this.add(`L ${f.L(...args)}`);
  l = (...args: p.l[]) => this.add(`l ${f.l(...args)}`);
  H = (...args: p.H[]) => this.add(`H ${f.H(args)}`);
  h = (...args: p.h[]) => this.add(`h ${f.h(args)}`);
  V = (...args: p.V[]) => this.add(`V ${f.V(args)}`);
  v = (...args: p.v[]) => this.add(`v ${f.v(args)}`);
  // Cubic Bézier Curve: C, c, S, s
  C = (...args: p.C[]) => this.add(`C ${f.C(args)}`);
  c = (...args: p.c[]) => this.add(`c ${f.c(args)}`);
  S = (...args: p.S[]) => this.add(`S ${f.S(args)}`);
  s = (...args: p.s[]) => this.add(`s ${f.s(args)}`);
  // Quadratic Bézier Curve: Q, q, T, t
  Q = (...args: p.Q[]) => this.add(`Q ${f.Q(args)}`);
  q = (...args: p.q[]) => this.add(`q ${f.q(args)}`);
  T = (...args: p.T[]) => this.add(`T ${f.T(args)}`);
  t = (...args: p.t[]) => this.add(`t ${f.t(args)}`);
  // Elliptical Arc Curve: A, a
  A = (...args: p.A[]) => this.add(`A ${f.A(args)}`);
  a = (...args: p.a[]) => this.add(`a ${f.a(args)}`);
  // ClosePath: Z, z
  Z = () => this.z();
  z = () => this.add('z');

  toString() {
    return this.commands.join(' ');
  }
}

export function buildTree(width: number, height: number, count: number, radius: number = 20) {
  const halfW = width / 2;
  const halfH = height / 2;
  const path = new SvgPath();
  path.M([halfW, 0]);
  const hasMid = count % 2 === 1;
  path.l([0, hasMid ? height : halfH - radius]);

  const mid = count / 2 | 0;
  const unitWidth = width / (count * 2);
  for (let i = 0; i < count; i++) {
    const isLeft = i < mid;
    const isMid = hasMid && i === mid;
    if (isMid) { continue; }

    path.M([halfW, halfH - radius]);
    path.a({
      rx: radius, ry: radius, angle: 0,
      large_arc_flag: 0,
      sweep_flag: isLeft ? 1 : 0,
      dx: isLeft ? -radius : radius,
      dy: radius
    })

    const units = 2 * i + 1;
    path.l([unitWidth * (units - count) + 2 * (isLeft ? radius : -radius), 0])
    path.a({
      rx: radius, ry: radius, angle: 0,
      large_arc_flag: 0,
      sweep_flag: isLeft ? 0 : 1,
      dx: isLeft ? -radius : radius,
      dy: radius
    })
    path.L([unitWidth * units, height])
  }
  return path.toString();
}

export function buildTree2(rect: DOMRect, children: (HTMLDivElement | null)[], radius: number = 20) {
  const { width, height } = rect;
  const halfW = width / 2;
  const halfH = height / 2;
  const path = new SvgPath();
  path.M([halfW, 0]);
  path.l([0, halfH - radius]);

  for (const c of children) {
    const cRect = c!.getBoundingClientRect();
    const targetPoint = {
      x: cRect.x + cRect.width / 2 - rect.x,
      y: cRect.y,
    }

    path.M([halfW, halfH - radius]);

    const nearMid = targetPoint.x >= halfW - radius && targetPoint.x <= halfW + radius
    if (nearMid) {
      path.L([targetPoint.x, height])
      continue;
    }

    const isLeft = targetPoint.x <= halfW;
    path.a({
      rx: radius, ry: radius, angle: 0,
      large_arc_flag: 0,
      sweep_flag: isLeft ? 1 : 0,
      dx: isLeft ? -radius : radius,
      dy: radius
    })

    path.L([targetPoint.x + (isLeft ? radius : -radius), halfH])
    path.a({
      rx: radius, ry: radius, angle: 0,
      large_arc_flag: 0,
      sweep_flag: isLeft ? 0 : 1,
      dx: isLeft ? -radius : radius,
      dy: radius
    })
    path.L([targetPoint.x, height])
  }

  return path.toString();
}

