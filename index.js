let cards = 0;
let chips = 0;
let dominoes = 0;
let luck = 0;
let marks = Number(localStorage.getItem("marks")) || 0;
let cardIncrease = 50000;
let chipIncrease = 50000;
let dominoIncrease = 1;

const cloverPrices = [
  { points: 1666, cards: 0, chips: 0, dominoes: 1 },
  { points: 10000, cards: 0, chips: 0, dominoes: 3 },
  { points: 60000, cards: 0, chips: 0, dominoes: 6 },
  { points: 360000, cards: 0, chips: 0, dominoes: 22 },
  { points: 2160000, cards: 0, chips: 0, dominoes: 65 },
  { points: 12960000, cards: 0, chips: 0, dominoes: 94 },
  { points: 77760000, cards: 0, chips: 0, dominoes: 238 },
  { points: 466560000, cards: 0, chips: 0, dominoes: 942 },
  { points: 9331200000, cards: 0, chips: 0, dominoes: 2391 },
];

const cardPrices = [
  { points: 0, cards: 100, chips: 0, dominoes: 0 },
  { points: 0, cards: 600, chips: 0, dominoes: 0 },
  { points: 0, cards: 3600, chips: 0, dominoes: 1 },
  { points: 0, cards: 21600, chips: 0, dominoes: 2 },
  { points: 0, cards: 129600, chips: 0, dominoes: 6 },
  { points: 0, cards: 777600, chips: 0, dominoes: 19 },
  { points: 0, cards: 4665600, chips: 0, dominoes: 40 },
  { points: 0, cards: 27993600, chips: 0, dominoes: 120 },
  { points: 0, cards: 559872000, chips: 0, dominoes: 900 },
];
const chipPrices = [
  { points: 0, cards: 0, chips: 100, dominoes: 0 },
  { points: 0, cards: 0, chips: 600, dominoes: 0 },
  { points: 0, cards: 0, chips: 3600, dominoes: 1 },
  { points: 0, cards: 0, chips: 21600, dominoes: 2 },
  { points: 0, cards: 0, chips: 129600, dominoes: 6 },
  { points: 0, cards: 0, chips: 777600, dominoes: 19 },
  { points: 0, cards: 0, chips: 4665600, dominoes: 40 },
  { points: 0, cards: 0, chips: 27993600, dominoes: 120 },
  { points: 0, cards: 0, chips: 559872000, dominoes: 900 },
];
const dicePrice = { points: 842, cards: 2982, chips: 4200, dominoes: 95 };
const corruptionPrice = {
  points: 666000,
  cards: 0,
  chips: 0,
  dominoes: 6660,
  marks: 0,
};

let cardFinal;
let chipFinal;
let dominoFinal;

let result;
let diceResult;

