import React, { Fragment } from "react";
import  ReactDOM  from "react-dom";
import classes from './Modal.module.css';

const ModalOverlays = props =>{
    return <div className={classes.modal}>
        <div className={classes.content}>
            {props.children}
        </div>
    </div>

};
const Backdrop = (props) =>{
return <div className={classes.backdrop} onClick={props.onHide} />
};


const portal = document.getElementById('overlays');

const Modal = props =>{
    return(
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onHide = {props.onHide}/>,portal)}
            {ReactDOM.createPortal(<ModalOverlays >{props.children}</ModalOverlays>,portal)}
        </Fragment>
    )
}

export default Modal;