import { DeleteDateColumn } from "typeorm";

import { WithTimestamps } from "./with-timestamps";

export class ParanoidTimestamp extends WithTimestamps {
  @DeleteDateColumn({ name: "deleted_at", type: "timestamp" })
  deletedAt: string;
}
