import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import useAuth from '@/hooks/useAuth';
import { Button } from '../ui/button';
import db from '@/lib/firebase';

export default function LoginModal() {
    const user = useAuth();
  return (
    <Dialog open={user === null}>
    <DialogContent className="sm:max-w-[425px]" showCloseButton={false}>
      <DialogHeader>
        <DialogTitle>Login to continue</DialogTitle>
      </DialogHeader>
        <p>
            You need to login to fill out this formular. This is to prevent spam. Your identity will be kept anonymous.
        </p>
      <DialogFooter className="flex gap-4 justify-between w-full">
        <Button onClick={db.signinWithGoogle}>Login with Google </Button>
        {/* <Button onClick={db.signinWithFacebook}>Login with Facebook</Button> */}
    </DialogFooter>      
    </DialogContent>
  </Dialog>
  )
}