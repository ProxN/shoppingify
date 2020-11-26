import styled from 'styled-components';
import CategoryBox from '@components/CategoryBox';
import PageHeader from '@components/PageHeader';

const Categories = styled.div`
  padding: 0 8rem;
`;

const Index = () => {
  return (
    <div>
      <PageHeader />
      <Categories>
        <CategoryBox />
        <CategoryBox />
      </Categories>
    </div>
  );
};

export default Index;
