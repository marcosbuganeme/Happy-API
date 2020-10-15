import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Orphanage from './Orphanage';
/**
 * Usando esse decorator (Entity) o typeorm vai entender que a classe Orphanage
 * está associada com a nossa tabela chamada orphanages
 */
@Entity('images')
export default class Image {
  // Vai gerar o incremento do ID. ex: 1 + 1
  @PrimaryGeneratedColumn('increment')
  id: number;

  // Column está informando quais atributos são colunas
  @Column()
  path: string;

  // Relacionando para salvar no banco de dados
  @ManyToOne(() => Orphanage, (orphanage) => orphanage.images)
  @JoinColumn({ name: 'orphanage_id' })
  orphanage: Orphanage;
}
