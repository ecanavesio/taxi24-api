import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export class WithTimestamps {
  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: string;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: string;
}
