export default function Navbar({onclick}) {
    return (
        <div>
        <div className="flex h-screen flex-col justify-between border-e bg-white float-left ml-10 ">
            <div className=" pt-32 mr-16">
            <ul className="mt-6 space-y-4">
                <li className="w-40">
                <a
                    href="#"
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-200"
                >
                    Account
                </a>
                </li>
                <li className="w-40">
                <a
                    href="#"
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-200 "
                >
                    Booked
                </a>
                </li>
                <li className="w-40">
                <a
                    href="/home/admin/adminpage/hotelrooms"
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-200 "
                >
                    Hotel Rooms
                </a>
                </li>
                <li className="w-40">
                <a
                    href="/home/admin/adminpage/management"
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-200 "
                >
                    Management
                </a>
                </li>

                <li>
                <a
                    href="#"
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-200 " onClick={onclick}
                >
                    Logout
                </a>
                </li>
            </ul>
            <br />
            <br />

            <p className="bg-red-200 p-4 rounded-3xl">
                <span className="text-yellow-950">Note:</span> Please Logout before
                leave
            </p>
            </div>
        </div>
        </div>
    );
}
