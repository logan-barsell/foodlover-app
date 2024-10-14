'use server';

import { redirect } from 'next/navigation';
import { saveMeal } from './meals';
import { revalidatePath } from 'next/cache';

function isInvalid(data) {
  return !data;
}

export async function shareMeal(_, formData) {
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  };

  Object.values(meal).map(value => {
    if (isInvalid(value)) {
      return {
        message: 'Missing or invalid form input.',
      };
    }
  });

  await saveMeal(meal);
  revalidatePath('/meals');
  redirect('/meals');
}
