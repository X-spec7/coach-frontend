import { WS_API_BASE_URL } from '../constants'

class WebSocketService {
  private static instance: WebSocketService
  private ws: WebSocket | null = null
  private messageHandlers: Record<string, (data: any) => void> = {}

  private constructor() {}

  public static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService()
    }
    return WebSocketService.instance
  }

  connect(userId: number) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) return

    this.ws = new WebSocket(`${WS_API_BASE_URL}/chat/${userId}/`)

    this.ws.onopen = () => console.log('WebSocket connected')
    this.ws.onclose = () => console.log('WebSocket disconnected')
    this.ws.onerror = (error) => console.error('WebSocket error:', error)

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      const handler = this.messageHandlers[data.type]
      if (handler) handler(data)
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }

  sendMessage(type: string, payload: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, ...payload }))
    } else {
      console.error('WebSocket is not connected')
    }
  }

  registerOnMessageHandler(type: string, handler: (data: any) => void) {
    this.messageHandlers[type] = handler
  }

  unRegisterOnMessageHandler(type: string) {
    delete this.messageHandlers[type]
  }

  get connectionStatus(): string {
    if (!this.ws) return 'DISCONNECTED'
    switch (this.ws.readyState) {
      case WebSocket.CONNECTING:
        return 'CONNECTING'
      case WebSocket.OPEN:
        return 'OPEN'
      case WebSocket.CLOSING:
        return 'CLOSING'
      case WebSocket.CLOSED:
        return 'CLOSED'
      default:
        return 'UNKNOWN'
    }
  }
}

export const websocketService = WebSocketService.getInstance()
