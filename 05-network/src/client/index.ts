import { userService } from './services/userService';
(async () => {
  try {
    //1
    const data = await userService.createUser({
      name: 'Oleh',
      email: 'Oleh@google.com',
      hobbies: ['chess', 'pool'],
    });
    // const data = await userService.createUser({
    //    name: "",
    //    email: '',
    //    hobbies: [],
    // });
    // const data = await userService.deleteUser(2);
    // const data = await userService.deleteUser(3);

    //2
    // const data = await userService.updateUser({
    //    id:2,
    //    name: "ivan",
    //    email: 'ivan@google.com',
    //    hobbies: ['ivan', 'ivan1', 'ivan2'],
    // });
    // const data = await userService.updateUser({
    //    id:2,
    // });

    //3
    // const data = await userService.getUserById(2);
    // const data = await userService.getUserById(4);

    // const data = await userService.getUsers();

    //4
    //  await userService.addUserHobby({
    //    id:1,
    //    hobby: "basketball"
    //  });
    // await userService.deleteUserHobby({
    //    id: 1,
    //    hobby: "dancing"
    // });

    // const data = await userService.getUserHobbies(1);

    console.log('🚀 ~ file: index.ts:5 ~ data:', data);
  } catch (e: any) {
    console.log('statusCode', e?.response.status);
    console.log('statusText', e?.response.statusText);
    console.log('message', e?.response.headers.message);
  }
})();
