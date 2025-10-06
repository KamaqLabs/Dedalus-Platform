import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {InvitationUsedError} from "../../exceptions/invitation-used.error";

@Entity('invitations')
export class Invitation {
    @PrimaryGeneratedColumn('uuid')
    id: string; // Aggregate root ID

    @Column({ name: 'token_id', unique: true })
    tokenId: string; // jti from JWT (or some unique token id)

    @Column({ default: false })
    used: boolean;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @Column({ name: 'expires_at' })
    expiresAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;

    markAsUsed() {
        if (this.used) {
            throw new InvitationUsedError();
        }
        this.used = true;
    }

    isExpired(): boolean {
        return this.expiresAt.getTime() < Date.now();
    }
}
