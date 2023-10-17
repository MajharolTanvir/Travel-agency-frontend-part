import { Button } from "@mui/material";
import React, { ReactNode } from "react";

type buttonProps = {
  children: ReactNode;
  onclick?: any;
  startIcon?: any;
  endIcon?: any;
};

const ButtonComponent = ({
  children,
  onclick,
  endIcon,
  startIcon,
}: buttonProps) => {
  return (
    <div>
      <Button
        type="submit"
        onClick={onclick}
        variant="outlined"
        startIcon={startIcon}
        endIcon={endIcon}
        className="my-3 w-full border-white hover:border-white text-white hover:bg-white hover:text-black"
      >
        {children}
      </Button>
    </div>
  );
};

export default ButtonComponent;
