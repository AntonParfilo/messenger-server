function newMessageSubscribe(parent, args, context, info) {
    return context.asyncIterator("NEW_MESSAGE");
}
  const newMessage = {
    subscribe: newMessageSubscribe,
    resolve: payload => {
      return payload
    },
  }

  export default {newMessage}








  