import styled from 'styled-components';

import { hooks, metaMask } from '../metaMask';
import AccountsTable from './AccountsTable';

interface Props {
  isModalShown: boolean;
  closeModal: () => void;
}

interface MainContainerProps {
  isModalShown: boolean;
}

const MainContainer = styled.div<MainContainerProps>`
  display: ${({ isModalShown }) => isModalShown ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  width: 360px;
  background: #fff;
  border-radius: 6px;
  padding: 12px 16px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;

  > h2 {
    margin: 0;
    font-size: 18px;
  }

  > span {
    cursor: pointer;
  }
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ConnectButton = styled.button`
  padding: 0 15px;
  height: 30px;
  line-height: 30px;
  background: #198754;
  border: 0;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  margin-top: 15px;
`;

const DisconnectButton = styled(ConnectButton)`
  background: #dc3545;
`;

const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } = hooks;

const WalletDetailsModal = ({
  isModalShown,
  closeModal,
}: Props) => {
  const chainId = useChainId();
  const provider = useProvider();
  const isActive = useIsActive();
  const accounts = useAccounts();
  const ENSNames = useENSNames(provider);
  const isActivating = useIsActivating();

  return (
    <MainContainer isModalShown={isModalShown}>
      <ModalContainer>
        <ModalHeader>
          <h2>Wallet Details</h2>
          <span onClick={():void => closeModal()}>x</span>
        </ModalHeader>
        <ModalBody>
          {isActive ? (
            <>
              <AccountsTable provider={provider} accounts={accounts} ENSNames={ENSNames} chainId={chainId} />
              <DisconnectButton type="button" onClick={() => metaMask.deactivate()}>Disconnect</DisconnectButton>
            </>
          ) : (
            <>
              <span style={{ textAlign: 'center' }}>Wallet not connected. Please click the "Connect" button.</span>
              <ConnectButton type="button" onClick={() => metaMask.activate()} disabled={isActivating}>
                {isActivating ? 'Connecting...' : 'Connect'}
              </ConnectButton>
            </>
          )}
        </ModalBody>
      </ModalContainer>
    </MainContainer>
  );
};

export default WalletDetailsModal;
