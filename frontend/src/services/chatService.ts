const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

class ChatService {
  private getAuthHeaders() {
    const token = localStorage.getItem('access_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  async sendMessage(content: string): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${API_URL}/api/chat/message`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({
          content,
          message_type: 'text',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  }

  async getMessageHistory(limit: number = 50, offset: number = 0): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${API_URL}/api/messages?limit=${limit}&offset=${offset}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to get message history:', error);
      throw error;
    }
  }

  async getTypingIndicators(): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${API_URL}/api/chat/typing-indicators`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to get typing indicators:', error);
      throw error;
    }
  }
}

export const chatService = new ChatService();

// Export functions for easier usage
export const { sendMessage, getMessageHistory, getTypingIndicators } = chatService;