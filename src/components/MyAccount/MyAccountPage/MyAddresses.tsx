import { useEffect, useState } from 'react';
import './MyAddresses.scss';
import { CiSquarePlus } from 'react-icons/ci';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdOutlineEdit } from 'react-icons/md';

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

    const deleteAddress = (id: number) => {
        setAddresses(prev => prev.filter((address) => address.id !== id))
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
  return (
    <div className='my-addresses'>
        <header>
            <div className='title'>My Addresses</div>
            <div className='add-address' onClick={() => setIsNewAddress(!isNewAddress)}> <CiSquarePlus /> New address</div>
        </header>
        <div className="addresses">
            {
                addresses.map((address) => (
                    <div className="address" key={address.id}>
                        <div className="header">
                            <div> {address.addressTitle}</div>
                            <div className="edit">
                                <MdOutlineEdit onClick={() => editAddress(address.id)}/>
                                <RiDeleteBin6Line onClick={() => deleteAddress(address.id)}/>
                            </div>
                        </div>
                        <div className='body'>
                            {`${address.fullAddress} ${address.city} / ${address.district}`}
                        </div>
                    </div>
                ))
            }
            <div className={`new-address ${isNewAddress ? "show" : ""}`}>
                <form className="new-address-form" onSubmit={(e) => handleAddresses(e)}>
                    <div className="input-box">
                        <label htmlFor="address-title">Address Title</label>
                        <input 
                            type="text" 
                            id='address-title' 
                            value= {addressTitle}
                            onChange={(e) => setAddressTitle(e.target.value)} 
                            required 
                        />
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
                            type="text" 
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
        </div>
    </div>
  )
}

export default MyAddresses