import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity('user')
export class userEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        unique: true,
        nullable: false,
    })
    username: string;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    salt: string;

    @Column({
        type: 'varchar',
        // unique: true,
        nullable: false,
    })
    email: string;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    password: string;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    dob: Date;

    @BeforeInsert()
    async hashPassword() {
        this.salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, this.salt);
    }
}