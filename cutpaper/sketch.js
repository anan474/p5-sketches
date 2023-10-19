// https://openprocessing.org/sketch/2018793

// By Aleksandra Jovanic
// twitter: @alexis_o_O
// instagram: aleksandrajovanic
// Submission for twitter.com/sableRaph's #WCCChallenge topic: Cut and Paste
// I recycled for this one... but I miss taking part in WCCC

// I made alternative "chaotic and animated" version during the stream
// https://openprocessing.org/sketch/2018925

// dictionary serbian -> english
// tekst -> text
// rec -> word, rnd_rec -> random word :D
// reci -> words
// trenutna(x|y) -> current(x|y)

var canvasSize;
let tx = 0;
let ty = 10;

let tekst, tekst2, tekst3;
let alice =
  "In another moment down went after it, never once considering how in the world she was to get out again. The rabbit-hole went straight on like a tunnel for some way, and then dipped suddenly down, so suddenly that had not a moment to think about stopping herself before she found herself falling down a very deep well. Either the well was very deep, or she fell very slowly, for she had plenty of time as she went down to look about her and to wonder what was going to happen next. First, she tried to look down and make out what she was coming to, but it was too dark to see anything; then she looked at the sides of the well, and noticed that they were filled with cupboards and book-shelves; here and there she saw maps and pictures hung upon pegs. She took down a jar from one of the shelves as she passed; it was labelled ORANGE MARMALADE', but to her great disappointment it was empty: she did not like to drop the jar for fear of killing somebody, so managed to put it into one of the cupboards as she fell past it. Well!' thought to herself, after such a fall as this, I shall think nothing of tumbling down stairs! How brave they'll all think me at home! Why, I wouldn't say anything about it, even if I fell off the top of the house!' (Which was very likely true.) Down, down, down. Would the fall never come to an end! I wonder how many miles I've fallen by this time?' she said aloud. I must be getting somewhere near the centre of the earth. Let me see: that would be four thousand miles down, I think--' (for, you see, had learnt several things of this sort in her lessons in the schoolroom, and though this was not a very good opportunity for showing off her knowledge, as there was no one to listen to her, still it was good practice to say it over) --yes, that's about the right distance--but then I wonder what Latitude or Longitude I've got to?' ( had no idea what Latitude was, or Longitude either, but thought they were nice grand words to say.) Presently she began again. I wonder if I shall fall right through the earth! How funny it'll seem to come out among the people that walk with their heads downward! The Antipathies, I think--' (she was rather glad there was no one listening, this time, as it didn't sound at all the right word) --but I shall have to ask them what the name of the country is, you know. Please, Ma'am, is this New Zealand or Australia?' (and she tried to curtsey as she spoke--fancy curtseying as you're falling through the air! Do you think you could manage it?) And what an ignorant little girl she'll think me for asking! No, it'll never do to ask: perhaps I shall see it written up somewhere.' Down, down, down. There was nothing else to do, so soon began talking again. Dinah'll miss me very much to-night, I should think!' (Dinah was the cat.) I hope they'll remember her saucer of milk at tea-time. Dinah my dear! I wish you were down here with me! There are no mice in the air, I'm afraid, but you might catch a bat, and that's very like a mouse, you know. But do cats eat bats, I wonder?' And here began to get rather sleepy, and went on saying to herself, in a dreamy sort of way, Do cats eat bats? Do cats eat bats?' and sometimes, Do bats eat cats?' for, you see, as she couldn't answer either question, it didn't much matter which way she put it. She felt that she was dozing off, and had just begun to dream that she was walking hand in hand with Dinah, and saying to her very earnestly, Now, Dinah, tell me the truth: did you ever eat a bat?' when suddenly, thump! thump! down she came upon a heap of sticks and dry leaves, and the fall was over. was not a bit hurt, and she jumped up on to her feet in a moment: she looked up, but it was all dark overhead; before her was another long passage, and the White Rabbit was still in sight, hurrying down it. There was not a moment to be lost: away went like the wind, and was just in time to hear it say, as it turned a corner, Oh my ears and whiskers, how late it's getting!' She was close behind it when she turned the corner, but the Rabbit was no longer to be seen: she found herself in a long, low hall, which was lit up by a row of lamps hanging from the roof. There were doors all round the hall, but they were all locked; and when had been all the way down one side and up the other, trying every door, she walked sadly down the middle, wondering how she was ever to get out again. Suddenly she came upon a little three-legged table, all made of solid glass; there was nothing on it except a tiny golden key, and 's first thought was that it might belong to one of the doors of the hall; but, alas! either the locks were too large, or the key was too small, but at any rate it would not open any of them. However, on the second time round, she came upon a low curtain she had not noticed before, and behind it was a little door about fifteen inches high: she tried the little golden key in the lock, and to her great delight it fitted! ";

