// log
import { getProof } from "../../merkle/merkleTree";
import store from "../store";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

const PRESALE_PRICE = 0;
const PUBLIC_PRICE = 0.0005;

export const fetchData = (account) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      const totalSupply = 10000;
      // let totalSupply = await store
      //   .getState()
      //   .blockchain.smartContract.methods.totalSupply()
      //   .call();
      // let cost = await store
      //   .getState()
      //   .blockchain.smartContract.methods.cost()
      //   .call();

      let publicSale = await store
        .getState()
        .blockchain.smartContract.methods.isPublicSaleOn()
        .call();

      let proof = getProof(account);

      console.log(proof)

      let mintedCount = await store
        .getState()
        .blockchain.smartContract.methods.numberMinted(account)
        .call();

      dispatch(
        fetchDataSuccess({
          totalSupply,
          proof,
          mintedCount,
          publicSale,
          whitelisted: publicSale ? true : proof.length > 0,
          cost: publicSale ? PUBLIC_PRICE : PRESALE_PRICE,
          loaded: true,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};
