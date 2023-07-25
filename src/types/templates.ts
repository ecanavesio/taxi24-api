export class RenderContext {
  [key: string]: string | undefined | boolean | RenderContext | string[] | RenderContext[];
}

export enum TemplatesName {
  INVOICE = "invoice",
}
