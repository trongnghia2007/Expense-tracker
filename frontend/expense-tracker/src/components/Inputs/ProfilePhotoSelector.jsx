import React, { useRef, useState } from 'react'
import { LuUser, LuUpload, LuTrash} from 'react-icons/lu';

const ProfilePhotoSelector = ({image, setImage}) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(image);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);

            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    }

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
        inputRef.current.value = null;
    }

    const onChooseFile = () => {
        inputRef.current.click();
    }

  return (
    <div className="flex justify-center mb-6">
        <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={inputRef}
            onChange={handleImageChange}
        />

        {!image ? (
            <div className="w-[80px] h-[80px] rounded-full bg-purple-100 flex items-center justify-center cursor-pointer relative" >
                <LuUser className="text-4xl text-primary" />
                <button 
                    type="button" className="w-6 h-6 bg-primary text-black flex justify-center absolute -bottom-1 -right-0 bg-primary p-1 rounded-full" 
                    onClick={onChooseFile}>
                    <LuUpload className="text-white text-[14px]" />
                </button>
            </div>
        ) : (
            <div className="relative"> 
                <img 
                    src={previewUrl} 
                    alt="profile photo"
                    className="w-[70px] h-[70px] rounded-full object-cover"
                />
                <button 
                    type="button" 
                    className="absolute bottom-0 right-0 bg-red-500 p-1 rounded-full"
                    onClick={handleRemoveImage}
                >
                    <LuTrash className="text-white text-[14px]" />
                </button>
            </div>
        )}
    </div>
  )
}

export default ProfilePhotoSelector