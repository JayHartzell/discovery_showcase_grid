import { css } from 'lit';
export const styles = css `
  :host {
    /* Title styling - can be customized by host page */
    --title-font-color: var(--pnx-card-title-color, inherit);
    --title-font-weight: var(--pnx-card-title-weight, 700);
    --title-font-size: var(--pnx-card-title-size, 13px);
    --title-font-family: var(--pnx-card-title-font, inherit);
    --title-line-height: var(--pnx-card-title-line-height, 1.3);

    /* Description styling - can be customized by host page */
    --description-font-color: var(--pnx-card-description-color, inherit);
    --description-font-weight: var(--pnx-card-description-weight, 400);
    --description-font-size: var(--pnx-card-description-size, 12px);
    --description-font-family: var(--pnx-card-description-font, inherit);
    --description-line-height: var(--pnx-card-description-line-height, 1.4);
    
    /* Image styling - can be customized by host page */
    --image-height: var(--pnx-card-image-height, 210px);
    --image-object-fit: var(--pnx-card-image-fit, contain);
    --image-border-radius: var(--pnx-card-image-border-radius, 0);
    
    /* Card styling - can be customized by host page */
    --card-background: var(--pnx-card-background, transparent);
    --card-border: var(--pnx-card-border, none);
    --card-border-radius: var(--pnx-card-border-radius, 4px);
    --card-padding: var(--pnx-card-padding, 0);
    --card-shadow: var(--pnx-card-shadow, none);
    --card-hover-shadow: var(--pnx-card-hover-shadow, 0 4px 12px rgba(0, 0, 0, 0.15));
    --card-hover-transform: var(--pnx-card-hover-transform, translateY(-2px));
    
    /* Focus and accessibility - can be customized by host page */
    --focus-color: var(--pnx-card-focus-color, #0066cc);
    --focus-outline-width: var(--pnx-card-focus-width, 3px);
    
    /* Placeholder styling - can be customized by host page */
    --placeholder-background: var(--pnx-card-placeholder-bg, #f5f5f5);
    --placeholder-color: var(--pnx-card-placeholder-color, #666);
    --placeholder-border: var(--pnx-card-placeholder-border, 2px dashed #ccc);
    --placeholder-font-size: var(--pnx-card-placeholder-font-size, 2rem);
    
    display: block;
    width: 100%;
    background: var(--card-background);
    border: var(--card-border);
    border-radius: var(--card-border-radius);
    padding: var(--card-padding);
    box-shadow: var(--card-shadow);
  }
  
  a {
    text-decoration: none;
    color: var(--title-font-color);
    display: flex;
    flex-direction: column;
    height: 100%;
    border-radius: var(--card-border-radius);
    overflow: hidden;
    transition: all 0.2s ease;
    position: relative;
  }
  
  /* Enhanced focus styles for better accessibility */
  a:focus {
    outline: var(--focus-outline-width) solid var(--focus-color);
    outline-offset: 2px;
    box-shadow: 0 0 0 1px var(--focus-color);
  }
  
  /* Hover styles for better user feedback */
  a:hover {
    transform: var(--card-hover-transform);
    box-shadow: var(--card-hover-shadow);
  }
  
  /* Title styling */
  .title {
    color: var(--title-font-color);
    font-weight: var(--title-font-weight);
    font-size: var(--title-font-size);
    font-family: var(--title-font-family);
    line-height: var(--title-line-height);
    margin: 8px 0 4px 0;
    padding: 0 8px;
  }
  
  /* Description styling */
  .description {
    color: var(--description-font-color);
    font-weight: var(--description-font-weight);
    font-size: var(--description-font-size);
    font-family: var(--description-font-family);
    line-height: var(--description-line-height);
    margin: 0;
    padding: 0 8px 8px 8px;
    flex-grow: 1;
  }
  
  /* Ensure images are accessible and responsive */
  img, .image-place-holder {
    height: var(--image-height);
    width: 100%;
    display: block;
    object-fit: var(--image-object-fit);
    border-radius: var(--image-border-radius);
  }

  .image-place-holder {
    background-color: var(--placeholder-background);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: var(--placeholder-color);
    font-size: var(--placeholder-font-size);
    border: var(--placeholder-border);
    box-sizing: border-box;
  }
  
  /* Improve placeholder accessibility with high contrast mode support */
  @media (prefers-contrast: high) {
    .image-place-holder {
      background-color: #ffffff;
      color: #000000;
      border-color: #000000;
    }
    
    a:focus {
      outline-color: #000000;
      box-shadow: 0 0 0 1px #000000;
    }
  }
  
  /* Respect user's motion preferences */
  @media (prefers-reduced-motion: reduce) {
    a {
      transition: none;
    }
    
    a:hover {
      transform: none;
    }
  }
  
  /* Screen reader only text for additional context */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;
//# sourceMappingURL=pnx-card-style.js.map