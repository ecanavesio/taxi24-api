export abstract class PdfRendererService {
  abstract render(content: string): Promise<Buffer>;
}
