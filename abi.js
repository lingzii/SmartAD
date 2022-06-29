const myABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "Order_ID",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "text",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "image1",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "image2",
        type: "bytes32",
      },
    ],
    name: "Order",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_text",
        type: "string",
      },
      {
        internalType: "bytes32",
        name: "_image1",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_image2",
        type: "bytes32",
      },
    ],
    name: "pay_me_and_say_sth",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_admin2",
        type: "address",
      },
    ],
    name: "setAdmin2",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gap",
        type: "uint256",
      },
    ],
    name: "setGap",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
    ],
    name: "setPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "gap",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "HighestPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "Orders",
    outputs: [
      {
        internalType: "bytes32",
        name: "Order_ID",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "text",
        type: "string",
      },
      {
        internalType: "bytes32",
        name: "image1",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "image2",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
