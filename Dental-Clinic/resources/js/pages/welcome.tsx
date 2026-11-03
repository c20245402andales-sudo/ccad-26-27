
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC]"
                                >
                                    Log in
                                </Link>

                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow">
                    <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-4xl lg:flex-row">
                        <div className="flex-1 rounded-br-lg rounded-bl-lg bg-white p-6 pb-12 text-[13px] leading-[20px] shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-tl-lg lg:rounded-br-none lg:p-20 dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                            <h1 className="mb-1 font-medium">
                                Let's get started
                            </h1>

                            <p className="mb-2 text-[#706f6c] dark:text-[#A1A09A]">
                                Laravel has an incredibly rich ecosystem.
                                <br />
                                We suggest you start with the following.
                            </p>

                            <ul className="mb-4 flex flex-col lg:mb-6">
                                <li className="relative flex items-center gap-4 py-2">
                                    <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#e3e3e0]">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#dbdbd7]" />
                                    </span>

                                    <span>
                                        Read the
                                        <a
                                            href="https://laravel.com/docs"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="ml-1 font-medium text-[#f53003] underline underline-offset-4 dark:text-[#FF4433]"
                                        >
                                            Documentation ↗
                                        </a>
                                    </span>
                                </li>

                                <li className="relative flex items-center gap-4 py-2">
                                    <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#e3e3e0]">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#dbdbd7]" />
                                    </span>

                                    <span>
                                        Watch video tutorials at
                                        <a
                                            href="https://laracasts.com"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="ml-1 font-medium text-[#f53003] underline underline-offset-4 dark:text-[#FF4433]"
                                        >
                                            Laracasts ↗
                                        </a>
                                    </span>
                                </li>
                            </ul>

                            <ul className="flex gap-3 text-sm leading-normal">
                                <li>
                                    <a
                                        href="https://cloud.laravel.com"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-block rounded-sm border border-black bg-[#1b1b18] px-5 py-1.5 text-sm leading-normal text-white hover:bg-black dark:border-[#eeeeec] dark:bg-[#eeeeec] dark:text-[#1C1C1A]"
                                    >
                                        Deploy now
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="relative -mb-px flex aspect-[335/376] w-full shrink-0 items-center justify-center overflow-hidden rounded-t-lg bg-[#fff2f2] lg:mb-0 lg:-ml-px lg:aspect-auto lg:w-[438px] lg:rounded-t-none lg:rounded-r-lg dark:bg-[#1D0002]">
                            <svg
                                viewBox="0 0 438 400"
                                className="h-full w-full"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <text
                                    x="15"
                                    y="110"
                                    fontSize="100"
                                    fontWeight="bold"
                                    fill="#F53003"
                                >
                                    Laravel
                                </text>

                                <g stroke="#1B1B18" strokeWidth="1">
                                    <path
                                        d="M20 200 L100 200 L180 340 L100 340 Z"
                                        fill="#F8B803"
                                    />
                                    <path
                                        d="M100 200 L180 200 L260 340 L180 340 Z"
                                        fill="#F0ACB8"
                                    />
                                    <path
                                        d="M180 200 L260 200 L340 340 L260 340 Z"
                                        fill="#F8B803"
                                    />
                                    <path
                                        d="M260 200 L340 200 L420 340 L340 340 Z"
                                        fill="#F0ACB8"
                                    />
                                    <path
                                        d="M100 340 L180 340 L220 400 L140 400 Z"
                                        fill="#000000"
                                    />
                                    <path
                                        d="M180 340 L260 340 L300 400 L220 400 Z"
                                        fill="#F8B803"
                                    />
                                    <path
                                        d="M260 340 L340 340 L380 400 L300 400 Z"
                                        fill="#000000"
                                    />
                                </g>
                            </svg>
                        </div>
                    </main>
                </div>

                <div className="hidden h-14.5 lg:block" />
            </div>
        </>
    );
}
