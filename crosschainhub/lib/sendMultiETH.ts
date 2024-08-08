import { PasskeyArgType } from '@safe-global/protocol-kit'
import { Safe4337Pack } from '@safe-global/relay-kit'
import {
  BUNDLER_URL,
  PAYMASTER_ADDRESS,
  PAYMASTER_URL,
  RPC_URL
} from './constants'
import { MetaTransactionData } from '@safe-global/safe-core-sdk-types'
import { ethers } from "ethers";

const paymasterOptions = {
    isSponsored: true,
    paymasterAddress: PAYMASTER_ADDRESS,
    paymasterUrl: PAYMASTER_URL
  }

const ARB_RPC_URL = 'https://arb-sepolia.g.alchemy.com/v2/Ea0JuK6_IsERzYNkewcsHcwgVFmXFRj6'
const OP_RPC_URL = 'https://opt-sepolia.g.alchemy.com/v2/Ea0JuK6_IsERzYNkewcsHcwgVFmXFRj6'
const BASE_RPC_URL = 'https://base-sepolia.g.alchemy.com/v2/Ea0JuK6_IsERzYNkewcsHcwgVFmXFRj6'

/** 
* SendETH
* @param {PasskeyArgType} signer - Signer object with rawId and coordinates.
* @param {string} safeAddress - Safe address.
* @returns {Promise<void>}
* @throws {Error} If the operation fails.
*/

export const sendETH = async (passkey: PasskeyArgType, safeAddress: string, RPC: string) => {
    const safe4337Pack = await Safe4337Pack.init({
      provider: RPC,
      signer: passkey,
      bundlerUrl: BUNDLER_URL,
      paymasterOptions,
      options: {
        owners: [
          /* Other owners... */
        ],
        threshold: 1
      }
    })
  
const destination = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
const amount = ethers.parseUnits('0.005', 'ether').toString()

const sendETHTransactionData: MetaTransactionData = {
    to: destination,
    data: '0x',
    value: amount
  }
  // Create a Safe transaction with the provided parameters
  
  const safeOperation = await safe4337Pack.createTransaction({
      transactions: [sendETHTransactionData]
    })
  
    const signedSafeOperation = await safe4337Pack.signSafeOperation(
      safeOperation
    )
  
    console.log('SafeOperation', signedSafeOperation)
  
    // 4) Execute SafeOperation
    const userOperationHash = await safe4337Pack.executeTransaction({
      executable: signedSafeOperation
    })
  
    return userOperationHash
  }
  


