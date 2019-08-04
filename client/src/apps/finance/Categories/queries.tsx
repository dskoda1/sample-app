import { gql } from 'apollo-boost';

export const GetCategoriesQuery = gql`
  {
    getCategories {
      id
      name
      user {
        username
      }
      subCategories {
        id
        name
        user {
          id
          username
        }
      }
    }
  }
`;

interface User {
  username: string;
}

export interface Category {
  id: number;
  name: string;
  user?: string;
  subCategories: Array<SubCategory>;
}

export interface SubCategory {
  id: number;
  name: string;
  user?: string;
}

export interface GetCategoriesData {
  getCategories: Array<Category>;
}
