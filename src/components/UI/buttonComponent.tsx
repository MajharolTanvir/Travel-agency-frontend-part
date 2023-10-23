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
        className="my-3 w-full border-violet-950 bg-violet-950 hover:bg-violet-700 hover:border-violet-700 font-bold text-sm md:text-md xl:text-lg text-white"
      >
        {children}
      </Button>
    </div>
  );
};

export default ButtonComponent;
