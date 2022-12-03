const schema = `
#graphql
    type Message{
        id: ID 
        username: String 
        message: String 
        date: String
    }
    type User{
        id: ID
        username: String
        password: String
        agent: String
    }
    type RequestUser{
        message: String
        data: User
    }
    type RequestMessage{
        message: String
        data: Message
    }
    type Query{
        
            getMessages: [Message] 
            getMessage(id: ID): Message
            getUsers: [User]
            checkUser(username: String password: String): RequestUser
        
    }
    input inputMessage{
        id: ID 
        username: String 
        password: String
        message: String 
        date: String
    }
    input inputUser{
        id: ID
        username: String
        password: String
        agent: String
    }
    type Mutation{
        addMessage(input: inputMessage): RequestMessage
        addUser(input: inputUser): RequestUser
    }
    type Subscription {
        newMessage: RequestMessage
    }
`;

export default schema;