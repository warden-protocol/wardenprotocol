import { Column, Entity, PrimaryColumn } from 'typeorm';

import { WormholeRequestStatus } from './wormholeGmpRequestStatus.js';

@Entity('WormholeGmpRequests')
export class GmpRequest {
  @PrimaryColumn({ name: 'Hash', nullable: false })
  hash: string;

  @Column({ name: 'EmitterChain', nullable: false })
  emitterChain: number;

  @Column({ name: 'EmitterAddress', nullable: false })
  emitterAddress: string;

  @Column({ name: 'Sequence', type: 'bigint', nullable: false })
  sequence: string;

  @Column({ name: 'Timestamp', type: 'bigint', nullable: false })
  timestamp: string;

  @Column({ name: 'Status', type: 'enum', enum: WormholeRequestStatus, nullable: false })
  status: WormholeRequestStatus;

  @Column({ name: 'Vaa', nullable: false })
  vaa: string;
}
