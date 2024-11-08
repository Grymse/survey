import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { DialogDescription } from '@radix-ui/react-dialog';
import { toast } from '@/hooks/useToast';
import MD from '../survey/Markdown';

const markdown = `
1. Copy URL
2. Go to your browser (Chrome / Safari)
3. Paste the URL and continue!

\`https://impulse-survey.vercel.app/\`
`;

export default function SurveyInFacebook() {
  const userAgent = navigator.userAgent || navigator.vendor
  const isFacebook = /FBAN|FBAV|Instagram/.test(userAgent);

  function copyURL() {
    navigator.clipboard.writeText('https://impulse-survey.vercel.app/');
    toast({
      title: "URL copied",
      description: "The URL has been copied to your clipboard",
    })
  }

  return (
    <Dialog open={isFacebook}>
    <DialogContent className="sm:max-w-[425px]" showCloseButton={false}>
      <DialogHeader>
        <DialogTitle>Go to your internet browser (Safari/Chrome)</DialogTitle>
        <DialogDescription className="text-muted-foreground">Facebook does not allow us to login, when using their app. Please go to your internet browser and login there.
        </DialogDescription>
      </DialogHeader>
      <MD>
      {markdown}
      </MD>
      <DialogFooter className="flex gap-4 justify-between w-full">
      <Button onClick={copyURL}>Copy URL</Button>
    </DialogFooter>      
    </DialogContent>
  </Dialog>
  )
}