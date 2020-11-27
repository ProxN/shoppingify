import { useMutation, useQuery } from 'react-query';
import { AddItemInputs, ICategory, IError, Item } from '../types/index';
import graphqlClient, { gql } from '../utils/graphqlClient';

interface AddItemResponse extends IError {
  item?: Item;
}

export const useAddItem = () => {
  return useMutation(async (data: AddItemInputs) => {
    const res = await graphqlClient.request<{ addItem: AddItemResponse }>(
      gql`
        mutation addnewitem($name: String!, $categoryName: String!) {
          addItem(name: $name, categoryName: $categoryName) {
            item {
              id
              name
              categoryId
            }
          }
        }
      `,
      data
    );
    return res.addItem;
  });
};

export const useCategoires = () => {
  return useQuery('categoires', async () => {
    const res = await graphqlClient.request<{ getCategoires: { categoires: ICategory[] } }>(gql`
      {
        getCategoires {
          categoires {
            id
            name
          }
        }
      }
    `);
    return res.getCategoires;
  });
};
