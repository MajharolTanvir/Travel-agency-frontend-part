import React from 'react'
import { Grid } from 'react-loader-spinner';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Grid
        height="80"
        width="80"
        color="#6224C6"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export default Spinner