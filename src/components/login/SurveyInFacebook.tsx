import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { DialogDescription } from '@radix-ui/react-dialog';
import { toast } from '@/hooks/useToast';
import MD from '../survey/Markdown';

const markdown = `
1. Copy URL
2. Go to your browser (Chrome / Safari)
3. Paste the URL and continue!

\`impulse-survey.vercel.app\`
`;

export default function SurveyInFacebook() {
  const userAgent = navigator.userAgent || navigator.vendor
  const isFacebook = /FBAN|FBAV/.test(userAgent);
  const isMessenger = /FB_IAB/.test(userAgent);
  const isInstagram = /Instagram/.test(userAgent);

  function copyURL() {
    navigator.clipboard.writeText('https://impulse-survey.vercel.app/');
    toast({
      title: "URL copied",
      description: "The URL has been copied to your clipboard",
    })
  }

  return <>
    <Dialog open={isFacebook || isInstagram}>
    <DialogContent className="sm:max-w-[425px]" showCloseButton={false}>
      <DialogHeader>
        <DialogTitle>Exit {isFacebook ? "Facebook" : "Instagram"} and go to Safari or Chrome</DialogTitle>
        <DialogDescription className="text-muted-foreground">Facebook does not allow us to login, when using their app. Please go to your internet browser and login there.
        </DialogDescription>
      </DialogHeader>
      <MD>
      {markdown}
      </MD>
      {isMessenger ? 1 : 0}
      <DialogFooter className="flex gap-4 justify-between w-full">
      <Button onClick={copyURL}>Copy URL</Button>
    </DialogFooter>      
    </DialogContent>
  </Dialog>

  </>
}