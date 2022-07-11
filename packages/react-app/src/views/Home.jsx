import { classNames } from "../helpers";
import { useContractReader } from "eth-hooks";
import { ethers } from "ethers";
import React from "react";
import { Link } from "react-router-dom";
import {
  ChipIcon,
  CodeIcon,
  LightningBoltIcon,
  SparklesIcon,
  CurrencyDollarIcon,
  HomeIcon,
} from '@heroicons/react/outline'

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 **/
export default function Home({ yourLocalBalance, readContracts }) {
  // you can also use hooks locally in your component of choice
  // in this case, let's keep track of 'purpose' variable from our contract
  const purpose = useContractReader(readContracts, "YourContract", "purpose");

  const items = [
    {
      title: 'This is your app\'s Home',
      description: (
        <>You can start editing it in <code className='text-xs rounded-sm bg-blue-100 text-blue-500 p-1'>packages/react-app/src/views/Home.jsx</code></>
      ),
      icon: HomeIcon,
      background: 'bg-pink-500',
    },
    {
      title: 'Smart Contracts',
      description: (
        <>Edit your smart contract in <code className='text-xs rounded-sm bg-blue-100 text-blue-500 p-1'>packages/hardhat/contracts/YourContract.sol</code></>
      ),
      icon: ChipIcon,
      background: 'bg-green-500',
    },
    purpose ?
    {
      title: 'Purpose Variable',
      description: (
        <>The purpose variable from your contract is <code className='text-xs rounded-sm bg-blue-100 text-blue-500 p-1'>{purpose}</code></>
      ),
      icon: LightningBoltIcon,
      background: 'bg-yellow-500',
    }
    :
    {
      title: 'Deploy Your Contract',
      description: (
        <>Run <code className='text-xs rounded-sm bg-blue-100 text-blue-500 p-1'>yarn chain</code> and <code className='text-xs rounded-sm bg-blue-100 text-blue-500 p-1'>yarn deploy</code> to deploy your first contract</>
      ),
      icon: LightningBoltIcon,
      background: 'bg-yellow-500',
    },
    {
      title: 'Balance',
      description: (
        <>An example prop of your balance is passed into the Home view: <code className='text-xs rounded-sm bg-blue-100 text-blue-500 p-1'>{ethers.utils.formatEther(yourLocalBalance)}</code></>
      ),
      icon: CurrencyDollarIcon,
      background: 'bg-blue-500',
    },
    {
      title: 'Hints',
      description: 'Check out the Hints tab for more tips',
      href: '/hints',
      icon: SparklesIcon,
      background: 'bg-indigo-500',
    },
    {
      title: 'Debug Contracts',
      description: 'Tinker with your smart contract using the Debug Contract UI',
      href: '/debug',
      icon: CodeIcon,
      background: 'bg-purple-500',
    },
  ]

  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 dark:text-white">Everything you need to build on Ethereum 🚀</h2>
      <ul role="list" className="mt-6 border-t border-b border-gray-200 dark:border-gray-700 py-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {items.map((item, itemIdx) => (
          <li key={itemIdx} className="flow-root">
            <div
              className={classNames(
                item.href ? 'hover:bg-gray-50 dark:hover:bg-gray-700 focus-within:ring-2 focus-within:ring-indigo-500' : '',
                'relative -m-2 p-2 flex items-center space-x-4 rounded-xl'
              )}
            >
              <div
                className={classNames(
                  item.background,
                  'flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-lg'
                )}
              >
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  <Link to={item.href} className={classNames(item.href ? 'focus:outline-none' : 'cursor-default')}>
                    <span className="absolute inset-0" aria-hidden="true" />
                    {item.title}
                    {item.href && (<span aria-hidden="true"> &rarr;</span>)}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-white">{item.description}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex">
        <a href="https://buidlguidl.com/builds" target="_blank" className="text-sm font-medium text-indigo-600 dark:text-indigo-500 hover:text-indigo-500">
          Get inspired from a BuidlGuidl project<span aria-hidden="true"> &rarr;</span>
        </a>
      </div>
    </div>
  )
}
