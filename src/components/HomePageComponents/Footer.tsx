import React from 'react'

const Footer = () => {
     const year = new Date().getFullYear();
  return (
    <div className="text-center py-2 border-t-2">
      @{year} | All right reserved by Feri
    </div>
  );
}

export default Footer