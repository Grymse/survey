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
        <a href="https://impulse-survey.vercel.app/" target="_blank" rel="noopener noreferrer">Open in Browser</a>
      <DialogFooter>
        <Button onClick={db.signinWithGoogle}>Login with Google</Button>
    </DialogFooter>      
    </DialogContent>
  </Dialog>
  )
}