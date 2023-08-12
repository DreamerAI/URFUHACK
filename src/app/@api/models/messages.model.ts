export type Message = {
    content: string;
    message_id: number;
    timestamp: string;
    conversation_id: number;
    sender_id: number;
  }
  
export type Conversation = {
    conversation_id: number;
    name: null;
    created_at: string;
    creator_id: number;
    guest_id: number;
  }
  
export type ConversationData = {
    conversation: Conversation;
    messages: Message[];
  }
  