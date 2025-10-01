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
}
