interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export const SIDE_WIDTH = 385;
export const HEADER_HEIGHT = 56;

function makePoints() {
  let W = window.innerWidth - 2;
  let H = window.innerHeight - 2;
  return [
    // side
    [SIDE_WIDTH, H],
    [SIDE_WIDTH, HEADER_HEIGHT],
    [2, HEADER_HEIGHT],
    // full
    [2, H],
    [W, H],
    [W, 2],
    [2, 2],
    [2, HEADER_HEIGHT],
    // extra
    [-1, -1], // [-1,-1] is a skip
    [SIDE_WIDTH, 2],
    [SIDE_WIDTH, HEADER_HEIGHT],
    [-1, -1], // [-1,-1] is a skip
    [SIDE_WIDTH, HEADER_HEIGHT],
    [W, HEADER_HEIGHT],
  ];
}

function mobilePoints() {
  let W = window.innerWidth - 2;
  let H = window.innerHeight - 2;
  return [
    [W, HEADER_HEIGHT],
    [2, HEADER_HEIGHT],
    [2, H],
    [W, H],
    [W, 2],
    [2, 2],
    [2, HEADER_HEIGHT],
  ];
}

export function len(p1, p2) {
  const xlen = Math.abs(p1[0] - p2[0]);
  const ylen = Math.abs(p1[1] - p2[1]);
  return Math.abs(xlen - ylen);
}

export function totalLength(mobile: boolean) {
  const points = mobile ? mobilePoints() : makePoints();
  let t = 0;
  points.forEach((p, i) => {
    if (i === points.length - 1) return;
    const next = points[i + 1];
    t += len(p, next);
  });
  return t;
}

export function makeLines(l: number, mobile: boolean): Line[] {
  const points = mobile ? mobilePoints() : makePoints();
  const lines: Line[] = [];
  // beginning of currently animated line
  let place = 0;
  points.forEach((p, i) => {
    if (i === points.length - 1) return;
    if (l < place) return;
    const next = points[i + 1];
    const length = len(p, next); // length of this line
    place += length;
    const theline = partLine(p, next, place, l);
    if (theline) lines.push(theline);
  });
  return lines;
}

function isSkip(p: number[]): boolean {
  return p.length === 2 && p[0] === -1 && p[1] === -1;
}

function partLine(p: number[], next: number[], place: number, l: number): Line {
  if (isSkip(p) || isSkip(next)) {
    return null;
  }
  let [x1, y1] = p;
  let [x2, y2] = next;
  if (y1 > y2) {
    // up
    y2 = Math.max(next[1], next[1] + place - l);
  }
  if (y1 < y2) {
    // down
    y2 = Math.min(next[1], next[1] - place + l);
  }
  if (x1 > x2) {
    // left
    x2 = Math.max(next[0], next[0] + place - l);
  }
  if (x1 < x2) {
    // right
    x2 = Math.min(next[0], next[0] - place + l);
  }
  return { x1, y1, x2, y2 };
}
