import Button from '@components/Button';
import Dropdown from '@components/Dropdown';
import Flex from '@components/Flex';
import Input from '@components/Input';
import styled from 'styled-components';

const AddItemContainer = styled.div`
  width: 39rem;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  padding: 3.5rem 4.5rem;
`;

const Title = styled.span`
  font-size: ${({ theme }) => theme.fontSizes[4]}px;
  margin-bottom: 3rem;
`;

const items = [
  {
    key: '1',
    value: 'Fruit and vegetables',
  },
  {
    key: '2',
    value: 'Meat and Fish',
  },
  {
    key: '3',
    value: 'Beverages',
  },
];

interface AddItemsProps {
  handleToggleForm: () => void;
}

const AddItem: React.FC<AddItemsProps> = ({ handleToggleForm }) => {
  return (
    <AddItemContainer>
      <Title>Add a new item</Title>
      <form>
        <Input fullWidth Size='large' label='Name' placeholder='Enter a name' />
        <Input.TextArea fullWidth Size='large' label='Note (optional)' placeholder='Enter a note' />
        <Input fullWidth Size='large' label='Image (optional)' placeholder='Enter a image' />
        <Dropdown items={items}>
          <Input placeholder='Enter a category' label='Category' fullWidth Size='large' />
        </Dropdown>
        <Flex margin='3rem 0 0 0' justify='center'>
          <Button onClick={handleToggleForm} margin='0 2rem 0 0'>
            cancal
          </Button>
          <Button status='primary'>Save</Button>
        </Flex>
      </form>
    </AddItemContainer>
  );
};

export default AddItem;
