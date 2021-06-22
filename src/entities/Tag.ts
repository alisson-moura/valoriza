import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid'

@Entity('tags')
class Tag {
  @PrimaryColumn('uuid')
  readonly id: string

  @Column()
  name: string

  @Column()
  description?: string

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuid()
      this.created_at = new Date()
    }
  }
}

export { Tag }
