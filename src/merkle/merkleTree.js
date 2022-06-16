import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { ethers } from "ethers";
import dropList from "./whitelist.json";

let tree;

function hashToken(address, amount) {
  return Buffer.from(
    ethers.utils.solidityKeccak256(["address", "uint256"], [address, amount]).slice(2),
    "hex"
  );
}

function buildTree() {
  let merkleTree = new MerkleTree(
    Object.entries(dropList).map((drop) => hashToken(drop[0], drop[1])),
    keccak256,
    { sortPairs: true }
  );
  return merkleTree;
}

export function getAirdropAmount(wallet) {
  return dropList[wallet.toLowerCase()] || 0;
}

export function getProof(wallet) {
  return tree.getHexProof(hashToken(wallet, getAirdropAmount(wallet)));
}

tree = buildTree()
console.log(tree.getHexRoot());
console.log(tree.toString());
// console.log(getAirdropAmount("0x00000017e52aa80d1Aeb3fFB4a5b21F58Eaeb5b0"))
// console.log(getProof('0x00000017e52aa80d1Aeb3fFB4a5b21F58Eaeb5b0'))