const ct_addr = "0xFEa8AcbC56783b98Db46CcE6e96E1F454Ca28Ce6";
var contract;

window.onload = () => {
  if (!window.web3) {
    alert("MetaMask is not installed.");
    return;
  }
  window.web3 = new Web3(window.web3.currentProvider);
  contract = new web3.eth.Contract(myABI, ct_addr);
  refresh_page();
};

async function transaction_to_update() {
  let text = document.querySelector(".string").value;
  let price = document.querySelector(".price").value;
  let addr = await ethereum.request({ method: "eth_requestAccounts" });
  if (text && price) {
    let data = { from: addr[0], value: Web3.utils.toWei(price) };
    await contract.methods.transaction_to_update(text).send(data);
    refresh_page(false);
  } else alert("price and message are wrong!");
}

async function refresh_page(from = true) {
  if (from) {
    var price = await contract.methods.highestPrice().call();
    var text = await contract.methods.message().call();
    var gap = await contract.methods.gap().call();
  } else {
    var price = document.querySelector(".price").value;
    var text = document.querySelector(".string").value;
    var gap = 0.0001;
  }
  var total = parseInt(price) + parseInt(gap);
  document.querySelector(".message").innerHTML = text;
  document.querySelector(".nowPrice").innerHTML =
    "Now price: " + Web3.utils.fromWei(total.toString()) + " BCH";
}

document.querySelector("#submit").addEventListener("click", () => {
  transaction_to_update();
});
