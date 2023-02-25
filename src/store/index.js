import Vuex from 'vuex';
import _ from 'lodash';
import eventBus from 'vue3-eventbus'
import storage from "@/utils/storage";
import {setUpContracts} from '@/contract';
import Notification from 'ant-design-vue/lib/notification'

export function createStore(web3, options) {
  const {networkConfig} = options
  return new Vuex.Store({
    state: {
      device: 'desktop',
      contracts: null,
      accounts: [],
      defaultAccount: null,
      currentNetworkId: null
    },
    getters: {
      contracts(state) {
        return _.isFunction(state.contracts) ? state.contracts() : null;
      }
    },

    mutations: {
      toggleDevice(state, device) {
        state.device = device
      },

      setNetworkId(state, payload) {
        state.currentNetworkId = payload;
      },

      setAccounts(state, payload) {
        state.accounts = payload.accounts;

        if (payload.accounts.length > 0) {
          state.defaultAccount = payload.accounts[0];
        } else {
          state.defaultAccount = null;
        }
      },

      setContracts(state, payload) {
        state.contracts = payload;
      }
    },
    actions: {
      toggleDevice({commit}, device) {
        commit('toggleDevice', device)
      },

      async initialize({dispatch}) {
        storage.set('disconnect', null)

        await dispatch('setUpContracts');

        await dispatch('setUpWb3Events');

        await dispatch('pollAccountsAndNetwork');
      },

      async pollAccountsAndNetwork({state, commit}) {
        let refreshUserDetails = false;
        const networkId = await web3.eth.net.getId();
        if (state.currentNetworkId !== networkId.toString()) {
          commit('setNetworkId', networkId.toString());
          refreshUserDetails = true;
          eventBus.emit('chainChanged')
        }

        let accounts = await web3.eth.requestAccounts();
        if (!_.isEqual(state.accounts, accounts)) {
          commit('setAccounts', {accounts});
          refreshUserDetails = true;
          eventBus.emit('accountChanged')
        }

        console.log('pollAccountsAndNetwork end!');

        // if (refreshUserDetails) {
        //   await Promise.all([
            // dispatch('fetchUserDetails')
          // ]);
        // }
      },

      disconnect({commit}) {
        commit('setAccounts', {accounts: []});
        storage.set('disconnect', true)
        eventBus.emit('accountChanged')
      },

      setUpWb3Events({dispatch}) {
        web3.currentProvider.on("accountsChanged", async () => {
          // console.log('accountsChanged======>');
          await dispatch('pollAccountsAndNetwork')
        });
        web3.currentProvider.on("chainChanged", async () => {
          // console.log('chainChanged======>');
          await dispatch('pollAccountsAndNetwork')
        });
      },

      async setUpContracts({commit}) {
        const contracts = await setUpContracts(web3);
        commit('setContracts', () => contracts);
      },

      handleError(error) {
        if (error.code === -32002) {
          Notification.warning({
            message: 'Request already pending. Please wait.',
            description: ''
          });
        }
      },

      async connectMetamask({dispatch}, $networkConfig) {
        if (!web3.currentProvider) {
          return
        }
        const { expectedNetworkId } = $networkConfig
        const networkId = await web3.eth.net.getId()
        if (networkId.toString() !== expectedNetworkId) {
          await dispatch('configureMetaMask', $networkConfig)
        }
        const networkId2 = await web3.eth.net.getId()
        if (networkId2.toString() === expectedNetworkId) {
          try {
            await web3.currentProvider.request({method: 'eth_requestAccounts'})
            await dispatch('initialize')
          } catch (requestError) {
            console.log('requestError:: ', requestError);
            dispatch('handleError', requestError)
          }
        }
      },
      async configureMetaMask({dispatch}, $networkConfig) {
        if (!web3.currentProvider) {
          return
        }

        const {
          chainId, chainName, rpcUrls, blockExplorerUrls, currencyName, currencySymbol, currencyDecimals
        } = $networkConfig
        try {
          await web3.currentProvider.request({
            method: 'wallet_switchEthereumChain',
            params: [{chainId}],
          });
        } catch (switchError) {
          if (switchError.code === 4902) {
            try {
              await web3.currentProvider.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId,
                    chainName,
                    nativeCurrency: {
                      name: currencyName,
                      symbol: currencySymbol,
                      decimals: currencyDecimals,
                    },
                    rpcUrls,
                    blockExplorerUrls
                  },
                ],
              });
            } catch (addError) {
              dispatch('handleError', addError)
              console.error('addError:: ', addError);
            }
          } else {
            dispatch('handleError', switchError)
            console.error('switchError:: ', switchError);
          }
        }
      },

      async aggregate({state, getters}, contractCalls = []) {
        if (!contractCalls.length || !state.currentNetworkId) {
          return []
        }

        function findAbiMethod(abi, method) {
          return abi.find((m) => {
            if (m.name === method) {
              return m
            }
          })
        }

        const calls = [];
        for (const call of contractCalls) {
          const {abi = [], networks} = call.contract
          const {contractAddress} = call
          const address = contractAddress || networks[state.currentNetworkId]?.address
          calls.push([address, web3.eth.abi.encodeFunctionCall(findAbiMethod(abi, call.method), call.args)])
        }
        const res = await getters.contracts.MultiCall.methods.aggregate(calls).call()
        const result = [];
        for (let i = 0, l = contractCalls.length; i < l; ++i) {
          const call = contractCalls[i];
          const {abi} = call.contract
          const data = web3.eth.abi.decodeParameters(findAbiMethod(abi, call.method).outputs, res.returnData[i])
          const resObj = {
            ...data,
            ...call
          }
          result.push(resObj);
        }
        return result;
      },

      // async fetchUserDetails({dispatch}) {
      //   const promises = [dispatch('fetchMCTBalance')];
      //
      //   await Promise.all([promises]);
      // },
    }
  })
}
