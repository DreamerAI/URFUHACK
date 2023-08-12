export type ConversationModel = {
    conversation: {
        conversation_id: number,
        name: string | null,
        created_at: Date,
        creator_id: number
    },
    guest_token: string
}
