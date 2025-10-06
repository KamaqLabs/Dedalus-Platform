import { Invitation } from '../model/aggregates/invitation';

export interface IInvitationCommandService {
  /**
   * Creates and persists a new invitation.
   * @param email The email address to invite (optional if inviting by email)
   * @param expiresAt When the invitation expires
   * @returns The created invitation aggregate
   */
  createInvitation(email: string, expiresAt: Date): Promise<Invitation>;

  /**
   * Marks the invitation as used.
   * @param tokenId The token ID (jti) of the invitation
   */
  markAsUsed(tokenId: string): Promise<void>;

  /**
   * Revokes (invalidates) an invitation so it can't be used.
   * @param tokenId The token ID (jti) of the invitation
   */
  revokeInvitation(tokenId: string): Promise<void>;

  /**
   * Optionally: allows manually expiring an invitation
   * @param tokenId The token ID (jti) of the invitation
   */
  expireInvitation(tokenId: string): Promise<void>;

  /**
   * Deletes an invitation (if your domain allows this)
   * @param tokenId The token ID (jti) of the invitation
   */
  deleteInvitation(tokenId: string): Promise<void>;
}
