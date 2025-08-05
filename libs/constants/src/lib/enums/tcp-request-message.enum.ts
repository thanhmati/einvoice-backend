enum INVOICE {
  GET_BY_ID = 'invoice.get_by_id',
  CREATE = 'invoice.create',
  PAGINATE = 'invoice.paginate',
  UPDATE = 'invoice.update',
  DELETE = 'invoice.delete',
  SEND = 'invoice.send',
}

enum PRODUCT {
  CREATE = 'product.create',
  GET_ALL = 'product.get_all',
  GET_BY_ID = 'product.get_by_id',
}

enum PDF_GENERATOR {
  CREATE_INVOICE_PDF = 'pdf-generator.create_invoice_pdf',
}

enum MEDIA {
  UPLOAD_FILE = 'media.upload_file',
}

enum USER {
  CREATE = 'user.create',
}

enum KEYCLOAK {
  CREATE_USER = 'keycloak.create_user',
}

export const TCP_REQUEST_MESSAGE = {
  /* Invoice */
  INVOICE,

  /* Product */
  PRODUCT,

  /* PDF GENERATOR */
  PDF_GENERATOR,

  /* MEDIA */
  MEDIA,

  /* USER */
  USER,

  /* KEYCLOAK */
  KEYCLOAK,
};
