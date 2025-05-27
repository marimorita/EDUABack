import { Entity, PrimaryGeneratedColumn , Column } from 'typeorm';
@Entity('Historial')
export class HistorialEntity {
    @PrimaryGeneratedColumn({name : 'idHistorial'})
    id?: number;
    @Column({name : 'titulo'})
    tittle?: string;
    @Column({name : 'texto'})
    text?: string;
    @Column({name : 'imgCap'})
    img?: string;   
    @Column({name : 'idDriveCap'})
    foreignkeyDrive?: number;  
}