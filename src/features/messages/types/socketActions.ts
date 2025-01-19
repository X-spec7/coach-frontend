const SocketActions = {
    MESSAGE: "message",
    TYPING: "typing",
    ONLINE_USER: "onlineUser",
  } as const;
  
export type SocketAction = keyof typeof SocketActions;
  
export default SocketActions;