enum INVOICE {
  GET_BY_ID = 'invoice.get_by_id',
  CREATE = 'invoice.create',
  PAGINATE = 'invoice.paginate',
  UPDATE = 'invoice.update',
  DELETE = 'invoice.delete',
}

enum PRODUCT {
  CREATE = 'product.create',
  GET_ALL = 'product.get_all',
  GET_BY_ID = 'product.get_by_id',
}

export const TCP_REQUEST_MESSAGE = {
  /* Invoice */
  INVOICE,

  /* Product */
  PRODUCT,
};
