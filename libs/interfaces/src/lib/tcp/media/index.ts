export type UploadFileTcpReq = {
  fileBase64: string;
  fileName: string;
};

export type UploadFileTcpRes = {
  url: string;
  publicId: string;
};
