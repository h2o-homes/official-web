import { abi as AirdropAbi, networks as AirdropNetworks} from '@/contracts/abi/AirdropTokenDistributor.json';
// import { abi as MultiCallAbi, networks as MultiCallNetworks} from '@/contracts/abi/MultiCall.json';
import { networkConfig } from "@/config";

const networkId = networkConfig.expectedNetworkId.toString();

export async function setUpContracts(web3) {
    const AirdropAddress = AirdropNetworks[networkId]?.address
    const AirdropTokenDistributor = new web3.eth.Contract(AirdropAbi, AirdropAddress);

    // const MultiCallAddress = MultiCallNetworks[networkId]?.address
    // const MultiCall = new web3.eth.Contract(MultiCallAbi, MultiCallAddress);

    return {
      AirdropTokenDistributor,
      // MultiCall
    }
}