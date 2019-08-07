import { gql } from 'apollo-boost';

export const GetCategoriesQuery = gql`
  query getCategoriesQuery {
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

export const CreateCategoryMutation = gql`
  mutation createCategory($name: String!) {
    createCategory(name: $name) {
      success
      message
      category {
        id
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

export interface CreateCategoryData {
  createCategory: {
    success: boolean;
    message: string;
    category?: Category;
  };
}

export interface CreateCategoryVariables {
  name: string;
}
