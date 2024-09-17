import { Column, Entity, PrimaryColumn } from 'typeorm';

import { WormholeRequestStatus } from './wormholeGmpRequestStatus.js';

@Entity('WormholeGmpRequests')
export class GmpRequest {
  @PrimaryColumn({ name: 'Hash', type: 'nvarchar', nullable: false })
  hash: string;

  @Column({ name: 'EmitterChain', type: 'int', nullable: false })
  emitterChain: number;

  @Column({ name: 'EmitterAddress', type: 'nvarchar', nullable: false })
  emitterAddress: string;

  @Column({ name: 'Sequence', type: 'bigint', nullable: false })
  sequence: string;

  @Column({ name: 'Timestamp', type: 'bigint', nullable: false })
  timestamp: string;

  @Column({ name: 'Status', type: 'enum', enum: WormholeRequestStatus, nullable: false })
  status: WormholeRequestStatus;

  @Column({ name: 'ErrorReason', type: 'text', nullable: true })
  errorReason?: string | null;

  @Column({ name: 'Vaa', type: 'text', nullable: false })
  vaa: string;
}