function setup() {
  canvasSize = min(windowWidth, windowHeight);
  createCanvas(canvasSize, canvasSize);

  tekst = createGraphics(canvasSize, canvasSize);
  tekst2 = createGraphics(canvasSize, canvasSize);
  tekst3 = createGraphics(canvasSize, canvasSize);
  noiseSeed(get_random(0, 99999));
  frameRate(60);

  bg = color(248, 244, 233);

  let ts = canvasSize * 0.02;
  tekst.textFont("Georgia");
  tekst.textSize(ts);

  let ts2 = canvasSize * 0.04;
  tekst2.textFont("Georgia");
  tekst2.textSize(ts2);

  let ts3 = canvasSize * 0.01;
  tekst3.textFont("Georgia");
  tekst3.textSize(ts3);

  let reci = split(alice, " ");
  let trenutnax = textWidth("I");
  let trenutnay = ts;

  for (let i = 0; i < 1100; i++) {
    let rnd_rec = reci[floor(get_random(0, reci.length))];
    tekst.text(rnd_rec, trenutnax, trenutnay);
    trenutnax += (ts / 11) * textWidth(" " + rnd_rec);
    if (trenutnax >= canvasSize) {
      trenutnax = 0;
      trenutnay += 1.1 * ts;
    }
  }

  trenutnax = 0;
  trenutnay = ts2;
  for (let i = 0; i < 300; i++) {
    let rnd_rec = reci[floor(get_random(0, reci.length))];
    tekst2.text(rnd_rec, trenutnax, trenutnay);
    trenutnax += (ts2 / 11) * textWidth(" " + rnd_rec);
    if (trenutnax >= canvasSize) {
      trenutnax = 0;
      trenutnay += 1.1 * ts2;
    }
  }

  trenutnax = 0;
  trenutnay = ts3;
  for (let i = 0; i < 4100; i++) {
    let rnd_rec = reci[floor(get_random(0, reci.length))];
    tekst3.text(rnd_rec, trenutnax, trenutnay);
    trenutnax += (ts3 / 11) * textWidth(" " + rnd_rec);
    if (trenutnax >= canvasSize) {
      trenutnax = 0;
      trenutnay += 1.1 * ts3;
    }
  }
}

function draw() {
  background(bg);
  // image( tekst2, 0,0);

  ty = 2;
  noStroke();
  for (let i = 0; i < 20; i++) {
    tx = 1;
    for (let j = 0; j < 20; j++) {
      let rnd = map(noise(tx, ty), 0, 1, 0, 100);
      tx += 0.1;

      if (rnd < 50) {
        push();
        translate((i * canvasSize) / 20, (j * canvasSize) / 20);
        rotate(random(0, PI));
        beginShape();
        for (let u = 0; u < TWO_PI; u += PI / 4) {
          let rnd = random(canvasSize * 0.015, canvasSize * 0.065);
          vertex(cos(u) * rnd, sin(u) * rnd);
        }
        endShape(CLOSE);
        drawingContext.clip();
        if (rnd < 30) {
          image(
            tekst2,
            -canvasSize / 2 + random(0, canvasSize / 2),
            -canvasSize / 2 + random(0, canvasSize / 2),
            canvasSize,
            canvasSize
          );
        } else if (rnd < 40) {
          image(
            tekst,
            -canvasSize / 2 + random(0, canvasSize / 2),
            -canvasSize / 2 + random(0, canvasSize / 2),
            canvasSize,
            canvasSize
          );
        } else {
          image(
            tekst3,
            -canvasSize / 2 + random(0, canvasSize / 2),
            -canvasSize / 2 + random(0, canvasSize / 2),
            canvasSize,
            canvasSize
          );
        }

        pop();
      }
    }
    ty += 0.1;
  }

  noLoop();
}

function get_random(min, max) {
  return min + Math.random() * (max - min);
}
