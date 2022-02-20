import { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import Converter from './components/Converter';
import WalletDetailsModal from './components/WalletDetailsModal';

const MainContainer = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

const ConverterContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  height: 360px;
  width: 540px;
  border-radius: 6px;
`;

const WalletDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  background: #fff;
  border-radius: 0 0 10px 10px;
`;

const WalletDetailsBtn = styled.button`
  background: transparent;
  font-size: 18px;
  font-weight: bolder;
  color: #c9a228;
  border: 0;
  cursor: pointer;
  text-decoration: underline;
`;

const App = () => {
  const [isWalletPopupShown, setWalletPopupDisplay] = useState(false);
  return (
    <MainContainer>
      <h1>Crypto Converter</h1>
      <ConverterContainer>
        <Converter />
        <WalletDetails>
          <WalletDetailsBtn type="button" onClick={():void => setWalletPopupDisplay(true)}>Check Wallet Details</WalletDetailsBtn>
        </WalletDetails>
      </ConverterContainer>
      {ReactDOM.createPortal(
        <WalletDetailsModal
          isModalShown={isWalletPopupShown}
          closeModal={():void => setWalletPopupDisplay(false)}
        />
      , (document.getElementById('modal-root') as Element))}
    </MainContainer>
  );
};

export default App;
