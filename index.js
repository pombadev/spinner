class Spinner {
  constructor(options = {}) {
    const { data, label } = options;

    if (data && Array.isArray(data)) {
      this.data = data;
    } else {
      this.data = ["🚶", "🏃"];
    }

    if (label && typeof label === "string") {
      this.label = label;
    } else {
      this.label = "Working..";
    }
  }

  stop() {
    clearInterval(this.timer);
  }

  start() {
    const { data, label } = this;

    const generate = generateChars(data);

    this.timer = setInterval(() => {
      process.stdout.write(`${label} ${generate.next().value}`);
      // require-ing make the UI less jittery
      require("readline").cursorTo(process.stdout, 0);
    }, 100);
  }
}

function generateChars(data) {
  let curr = 0;

  return (function* () {
    while (true) {
      yield data[curr];

      // reset if in current iteration, chars is exhausted.
      if (curr === data.length - 1) {
        curr = 0;
        // else set counter for next in array stack
      } else {
        curr++;
      }
    }
  })();
}

module.exports = {
  Spinner,
  generateChars,
};
