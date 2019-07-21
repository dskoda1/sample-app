import { merge } from 'lodash';

import userResolver from './user';
import workoutsResolver from './workouts';
import financeResolver from './finance';

const resolvers = merge({}, workoutsResolver, userResolver, financeResolver);

export default resolvers;
