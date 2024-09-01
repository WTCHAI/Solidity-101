import { Link } from "react-router-dom"

export default function Home() {
    const routes = [
        {
            path : '/'
        },
        {
            path : '/ether-wallet'
        },
        {
            path : '/connect-wallet'
        }

    ]

    return (
        <main className="container">
            <div className="flex flex-col">
                <ul>
                    {routes.map((e) => {
                        return (
                            <li
                                className="flex flex-row gap-2 p-5 hover:bg-zinc-800/50 rounded-lg"
                            >
                                <p>
                                    <span className="text-sm font-bold text-zinc-50">
                                    </span>
                                </p>
                                <div className="flex flex-col gap-2 flex-1">
                                    <Link
                                        to={e.path}
                                        className="text-md font-semibold text-blue-600"
                                    >
                                        {e.path}
                                    </Link>
                                </div>
                                <svg
                                    className="size-6 text-gray-600 -rotate-90"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M10 13.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L10 13.586z"
                                    />
                                </svg>
                            </li>                           
                        )
                        })
                    }
                </ul>
            </div>
        </main>
    )
}