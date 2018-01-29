// eslint-disable-next-line
import { Mongo } from 'meteor/mongo';

const Message = new Mongo.Collection('message');

export default Message;
