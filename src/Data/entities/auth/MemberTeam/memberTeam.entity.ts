import { Entity, PrimaryGeneratedColumn , Column } from 'typeorm';
@Entity('MemberTeam')
export class MemberTeamEntity {
    @PrimaryGeneratedColumn({name : 'ccMemberTeam'})
    id?: number;
    @Column({name : 'nombres'})
    name?: string;
    @Column({name : 'apellidos'})
    lastNames?: string;
    @Column({name : 'cargo'})
    post?: string;
    @Column({name : 'celular'})
    cel?: number;
    @Column({name : 'correo'})  
    email?: string;
    @Column({name : 'contraseña'})
    password?: string;  
    @Column({name : 'rol'})
    role?: string;
    @Column({name : 'img'})
    img?: string;      
}