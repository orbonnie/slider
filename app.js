  $(document).ready(function(){
  const MARGIN = 2;
  const BORDER = 1;
  let boardWidth = $('#board').width();
  let boardHeight = $('#board').height();
  let squareWidth = boardWidth/3;
  let squareHeight = boardWidth/3;
  let freeze = false;
  let images, squares, gapY, gapX;

  let image00 = "https://tinyurl.com/ydex5sr4";
  let image01 = "https://tinyurl.com/https-puzzlepics2";
  let image02 = "https://tinyurl.com/https-puzzlepics3";
  let image10 = "https://tinyurl.com/https-puzzlepics4";
  let image11 = "https://tinyurl.com/https-puzzlepics5";
  let image12 = "https://tinyurl.com/https-puzzlepics6";
  let image20 = "https://tinyurl.com/https-puzzlepics7";
  let image21 = "https://tinyurl.com/https-puzzlepics8";
  let image22 = "https://tinyurl.com/https-puzzlepics9";

  function start() {
    gapY = 2;
    gapX = 2;

    images = [
      [image00, image01, image02],
      [image10, image11, image12],
      [image20, image21, image22]
    ];

    squares = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, null]
    ];
  }

  start();

  function fillSquares() {
    for(let y = 0; y < 3; y++) {
      for(let x = 0; x < 3; x++) {
        let value = y*3 + x+1;
        let image = images[y][x];
        if(value < 9) {
          let $piece = $('<img class="square" src=' + image + '>');
          $piece.data('y', y).data('x', x);
          squares[y][x] = $piece;
        }
      }
    }
    setBoard();
  }

  function setBoard() {
    for(let y = 0; y < 3; y++) {
      for(let x = 0; x < 3; x++) {
        let $piece = squares[y][x];
        if($piece){
          $piece.css({
            top: $piece.data('y') * squareHeight,
            left: $piece.data('x') * squareWidth
          });
          $('#board').append($piece);
        }
      }
    }
  }

  function down() {
    if(gapY > 0 && !freeze){
      let $piece = squares[gapY-1][gapX];
      squares[gapY][gapX] = $piece;
      $piece.data('y', gapY);
      slide($piece);
      gapY -= 1;
      squares[gapY][gapX] = null;
    }
  }

  function up() {
    if(gapY < 2 && !freeze){
      let $piece = squares[gapY+1][gapX];
      squares[gapY][gapX] = $piece;
      $piece.data('y', gapY);
      slide($piece);
      gapY += 1;
      squares[gapY][gapX] = null;
    }
  }

  function left() {
    if(gapX < 2 && !freeze){
      let $piece = squares[gapY][gapX+1];
      squares[gapY][gapX] = $piece;
      $piece.data('x', gapX);
      slide($piece);
      gapX += 1;
      squares[gapY][gapX] = null;
    }
  }

  function right() {
    if(gapX > 0 && !freeze){
      let $piece = squares[gapY][gapX-1];
      squares[gapY][gapX] = $piece;
      $piece.data('x', gapX);
      slide($piece);
      gapX -= 1;
      squares[gapY][gapX] = null;
    }
  }

  function slide($piece) {
    $piece.animate({
      top: $piece.data('y') * squareHeight,
      left: $piece.data('x') * squareWidth,
      duration: 50
    });
  }

  function keydown(e) {
    console.log(gapX, gapY);
    let count = parseInt($('span#count').text());
    switch (e.which){
      case 37:
        if(gapX < 2){
          left();
          if (!freeze) count++;
        }
      break;
      case 38:
        if(gapY < 2){
          up();
          if (!freeze) count++;
        }
      break;
      case 39:
        if(gapX > 0){
          right();
          if (!freeze) count++;
        }
      break;
      case 40:
        if(gapY > 0){
        down();
        if (!freeze) count++;
        }
      break;
    }
    isSolved();
    e.stopPropagation();
    e.preventDefault();
    $('#count').text(count);
  }

  function shuffle() {
    $('#board').empty();
    fillSquares();
    for(let i=0; i<80; i++){
      let random = Math.random();
      if(random < 0.25){
        up();
      }
      else if(random < 0.5){
        down();
      }
      else if(random < 0.75){
        right();
      }
      else{
        left();
      }
    }
  }

  function isSolved() {
    let solved = true;
    for(let y = 0; y < 3; y++) {
      for(let x = 0; x < 3; x++) {
        let $img = $(squares[y][x]);
        if ($img[0]){
          // console.log($img[0].src, y, x);
          if ($img[0].src !== images[y][x]) {
            solved = false;
          }
        }
      }
    }
    if (solved) {
      end();
    }
  }

  function end() {
    let $piece = $('<img class="square" src=https://tinyurl.com/https-puzzlepics9>');
    $piece.data('y', 2).data('x', 2);
    $piece.css({
      top: $piece.data('y') * squareHeight,
      left: $piece.data('x') * squareWidth
    });
    $('#board').append($piece);
    // squares[2][2] = $piece;
    freeze = true;
  }

  $('#shuffle').click(function() {
    $('#count').text('0');
    freeze = false;
    start();
    shuffle();
});

  $('#reset').click(function() {
    $('#count').text('0');
    $('#board').empty();
    start();
    fillSquares();
  });

  $(function(e) {
    $(document).keydown(keydown);
    // fillSquares();
    shuffle();
  });

});
