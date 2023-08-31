import abi from '../abis/src/contracts/CampaignFactory.sol/CampaignFactory.json'
import address from '../abis/contractAddress.json'
import { getGlobalState, setGlobalState } from '../store'
import { ethers } from 'ethers'

const { ethereum } = window
const contractAddress = address.address
const contractAbi = abi.abi 

const connectWallet = async () => {
    try {
        if (!ethereum) return alert('Please install Metamask')
        const accounts = await ethereum.request({ method: 'eth_requestAccounts'})
        setGlobalState('connectedAccount',accounts[0]?.toLowerCase())
    }
    catch (error) {
        reportError(error)
    }
}

const isWalletConnected = async () => {
    try {
        if(!ethereum) return alert('Please install Metamask')
        const accounts = await ethereum.request({ method: 'eth_accounts' })
        setGlobalState('connectedAccount', accounts[0]?.toLowerCase())

        window.ethereum.on('chainChanged', (chainid) => {
            Window.location.reload
        })

        window.ethereum.on('accountsChanged', async () => { 
            setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
            await isWalletConnected()
        })

        if (accounts.length) {
            setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
        }
        else {
            alert('Please connect wallet.')
            console.log('No accounts found')
        }
    }
    catch(error) {
        reportError(error)
    }
}

const reportError = (error) => {
    console.log(error.message)
    throw new Error('No ethereum object.')
}

export {connectWallet, isWalletConnected}