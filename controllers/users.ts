import { v4 } from 'https://deno.land/std/uuid/mod.ts'
import { User } from '../types.ts'

interface ctx {
    [key:string]: any;
}

let users: User[] = [
    {
        id: '1',
        first_name: 'user1',
        last_name: 'test1',
        email: '1@gemail.com',
        password: 'pwd'
    },
    {
        id: '2',
        first_name: 'user2',
        last_name: 'test2',
        email: '2@gemail.com',
        password: 'pwd'
    },
    {
        id: '3',
        first_name: 'user3',
        last_name: 'test3',
        email: '3@gemail.com',
        password: 'pwd'
    },
  ];

const getUsers = ({ response }: ctx) => {
    response.body = {
        success: true,
        data: users
    }
}


const getUser = ({ params, response }: ctx) => {
    const user: User | undefined = users.find(p => p.id === params.id)
    if (user) {
        response.status = 200
        response.body = {
            success: true,
            data: user
        }
    } else {
        response.status = 404
        response.body = {
            success: false,
            msg: 'No user found'
        }
    }
}

// const addUser = () => {
// }

// const updateUser = () => {
// }

// const deleteUser = () => {
// }

export { getUsers, getUser }
// export { getUsers, getUser, addUser, updateUser, deleteUser }