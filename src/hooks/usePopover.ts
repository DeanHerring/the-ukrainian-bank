import { useState } from 'react';

type AnchorElType = HTMLDivElement | null;
type AnchorElClickType = React.MouseEvent<HTMLDivElement>;
type PopoverHookReturnType = {
  handleClick: (event: AnchorElClickType) => void;
  handleClose: () => void;
  open: boolean;
  id?: string;
  anchorEl: AnchorElType;
  setAnchorEl: (value: AnchorElType) => void;
};

export const usePopover = (): PopoverHookReturnType => {
  const [anchorEl, setAnchorEl] = useState<AnchorElType>(null);

  const handleClick = (event: AnchorElClickType): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const open: boolean = Boolean(anchorEl);
  const id: string | undefined = open ? 'simple-popover' : undefined;

  return { handleClick, handleClose, open, id, anchorEl, setAnchorEl };
};
