import React from 'react';
import { useUploadPassportMutation } from '@/redux/api/api';

type Passport = FileList | null | undefined;

const Test: React.FC = () => {
  const [uploadPassport] = useUploadPassportMutation();
  const imageRef = React.useRef<HTMLInputElement | null>(null);

  const uploadFile = (e: React.MouseEvent<HTMLInputElement>): void => {
    e.preventDefault();

    const files: Passport = imageRef.current?.files;

    if (files) {
      const formData: FormData = new FormData();
      formData.append('image', files[0]);

      new Promise(async (resolve, reject) => {
        const result = await uploadPassport(formData).unwrap();

        result.status ? resolve(result) : reject(result.err);
      })
        .then(() => {
          // setValue...
          console.log('Всё балдежно');
        })
        .catch((w) => {
          console.log('Error: ', w);
        });
    }
  };

  return (
    <>
      <h1>Test</h1>

      <form encType="multipart/form-data" className="flex flex-col">
        <input type="file" name="image" ref={imageRef} />
        <input
          type="submit"
          name="image"
          value="Upload Image"
          onClick={(e) => uploadFile(e)}
          className="bg-blue text-white-1 rounded mt-[10px] py-[5px] px-[15px] self-start cursor-pointer"
        />
      </form>
    </>
  );
};

export default Test;
