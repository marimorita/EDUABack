import { Entity, PrimaryGeneratedColumn , Column } from 'typeorm';
@Entity('DriveCap')
export class DriveCapEntity {
    @PrimaryGeneratedColumn({name : 'idDriveCap'})
    id?: number;
    @Column({name : 'fecha', type: 'date', })
    date?: Date;
    @Column({name : 'hora', type: 'time', })
    hour?: string;
    @Column({name : 'imgCap'})
    img?: string;   
    @Column({name : 'ccReceptionist'})
    foreignKeyReceptionist?: number;  
}