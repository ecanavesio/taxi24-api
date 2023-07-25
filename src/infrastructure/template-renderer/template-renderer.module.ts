import { Module } from "@nestjs/common";

import { HandlebarsEngine } from "./handlebars.engine";
import { TemplateRendererService } from "./template-renderer.service";

@Module({
  providers: [
    {
      provide: TemplateRendererService,
      useClass: HandlebarsEngine,
    },
  ],
  exports: [TemplateRendererService],
})
export class TemplateRendererModule {}
