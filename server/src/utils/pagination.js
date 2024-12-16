const pagination = async (query, callback) => {
  const { page, limit, order } = query;
  const reqPageIndex = page > 0 ? parseInt(page) : 1;
  const pageIndex = page > 0 ? parseInt(page) - 1 : 0;
  const perPageLimit = limit > 0 ? parseInt(limit) : 10;
  const offset = pageIndex * perPageLimit;
  const isPageNext = reqPageIndex * perPageLimit;
  const sortOrder = order ? order : 'desc' ;
  const result = {};
  const pagination = {};
  const { doc, totalDoc } = await callback(perPageLimit, offset, sortOrder);
  result.result = doc;
  pagination.currentPage = reqPageIndex;
  pagination.currentPageLimit = perPageLimit;
  pagination.total = totalDoc;
  pagination.totalPage = Math.ceil(totalDoc / perPageLimit);
  if (reqPageIndex > 1) {
    pagination.prevPage = reqPageIndex - 1;
    pagination.prevPageLimit = perPageLimit;
  } else {
    pagination.prevPage = null;
    pagination.prevPageLimit = null;
  }
  if (isPageNext < totalDoc) {
    pagination.nextPage = reqPageIndex + 1;
    pagination.nextPageLimit = perPageLimit;
  } else {
    pagination.nextPage = null;
    pagination.nextPageLimit = null;
  }
  result.pagination = pagination;
  return result;
};

export default pagination;
