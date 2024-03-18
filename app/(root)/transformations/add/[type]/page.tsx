import Header from '@/components/shared/Header'
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants'
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const AddTransformationTypePage = async ({ params: { type } }: SearchParamProps) => {
  const { userId } = auth();

  if (!userId) {
    // Redirect the user to sign-in page if userId is not present
    redirect('/sign-in');
    return null; // Ensure to return null or any other component to prevent further execution
  }

  // Once you reach here, it means the user is signed in
  const user = await getUserById(userId);

  if (!user) {
    // Handle the case when user is not found
    // For example, redirect the user to the sign-in page
    redirect('/sign-in');
    return null;
  }
  
  const transformation = transformationTypes[type];

  return (
    <>
      <Header 
        title={transformation.title}
        subtitle={transformation.subTitle}
      />
    
      <section className="mt-10">
        <TransformationForm 
          action="Add"
          userId={user._id}
          type={transformation.type as TransformationTypeKey}
        //  creditBalance={userId.creditBalance}
        />
      </section>
    </>
  )
}

export default AddTransformationTypePage
