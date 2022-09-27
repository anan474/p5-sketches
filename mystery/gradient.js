class Gradient {
  constructor() {
    this.settings();
  }

  settings() {
    this.r = random() * 8;
    // https://coolors.co/d3bdb0-c1ae9f-89937c-715b64-69213f
    if (this.r < 1) {
      this.colors = [
        color("#2364aa"),
        color("#3da5d9"),
        color("#73bfb8"),
        color("#fec601"),
        color("#ea7317"),
      ];
    } else if (1 <= this.r && this.r < 2) {
      this.colors = [
        color("#a0bdc0"),
        color("#b0d0d3"),
        color("#c08497"),
        color("#dc9a9a"),
        color("#f7af9d"),
        color("#f7e3af"),
      ];
    } else if (2 <= this.r && this.r < 3) {
      this.colors = [
        color("#565264"),
        color("#706677"),
        color("#a6808c"),
        color("#ccb7ae"),
        color("#d6cfcb"),
      ];
    } else if (3 <= this.r && this.r < 4) {
      this.colors = [
        color("#0b3954"),
        color("#087e8b"),
        color("#bfd7ea"),
        color("#ff5a5f"),
        color("#c81d25"),
      ];
    } else if (4 <= this.r && this.r < 5) {
      this.colors = [
        color("#ba1200"),
        color("#AC7279"),
        color("#9dd1f1"),
        color("#508aa8"),
        color("#c8e0f4"),
      ];
    } else if (5 <= this.r && this.r < 6) {
      this.colors = [
        color("#edf67d"),
        color("#f896d8"),
        color("#ca7df9"),
        color("#9e65f9"),
        color("#724cf9"),
      ]; //purples
    } else if (6 <= this.r && this.r < 7) {
      this.colors = [
        color("#0073c5"),
        color("#2ac1d8"),
        color("#fff2e1"),
        color("#ffa857"),
        color("#e55120"),
      ];
    } else if (7 <= this.r && this.r <= 8) {
      this.colors = [
        color("#00b0e6"),
        color("#00e6f2"),
        color("#fdfde3"),
        color("#fee1c5"),
        color("#f38981"),
      ];
    }
  }

  sample(value) {
    var v = map(value, 0, 1, 0, this.colors.length - 1);
    var s = floor(v);
    var e = s + 1;
    return lerpColor(this.colors[s], this.colors[e], v % 1);
  }
}
