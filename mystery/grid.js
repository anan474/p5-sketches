class Grid {
  constructor(cell_w, cell_h, cell_count_x, cell_count_y) {
    this.cells = [];
    var total_w = cell_w * cell_count_x;
    var total_h = cell_h * cell_count_y;

    var grid_x = width * 0.5 - total_w * 0.5;
    var grid_y = height * 0.5 - total_h * 0.5;

    for (var x = 0; x < cell_count_x; x++) {
      for (var y = 0; y < cell_count_y; y++) {
        var cell_x = grid_x + cell_w * x;
        var cell_y = grid_y + cell_h * y;
        var cell = new Cell(cell_x, cell_y, cell_w, cell_h);
        this.cells.push(cell);
      }
    }
  }
}

class Cell {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
    this.mid_x = x + w * 0.5;
    this.mid_y = y + h * 0.5;
  }
}
