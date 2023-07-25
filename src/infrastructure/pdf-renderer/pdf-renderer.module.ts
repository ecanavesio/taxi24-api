import { Module } from "@nestjs/common";

import { PdfRendererService } from "./pdf-renderer.service";
import { PuppeteerEngine } from "./puppeteer-engine";

@Module({
  providers: [
    {
      provide: PdfRendererService,
      useClass: PuppeteerEngine,
    },
  ],
  exports: [PdfRendererService],
})
export class PdfRendererModule {}