let inventory = {
  dice: 0,
  clover: "",
  card: "",
  chip: "",
}; //i thought let didnt work outside of brackets
function formatNumber(num) {
  const absNum = Math.abs(num);
  let formatted;

  if (absNum >= 1e18) {
    formatted = (num / 1e18).toFixed(1).replace(/\.0$/, "") + "Q";
  } else if (absNum >= 1e15) {
    formatted = (num / 1e15).toFixed(1).replace(/\.0$/, "") + "q";
  } else if (absNum >= 1e12) {
    formatted = (num / 1e12).toFixed(1).replace(/\.0$/, "") + "T";
  } else if (absNum >= 1e9) {
    formatted = (num / 1e9).toFixed(1).replace(/\.0$/, "") + "B";
  } else if (absNum >= 1e6) {
    formatted = (num / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (absNum >= 1e3) {
    formatted = (num / 1e3).toFixed(1).replace(/\.0$/, "") + "k";
  } else {
    formatted = num.toString();
  }

  return formatted;
}
window.onload = function () {

  const mainMenu = document.getElementById("notshop");
  const diceupgui = document.getElementById("diceupgui");
  const cardupgui = document.getElementById("cardupgui");
  const chipupgui = document.getElementById("chipupgui");
  const cloverupgui = document.getElementById("cloverupgui");
  const corruptionupgui = document.getElementById("corruptionupgui");

  const shop = document.getElementById("shop");
  const infoButton = document.getElementById("openInfo");
  const closeInfoButton = document.getElementById("closeInfo");
  const info = document.getElementById("info");

  const buychip = document.getElementById("buychip");
  const buycard = document.getElementById("buycard");
  const buydice = document.getElementById("buydice");
  const buyclover = document.getElementById("buyclover");
  const cloverImg = document.getElementById("cloverImage");
  const chipImg = document.getElementById("chipImage");
  const openSacrifice = document.getElementById("openSacrifice");
  const sacrificepage = document.getElementById("sacrificePage");
  const sacrificebox = document.getElementById("sacrificebox");
  const diceUpg = document.getElementById("opendiceupgradeui");
  const chipUpg = document.getElementById("openchipupgradeui");
  const cardUpg = document.getElementById("opencardupgradeui");
  const cloverUpg = document.getElementById("opencloverupgradeui");
  const corruptionUpg = document.getElementById("opencorruptionupgradeui");

  setInterval(() => {
    document.getElementById("luck").innerHTML = "Luck: " + luck;
  });

  function openshop() {
    shop.style.display = "inline";
    mainMenu.style.display = "none";
    diceUpg.style.display = "inline";
    cardUpg.style.display = "inline";
    chipUpg.style.display = "inline";
    cloverUpg.style.display = "inline";
    corruptionUpg.style.display = "inline";

    diceupgui.style.display = "none";
    cardupgui.style.display = "none";
    chipupgui.style.display = "none";
    cloverupgui.style.display = "none";
    corruptionupgui.style.display = "none";

    if (Math.random() < 0.01) {
      document.getElementById("easterEgg1").style.display = "inline";
    } else {
            document.getElementById("easterEgg1").style.display = "none";

    }
  }
  function closeshop() {
    document.getElementById("easterEgg1").style.display = "none";

    shop.style.display = "none";
    mainMenu.style.display = "inline";
    diceUpg.style.display = "none";
    cardUpg.style.display = "none";
    corruptionUpg.style.display = "none";

    chipUpg.style.display = "none";
    cloverUpg.style.display = "none";
    diceupgui.style.display = "none";
    cardupgui.style.display = "none";
    chipupgui.style.display = "none";
    corruptionupgui.style.display = "none";
sacrificepage.style.display = "none"
    cloverupgui.style.display = "none";
    info.style.display = "none";
  };
function calculateMarks(points) {
  if (points < 100000) return 0;
  return 1 + Math.floor((points - 100000) / 50000);
    marks = Number(localStorage.getItem("marks")) || 0;
}
document.getElementById("chips").innerHTML = formatNumber(chips);
document.getElementById("cards").innerHTML = formatNumber(cards);

document.getElementById("dominoes").innerHTML = formatNumber(dominoes);
document.getElementById("marksGain").innerHTML = "You will gain " + formatNumber(calculateMarks(cards + chips)) + '<span style="color: #5c0000"> Dark marks.</span>';
document.getElementById("marks").innerHTML = "You have: " + formatNumber(marks) + " marks"
document.getElementById("rawChips").innerHTML = "Chips: " + chips;
document.getElementById("rawCards").innerHTML = "Cards: " + cards;
document.getElementById("rawDominoes").innerHTML =
  "Dominoes: " + dominoes;
document.getElementById("rawMarks").innerHTML = "Marks: " + marks
document.getElementById("sacrificeButton").onclick = function reset() {
  let total = cards + chips;
  if (total < 100000) return;

marks = Number(localStorage.getItem("marks")) || 0;
  let newMarks = calculateMarks(total);
  localStorage.setItem("marks", marks + newMarks);

  console.log("Gained marks:", newMarks);
  console.log("Total marks:", marks + newMarks);

  // Screen fade and reload
  const screen = document.getElementById("whiteScreen");
  screen.classList.add("active");
  setTimeout(() => {
    location.reload();
  }, 2000);
};
  document.getElementById("diceBackButton").onclick = openshop;
  document.getElementById("cardBackButton").onclick = openshop;
  document.getElementById("chipBackButton").onclick = openshop;
  document.getElementById("cloverBackButton").onclick = openshop;
  document.getElementById("corruptionBackButton").onclick = openshop;

  document.getElementById("openshop").onclick = openshop;

  document.getElementById("closeshop").onclick = closeshop
  document.getElementById("sacrificeBackButton").onclick = closeshop
 
  infoButton.onclick = function openinfo() {
    shop.style.display = "none";
    mainMenu.style.display = "none";
    diceUpg.style.display = "none";
    cardUpg.style.display = "none";
    corruptionUpg.style.display = "none";

    chipUpg.style.display = "none";
    cloverUpg.style.display = "none";
    diceupgui.style.display = "none";
    cardupgui.style.display = "none";
    chipupgui.style.display = "none";
    cloverupgui.style.display = "none";
    corruptionupgui.style.display = "none";

    info.style.display = "inline";
  };
  closeInfoButton.onclick = function closeinfo() {
    shop.style.display = "none";
    mainMenu.style.display = "inline";
    diceUpg.style.display = "none";
    corruptionUpg.style.display = "none";

    cardUpg.style.display = "none";
    chipUpg.style.display = "none";
    cloverUpg.style.display = "none";
    diceupgui.style.display = "none";
    cardupgui.style.display = "none";
    chipupgui.style.display = "none";
    corruptionupgui.style.display = "none";

    cloverupgui.style.display = "none";
    info.style.display = "none";
  };
  diceUpg.onclick = function opendiceupgrade() {
    //
    cardUpg.style.display = "none";
    chipUpg.style.display = "none";
    diceUpg.style.display = "none";
    cloverUpg.style.display = "none";
    corruptionUpg.style.display = "none";
    shop.style.display = "none";
    mainMenu.style.display = "none";
    diceupgui.style.display = "inline"; //man why ts not working
  };

  cardUpg.onclick = function opencardupgrade() {
    cardUpg.style.display = "none";
    chipUpg.style.display = "none";
    diceUpg.style.display = "none";
    cloverUpg.style.display = "none";
    corruptionUpg.style.display = "none";
    shop.style.display = "none"; //uhhhhhhhhhhh its not hiding the shop
    mainMenu.style.display = "none";
    cardupgui.style.display = "inline";
  };
  chipUpg.onclick = function openchipupgrade() {
    cardUpg.style.display = "none";
    chipUpg.style.display = "none";
    diceUpg.style.display = "none";
    cloverUpg.style.display = "none";
    corruptionUpg.style.display = "none";
    shop.style.display = "none";
    mainMenu.style.display = "none";
    chipupgui.style.display = "inline";
  };
  openSacrifice.onclick = function opensacrificescreen() {
    cardUpg.style.display = "none";
    chipUpg.style.display = "none";
    diceUpg.style.display = "none";
    cloverUpg.style.display = "none";
    corruptionUpg.style.display = "none";
    shop.style.display = "none";
    mainMenu.style.display = "none";
    chipupgui.style.display = "none";
    sacrificepage.style.display = "inline";
  };
  cloverUpg.onclick = function opencloverupgrade() {
    cardUpg.style.display = "none";
    chipUpg.style.display = "none";
    diceUpg.style.display = "none";
    cloverUpg.style.display = "none";
    corruptionUpg.style.display = "none";
    shop.style.display = "none";
    mainMenu.style.display = "none";
    cloverupgui.style.display = "inline";
  };
  corruptionUpg.onclick = function opencorruptionupgrade() {
    cardUpg.style.display = "none";
    chipUpg.style.display = "none";
    diceUpg.style.display = "none";
    cloverUpg.style.display = "none";
    corruptionUpg.style.display = "none";

    shop.style.display = "none";
    mainMenu.style.display = "none";
    corruptionupgui.style.display = "inline";
  };

  buychip.onclick = function buyChip() {
    let usedPrice = [];
    if (inventory.chip == "") {
      usedPrice = [
        chipPrices[0].points,
        chipPrices[0].cards,
        chipPrices[0].chips,
        chipPrices[0].dominoes,
      ];
    } else if (inventory.chip == "Common") {
      usedPrice = [
        chipPrices[1].points,
        chipPrices[1].cards,
        chipPrices[1].chips,
        chipPrices[1].dominoes,
      ];
    } else if (inventory.chip == "Unusual") {
      usedPrice = [
        chipPrices[2].points,
        chipPrices[2].cards,
        chipPrices[2].chips,
        chipPrices[2].dominoes,
      ];
    } else if (inventory.chip == "Rare") {
      usedPrice = [
        chipPrices[3].points,
        chipPrices[3].cards,
        chipPrices[3].chips,
        chipPrices[3].dominoes,
      ];
    } else if (inventory.chip == "Epic") {
      usedPrice = [
        chipPrices[4].points,
        chipPrices[4].cards,
        chipPrices[4].chips,
        chipPrices[4].dominoes,
      ];
    } else if (inventory.chip == "Legendary") {
      usedPrice = [
        chipPrices[5].points,
        chipPrices[5].cards,
        chipPrices[5].chips,
        chipPrices[5].dominoes,
      ];
    } else if (inventory.chip == "Mythic") {
      usedPrice = [
        chipPrices[6].points,
        chipPrices[6].cards,
        chipPrices[6].chips,
        chipPrices[6].dominoes,
      ];
    } else if (inventory.chip == "Ultra") {
      usedPrice = [
        chipPrices[7].points,
        chipPrices[7].cards,
        chipPrices[7].chips,
        chipPrices[7].dominoes,
      ];
    } else if (inventory.chip == "Super") {
      usedPrice = [
        chipPrices[8].points,
        chipPrices[8].cards,
        chipPrices[8].chips,
        chipPrices[8].dominoes,
      ];
    }
    if (chips >= usedPrice[2] && dominoes >= usedPrice[3]) {
      chips -= usedPrice[2];
      dominoes -= usedPrice[3];
    marks = Number(localStorage.getItem("marks")) || 0;

      document.getElementById("chips").innerHTML = formatNumber(chips);
      document.getElementById("cards").innerHTML = formatNumber(cards);

      document.getElementById("dominoes").innerHTML = formatNumber(dominoes);
      document.getElementById("marksGain").innerHTML = "You will gain " + formatNumber(calculateMarks(cards + chips)) + '<span style="color: #5c0000"> Dark marks.</span>';
document.getElementById("marks").innerHTML = "You have: " + formatNumber(marks) + " marks"
      document.getElementById("rawChips").innerHTML = "Chips: " + chips;
      document.getElementById("rawCards").innerHTML = "Cards: " + cards;
      document.getElementById("rawDominoes").innerHTML =
        "Dominoes: " + dominoes;
      document.getElementById("rawMarks").innerHTML = "Marks: " + marks

      if (inventory.chip == "") {
        inventory.chip = "Common";
        document.getElementById("chipCost").innerHTML = "600 chips";
        chipImg.src =
          "assets/chip2.png";

        chipIncrease += 3;
        setInterval(() => {
          document.getElementById("chipMult").innerHTML =
            "Chip multiplier: " + chipIncrease + "x";
        });

        document.getElementById("chipRarity").style.color = "#7eef6d";
      } else if (inventory.chip == "Common") {
        inventory.chip = "Unusual";
        chipIncrease += 3;
        document.getElementById("chipRarity").style.color = "#ffe65d";
        document.getElementById("chipCost").innerHTML = "3.6k chips, 1 domino";
        chipImg.src =
          "assets/chip3.png";
      } else if (inventory.chip == "Unusual") {
        inventory.chip = "Rare";
        chipIncrease += 3;
        document.getElementById("chipRarity").style.color = "#4d52e3";
        document.getElementById("chipCost").innerHTML =
          "21.6k chips, 2 dominoes";
        chipImg.src =
          "assets/chip4.png";
      } else if (inventory.chip == "Rare") {
        inventory.chip = "Epic";
        chipIncrease += 3;
        document.getElementById("chipRarity").style.color = "#7d1ed0";
        document.getElementById("chipCost").innerHTML =
          "129.6k chips, 6 dominoes";
        chipImg.src =
          "assets/chip5.png";
      } else if (inventory.chip == "Epic") {
        inventory.chip = "Legendary";
        chipIncrease += 3;
        document.getElementById("chipRarity").style.color = "#ce1d1d";
        document.getElementById("chipCost").innerHTML =
          "777.6k chips, 19 dominoes";
        chipImg.src =
          "assets/chip6.png";
      } else if (inventory.chip == "Legendary") {
        inventory.chip = "Mythic";
        document.getElementById("chipCost").innerHTML =
          "4.7M chips, 40 dominoes";
        chipImg.src =
          "assets/chip7.png";
        chipIncrease += 3;
        document.getElementById("chipRarity").style.color = "#1fdbde";
      } else if (inventory.chip == "Mythic") {
        inventory.chip = "Ultra";
        chipImg.src =
          "assets/chip8.png";
        chipIncrease += 3;
        document.getElementById("chipCost").innerHTML =
          "28M chips, 120 dominoes";

        document.getElementById("chipRarity").style.color = "#fe2b74";
      } else if (inventory.chip == "Ultra") {
        inventory.chip = "Super";
        document.getElementById("chipRarity").style.color = "#2bffa3";
        document.getElementById("chipCost").innerHTML =
          "560M chips, 900 dominoes";
        chipImg.src =
          "assets/chip9.png";

        chipIncrease += 3;
      } else if (inventory.chip == "Super") {
        inventory.chip = "Unique";
        document.getElementById("chipRarity").style.color = "#3c3c3c";
        document.getElementById("chipCost").innerHTML = "Out of stock";

        chipIncrease += 15;
      }
      document.getElementById("chipRarity").innerHTML = inventory.chip;
    }

    document.getElementById("chipbutyouarebuyingit").src = chipImg.src;
  };
  buycard.onclick = function buyCard() {
    let usedPrice = [];
    if (inventory.card == "") {
      usedPrice = [
        cardPrices[0].points,
        cardPrices[0].cards,
        cardPrices[0].chips,
        cardPrices[0].dominoes,
      ];
    } else if (inventory.card == "Common") {
      usedPrice = [
        cardPrices[1].points,
        cardPrices[1].cards,
        cardPrices[1].chips,
        cardPrices[1].dominoes,
      ];
    } else if (inventory.card == "Unusual") {
      usedPrice = [
        cardPrices[2].points,
        cardPrices[2].cards,
        cardPrices[2].chips,
        cardPrices[2].dominoes,
      ];
    } else if (inventory.card == "Rare") {
      usedPrice = [
        cardPrices[3].points,
        cardPrices[3].cards,
        cardPrices[3].chips,
        cardPrices[3].dominoes,
      ];
    } else if (inventory.card == "Epic") {
      usedPrice = [
        cardPrices[4].points,
        cardPrices[4].cards,
        cardPrices[4].chips,
        cardPrices[4].dominoes,
      ];
    } else if (inventory.card == "Legendary") {
      usedPrice = [
        cardPrices[5].points,
        cardPrices[5].cards,
        cardPrices[5].chips,
        cardPrices[5].dominoes,
      ];
    } else if (inventory.card == "Mythic") {
      usedPrice = [
        cardPrices[6].points,
        cardPrices[6].cards,
        cardPrices[6].chips,
        cardPrices[6].dominoes,
      ];
    } else if (inventory.card == "Ultra") {
      usedPrice = [
        cardPrices[7].points,
        cardPrices[7].cards,
        cardPrices[7].chips,
        cardPrices[7].dominoes,
      ];
    } else if (inventory.card == "Super") {
      usedPrice = [
        cardPrices[8].points,
        cardPrices[8].cards,
        cardPrices[8].chips,
        cardPrices[8].dominoes,
      ];
    }
    if (cards >= usedPrice[1] && dominoes >= usedPrice[3]) {
      cards -= usedPrice[1];
      dominoes -= usedPrice[3];
    marks = Number(localStorage.getItem("marks")) || 0;

      document.getElementById("chips").innerHTML = formatNumber(chips);
      document.getElementById("cards").innerHTML = formatNumber(cards);

      document.getElementById("dominoes").innerHTML = formatNumber(dominoes);
      document.getElementById("marksGain").innerHTML = "You will gain " + formatNumber(calculateMarks(cards + chips)) + '<span style="color: #5c0000"> Dark marks.</span>';
document.getElementById("marks").innerHTML = "You have: " + formatNumber(marks) + " marks"
      document.getElementById("rawChips").innerHTML = "Chips: " + chips;
      document.getElementById("rawCards").innerHTML = "Cards: " + cards;
      document.getElementById("rawDominoes").innerHTML =
        "Dominoes: " + dominoes;
      document.getElementById("rawMarks").innerHTML = "Marks: " + marks

      if (inventory.card == "") {
        inventory.card = "Common";
        document.getElementById("cardCost").innerHTML = "600 cards";
        cardIncrease += 3;
        setInterval(() => {
          document.getElementById("cardMult").innerHTML =
            "Card multiplier: " + cardIncrease + "x";
        });

        document.getElementById("cardRarity").style.color = "#7eef6d";
      } else if (inventory.card == "Common") {
        inventory.card = "Unusual";
        cardIncrease += 3;
        document.getElementById("cardRarity").style.color = "#ffe65d";
        document.getElementById("cardCost").innerHTML = "3.6k cards, 1 domino";
      } else if (inventory.card == "Unusual") {
        inventory.card = "Rare";
        cardIncrease += 3;
        document.getElementById("cardRarity").style.color = "#4d52e3";
        document.getElementById("cardCost").innerHTML =
          "21.6k cards, 2 dominoes";
      } else if (inventory.card == "Rare") {
        inventory.card = "Epic";
        cardIncrease += 3;
        document.getElementById("cardRarity").style.color = "#7d1ed0";
        document.getElementById("cardCost").innerHTML =
          "129.6k cards, 6 dominoes";
      } else if (inventory.card == "Epic") {
        inventory.card = "Legendary";
        cardIncrease += 3;
        document.getElementById("cardRarity").style.color = "#ce1d1d";
        document.getElementById("cardCost").innerHTML =
          "777.6k cards, 19 dominoes";
        // cardImg.src = "assets/card2"
      } else if (inventory.card == "Legendary") {
        inventory.card = "Mythic";
        document.getElementById("cardCost").innerHTML =
          "4.7M cards, 40 dominoes";
        //       cardImg.src = "assets/card3"
        cardIncrease += 3;
        document.getElementById("cardRarity").style.color = "#1fdbde";
      } else if (inventory.card == "Mythic") {
        inventory.card = "Ultra";
        //  cardImg.src = "assets/card4"
        cardIncrease += 3;
        document.getElementById("cardCost").innerHTML =
          "28M cards, 120 dominoes";

        document.getElementById("cardRarity").style.color = "#fe2b74";
      } else if (inventory.card == "Ultra") {
        inventory.card = "Super";
        document.getElementById("cardRarity").style.color = "#2bffa3";
        document.getElementById("cardCost").innerHTML =
          "560M cards, 900 dominoes";

        cardIncrease += 3;
      } else if (inventory.card == "Super") {
        inventory.card = "Unique";
        document.getElementById("cardRarity").style.color = "#3c3c3c";
        document.getElementById("cardCost").innerHTML = "Out of stock";

        cardIncrease += 15;
      }
      document.getElementById("cardRarity").innerHTML = inventory.card;
    }
  };
  buydice.onclick = function buyDice() {
    if (inventory.dice == "Unique") {
      return;
    }

    if (
      cards >= dicePrice.cards &&
      chips >= dicePrice.chips &&
      dominoes >= dicePrice.dominoes
    ) {
      cards -= dicePrice.cards;
      chips -= dicePrice.chips;
      dominoes -= dicePrice.dominoes;
      let total = cards + chips;
      if (total >= dicePrice.points) {
        total -= dicePrice.points;
        chips = total / 2;
        cards = total / 2;
      } else {
        cards += dicePrice.cards;
        chips += dicePrice.chips;
        dominoes += dicePrice.dominoes;
        return;
      }
    marks = Number(localStorage.getItem("marks")) || 0;

      document.getElementById("chips").innerHTML = formatNumber(chips);
      document.getElementById("cards").innerHTML = formatNumber(cards);

      document.getElementById("dominoes").innerHTML = formatNumber(dominoes);
      document.getElementById("marksGain").innerHTML = "You will gain " + formatNumber(calculateMarks(cards + chips)) + '<span style="color: #5c0000"> Dark marks.</span>';
document.getElementById("marks").innerHTML = "You have: " + formatNumber(marks) + " marks"
      document.getElementById("rawChips").innerHTML = "Chips: " + chips;
      document.getElementById("rawCards").innerHTML = "Cards: " + cards;
      document.getElementById("rawDominoes").innerHTML =
        "Dominoes: " + dominoes;
      document.getElementById("rawMarks").innerHTML = "Marks: " + marks

      setInterval(() => {
        document.getElementById("diceCritChance").innerHTML =
          "Dice crit chance: " + (5 + luck) + "%";
      });

      inventory.dice = "Unique";
      document.getElementById("diceRarity").style.color = "#3c3c3c";
      document.getElementById("diceRarity").innerHTML = "Unique";
      document.getElementById("diceCost").innerHTML = "Out of stock";
    }
  };

  buyclover.onclick = function buyClover() {
    let usedPrice = [];
    if (inventory.clover == "") {
      usedPrice = [
        cloverPrices[0].points,
        cloverPrices[0].cards,
        cloverPrices[0].clovers,
        cloverPrices[0].dominoes,
      ];
    } else if (inventory.clover == "Common") {
      usedPrice = [
        cloverPrices[1].points,
        cloverPrices[1].cards,
        cloverPrices[1].clovers,
        cloverPrices[1].dominoes,
      ];
    } else if (inventory.clover == "Unusual") {
      usedPrice = [
        cloverPrices[2].points,
        cloverPrices[2].cards,
        cloverPrices[2].clovers,
        cloverPrices[2].dominoes,
      ];
    } else if (inventory.clover == "Rare") {
      usedPrice = [
        cloverPrices[3].points,
        cloverPrices[3].cards,
        cloverPrices[3].clovers,
        cloverPrices[3].dominoes,
      ];
    } else if (inventory.clover == "Epic") {
      usedPrice = [
        cloverPrices[4].points,
        cloverPrices[4].cards,
        cloverPrices[4].clovers,
        cloverPrices[4].dominoes,
      ];
    } else if (inventory.clover == "Legendary") {
      usedPrice = [
        cloverPrices[5].points,
        cloverPrices[5].cards,
        cloverPrices[5].clovers,
        cloverPrices[5].dominoes,
      ];
    } else if (inventory.clover == "Mythic") {
      usedPrice = [
        cloverPrices[6].points,
        cloverPrices[6].cards,
        cloverPrices[6].clovers,
        cloverPrices[6].dominoes,
      ];
    } else if (inventory.clover == "Ultra") {
      usedPrice = [
        cloverPrices[7].points,
        cloverPrices[7].cards,
        cloverPrices[7].clovers,
        cloverPrices[7].dominoes,
      ];
    } else if (inventory.clover == "Super") {
      usedPrice = [
        cloverPrices[8].points,
        cloverPrices[8].cards,
        cloverPrices[8].clovers,
        cloverPrices[8].dominoes,
      ];
    }
    let total = cards + chips;

    if (total >= usedPrice[0] && dominoes >= usedPrice[3]) {
      total -= usedPrice[0];
      chips = total / 2;
      cards = total / 2;
      dominoes -= usedPrice[3];
    marks = Number(localStorage.getItem("marks")) || 0;

      document.getElementById("chips").innerHTML = formatNumber(chips);
      document.getElementById("cards").innerHTML = formatNumber(cards);

      document.getElementById("dominoes").innerHTML = formatNumber(dominoes);
      document.getElementById("marksGain").innerHTML = "You will gain " + formatNumber(calculateMarks(cards + chips)) + '<span style="color: #5c0000"> Dark marks.</span>';
document.getElementById("marks").innerHTML = "You have: " + formatNumber(marks) + " marks"
      document.getElementById("rawChips").innerHTML = "Chips: " + chips;
      document.getElementById("rawCards").innerHTML = "Cards: " + cards;
      document.getElementById("rawDominoes").innerHTML =
        "Dominoes: " + dominoes;
      document.getElementById("rawMarks").innerHTML = "Marks: " + marks

      if (inventory.clover == "") {
        inventory.clover = "Common";
        document.getElementById("cloverRarity").style.color = "#7eef6d";
        document.getElementById("cloverCost").innerHTML =
          "10k points, 3 dominoes";
        luck = 4;
      } else if (inventory.clover == "Common") {
        inventory.clover = "Unusual";

        document.getElementById("cloverRarity").style.color = "#ffe65d";
        document.getElementById("cloverCost").innerHTML =
          "60k points, 6 dominoes";

        luck = 8;
      } else if (inventory.clover == "Unusual") {
        inventory.clover = "Rare";
        document.getElementById("cloverCost").innerHTML =
          "360k points, 22 dominoes";

        document.getElementById("cloverRarity").style.color = "#4d52e3";

        luck = 12;
      } else if (inventory.clover == "Rare") {
        inventory.clover = "Epic";
        document.getElementById("cloverCost").innerHTML =
          "2.2M points, 65 dominoes";

        document.getElementById("cloverRarity").style.color = "#7d1ed0";

        luck = 16;
      } else if (inventory.clover == "Epic") {
        inventory.clover = "Legendary";
        document.getElementById("cloverCost").innerHTML =
          "13M points, 94 dominoes";

        document.getElementById("cloverRarity").style.color = "#ce1d1d";

        cloverImg.src =
          "assets/clover2";
        luck = 20;
      } else if (inventory.clover == "Legendary") {
        inventory.clover = "Mythic";
        document.getElementById("cloverCost").innerHTML =
          "78M points, 238 dominoes";

        document.getElementById("cloverRarity").style.color = "#1fdbde";

        cloverImg.src =
          "assets/clover3";

        luck = 24;
      } else if (inventory.clover == "Mythic") {
        inventory.clover = "Ultra";
        document.getElementById("cloverRarity").style.color = "#fe2b74";
        document.getElementById("cloverCost").innerHTML =
          "467M points, 942 dominoes";

        cloverImg.src =
          "assets/clover4";
        luck = 28;
      } else if (inventory.clover == "Ultra") {
        inventory.clover = "Super";
        document.getElementById("cloverRarity").style.color = "#2bffa3";
        document.getElementById("cloverCost").innerHTML =
          "9.4B points, 2391 dominoes";

        luck = 32;
      } else if (inventory.clover == "Super") {
        inventory.clover = "Unique";
        document.getElementById("cloverRarity").style.color = "#3c3c3c";
        document.getElementById("cloverCost").innerHTML = "Out of stock";
        luck = 36;
      }
      document.getElementById("cloverRarity").innerHTML = inventory.clover;
    }

    document.getElementById("cloverbutyouarebuyingit").src = cloverImg.src;
  };

  // set the button
  let diceCritted = false;
  document.getElementById("gambleButton").onclick = function increase() {
    // randomize the result
    console.log("test to see if the function even runs");
    function choose() {
      const roll = Math.random() * 100; // Gives 0.00 - 99.999...

      if (roll < 49.98) {
        // Case 1: 49.98% chance
        const num = Math.random() * (0.5 - 0.01) + 0.01;
        return Math.round(num * 100) / 100;
      } else if (roll < 99.96) {
        // Case 2: 49.98% chance
        const num = Math.random() * (1 - 0.51) + 0.51;
        return Math.round(num * 100) / 100;
      } else {
        // Case 3: 0.02% chance
        return Math.random() < 0.5 ? 0.01 : 0.99;
      }
    }

    result = choose();
    if (inventory.dice == "Unique") {
      diceResult = 5 + luck;
    } //hold on
    // this is so weird, all of the sudden gambling doesnt work
    cardFinal = cardIncrease;
    chipFinal = chipIncrease;
    dominoFinal = dominoIncrease;

    if (Math.random() <= diceResult / 100) {
      cardFinal += 15; //gah dam
      chipFinal += 15;
      diceCritted = true;
    } else diceCritted = false;

    // check if the result is 1 or 0
    if (result === 0.01 || result === 0.99) {
      if (diceCritted) {
        document.getElementById("dominoes").style.color = "yellow";
        setTimeout(() => {
          document.getElementById("dominoes").style.color = "white";
        }, 100);
      } else {
        document.getElementById("dominoes").style.color = "cyan";
        setTimeout(() => {
          document.getElementById("dominoes").style.color = "white";
        }, 100);
      }
      dominoes += parseInt(dominoFinal);
    } else if (result <= 0.5) {
      if (diceCritted) {
        document.getElementById("cards").style.color = "yellow";
        setTimeout(() => {
          document.getElementById("cards").style.color = "white";
        }, 100);
      }
      cards += parseInt(cardFinal);
    } else {
      if (diceCritted) {
        document.getElementById("chips").style.color = "yellow";
        setTimeout(() => {
          document.getElementById("chips").style.color = "white";
        }, 100);
      }
      chips += parseInt(chipFinal);
    }
    marks = Number(localStorage.getItem("marks")) || 0;

    document.getElementById("chips").innerHTML = formatNumber(chips);
    document.getElementById("cards").innerHTML = formatNumber(cards);
    document.getElementById("dominoes").innerHTML = formatNumber(dominoes);
    document.getElementById("marksGain").innerHTML = "You will gain " + formatNumber(calculateMarks(cards + chips)) + '<span style="color: #5c0000"> Dark marks.</span>';
document.getElementById("marks").innerHTML = "You have: " + formatNumber(marks) + " marks"
    document.getElementById("rawChips").innerHTML = "Chips: " + chips;
    document.getElementById("rawCards").innerHTML = "Cards: " + cards;
    document.getElementById("rawDominoes").innerHTML = "Dominoes: " + dominoes;
    document.getElementById("rawMarks").innerHTML = "Marks: " + marks
    
  };
}; //something is disabling the increase()
// why is it null..?
