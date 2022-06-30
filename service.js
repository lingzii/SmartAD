const ct_addr = "0x7191e993f479148D8C46Ae19d8ac5BF54038B238";
var contract, address, total;

async function initMetamask() {
  if (!window.web3) {
    alert("You havn't install MetaMask");
  }
  window.web3 = new Web3(window.web3.currentProvider);
  contract = new web3.eth.Contract(myABI, ct_addr);
  address = await connect2metamask();
}

async function connect2metamask() {
  let address = await ethereum.request({ method: "eth_requestAccounts" });
  return address[0];
}

async function loadPastEvents() {
  let EVENTS;

  await contract.getPastEvents(
    "Order",
    {
      fromBlock: 0,
      toBlock: "latest",
    },
    function (error, events) {
      EVENTS = events;
      refreshPage(events);
    }
  );

  // EVENTS[0].returnValues.Order_ID
  // EVENTS[0].returnValues[0]
  return EVENTS;
}

async function ListeningEvents() {
  var now_block_num = await web3.eth.getBlockNumber();
  await contract.events.Order(
    {
      fromBlock: now_block_num,
      toBlock: "latest",
    },
    function (error, events) {
      // listening and do something
      refreshPage([events]);
      console.log(events);
    }
  );
}

async function get_data() {
  var price = await contract.methods.HighestPrice().call();
  var gap = await contract.methods.gap().call();

  price = parseInt(price);
  gap = parseInt(gap);

  total = price + gap;

  gap = gap.toString();
  price = price.toString();
  total = total.toString();

  console.log(Web3.utils.fromWei(gap) + " ETH");
  console.log(Web3.utils.fromWei(price) + " ETH");
  console.log(Web3.utils.fromWei(total) + " ETH");
}

async function pay_me_and_say_sth(text, image1, image2, address, value) {
  let res = await contract.methods
    .pay_me_and_say_sth(text, image1, image2)
    .send({ from: address, value: value });
  // console.log(res.events.aPayment.returnValues.buyer);
  // console.log(res.events.aPayment.returnValues.price);

  return res;
}

initMetamask();

get_data();

ListeningEvents();

var Orders = loadPastEvents();

document.querySelector("#submit").addEventListener("click", (e) => {
  console.log(getRegionData().slice(0, 66));
  pay_me_and_say_sth(
    document.querySelector("#message").value,
    "0x" + getRegionData().slice(0, 64),
    "0x" + getRegionData().slice(64, 128),
    address,
    total
  );
});
