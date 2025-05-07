import { MdClose } from 'react-icons/md';
import './DeleteAddress.scss';

interface PropsType {
    toggleDeleteBox: boolean;
    setToggleDeleteBox: () => void;
    deleteAddress: () => void
}

const DeleteAddress: React.FC<PropsType> = ({toggleDeleteBox, setToggleDeleteBox, deleteAddress}) => {
  
  return (
    <div className={`delete-address ${toggleDeleteBox ? "show" : ""}`}>
        <div className="body">
            <div>Delete Address</div>
            <p>Are you sure you want to delete this address?</p>
            <button onClick={() => deleteAddress()}>Delete</button>
            <MdClose onClick={() => setToggleDeleteBox()}/>
        </div>
    </div>
  )
}

export default DeleteAddress