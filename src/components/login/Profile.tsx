import useAuth from "@/hooks/useAuth";
import db from "@/lib/firebase";
import ConfirmDialog from '../ui/confirmdialog';
import { toast } from "@/hooks/useToast";

export default function Profile() {
  const user = useAuth();
  if (user === null) return null;

  function removeData() {
    toast({
      title: "Deleting data",
      description: "All your data is being deleted",
    });

    db.remove().then(() => {
      db.removeUser().then(()=> {
        toast({
          title: "Data successfully deleted",
          description: "Have a great day!",
        });
      }).catch((error) => {
        toast({
          title: "Error deleting user",
          description: error.message,
        })
      });
    }).catch((error) => {
      toast({
        title: "Error deleting data",
        description: error.message,
      });
    });
  }

  return (
    <div className="flex items-center space-x-2">
      <p className="font-bold text-sm">{user?.email} <button className="ml-1 text-primary underline font-light text-sm" onClick={db.signout}>Switch account</button>
      <ConfirmDialog asChild variant="destructive" title="Are you sure you want to delete all your data?" message="If you continue to do so, all your survey answers will be deleted!" onConfirm={removeData}>
        <button className="text-destructive underline font-light text-sm ml-3">Delete all data</button>
      </ConfirmDialog>
      </p>
    </div>
  );
}
