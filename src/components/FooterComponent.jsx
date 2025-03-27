import React from "react";

const FooterComponent = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1 }}></div>
      <footer className="footer bg-dark text-white text-center" style={{ width: "100%", bottom: 0 }}>
        <span>All Rights Reserved 2025 @Shubham Shivade.</span>
      </footer>
    </div>
  );
};

export default FooterComponent;
