import { useEffect, useState } from 'react';
import './MyAddresses.scss';
import { CiSquarePlus } from 'react-icons/ci';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdOutlineEdit } from 'react-icons/md';
import DeleteAddress from './MyAddresses/DeleteAddress';

interface Addresses {
    addressTitle: string,
    fullAddress: string,
    aptNo: string,
    city: string,
    district: string,
    zip: string,
    id: number
}

const MyAddresses = () => {
    const [isNewAddress, setIsNewAddress] = useState(false);
    const [addresses, setAddresses] = useState<Addresses[]>([]);
    const [addressTitle, setAddressTitle] = useState("");
    const [fullAddress, setFullAddress] = useState("");
    const [aptNo, setAptNo] = useState("");
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [zip, setZip] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [warning, setWarning] = useState<string | null>(null) 
    const [toggleDeleteBox, setToggleDeleteBox] = useState(false);
    const [deleteId, setDeleteId] = useState<number>()

    useEffect(() => {
        const storedAddresses = localStorage.getItem("myAddresses");
        if (storedAddresses) {
            setAddresses(JSON.parse(storedAddresses))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("myAddresses", JSON.stringify(addresses))
    }, [addresses])

    const handleAddresses = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const updatedAddress = {
            addressTitle,
            fullAddress,
            aptNo,
            city,
            district,
            zip,
            id: editId ?? Date.now()
        }

        if (isEditing && editId !== null) {
            setAddresses(prev =>
                prev.map(add => (add.id === editId ? updatedAddress : add))

            )
        } else {
            setAddresses([...addresses, updatedAddress]);
        }

        setIsNewAddress(false);
        setIsEditing(false);
        setAddressTitle("");
        setFullAddress("");
        setAptNo("");
        setCity("");
        setDistrict("");
        setZip("");
    }

    const deleteAddress = (deleteId: number) => {
        setAddresses(prev => prev.filter((address) => address.id !== deleteId))
        setToggleDeleteBox(false)
    }

    const sendAddressId = (id: number) => {
        setDeleteId(id)
        setToggleDeleteBox(true);
    }
    
    const editAddress = (id: number) => {
        const chosenAddress = addresses.find(item => item.id === id)

        if (chosenAddress) {
            setAddressTitle(chosenAddress.addressTitle);
            setFullAddress(chosenAddress.fullAddress);
            setAptNo(chosenAddress.aptNo);
            setCity(chosenAddress.city);
            setDistrict(chosenAddress.district);
            setZip(chosenAddress.zip);
            setEditId(id);
            setIsEditing(true);
            setIsNewAddress(true)
        }

    }

    const resetForm = () => {
        setIsNewAddress(false);
        setIsEditing(false);

        setTimeout(() => {
            setAddressTitle("");
            setFullAddress("");
            setAptNo("");
            setCity("");
            setDistrict("");
            setZip("");
        }, 500);
    }

    const handleTitleLength = (value: string) => {
        if (value.length >= 12) {
            setWarning("Title cannot exceed 12 characters")

            setTimeout(() => {
                setWarning(null);
            }, 2000)
        } else {
            setAddressTitle(value)
        }
    }
    return (
        <div className='my-addresses'>
            <header>
                <div className='title'>My Addresses</div>
                <div className={`add-address ${addresses.length > 0 ? "show" : ""}`} onClick={() => setIsNewAddress(!isNewAddress)}> <CiSquarePlus /> New address</div>
            </header>
            {
                (addresses.length > 0 && !isNewAddress) ? (
                    <div className="addresses">
                        {
                            addresses.map((address) => (
                                <div className="address" key={address.id}>
                                    <div className="header">
                                        <div className='title'> {address.addressTitle}</div>
                                        <div className="edit">
                                            <MdOutlineEdit onClick={() => editAddress(address.id)}/>
                                            <RiDeleteBin6Line onClick={() => sendAddressId(address.id)}/>
                                        </div>
                                    </div>
                                    <div className='body'>
                                        {`${address.fullAddress} ${address.city} / ${address.district}`}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <div className={`no-address ${isNewAddress ? "hide" : ""}`}>
                        <div className="no-address-msg">You haven't added any addresses yet.</div>
                        <button onClick={() => setIsNewAddress(true)}>Add New Address</button>
                    </div>
                )
            }
            <div className={`new-address ${isNewAddress ? "show" : ""}`}>
                <form className="new-address-form" onSubmit={(e) => handleAddresses(e)}>
                    <div className="input-box">
                        <label htmlFor="address-title">Address Title</label>
                        <input 
                            type="text" 
                            id='address-title' 
                            value= {addressTitle}
                            onChange={(e) => handleTitleLength(e.target.value)} 
                            required 
                        />
                        {warning && <span className='warning'>{warning}</span>}
                    </div>
                    <div className="input-box">
                        <label htmlFor="full-address">Full Address</label>
                        <input
                            type="text"
                            id='full-address'
                            value={fullAddress} 
                            onChange={(e) => setFullAddress(e.target.value)} 
                            required
                        />
                    </div>
                    <div className="input-box">
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            id='city'
                            value={city}
                            onChange={(e) => setCity(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="input-box">
                        <label htmlFor="district">District</label>
                        <input
                            type="text"
                            id='district'
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="input-box">
                        <label htmlFor="apt-no">Apt No</label>
                        <input
                            type="text"
                            id='apt-no'
                            value={aptNo}
                            onChange={(e) => setAptNo(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <label htmlFor="zip">ZIP Code</label>
                        <input 
                            type="number" 
                            id='zip' 
                            value={zip}
                            onChange={(e) => setZip(e.target.value)} 
                            required
                        />
                    </div>
                    <div className="buttons">
                        <button type='button' className='cancel' onClick={resetForm}>Cancel</button>
                        <button type='submit'>
                            {isEditing ? "Save" : "Create"}
                        </button>
                    </div>
                </form>
            </div>
            <DeleteAddress toggleDeleteBox={toggleDeleteBox} setToggleDeleteBox={() => setToggleDeleteBox(false)} deleteAddress={() => deleteId && deleteAddress(deleteId)}/>
        </div>
    )
}

export default MyAddresses