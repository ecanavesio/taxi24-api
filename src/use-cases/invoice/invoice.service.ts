import { TripStatus } from "@app/domain/enum/trip-status.enum";
import { TripRepository } from "@app/infrastructure/database/repositories/trip.repository";
import { PdfRendererService } from "@app/infrastructure/pdf-renderer/pdf-renderer.service";
import { TemplateRendererService } from "@app/infrastructure/template-renderer/template-renderer.service";
import { TemplatesName } from "@app/types/templates";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";

import { CreateInvoiceVo } from "./vo/create-invoice.vo";

@Injectable()
export class InvoiceService {
  constructor(
    private readonly tripRepository: TripRepository,
    private readonly templateRenderService: TemplateRendererService,
    private readonly pdfRenderService: PdfRendererService,
  ) {}

  async getInvoiceHtml(tripId: number): Promise<string> {
    const trip = await this.tripRepository.getById(tripId);

    if (!trip) throw new NotFoundException();
    if (trip.tripStatus !== TripStatus.FINISHED) throw new BadRequestException("Trip is not finished");

    const context: CreateInvoiceVo = {
      tripId: `# ${trip.tripId}`,
      driverName: trip.driver.driverName,
      passengerName: trip.passenger.passengerName,
      fromGeolocation: {
        latitude: trip.fromGeolocation.latitude.toFixed(6),
        longitude: trip.fromGeolocation.longitude.toFixed(6),
      },
      toGeolocation: {
        latitude: trip.toGeolocation.latitude.toFixed(6),
        longitude: trip.toGeolocation.longitude.toFixed(6),
      },
      distance: trip.distance.toFixed(4),
      pricePerKmInUsd: Number(trip.pricePerKmInUsd).toFixed(3),
      totalToPay: (trip.distance * trip.pricePerKmInUsd).toFixed(2),
    };
    return this.templateRenderService.render(TemplatesName.INVOICE, context);
  }

  async downloadInvoiceHtml(tripId: number): Promise<Buffer> {
    const html = await this.getInvoiceHtml(tripId);
    return this.pdfRenderService.render(html);
  }
}
