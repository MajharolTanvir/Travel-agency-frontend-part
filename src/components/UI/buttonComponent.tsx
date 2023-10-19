import { Button } from "@mui/material";
import React, { ReactNode } from "react";

type buttonProps = {
  children: ReactNode;
  onclick?: any;
  onChange?: any;
  startIcon?: any;
  endIcon?: any;
};

const ButtonComponent = ({
  children,
  onclick,
  endIcon,
  startIcon,
  onChange,
}: buttonProps) => {
  return (
    <div className="my-2">
      <Button
        type="submit"
        onClick={onclick}
        onChange={onChange}
        variant="outlined"
        startIcon={startIcon}
        endIcon={endIcon}
        className="my-3 w-full border-[#485563] text-[#485563] hover:bg-[#29323c] hover:text-white"
      >
        {children}
      </Button>
    </div>
  );
};

export default ButtonComponent;
