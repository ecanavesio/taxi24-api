import { Controller, Get, HttpCode, Param, ParseIntPipe, Res } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";

import { InvoiceService } from "./invoice.service";

@Controller("/invoice/trips/:tripId")
@ApiTags("Invoices")
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: "Generate Invoice" })
  @ApiResponse({
    status: 200,
    description: "Invoice HTML content",
    type: String,
  })
  @ApiParam({ name: "tripId", type: Number })
  async getInvoice(@Param("tripId", ParseIntPipe) tripId: number, @Res() response: Response): Promise<void> {
    const html = await this.invoiceService.getInvoiceHtml(tripId);
    response.header("Content-Type", "text/html; charset=utf-8").send(html);
  }

  @Get("/download")
  @HttpCode(200)
  @ApiOperation({ summary: "Download the PDF of the Invoice" })
  @ApiResponse({
    status: 200,
    description: "Invoice PDF content",
    type: Buffer,
  })
  @ApiParam({ name: "tripId", type: Number })
  async downloadInvoice(@Param("tripId", ParseIntPipe) tripId: number, @Res() response: Response): Promise<void> {
    const pdf = await this.invoiceService.downloadInvoiceHtml(tripId);
    response.header("Content-Type", "application/pdf").send(pdf);
  }
}
