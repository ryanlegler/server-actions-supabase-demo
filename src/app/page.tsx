import { supabase } from "@/lib/supabase";
import { faker } from "@faker-js/faker";
import Image from "next/image";
import { revalidatePath } from "next/cache";

import { cookies } from "next/headers";
import { Button } from "./Button";

async function getFakeUser() {
    const user = {
        avatar: faker.image.avatar(),
        birthday: faker.date.birthdate().toISOString(),
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        sex: faker.name.sexType(),
    };
    return user;
}

export const revalidate = 0;

async function getStoredUsers() {
    const { data } = await supabase
        ?.from("users")
        .select("firstName, lastName, birthday, sex, avatar, id, email")
        .limit(50)
        .order("id", { ascending: false });
    return data;
}

function User({ user }: any) {
    const { avatar, firstName, email, lastName, sex, birthday } = user;

    console.log("birthday", birthday);
    return (
        <div className="col-span-1  border-white rounded-md p-4 border-2">
            <div className="flex flex-col items-center justify-center gap-2 ">
                {avatar ? (
                    <Image
                        className="rounded-full"
                        src={avatar}
                        alt="user avatar"
                        width={100}
                        height={100}
                    />
                ) : null}
                <div className="flex flex-col items-center justify-center w-full gap-1 ">
                    <span className="sm:text-xl text-m font-bold text-center">
                        {firstName} {lastName}
                    </span>
                    <span className="sm:text-l text-xs text-ellipsis max-w-full overflow-hidden">
                        {email}
                    </span>

                    {birthday ? (
                        <span className="sm:text-l text-xs text-ellipsis max-w-full overflow-hidden">
                            {new Date(birthday)?.toLocaleDateString()}
                        </span>
                    ) : null}
                </div>
                <span className="sm:text-l text-xs text-ellipsis max-w-full overflow-hidden bg-slate-600  px-2 py-1 rounded-md">
                    {sex}
                </span>
            </div>
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
        <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-6 bg-black text-white">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 items-start">
                <div className="flex sm:col-span-1 col-span-1 justify-center flex-col gap-4">
                    <User user={user} />

                    {/* <form action={onAction}>
                        <input type="text" name="message" placeholder="Post message text" />
                        <button>Save</button>
                    </form> */}

                    <Button onClick={onAction} />
                </div>
                <div className="sm:col-span-4 col-span-1 grid sm:grid-cols-4 grid-cols-1 gap-4 ">
                    {users?.map((user: any) => (
                        <User user={user} key={user.id} />
                    ))}
                </div>
            </div>
        </main>
    );
}
