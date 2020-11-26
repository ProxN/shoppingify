import Flex from '@components/Flex';
import Button from '@components/Button';
import BottleSVG from '@assets/bottle.svg';
import PenSVG from '@assets/pen.svg';
import {
  ShoppingContainer,
  AddItemBox,
  AddItemContent,
  ShoppingName,
  EditShoppingName,
  ShoppingCategory,
  ShoppingItem,
} from './ShoppingList.styles';
import Text from '@components/Text';

const ShoppingList = () => {
  return (
    <ShoppingContainer>
      <AddItemBox>
        <Flex>
          <BottleSVG />
          <AddItemContent>
            <span>Didn’t find what you need?</span>
            <Button Size='small'>Add Item</Button>
          </AddItemContent>
        </Flex>
      </AddItemBox>
      <Flex margin='0 0 3.2rem 0' align='center' justify='space-between'>
        <ShoppingName>Shopping List</ShoppingName>
        <EditShoppingName>
          <PenSVG />
        </EditShoppingName>
      </Flex>
      <ShoppingCategory>
        <Text appearance='hint'>Fruit and vegetables</Text>
        <ShoppingItem>
          <span>Acocado</span>
          <Button Size='small'>3 pcs</Button>
        </ShoppingItem>
        <ShoppingItem>
          <span>Pre-cooked corn 450g</span>
          <Button Size='small'>3 pcs</Button>
        </ShoppingItem>
      </ShoppingCategory>
      <ShoppingCategory>
        <Text appearance='hint'>Meat and Fish</Text>
        <ShoppingItem>
          <span>Acocado</span>
          <Button Size='small'>3 pcs</Button>
        </ShoppingItem>
        <ShoppingItem>
          <span>Pre-cooked corn 450g</span>
          <Button Size='small'>3 pcs</Button>
        </ShoppingItem>
      </ShoppingCategory>
    </ShoppingContainer>
  );
};

export default ShoppingList;
