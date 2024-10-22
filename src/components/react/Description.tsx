import { useState } from 'react';
import { IoIosInformationCircleOutline } from "react-icons/io";

type DescriptionProps = {
  description: string;
}

export const ImageDescription = ({ description }: DescriptionProps) => {
  const [showDescription, setShowDescription] = useState<boolean>(false);
  const [activeButton, setActiveButton] = useState<boolean>(false);
  
  const handleDescription = () => {
    setShowDescription(!showDescription);
    setActiveButton(!activeButton);
  };

  return (
    <>
      <button
        onClick={() => handleDescription()}
        className={`h-[30px] p-1 group`}
      >
        <span className={`opacity-80 transition duration-200 ${activeButton ? 'text-orange-500 hover:opacity-100' : 'hover:opacity-100'}`} title={showDescription ? 'Hide Description' : 'Show Description'}>
          <IoIosInformationCircleOutline size={30} />
        </span>
      </button>
      {showDescription && (
        <div
          className="absolute inset-x-0 top-[50px] 
          invisible group-hover:visible
          bg-solid mx-5 h-auto rounded-xl p-2
          group-hover:ease-in-out duration-300 opacity-0 group-hover:opacity-100 overflow-hidden"
        >
          <p className="text-sm">
            {description}
          </p>
        </div>
      )}
    </>
  )
}