import { DatabaseModule } from "@app/infrastructure/database/database.module";
import { PdfRendererModule } from "@app/infrastructure/pdf-renderer/pdf-renderer.module";
import { TemplateRendererModule } from "@app/infrastructure/template-renderer/template-renderer.module";
import { Module } from "@nestjs/common";

import { InvoiceController } from "./invoice.controller";
import { InvoiceService } from "./invoice.service";

@Module({
  imports: [DatabaseModule, PdfRendererModule, TemplateRendererModule],
  controllers: [InvoiceController],
  providers: [InvoiceService],
})
export class InvoiceModule {}
