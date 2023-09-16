import { createGlobalStyle } from "styled-components/macro"
// import spaceGrotesk from "./fonts/SpaceGrotesk.ttf"

export enum CssVariables {
  /* Here starts cns colors */

  /** #1B1B1B */
  Main = "var(--main)",

  /** rgba(175, 177, 198, 0.62) */
  InactiveButtonText = "var(--inactiveButtonText)",

  /** #667085 */
  Gray500 = "var(--gray500)",

  /** #FF4D4F */
  Danger = "var(--danger)",

  /** #FFB703 */
  Primary = "var(--primary)",

  /** #3BF1A5 */
  Secondary = "var(--secondary)",

  /** #1890FF */
  Info = "var(--info)",

  /** #3BF1A5 */
  Success = "var(--success)",

  /** #FF7875 */
  Warning = "var(--warning)",

  /** #FF4D4F */
  Error = "var(--error)",

  /** #000 */
  Black1 = "var(--black1)",

  /** #1D1D1D */
  Black2 = "var(--black2)",

  /** #282828 */
  Black3 = "var(--black3)",

  /** #282828 */
  Highlighter = "var(--highlighter)",

  /** #fff */
  White = "var(--white)",

  /** #333333 */
  Gray1 = "var(--gray1)",

  /** #4F4F4F */
  Gray2 = "var(--gray2)",

  /** #828282 */
  Gray3 = "var(--gray3)",

  /** #BDBDBD */
  Gray4 = "var(--gray4)",

  /** #E0E0E0 */
  Gray5 = "var(--gray5)",

  /** #17B573 */
  DarkGreen = "var(--dark-green)",

  /** #AAE6CD  */
  LightGreen = "var(--light-green)",

  /** rgba(255, 183, 3, 0.24) */
  LightYellow = "var(--light-yellow)",

  /** #9E750F */
  DarkYellow = "var(--dark-yellow)",

  //   Spacing margins

  Space8 = "8px",
  Space16 = "16px",
  Space24 = "24px",
  Space32 = "32px",
  Space40 = "40px",
  Space56 = "56px",
  Space72 = "72px",
  Space80 = "80px",
  Space96 = "96px",
  Space120 = "120px",
}

export const GlobalStyle = createGlobalStyle`
  /* @font-face {
  	font-family: "Space Grotesk";
  } */

  * {
    margin: 0;
    padding: 0;
    font-family: "Space Grotesk" !important;
  }


  html,
  body {
    height: 100%;
    width: 100%;
    background-color: var(--black1);
    color: var(--lightGrey);
    font-family: "Space Grotesk", sans-serif;
  }

  a {
      text-decoration: none;
  }

  :root {
    --main: #1B1B1B;
    --grey3: #667085;
    --yellow: #FFB703;
    --green: #3BF1A5;
    --black:#010004;
    --lightGrey: #D9D9D9;
    --text: #D9D9D9;
    --inactiveButtonText: rgba(175, 177, 198, 0.62);
    --auth-bg: #0D0935;
    --auth-dark-blue: #060E23;
    --gray500: #667085;
    --danger: #FF4D4F;
    /* styles components color */
    --primary: #FFB703;
    --secondary: #3BF1A5;
    --info: #1890FF;
    --success: #3BF1A5;
    --warning: #FF7875;
    --error: #FF4D4F;
    --black1: #000000;
    --black2: #1D1D1D;
    --black3: #282828;
    --highlighter: #282828;
    --white: #fff;
    --gray1: #333333;
    --gray2: #4F4F4F;
    --gray3: #828282;
    --gray4: #BDBDBD;
    --gray5: #E0E0E0;
    --dark-green: #17B573;
    --light-green: #AAE6CD;
    --light-yellow: rgba(255, 183, 3, 0.24);
    --dark-yellow: #9E750F;
  }

  a {
      text-decoration: none;
  }

  ul {
      list-style: none;
  }

  ::-webkit-scrollbar {
      width: 1px;
      height: 1px;
      background-color: var(--black);
  }


  /*vertical Track */

  ::-webkit-scrollbar-track:vertical {
      /* box-shadow: inset 0 0 3px grey; */
      border-radius: 10px;
  }


  /*vertical Handle */

  ::-webkit-scrollbar-thumb:vertical {
      background: var(--black);
      border-radius: 10px;
  }


  /*horizontal Track */

  ::-webkit-scrollbar-track:horizontal {
      /* box-shadow: inset 0 0 3px grey; */
      border-radius: 10px;
  } 


  /*horizontal Handle */

  ::-webkit-scrollbar-thumb:horizontal {
      background: var(--black);
      border-radius: 10px;
  }


  /* Handle on hover */

  ::-webkit-scrollbar-thumb:hover {
      background: var(--black);
  }

  ::selection {
      background: var(--primary);
      color: var(--white);
  }

  ::-moz-selection {
      background: var(--primary);
      color: var(--white);
  }

  * {
      scrollbar-width: thin;
  }

`
