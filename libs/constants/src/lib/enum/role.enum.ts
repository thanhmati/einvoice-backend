export enum ROLE {
  ADMINISTRATOR = 'administrator',
  ACCOUNTANT = 'accountant',
}

export enum PERMISSION {
  /* INVOICE */
  INVOICE_CREATE = 'invoice.create',
  INVOICE_GET_BY_ID = 'invoice.get_by_id',
  INVOICE_GET_ALL = 'invoice.get_all',
  INVOICE_UPDATE = 'invoice.update',
  INVOICE_DELETE = 'invoice.delete',
  INVOICE_SEND = 'invoice.send',

  /* USER */
  USER_CREATE = 'user.create',
  USER_GET_BY_ID = 'user.get_by_id',
  USER_GET_ALL = 'user.get_all',
  USER_UPDATE = 'user.update',
  USER_DELETE = 'user.delete',

  /* ROLE */
  ROLE_CREATE = 'role.create',
  ROLE_GET_BY_ID = 'role.get_by_id',
  ROLE_GET_ALL = 'role.get_all',
  ROLE_UPDATE = 'role.update',
  ROLE_DELETE = 'role.delete',

  /* PRODUCT */
  PRODUCT_CREATE = 'product.create',
  PRODUCT_GET_BY_ID = 'product.get_by_id',
  PRODUCT_GET_ALL = 'product.get_all',
  PRODUCT_UPDATE = 'product.update',
  PRODUCT_DELETE = 'product.delete',
}

export enum ROLE_ID {
  ADMINISTRATOR = '68a3f2f1b3e811435a8ad004',
}
