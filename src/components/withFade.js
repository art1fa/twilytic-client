import React from 'react';
import { CSSTransition } from 'react-transition-group';


const withFade = (props) => (Component) => {
  const WithFade = (props) => (
    <CSSTransition
      in={props.show}
      mountOnEnter
      unmountOnExit
      classNames="fade"
      addEndListener={(node, done) => {
        // use the css transitionend event to mark the finish of a transition
        node.addEventListener('transitionend', done, false);
      }}
    >
      <Component {...props} />
    </CSSTransition>
  );
  return WithFade;
};

export default withFade;

// export default function Fade({ children, ...props }) {
//   return (
//     <CSSTransition
//       {...props}
//       mountOnEnter
//       unmountOnExit
//       classNames="fade"
//       addEndListener={(node, done) => {
//         // use the css transitionend event to mark the finish of a transition
//         node.addEventListener('transitionend', done, false);
//       }}
//     >
//       {children}
//     </CSSTransition>
//   );
// }
