export interface Pagination {
  totalCount: number;
  offset: number;
  limit: number;
}

export interface NotParsePagination extends Omit<Pagination, 'totalCount'> {
  total_count: number;
}
