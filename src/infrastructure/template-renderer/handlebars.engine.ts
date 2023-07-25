import fs from "fs";
import { join } from "path";

import { TemplateRendererError } from "@app/exceptions";
import { RenderContext, TemplatesName } from "@app/types/templates";
import * as Handlebars from "handlebars";

import { TemplateRendererService } from "./template-renderer.service";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const HandlebarsLayout = require("handlebars-layouts");

type HbsTemplateMemory = {
  [K in TemplatesName]?: Handlebars.TemplateDelegate<RenderContext>;
};

export class HandlebarsEngine implements TemplateRendererService {
  private readonly templatesDir = join(__dirname, "../..", "templates");
  private memory: HbsTemplateMemory = {};

  constructor() {
    Handlebars.registerHelper(HandlebarsLayout(Handlebars));
  }

  render(template: TemplatesName, context: RenderContext = {}): string {
    try {
      if (!this.memory[template]) {
        const path = join(this.templatesDir, `${template}.hbs`);
        if (!fs.existsSync(path)) {
          throw new TemplateRendererError(`Template ${template} not found`);
        }
        const source = fs.readFileSync(path, "utf-8");
        const templateCompiled = Handlebars.compile<RenderContext>(source);
        this.memory[template] = templateCompiled;
      }

      return this.memory[template]!(context);
    } catch (error) {
      throw new TemplateRendererError(`Error rendering template ${template}: ${error.message}`);
    }
  }
}
