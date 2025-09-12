import { Entity, Column } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

@Entity({ name: 'products' })
export class Product extends AbstractEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  sku: string;

  @Column({ type: 'varchar', length: 50 })
  unit: string;

  @Column({ type: 'float', default: 0 })
  price: number;

  @Column({ type: 'float', default: 0 })
  vatRate: number;
}
