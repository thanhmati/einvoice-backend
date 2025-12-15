export type MailAttachment = {
  filename: string;
  content?: Buffer | string;
  contentType?: string;
  path?: string; // nếu gửi file từ URL hoặc path local
};

export interface SendMailOptions {
  to: string; // Người nhận
  subject: string; // Tiêu đề email
  html?: string; // Nội dung HTML
  text?: string; // Plain text fallback (tuỳ chọn)
  senderName?: string; // Tên hiển thị của người gửi
  senderEmail?: string; // Email người gửi
  attachments?: MailAttachment[]; // File đính kèm (PDF, image, v.v.)
}
