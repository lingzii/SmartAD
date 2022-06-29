var pixelSize = 10;

interact(".drawable-region")
  .draggable({
    max: Infinity,
    maxPerElement: Infinity,
    origin: "self",
    modifiers: [
      interact.modifiers.snap({
        targets: [interact.snappers.grid({ x: pixelSize, y: pixelSize })],
      }),
    ],
    listeners: {
      move: function (event) {
        var context = event.target.getContext("2d");
        context.fillStyle = "rgb(0,0,0)";
        context.fillRect(event.pageX, event.pageY, pixelSize, pixelSize);
      },
    },
  })
  .on("doubletap", function (event) {
    var context = event.target.getContext("2d");
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    resizeCanvases();
  });

function resizeCanvases() {
  [].forEach.call(
    document.querySelectorAll(".drawable-region"),
    function (canvas) {
      delete canvas.width;
      delete canvas.height;

      var rect = canvas.getBoundingClientRect();

      canvas.width = rect.width;
      canvas.height = rect.height;
    }
  );
}

resizeCanvases();

interact(window).on("resize", resizeCanvases);

function getRegionData() {
  var drawableRegion = document.querySelector(".drawable-region");
  var region = drawableRegion.getContext("2d");
  var imageData = region.getImageData(0, 0, 320, 160).data;
  var bin = "";
  var hex = "";
  var tmp = 0;
  for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 32; j++) {
      let index = (j * 10 + i * 3200) * 4 + 3;
      bin += !!imageData[index] ? "1" : "0";
    }
  }
  for (let i = bin.length - 1; i >= 0; i--) {
    tmp = (tmp << 1) | parseInt(bin[i]);
    if (i % 4 == 0) {
      hex += tmp.toString(16);
      tmp = 0;
    }
  }
  return hex.split("").reverse().join("");
}

function createCard(address, text, image) {
  var card = document.createElement("div");
  card.className = `col`;
  card.innerHTML = `
  <div class="card"><div class="card-body">
  <p style="text-align: center;">
  <canvas width="320" height="160"></canvas>
  </p><h5 class="card-title"></h5>
  </div></div>`;
  card.querySelector(".card-title").innerHTML = text;
  var region = card.querySelector("canvas").getContext("2d");
  region.fillStyle = "rgb(0,0,0)";
  for (let y = 0, i = 0; y < 16; y++) {
    for (let x = 0; x < 8; x++) {
      let v = parseInt(image[i++], 16)
        .toString(2)
        .padStart(4, "0")
        .split("")
        .reverse()
        .join("");
      for (let j = 0; j < 4; j++) {
        if (v[j] == "1") {
          let X = (x * 4 + j) * 10;
          region.fillRect(X, y * 10, 10, 10);
        }
      }
    }
  }

  return card;
}

function refreshPage(data) {
  var cardGroup = document.querySelector("#cardGroup");
  data.forEach((i) => {
    let buyer = i.returnValues.buyer;
    let text = i.returnValues.text;
    let image =
      i.returnValues.image1.replace("0x", "") +
      i.returnValues.image2.replace("0x", "");
    let cc = createCard(buyer, text, image);
    cardGroup.appendChild(cc);
  });
}
