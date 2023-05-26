const http = require("http");

const users = [
  {
    id: 1,
    name: 'Ann',
    email: 'ann@google.com',
    hobbies: ['books', 'sport', 'dancing'],
  },
  {
    id: 2,
    name: 'Ben',
    email: 'ben@google.com',
    hobbies: ['series', 'sport'],
  },
];

const getReqParams = (req) => {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on('data', (chunk) => body += chunk);
    req.on('end', () => resolve(JSON.parse(body)));
    req.on('error', reject);
  });
};

const server = http.createServer();

server.on('request', async (req, res) => {
  //1
  if (req.url.match(/^\/user\/create$/)) {
    console.log("create user");
    const params = await getReqParams(req);
    if (!params.name || !params.email || !params.hobbies) {
      res.writeHead(403, { message: "Not full data" });
      res.end();
      return;
    }

    let lastUerId = users[users.length - 1].id;
    const UUI = ++lastUerId;
    users.push({
      id: UUI,
      name: params.name,
      email: params.email,
      hobbies: params.hobbies
    });

    res.write(JSON.stringify(users));
    res.end();
    return;
  }
  if (req.url.match(/^\/user\/(\d+)\/delete$/)) {
    console.log("delete user");
    const [, userId] = req.url.match(/^\/user\/(\d+)\/delete$/);

    const index = users.findIndex(user => user.id === Number(userId));
    if (index >= 0) {
      users.splice(index, 1)
      res.write(JSON.stringify(users));
      res.end();
      return;
    }

    res.writeHead(404, { message: "User does not exist!" });
    res.end();
    return;
  }

  //2  
  if (req.url.match(/^\/user\/(\d+)\/update$/)) {
    console.log("update user");
    const [, userId] = req.url.match(/^\/user\/(\d+)\/update$/);

    const user = users.find(user => user.id === Number(userId));
    if (user) {
      const params = await getReqParams(req);
      user.name = params.name ?? user.name;
      user.email = params.email ?? user.email;
      user.hobbies = params.hobbies ?? user.hobbies;
      res.writeHead(200, { message: req.url })
      res.write(JSON.stringify(user));
      res.end();
      return;
    }

    res.writeHead(404, { message: "User does not exist!" });
    res.end();
    return
  }

  //3
  if (req.url.match(/^\/user\/(\d+)$/)) {
    console.log("userbyid");
    const [, userId] = req.url.match(/^\/user\/(\d+)$/);
    const user = users.map(({ hobbies, ...rest }) => rest).find(user => user.id === Number(userId));

    if (user) {
      res.write(JSON.stringify(user));
      res.end();
      return;
    }

    res.writeHead(404, { message: "User does not exist!" });
    res.end();
    return;
  }
  if (req.url.match(/^\/users$/)) {
    console.log("all users");
    const usersWithoutHobbies = users.map(({ hobbies, ...rest }) => rest);
    res.write(JSON.stringify(usersWithoutHobbies));
    res.end();
    return;
  }

  //4
  if (req.url.match(/^\/user\/(\d+)\/hobbies\/add$/)) {
    console.log("add hobby");
    const [, userId] = req.url.match(/^\/user\/(\d+)\/hobbies\/add/);
    const params = await getReqParams(req);
    const user = users.find(user => user.id === Number(userId));

    if (!user) {
      res.writeHead(404, { message: "User does not exist!" });
      res.end();
      return;
    }

    const hobby = user?.hobbies.some(hobby => hobby === params.hobby);
    if (hobby) {
      res.writeHead(403, { message: "Hobby already exist" });
      res.end();
      return;
    }
    user?.hobbies.push(params.hobby)
    res.write(JSON.stringify(user));
    res.end();
    return;
  }
  if (req.url.match(/^\/user\/(\d+)\/hobbies\/delete$/)) {
    console.log("delete hobby");
    const [, userId] = req.url.match(/^\/user\/(\d+)\/hobbies\/delete/);

    const params = await getReqParams(req, res);

    const user = users.find(user => user.id === Number(userId));

    if (!user) {
      res.writeHead(404, { message: "User does not exist!" });
      res.end();
      return;
    }

    const hobby = user?.hobbies.some(hobby => hobby === params.hobby);

    if (hobby) {
      const info = user?.hobbies.filter(user => user !== params.hobby);
      user.hobbies = info;
      res.write(JSON.stringify(user));
      res.end();
      return;
    }
    res.writeHead(403, { message: "Hobby does not exist" });
    res.end();
    return;
  }

  //5
  if (req.url.match(/^\/user\/(.+)\/hobbies$/)) {
    console.log("all hobbies");
    const [, userId] = req.url.match(/^\/user\/(.+)\/hobbies$/);
    const user = users.find(user => user.id === Number(userId));;

    if (!user) {
      res.writeHead(404, { message: "User does not exist!" });
      res.end();
      return;
    }

    res.setHeader('Cache-Control', 'public');
    res.setHeader('Cache-Control', 'max-age=31536000');
    res.writeHead(200, { link_to: req.url });
    res.write(JSON.stringify(user.hobbies));
    res.end();
    return;
  }

  res.writeHead(404, {});
  res.write('There is no such endpoint');
  res.end();
})

server.listen({ port: 3000 }, () => {
  console.log("run on 3000");
});
