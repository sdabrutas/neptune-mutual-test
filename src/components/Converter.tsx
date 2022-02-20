import React, { useState } from 'react';
import styled from 'styled-components';

import neptuneLogo from '../assets/img/neptune-logo.png';
import busdLogo from '../assets/img/busd-logo.png';
import { ReactComponent as ConvertIcon } from '../assets/img/convert-icon.svg';

const LabelsWrapper = styled.div`
  display: flex;
  height: 80px;
  background: #5d9aab;
  position: relative;
`;

const Label = styled.label`
  flex: 1;
  height: 100%;
  line-height: 80px;
  color: #000;
  font-size: 30px;
  border: 1px solid #fff;
  text-align: center;
  font-weight: 700;
`;

const InputsWrapper = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const Input = styled.input`
  flex: 1;
  height: 100%;
  padding: 10px 12px;
  outline: none;
  border: 0;
  font-family: 'Courier Prime', monospace;
  font-size: 48px;
  font-weight: lighter;
  color: #656565;
  overflow: hidden;

  &:first-child {
    border-right: 1px solid #eee;
    text-align: left;
  }
  &:last-child {
    border-left: 1px solid #eee;
    text-align: right;
  }
`;

const Icon = styled.span`
  height: 60px;
  width: 60px;
  border: 2px solid #fff;
  border-radius: 50%;
  position: absolute;
  top: -30px;
  background-size: cover;
`;

const NeptuneLogo = styled(Icon)`
  left: -30px;
  background-image: url(${neptuneLogo});
`;

const BUSDLogo = styled(Icon)`
  right: -30px;
  background-image: url(${busdLogo});
`;

const ConvertIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  height: 45px;
  width: 45px;
  border-radius: 50%;

  > svg {
    height: 30px;
  }
`;

const Converter = () => {
  const [nepVal, setNepVal] = useState<string>('');
  const [busdVal, setBusdVal] = useState<string>('');

  const onInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event;
    if (!(/^\d*([.]\d*)?$/.test(value))) return;

    if (field === 'nep') {
      setNepVal(value);
      setBusdVal(`${+(Math.round((+value * 3) * 100) / 100).toFixed(2)}`);
    } else {
      setBusdVal(value);
      setNepVal(`${+(Math.round((+value / 3) * 100) / 100).toFixed(2)}`);
    }
  };

  return (
    <>
      <LabelsWrapper>
        <Label htmlFor="nep">NEP</Label>
        <Label htmlFor="busd">BUSD</Label>
        <NeptuneLogo />
        <BUSDLogo />
        <ConvertIconWrapper>
          <ConvertIcon />
        </ConvertIconWrapper>
      </LabelsWrapper>
      <InputsWrapper>
        <Input id="nep" placeholder="0" value={nepVal} onChange={onInputChange('nep')} />
        <Input id="busd" placeholder="0" value={busdVal} onChange={onInputChange('busd')} />
      </InputsWrapper>
    </>
  );
};

export default Converter;
