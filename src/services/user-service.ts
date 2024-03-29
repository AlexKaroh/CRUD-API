import { v4 as uuidv4 } from 'uuid';
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

export const createUser = (req: IncomingMessage, res: ServerResponse) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    const { username, age, hobbies } = JSON.parse(body);

    if (!username) {
      res.writeHead(400, CONTENT_TYPE);
      res.end(JSON.stringify({ message: 'Username field is required' }));
      return;
    }

    if (!age) {
      res.writeHead(400, CONTENT_TYPE);
      res.end(JSON.stringify({ message: 'Age field is required' }));
      return;
    }

    if (!hobbies) {
      res.writeHead(400, CONTENT_TYPE);
      res.end(JSON.stringify({ message: 'Hobbies field is required' }));
      return;
    }

    const newUser: User = {
      id: uuidv4(),
      username,
      age,
      hobbies: Array.isArray(hobbies) ? hobbies : [],
    };

    users.push(newUser);

    res.writeHead(201, CONTENT_TYPE);
    res.end(JSON.stringify(newUser));
  });
};

export const updateUserById = (req: IncomingMessage, res: ServerResponse, userId: string) => {
  let body = '';

  if (!isValidUUID(userId)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Invalid userId. Please provide a valid UUID.' }));
    return;
  }

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    const { username, age, hobbies } = JSON.parse(body);

    if (!username) {
      res.writeHead(400, CONTENT_TYPE);
      res.end(JSON.stringify({ message: 'Username field is required' }));
      return;
    }

    if (!age) {
      res.writeHead(400, CONTENT_TYPE);
      res.end(JSON.stringify({ message: 'Age field is required' }));
      return;
    }

    if (!hobbies) {
      res.writeHead(400, CONTENT_TYPE);
      res.end(JSON.stringify({ message: 'Hobbies field is required' }));
      return;
    }

    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      res.writeHead(404, CONTENT_TYPE);
      res.end(JSON.stringify({ message: 'User not found' }));
      return;
    }

    users[userIndex] = { ...users[userIndex], username, age, hobbies };

    res.writeHead(200, CONTENT_TYPE);
    res.end(JSON.stringify(users[userIndex]));
  });
};

export const deleteUserById = (_: IncomingMessage, res: ServerResponse, userId: string) => {
  const userIndex = users.findIndex((user) => user.id === userId);

  if (!isValidUUID(userId)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Invalid userId. Please provide a valid UUID.' }));
    return;
  }

  if (userIndex === -1) {
    res.writeHead(404, CONTENT_TYPE);
    res.end(JSON.stringify({ message: 'User not found' }));
    return;
  }

  users.splice(userIndex, 1);

  res.writeHead(204);
  res.end();
};
