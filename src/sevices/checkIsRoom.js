export function checkIsRoom(chatId) {
  const prefixChatname = chatId.split("-");

  if (prefixChatname[0] === "Room") {
    return true;
  } else {
    return false;
  }
}
