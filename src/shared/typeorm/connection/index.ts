import { data_source } from '../dataSource';

export default async () => {
  return data_source.initialize();
};
