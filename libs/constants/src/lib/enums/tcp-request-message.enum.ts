enum INVOICE {
  GET_BY_ID = 'invoice.get_by_id',
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
