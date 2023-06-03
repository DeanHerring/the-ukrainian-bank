import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { useState } from 'react';

const schema = yup.object({
  agree: yup.boolean(),
});

interface Person extends yup.InferType<typeof schema> {
  agree: boolean;
}

const Test = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Person>({ resolver: yupResolver(schema) });
  const [checked, setChecked] = useState<boolean>(false);

  const onSubmit: SubmitHandler<Person> = (data) => {
    console.log(data);
  };

  return (
    <>
      <div
        className={classNames(
          !Object.values(errors).length && 'hidden',
          'w-full py-[5px] px-[15px] rounded-md border border-red bg-red/30 mb-[15px]',
        )}
      >
        <p className="font-rubik font-normal text-black">
          {Object.values(errors).length && Object.values(errors)[0].message}
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={classNames(checked ? 'bg-blue' : 'bg-black', 'w-[25px] h-[25px] rounded')}
          onClick={() => setChecked(!checked)}
        >
          <input type="checkbox" checked={checked} {...register('agree')} />
        </div>
        <input type="submit" value="Send" />
      </form>
    </>
  );
};

export default Test;
