import {
    Button,
    Container,
    Fab,
    makeStyles,
    Modal,
    Tooltip,
} from "@material-ui/core";
import MessageIcon from '@material-ui/icons/Message';
import React, { useState } from "react";
import Mensajes from '../Messenger/Mensajes/Mensajes';

const useStyles = makeStyles((theme) => ({
    fab: {
        position: "fixed",
        bottom: "22px",
        right: "7%",
    },
    container: {
        width: 500,
        height: 760,
        backgroundColor: "white",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: "auto",
        [theme.breakpoints.down("sm")]: {
            width: "100vw",
            height: "100vh",
        },
    },
    item: {
        marginBottom: theme.spacing(3),
    },
}));

const Intento = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    return (
        <>
            <Tooltip title="messenger" aria-label="chat" onClick={() => setOpen(true)}>
                <Fab color="secondary" className={classes.fab}>
                    <MessageIcon />
                </Fab>
            </Tooltip>
            <Modal open={open}>
                <Container className={classes.container}>
                <div className='conversation'>
            <img className='conversationImg' 
            src="https://firebasestorage.googleapis.com/v0/b/react-eccomerce-979a7.appspot.com/o/Categorias%2FDragonBall.jpg?alt=media&token=8b489b89-0177-4a73-bd52-8b1afb4ba6b3"
            alt=""
            />
            <span className='conversationName'>Nahuel Cernadas</span>
        </div>
                    <div className='chatBox'>
                        <div className='chatBoxWrapper'>
                            <div className='chatBoxTop'>
                                <Mensajes />
                                <Mensajes />
                                <Mensajes />
                                <Mensajes />
                            </div>
                            <div className='chatBoxBottom'>
                                <textarea className='chatMessageInput' placeholder='Write something...'></textarea>
                                <button className='chatSubmitButton'>
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={classes.item}>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => setOpen(false)}
                        >
                            Salir
                        </Button>
                    </div>
                </Container>
            </Modal>
        </>
    )
}

export default Intento;