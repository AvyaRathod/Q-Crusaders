import { FcGoogle } from "react-icons/fc";
import { FaMeta } from "react-icons/fa6";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

export default function Login() {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  //Sign in with google
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result.user);
      route.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const fbProvider = new FacebookAuthProvider();
  const FacebookProvider = async () => {
    try {
      const result = await signInWithPopup(auth, fbProvider);
      const credantial = await FacebookAuthProvider.credentialFromResult(
        result
      );
      const token = credantial.accessToken;
      let photoUrl = result.user.photoURL + "?height=500&access_token=" + token;
      await updateProfile(auth.currentUser, { photoURL: photoUrl });
      route.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user) {
      route.push("/dashboard");
    } else {
      console.log("login");
    }
  }, [user]);

  return (
    <div className="shadow-xl mt-32 p-10 text-white rounded-lg">
      <h2 className="text-3xl font-medium mx-auto text-center">
        Mental Health is Important!
      </h2>
      <div className="py-4">
        <h3 className="py-4 text-center">
          Sign in to check your mental health
        </h3>
        <div className="flex flex-col gap-4">
          <button
            onClick={GoogleLogin}
            className="text-white bg-gray-700 p-4 w-auto mx-auto font-medium rounded-lg flex justify-center align-middle gap-2 "
          >
            <FcGoogle className="text-2xl w-[50px]" />
            Sign in with Google
          </button>
          <button
            className="text-white bg-gray-700 p-4 w-auto mx-auto font-medium rounded-lg flex align-middle gap-2 "
            onClick={FacebookProvider}
          >
            <FaMeta className="text-2xl w-[50px]" />
            Sign in with Meta
          </button>
        </div>
      </div>
    </div>
  );
}
