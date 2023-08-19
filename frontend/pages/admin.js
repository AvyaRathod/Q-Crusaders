import Link from "next/link";

export default function admin() {
  return (
    <div className="h-auto flex flex-col justify-center align-center mx-auto w-full max-w-sm p-4 bg-white md:mt-14 text-blackrounded-lg shadow sm:p-6 md:p-8 rounded-[11px]  ">
      <form className="space-y-6 my-auto" action="#">
        <h5 className="text-xl text-center font-medium text-gray-900">
          Sign in to our platform
        </h5>
        <div>
          <label
            for="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-500 dark:placeholder-gray-400 text-black"
            placeholder="name@company.com"
            required
          />
        </div>
        <div>
          <label
            for="password"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <Link href="/adminPortal"> Login to your account</Link>
        </button>
      </form>
    </div>
  );
}
