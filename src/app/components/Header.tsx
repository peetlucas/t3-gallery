"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header>
      <nav className="flex w-full items-center justify-between border-b text-lg font-semibold">
        <div> Gallery </div>
        <div>
          {session ? (
            <>
              <span>Signed in as {session.user?.email}</span>
              <button onClick={() => signOut()}>Sign out</button>
            </>
          ) : (
            <button onClick={() => signIn()}>Sign in</button>
          )}
        </div>
      </nav>
    </header>
  );
}
