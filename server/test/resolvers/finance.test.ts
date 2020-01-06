import { gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';

import { ApolloServer, typeDefs, resolvers } from '../../app';
import models from '../../db/models';
import testUtils from '../utils';

describe('Test finance queries', () => {
  let user = null;
  let testQuery = null;
  let testMutate = null;

  beforeEach(async done => {
    await testUtils.truncateFinanceTables();
    user = await testUtils.createUser('dwight', 'password');
    const context = ({}) => {
      return {
        UserId: user.id,
        models,
      };
    };
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context,
    });

    let { query, mutate } = createTestClient(server);
    testQuery = query;
    testMutate = mutate;
    done();
  });

  describe('Test categories queries', () => {
    test('getCategories', async done => {
      // GIVEN
      // the other user we will be testing with
      let otherUser = await testUtils.createUser('keanu', 'password');
      // Create a public category, and a private for each user
      let publicCategory = await testUtils.createFinanceCategory(
        null,
        'zzzzzzzzz'
      );
      let privateCategory = await testUtils.createFinanceCategory(
        user.id,
        'mycategory'
      );
      await testUtils.createFinanceCategory(otherUser.id, 'keanus');
      // Create the same for sub categories under the public category
      let publicSubCategory = await testUtils.createFinanceSubCategory(
        publicCategory.id,
        null,
        'zzzzzzz'
      );
      let privateSubCategory = await testUtils.createFinanceSubCategory(
        publicCategory.id,
        user.id,
        'mySub'
      );
      let otherSubCategory = await testUtils.createFinanceSubCategory(
        publicCategory.id,
        otherUser.id,
        'otherSub'
      );

      // WHEN
      let res = await testQuery({
        query: GET_CATEGORIES_WITH_SUB_AND_USER,
      });
      let categories = res.data.getCategories;

      // THEN
      // Should not have the other users category
      expect(categories.length).toEqual(2);
      // Sorts by name so first is privateCategory
      expect(categories[0].id).toEqual(privateCategory.id);
      // Should be able to get the user
      expect(categories[0].user.username).toEqual(user.username);
      // Second is the public category
      expect(categories[1].id).toEqual(publicCategory.id);
      // It should not contain the other users sub category
      expect(categories[1].subCategories.length).toEqual(2);
      // Sub categories are sorted by name as well so first is the privateSubCategory
      expect(categories[1].subCategories[0].id).toEqual(privateSubCategory.id);
      expect(categories[1].subCategories[1].id).toEqual(publicSubCategory.id);
      done();
    });

    test('getSubCategories', async done => {
      // GIVEN
      // the other user we will be testing with
      let otherUser = await testUtils.createUser('keanu', 'password');
      // Create a public category
      let publicCategory = await testUtils.createFinanceCategory(
        null,
        'zzzzzzzzz'
      );
      // create a public, private, and private for another user sub category
      let publicSubCategory = await testUtils.createFinanceSubCategory(
        publicCategory.id,
        null,
        'zzzzzzz'
      );
      let privateSubCategory = await testUtils.createFinanceSubCategory(
        publicCategory.id,
        user.id,
        'mySub'
      );
      let otherSubCategory = await testUtils.createFinanceSubCategory(
        publicCategory.id,
        otherUser.id,
        'otherSub'
      );

      // WHEN
      let res = await testQuery({
        query: GET_SUB_CATEGORIES,
        variables: {
          categoryId: publicCategory.id,
        },
      });
      let subCategories = res.data.getSubCategories;

      // THEN
      // Should not have the other users sub category
      expect(subCategories.length).toEqual(2);
      // Sorts by name so first is the private one
      expect(subCategories[0].id).toEqual(privateSubCategory.id);
      // Should be able to get user
      expect(subCategories[0].user.username).toEqual(user.username);
      // Second is the public one
      expect(subCategories[1].id).toEqual(publicSubCategory.id);
      done();
    });
  });

  describe('Test categories mutations', () => {
    test('createCategory', async done => {
      // WHEN
      let res = await testMutate({
        mutation: CREATE_CATEGORY,
        variables: {
          name: 'kit kats',
        },
      });
      expect(res.data.createCategory.success).toEqual(true);
      done();
    });

    test('createCategory unique index on userid and name', async done => {
      // WHEN
      // First one will succeed
      let res = await testMutate({
        mutation: CREATE_CATEGORY,
        variables: {
          name: 'kit kats',
        },
      });
      expect(res.data.createCategory.success).toEqual(true);

      // Second will fail on unique index
      res = await testMutate({
        mutation: CREATE_CATEGORY,
        variables: {
          name: 'kit kats',
        },
      });
      expect(res.data.createCategory.success).toEqual(false);
      expect(res.data.createCategory.message).toBeTruthy();
      done();
    });
  });
});

const GET_CATEGORIES_WITH_SUB_AND_USER = gql`
  query {
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
          username
        }
      }
    }
  }
`;

const GET_SUB_CATEGORIES = gql`
  query getSubCategories($categoryId: Int!) {
    getSubCategories(categoryId: $categoryId) {
      id
      name
      user {
        username
      }
      parent {
        id
        name
      }
    }
  }
`;

const CREATE_CATEGORY = gql`
  mutation createCategory($name: String!) {
    createCategory(name: $name) {
      success
      message
      category {
        id
        name
      }
    }
  }
`;
