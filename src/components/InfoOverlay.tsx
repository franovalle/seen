import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import seenLogo from '@/assets/seen-logo.png';

interface Props {
  open: boolean;
  onClose: () => void;
  onRecalibrate: () => void;
}

const InfoOverlay: React.FC<Props> = ({ open, onClose, onRecalibrate }) => {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="bg-background border-border max-w-sm rounded-2xl">
        <DialogHeader>
          <div className="flex justify-center mb-2">
            <img src={seenLogo} alt="SEEn logo" className="w-28" />
          </div>
          <DialogTitle className="text-foreground text-center text-lg font-extrabold">
            About SEEn
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-center text-sm leading-relaxed mt-2">
            <span className="font-bold">Low-cost eyecare access for her.</span>
            <br /><br />
            SEEn turns any smartphone into a free pair of personalized glasses for girls and women
            in communities where glasses are hard to find or too expensive.
            <br /><br />
            This is a tool to help you see more clearly — not a medical device or diagnosis.
            Please see an eye doctor for a full check-up.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-3 mt-2">
          <Button
            onClick={() => {
              onRecalibrate();
              onClose();
            }}
            variant="outline"
            className="w-full h-11 font-bold rounded-xl text-sm"
          >
            Recalibrate Vision
          </Button>
          <Button
            onClick={onClose}
            className="w-full h-11 font-bold rounded-xl text-sm"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InfoOverlay;
