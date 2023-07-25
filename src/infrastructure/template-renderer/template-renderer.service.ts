import { RenderContext, TemplatesName } from "@app/types/templates";

export abstract class TemplateRendererService {
  abstract render(template: TemplatesName, context?: RenderContext): string;
}
