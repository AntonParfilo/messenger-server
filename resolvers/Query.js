async function getMessages(parent, args, context, info){
    let response = await context.messages.getMessages();
    return response.rows;
}
async function getMessage(parent, args, context, info){
    let response = await context.messages.getMessage(args.id);
    return response.rows[0];
}
async function getUsers(parent, args, context, info){
    let response = await context.users.getUsers();
    return response.rows;
}
async function checkUser(parent, args, context, info){
    let response = await context.users.checkUser(args);
    return response;
}

export default {getMessages, getMessage, getUsers, checkUser}