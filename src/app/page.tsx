import { supabase } from "@/lib/supabase";
import { faker } from "@faker-js/faker";
import Image from "next/image";
import { revalidatePath } from "next/cache";

import { cookies } from "next/headers";
import { Button } from "./Button";

async function getFakeUser() {
    const user = {
        avatar: faker.image.avatar(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        sex: faker.name.sexType(),
        email: faker.internet.email(),
    };
    return user;
}

export const revalidate = 0;

async function getStoredUsers() {
    const { data } = await supabase
        ?.from("users")
        .select("firstName, lastName, birthday, sex, avatar, id, email");
    return data;
}

function User({ user }: any) {
    return (
        <div className="flex flex-col items-center justify-center">
            {user.avatar ? (
                <Image src={user.avatar} alt="user avatar" width={200} height={200} />
            ) : null}
            <h1 className="text-4xl font-bold">
                {user.firstName} {user.lastName}
            </h1>
            <h2 className="text-2xl">{user.email}</h2>
            <h2 className="text-2xl">{user.sex}</h2>
        </div>
    );
}

export default async function Home() {
    const users = await getStoredUsers();
    const user = await getFakeUser();

    async function onAction() {
        "use server";
        await supabase?.from("users").insert(user);
        revalidatePath("/");
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-black text-white">
            <div className="grid grid-cols-2 gap-4 items-start">
                <div className="flex col-span-1  justify-center flex-col">
                    <User user={user} />

                    {/* <form action={onAction}>
                        <input type="text" name="message" placeholder="Post message text" />
                        <button>Save</button>
                    </form> */}

                    <Button onClick={onAction} />
                </div>
                <div className="col-span-1">
                    {users?.reverse()?.map((user: any) => (
                        <User user={user} key={user.id} />
                    ))}
                </div>
            </div>
        </main>
    );
}
