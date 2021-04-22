import React, { useState } from 'react';
import styled from 'styled-components';
import { Row } from '../styledComponents/components';

const SearchRow = styled(Row)`
  padding: 0;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 6px;
  z-index: 300;
  background: ${({ theme }) => theme.color.primary};
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12);
  margin: 6px 8px;
  border-radius: ${({ theme }) => theme.borderRadius};
  @media (min-width: 380px){
    padding: 0 16px;
  }
`;

const Name = styled.h2`
  margin: 5px 8px;
`;
const InputContainer = styled.div`
  flex-basis: 98px;
  margin: 5px;
  width: 80px;
  flex-grow: 1;
  flex-shrink: 1;
  height: 40px;
`;

const Input = styled.input`
  padding: 0 16px;
  width: 100%;
  max-width: 400px;
  height: 100%;
  font-size: 1rem;
  font-weight: 700;
  background: ${({ theme }) => theme.color.text};
  color: ${({ theme }) => theme.color.primary};
  border-radius: 20px;
  border: solid 3px ${({ theme }) => theme.color.secondary};
`;

const ButtonOptions = styled.div`
  margin: 5px;
  cursor: pointer;
  position: relative;
  height: 40px;
  width: 40px;
  border-radius: 20px;
  background: ${({ theme }) => theme.color.secondary};
  background-image: url(sort.png);
  background-position: center;
  background-repeat:no-repeat;
  background-size: 75%;
  ${({ show }) =>
    show
      ? `&::after{
    z-index:100;
    cursor:default;
    content:'';
    position:fixed;
    top:0;
    left:0;
    width: 100vw;
    height: 100vh;
    background: transparend;
  }`
      : null}
`;
const PlatformButtonOptions = styled(ButtonOptions)`
    background-image: url(joystick.png);
`;

const OptionsContainer = styled.div`
  width: 160px;
  z-index: 200;
  display: ${({ show }) => (show ? 'block' : 'none')};
  position: absolute;
  overflow: hidden;
  right: -3px;
  top: -3px;
  border-radius: 20px;
  background: ${({ theme }) => theme.color.text};
  border: solid 1px ${({ theme }) => theme.color.secondary};
`;

const Option = styled.div`
  width: 100%;
  padding: 8px 4px;
  cursor: pointer;
  color: ${({ theme }) => theme.color.primary};
  text-align: center;
  &:hover {
    background: gray;
  }
  ${({ active }) =>
    active
      ? `&::before{
    content:'✓ ';
    color: green;    
  }`
      : null}
`;

const ordering = [
  { name: 'rating ↓', value: '-rating' },
  { name: 'rating ↑', value: 'rating' },
  { name: 'released ↓', value: '-released' },
  { name: 'released ↑', value: 'released' },
];
const platforms = [
  {
    id: [],
    name: 'ALL',
  },
  {
    id: [4],
    name: 'PC',
  },
  {
    id: [187, 18],
    name: 'PlayStation',
  },
  {
    id: [1, 186],
    name: 'Xbox',
  },
  {
    id: [7, 8],
    name: 'Nintendo',
  },
  {
    id: [3, 21],
    name: 'iOS',
  },
];

const Search = props => {
  const [showOptions, setShowOptions] = useState(false);
  const [showPlatformOptions, setPlatformShowOptions] = useState(false);
  return (
    <SearchRow>
      <Name>Game</Name>
      <InputContainer>
        <Input placeholder='Search...' onChange={props.searchHandler} value={props.search} />
      </InputContainer>
      <PlatformButtonOptions
        show={showPlatformOptions}
        onClick={() => {
          setPlatformShowOptions(!showPlatformOptions);
          setShowOptions(false);
        }}>
        <OptionsContainer show={showPlatformOptions}>
          {platforms.map(option => (
            <Option key={option.name} active={option.name === props.platformFilter.name} onClick={() => props.platformHandler(option)}>
              {option.name}
            </Option>
          ))}
        </OptionsContainer>
      </PlatformButtonOptions>

      <ButtonOptions
        show={showOptions}
        onClick={() => {
          setShowOptions(!showOptions);
          setPlatformShowOptions(false);
        }}>
        <OptionsContainer show={showOptions}>
          {ordering.map(option => (
            <Option key={option.value} active={option.value === props.orderBy.value} onClick={() => props.orderingHandler(option)}>
              {option.name}
            </Option>
          ))}
        </OptionsContainer>
      </ButtonOptions>
    </SearchRow>
  );
};

export default Search;
