import { IncomingMessage, ServerResponse } from 'http';
import { User } from '@src/models/user.model';

const users: User[] = [];

const CONTENT_TYPE = { 'Content-Type': 'application/json' };

export const getAllUsers = (_: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200, CONTENT_TYPE);
  res.end(JSON.stringify(users));
};

export const isValidUUID = (uuid: string): boolean => {
  const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
  return uuidRegex.test(uuid);
};

export const getUserById = (_: IncomingMessage, res: ServerResponse, userId: string) => {
  if (!isValidUUID(userId)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Invalid userId. Please provide a valid UUID.' }));
    return;
  }

  const user = users.find((userToFind) => userToFind.id === userId);

  if (!user) {
    res.writeHead(404, CONTENT_TYPE);
    res.end(JSON.stringify({ message: 'User not found' }));
    return;
  }

  res.writeHead(200, CONTENT_TYPE);
  res.end(JSON.stringify(user));
};
