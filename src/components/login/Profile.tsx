import useAuth from "@/hooks/useAuth";
import { signout } from "@/lib/firebase";

export default function Profile() {
  const user = useAuth();
  if (user === null) return null;

  return (
    <div className="flex items-center space-x-2">
      <p className="font-bold text-sm">{user?.email} <button className="text-primary underline font-light text-sm" onClick={signout}>Switch account</button></p>
    </div>
  );
}
