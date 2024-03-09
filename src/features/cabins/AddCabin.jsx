import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateCabinForm from './CreateCabinForm';

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens='cabin-form'>
          <Button>Add new Cabin</Button>
        </Modal.Open>
        <Modal.Window name='cabin-form'>
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

/*
function AddCabin() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <Button
        variation='primary'
        onClick={() => setOpenModal((openModal) => !openModal)}
      >
        {!openModal ? 'Add new Cabin' : 'Close the form'}
      </Button>
      {openModal && (
        <Modal onClose={() => setOpenModal(false)}>
          <CreateCabinForm onCloseModal={() => setOpenModal(false)} />
        </Modal>
      )}
    </div>
  );
}
*/

export default AddCabin;
