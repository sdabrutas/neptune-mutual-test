import { useEffect, useState } from 'react';
import styled from 'styled-components';
import type { BigNumber } from '@ethersproject/bignumber';
import { formatEther } from '@ethersproject/units';
import type { Web3ReactHooks } from '@web3-react/core';

const TablesContainer = styled.div`
  width: 100%;
  height: auto;
  max-height: 200px;
  overflow-y: auto;
`;

const Table = styled.table`
  width: 100%;
  margin-bottom: 10px;
`;

const TableRow = styled.tr`
  & > * {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #eee;

    &:last-child {
      text-align: right;
    }
  }
  &:last-child:not(:first-child) {
    > * {
      border-bottom: 0;
    }
  }
  & > th {
    font-size: 12px;
  }
`;

const useBalances = (
  provider?: ReturnType<Web3ReactHooks['useProvider']>,
  accounts?: string[]
): BigNumber[] | undefined => {
  const [balances, setBalances] = useState<BigNumber[] | undefined>();

  useEffect(() => {
    if (provider && accounts?.length) {
      let stale = false;

      void Promise.all(accounts.map((account) => provider.getBalance(account))).then((balances) => {
        if (!stale) {
          setBalances(balances);
        }
      })

      return () => {
        stale = true;
        setBalances(undefined);
      }
    }
  }, [provider, accounts]);

  return balances;
}

const AccountsTable = ({
  accounts,
  provider,
  ENSNames,
  chainId,
}: {
  accounts: ReturnType<Web3ReactHooks['useAccounts']>
  provider: ReturnType<Web3ReactHooks['useProvider']>
  ENSNames: ReturnType<Web3ReactHooks['useENSNames']>
  chainId: ReturnType<Web3ReactHooks['useChainId']>
}) => {
  const balances = useBalances(provider, accounts);

  if (accounts === undefined) return null;

  return accounts.length === 0
    ? <span>No accounts found.</span>
    : (
      <TablesContainer>
        {accounts?.map((account, ind) => {
          const accountName = ENSNames?.[ind] ?? account;
          return (
            <Table key={accountName}>
              <thead>
                <TableRow>
                  <th>KEY</th>
                  <th>VALUE</th>
                </TableRow>
              </thead>
              <tbody>
                <TableRow>
                  <td>Account</td>
                  <td>{`${accountName.substring(0, 4)}...${accountName.substring(accountName.length - 4)}`}</td>
                </TableRow>
                <TableRow>
                  <td>Chain ID</td>
                  <td>{chainId}</td>
                </TableRow>
                <TableRow>
                  <td>Balance</td>
                  <td>{balances?.[ind] ? `Ξ ${formatEther(balances[ind])}` : null}</td>
                </TableRow>
              </tbody>
            </Table>
          );
        })}
      </TablesContainer>
    );
};

export default AccountsTable;
