import puppeteer from "puppeteer";

import { PdfRendererService } from "./pdf-renderer.service";

export class PuppeteerEngine implements PdfRendererService {
  async render(content: string): Promise<Buffer> {
    const browser = await puppeteer.launch({
      executablePath: "/usr/bin/chromium-browser",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: "new",
    });

    const page = await browser.newPage();
    await page.setContent(content);

    const file = await page.pdf();
    await browser.close();

    return file;
  }
}
