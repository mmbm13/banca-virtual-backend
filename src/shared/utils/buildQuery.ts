import { Op } from 'sequelize';
import { FindOptions } from 'sequelize';

interface Query {
  end?: number;
  start?: number;
  order?: string;
  sort?: string;
  q?: string;
  [key: string]: string | number;
}

export function buildQuery(queryDto: Query | any, forCount = false) {
  const query = Object.assign({}, queryDto);
  const customQuery: FindOptions = {};

  if (query.end && (query.start || query.start === 0) && !forCount) {
    customQuery.limit = query.end - query.start;
    customQuery.offset = query.start;
  }

  if (query.sort && query.order && !forCount) {
    customQuery.order = [[query.sort, query.order]];
  }

  delete query.end;
  delete query.start;
  delete query.order;
  delete query.sort;

  customQuery.where = {};
  for (const [key, value] of Object.entries(query)) {
    if (key === 'name') {
      customQuery.where[key] = { [Op.like]: `%${value}%` };
      continue;
    }

    customQuery.where[key] = value;
  }

  return customQuery;
}
