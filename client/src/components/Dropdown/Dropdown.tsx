import styled from 'styled-components';

type Item = {
  key: string;
  value: string;
};

interface DropDownProps {
  label?: string;
  placeholder?: string;
  items?: Item[];
}

const DropDownBox = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius};
  background: #fff;
  width: 100%;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);
  position: absolute;
  padding: 0.5rem 0.8rem;
  max-height: 35rem;
  overflow-y: auto;
  display: none;
`;

const DropDownContainer = styled.div`
  position: relative;

  :focus-within ${DropDownBox} {
    display: block;
  }
`;

const DropDownItem = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius};
  color: #828282;
  padding: 1rem 1.2rem;
  cursor: pointer;

  :hover {
    background: #f2f2f2;
    color: #000;
  }
`;

const Dropdown: React.FC<DropDownProps> = (props) => {
  const { items, children } = props;

  return (
    <DropDownContainer>
      {children}
      <DropDownBox>
        {items && items.map((el) => <DropDownItem key={el.key}>{el.value}</DropDownItem>)}
      </DropDownBox>
    </DropDownContainer>
  );
};

export default Dropdown;
