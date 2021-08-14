import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Logo from '../assets/images/design/logo128.png';

function MyVerticallyCenteredModal(props) {

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.modalShow.show}
      size={!props.modalShow.size?"lg":props.modalShow.size}
      onHide={()=>props.setModalShow({show:false,message:"",size:props.modalShow.size?props.modalShow.size:"lg"})}
    >
      {props.modalShow.header && props.modalShow.header.label?<Modal.Header closeButton>
                                <Modal.Title className="h6">
                                  {props.modalShow.header.label}
                                </Modal.Title>
                              </Modal.Header>:<></>}
      <Modal.Body>
        <div className="text-center mb-3" style={{marginTop:"-80px"}}>
          <img src={Logo} className="rounded-circle border bg-white"/>
        </div>
        {!props.modalShow.message?"":props.modalShow.message}
      </Modal.Body>
      {props.modalShow.footer?<Modal.Footer>
        {props.modalShow.footer_btn?<Button onClick={()=>props.modalShow.footer_btn()}>Guardar</Button>:<></>}
        <Button onClick={()=>props.setModalShow({show:false,message:""})}>Close</Button>
      </Modal.Footer>:<></>}

    </Modal>
  );
}

export default MyVerticallyCenteredModal
