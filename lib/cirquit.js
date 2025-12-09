export class Cirquit {
  constructor() {
    this.points = new Map();
  }

  key(point) {
    const key = `${point[0]},${point[1]},${point[2]}`;
    return key;
  }

  add(point) {
    const has = this.has(point);
    if (has) {
      return 0;
    } else {
      this.points.set(this.key(point), true);
      return 1;
    }
  }

  has(point) {
    const r = this.points.has(this.key(point));
    return r;
  }

  size() {
    return this.points.size;
  }
}
