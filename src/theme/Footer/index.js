import React from 'react';
import Footer from '@theme-original/Footer';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { MendableFloatingButton } from '@mendable/search';

export default function FooterWrapper(props) {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  // Custom chat icon using SVG
  const icon = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );

  // Custom styling for the floating button
  const floatingButtonStyle = {
    color: '#fff',
    backgroundColor: '#000', // Matching Ten's primary color
  };

  return (
    <>
      // this doesnt work so ive disabled it
      {/* <MendableFloatingButton 
        anon_key={customFields.mendableAnonKey}
        icon={icon}
        floatingButtonStyle={floatingButtonStyle}
      /> */}
      <Footer {...props} />
    </>
  );
}
