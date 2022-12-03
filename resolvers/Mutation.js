
async function addMessage(parent, args, context, info){
    const message = { ...args.input };
        let response = await context.messages.addMessage(message);
        context.pubsub.publish('NEW_MESSAGE', response); 
        return response;
}

async function addUser(parent, args, context, info){
    const user = { ...args.input };
    let response = await context.users.addUser(user);
        return response;
}

export default {addMessage, addUser}