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

export function getProof(wallet) {
  return tree.getHexProof(hashToken(wallet, dropList[wallet]));
}

export function getAirdropAmount(wallet) {
  return dropList[wallet] || 0;
}

tree = buildTree()
console.log(tree.getHexRoot());
console.log(tree.toString());
// console.log(getProof('0x7c9c773E41a3b68924B3b4924df8FFFcF7Ae7e18'))