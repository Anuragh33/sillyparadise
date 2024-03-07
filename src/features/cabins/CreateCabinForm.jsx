import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { CreateEditCabin } from '../../services/apiCabins';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editID, ...editValues } = cabinToEdit;

  const isEdit = Boolean(editID);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEdit ? editValues : {},
  });

  const queryClient = useQueryClient();

  const { errors } = formState;

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: CreateEditCabin,
    onSuccess: () => {
      toast.success('New cabin added successfully!');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => CreateEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('Cabin edited successfully!');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    if (isEdit)
      editCabin({
        newCabinData: { ...data, image },
        id: editID,
      });
    else createCabin({ ...data, image: image });
  }

  function onError(errors) {}

  const isWorking = isCreating || isEditing;

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label='Cabin name' error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          {...register('name', {
            required: 'This field is required.',
          })}
        />
      </FormRow>

      <FormRow label='Maximum Capacity' error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'This field is required.',
            min: {
              value: 1,
              message: ' The minimum capacity is 1',
            },
          })}
        />
      </FormRow>

      <FormRow label='Regular Price' error={errors?.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          disabled={isWorking}
          {...register('regularPrice', {
            required: 'This field is required.',
            min: {
              value: 100,
              message: 'The price starts from $100 for a cabin ',
            },
          })}
        />
      </FormRow>

      <FormRow label='discount' error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          disabled={isWorking}
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required.',
            validate: (value) =>
              Number(getValues().regularPrice) > Number(value) ||
              'The discount should not exceed cabin price.',
          })}
        />
      </FormRow>

      <FormRow label='description' error={errors?.description?.message}>
        <Textarea
          type='number'
          id='description'
          disabled={isWorking}
          defaultValue=''
          {...register('description', {
            required: 'This field is required.',
          })}
        />
      </FormRow>

      <FormRow label='Cabin Photo'>
        <FileInput
          id='image'
          accept='image/*'
          type='file'
          {...register('image', {
            required: !isEdit ? 'This field is required.' : false,
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button variation='primary' disabled={isWorking}>
          {!isEdit ? 'Create new cabin' : 'Edit Cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
