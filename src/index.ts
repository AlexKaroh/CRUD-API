import http from 'http';
import { getAllUsers, getUserById, createUser, updateUserById, deleteUserById } from './services/user-service';

const PORT = process.env.PORT || 3000;

export default function notFound(res: http.ServerResponse) {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Route not found! Please check URL and try again :)' }));
}

const server = http.createServer((req, res) => {
  const { pathname } = new URL(`http://${req.headers.host}${req.url}`);
  const userId = req.url?.replace('/api/users', '').split('/')[1];

  switch (req.method) {
    case 'GET':
      if (userId && pathname.includes('/api/users')) {
        getUserById(req, res, userId);
      } else if (!userId && pathname.includes('/api/users')) {
        getAllUsers(req, res);
      } else {
        notFound(res);
      }
      break;
    case 'POST':
      switch (pathname) {
        case '/api/users':
          createUser(req, res);
          break;
        default:
          notFound(res);
      }
      break;
    case 'PUT':
      if (userId && pathname.includes('/api/users')) {
        updateUserById(req, res, userId);
      } else {
        notFound(res);
      }
      break;
    case 'DELETE':
      if (userId && pathname.includes('/api/users')) {
        deleteUserById(req, res, userId);
      } else {
        notFound(res);
      }
      break;
    default:
      notFound(res);
  }
});

server?.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
