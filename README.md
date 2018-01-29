# chat-exercise

**Just a simple example to show and practice code skills** resolving the implementation of a simple chat application between two person.

Serverside implemented with `Meteor` with the out of the box DB provided: `Mongodb`

The technology stack additionally used is: `React v.16` to render UI, `Graphql` as data query language, `Apollo` to connect graphql with `React`.

The application model is based on 3 entities.

* **User** (using meteor `accounts-password` and a hardcoded password so user just need to remember their userName). For just the scope of the example, I won't store users on db.
* **ChatRoom** Each time some select one of the users register ( `Meteor.users` )in the application, we create a new ChatRoom for the two user (Selected user and the `Meteor.userId()` ). Of course if this chatRoom exist, we just get it. To know who belongs to each ChatRoom, we will have the following properties: `createdAt`, `component1`: User, `component2`: User.
* **Message** Well each time someone write something, we store the message content. We store, the `from`, `message`, `createdAt` and of course `chatRoomId`.

In terms of syntax, `babel` heavily used to get the best of last `es6` features (`stage-0`) and `eslint` with `prettier` to have a consistent code style across the application. Additionally to import `*.graphql` in the code using `babel-plugin-inline-import`

Let's use font-awesome to add some icons to make it a bit better.

The application is designed to have one entry point, and make mandatory people to

## TODOs

* [ ] Create the project with `meteor` and plan the execution.
* [ ] Add `.babelrc` & `.eslintrc` with `prettier` configuration.
* [ ] Add needed dependencies to the package.
  * **babel && eslint && devDependencies**: babel-core babel-eslint babel-preset-env babel-preset-react babel-preset-stage-0 babel-plugin-inline-import eslint eslint-config-airbnb eslint-config-prettier eslint-plugin-html eslint-plugin-jsx-a11y eslint-plugin-prettier prettier
  * **react**: react react-dom
  * **apollo**: apollo-client apollo-client-preset react-apollo apollo-client-preset
  * **graphql**: graphql-server-express express graphql body-parser graphql-tag graphql-tools
  * **meteor dependencies**: apollo accounts-password
  * **subscriptions**: subscriptions-transport-ws apollo-link-ws
  * **utilities && cosmetics**: font-awesome lodash
* [ ] Create the needed structure recommended by [Meteor](https://guide.meteor.com/#example-app).
* [ ] Generate `graphql` api definition (User, ChatRoom, Message).
* [ ] Decide which style approach to using (BEM).
* [ ] Create Login component and basic Auth Components: Register & Login / Application & Logout.
* [ ] Create ChatRoomsSelection component (just allow you to select one of all the Users, if too many people is here we should think in a way to reduce the User to be selected...).
* [ ] Create one ChatRoomMessages component (only show if a chat has been selected).
* [ ] Create one ChatForm component (only show if a chat has been selected, to create the messages).
* [ ] Be able to update show if the other user is writing.
* [ ] Work on the styles for mobile first only design. Just a simple grid with 3 sections (header, main, footer)
* [ ] Place your own messages are on the right hand side in a green bubble and the other persons messages are on the left hand side in a grey bubble.
* [ ] Implement commands in chatForm messages:
  * [ ] /nick <name> - sets your name for the chat
  * [ ] /think <message> - makes the text appear in dark grey, instead of black
  * [ ] /oops - removes the last message sent
* [ ] Polish styles and UX.
* [ ] Create some extras functionalities for commands:
  * [ ] When the user is typing, indication that they are typing should be shown to the other user.
  * [ ] (smile) should produce a smiley face, (wink) should produce a winking face
  * [ ] When a new message arrives, it should slide in, and the messages above slide up
  * [ ] /fadelast - would fade out the last message to 10% visibility
  * [ ] /highlight <message> - would make the font of the message 10% bigger, and make the background 10% darker
