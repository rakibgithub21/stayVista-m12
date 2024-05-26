import { useState } from "react";
import AddRoomForm from "../../../components/Form/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../api/utils";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const AddRoom = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    
    const [imagePreview, setImagePreview] = useState()
    const [imageText, setImageText] = useState('Upload Image')

    const [dates, setDates] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    })

    //Date range handler:
    const handleDates = item => {
        setDates(item.selection)
    }

    //tan stack use mutation:
    const { mutateAsync } = useMutation({
        mutationFn: async (roomData) => {
            const { data } = await axiosSecure.post('/room', roomData)
            return data;
        },
        onSuccess: () => {
            console.log('data saved successfully');
            toast.success('Room added successfully')
            navigate('/dashboard/my-listings')
            setLoading(false)
        }
    })

    // FORM Handler:
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const form = e.target;
        const location = form.location.value;
        const category = form.category.value;
        const title = form.title.value;
        const to = dates.endDate
        const from = dates.startDate
        const price = form.price.value;
        const guest = form.total_guest.value;
        const bathrooms = form.description.value;
        const description = form.description.value;
        const bedrooms = form.bedrooms.value;
        const image = form.image.files[0]
        const host = {
            name: user?.displayName,
            image: user?.photoURL,
            email: user?.email,
        }

        try {
            const image_url = await imageUpload(image)
            const roomData = {
                location, category, title, to, from, price, guest, bathrooms, bedrooms, description, host, image: image_url
            }
            // post request to server:
            await mutateAsync(roomData)
            // console.table(roomData)
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            setLoading(false)
        }


    }

    const handleImageChange = (image) => {
        setImagePreview(URL.createObjectURL(image))
        setImageText(image.name)
    }


    return (
        <div>
            <AddRoomForm dates={dates} handleSubmit={handleSubmit} setImagePreview={setImagePreview} imageText={imageText} handleImageChange={handleImageChange} imagePreview={imagePreview} handleDates={handleDates} loading={loading}></AddRoomForm>
        </div>
    );
};

export default AddRoom;
