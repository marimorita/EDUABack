import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('Notificaciones')
export class NotificacionesEntity {
    @PrimaryGeneratedColumn({ name: 'idNotis' })
    id?: number;
    @Column({ name: 'titulo' })
    tittle?: string;
    @Column({ name: 'texto' })
    text?: string;
    @Column({ name: 'imgCap' })
    img?: string;
    @Column({ name: 'idDriveCap' })
    foreignKeyDrive?: number;
    @Column({ name: 'roleCC' })
    roleCC?: number;
}
